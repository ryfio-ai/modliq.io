"""
Modliq ML Engine — FastAPI Application
Production-ready entrypoint with lifespan management, structured logging,
and service-key authentication.
"""
import os
import time
import logging
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
import uvicorn

from routers.train import router as train_router, predict_router
from routers.monitor import router as monitor_router
from services.storage import ModelStorage

# ── Structured Logging ──────────────────────────────────────────────
logging.basicConfig(
    level=getattr(logging, os.getenv("LOG_LEVEL", "INFO")),
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
)
logger = logging.getLogger("modliq.ml")

# ── Lifespan ────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    logger.info("🚀 ML Engine starting up…")
    app.state.storage = ModelStorage(base_path=os.getenv("MODEL_STORAGE_PATH", "./model_artifacts"))
    app.state.start_time = time.time()
    yield
    logger.info("🛑 ML Engine shutting down…")

app = FastAPI(
    title="Modliq AutoML Engine",
    description="Universal no-code ML training, prediction, and explainability API",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs" if os.getenv("ENVIRONMENT") != "production" else None,
    redoc_url="/redoc" if os.getenv("ENVIRONMENT") != "production" else None,
)

# ── Middleware ──────────────────────────────────────────────────────
app.add_middleware(GZipMiddleware, minimum_size=1000)

allowed_origins_env = os.getenv("CLIENT_ORIGIN", os.getenv("FRONTEND_ORIGIN", "*"))
origins = [o.strip() for o in allowed_origins_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if os.getenv("ENVIRONMENT") == "production" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_request_id(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID", f"req_{int(time.time()*1000)}")
    request.state.request_id = request_id
    start = time.time()
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Response-Time-Ms"] = str(int((time.time() - start) * 1000))
    return response

# ── Service-Key Auth ────────────────────────────────────────────────
SERVICE_KEY = os.getenv("ML_INTERNAL_API_KEY", "")

def verify_service_key(request: Request):
    if not SERVICE_KEY or os.getenv("ENVIRONMENT") != "production":
        return True
    key = request.headers.get("X-Modliq-Service-Key")
    if not key or key != SERVICE_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing service key")
    return key

# ── Health & Warmup ─────────────────────────────────────────────────
@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "version": "1.0.0",
        "uptime_sec": int(time.time() - getattr(app.state, "start_time", time.time())),
    }

@app.get("/warmup", tags=["System"])
async def warmup():
    """Render/Cloud Run cold-start warmup."""
    return {"status": "warm"}

# ── Routers ─────────────────────────────────────────────────────────
app.include_router(train_router)
app.include_router(
    train_router,
    prefix="/automl",
    tags=["AutoML"],
    dependencies=[Depends(verify_service_key)],
)
app.include_router(
    predict_router,
    prefix="",
    tags=["Prediction"],
    dependencies=[Depends(verify_service_key)],
)
app.include_router(
    monitor_router,
    prefix="",
    tags=["Monitoring"],
    dependencies=[Depends(verify_service_key)],
)

# ── Global Exception Handler ────────────────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled exception: %s", exc)
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc) if str(exc) else "Internal server error", "request_id": getattr(request.state, "request_id", None)},
    )

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=False,
        workers=1,
    )