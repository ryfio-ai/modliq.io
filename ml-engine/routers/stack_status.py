"""
ML Engine — AI & ML Stack Dependency Status Router
Dynamic runtime package inspection for Traditional ML, Visualization, and RAG capabilities.
Last verified: 17/08/2026
"""

import os
import importlib
from fastapi import APIRouter

router = APIRouter(prefix="/stack", tags=["Stack Status"])

def is_installed(package_name: str) -> bool:
    try:
        importlib.import_module(package_name)
        return True
    except Exception:
        return False

@router.get("/status")
async def get_stack_status():
    return {
        "traditionalMl": {
            "pandas": is_installed("pandas"),
            "numpy": is_installed("numpy"),
            "scipy": is_installed("scipy"),
            "sklearn": is_installed("sklearn"),
            "xgboost": is_installed("xgboost"),
            "lightgbm": is_installed("lightgbm"),
            "pytorch": is_installed("torch"),
            "optuna": is_installed("optuna"),
            "shap": is_installed("shap"),
            "onnx": is_installed("onnx"),
        },
        "visualization": {
            "matplotlib": is_installed("matplotlib"),
            "seaborn": is_installed("seaborn"),
            "pygal": is_installed("pygal"),
            "altair": is_installed("altair"),
            "bokeh": is_installed("bokeh"),
            "plotnine": is_installed("plotnine"),
        },
        "rag": {
            "qdrantConfigured": bool(os.getenv("QDRANT_URL")),
            "embeddingsConfigured": bool(
                os.getenv("GROQ_API_KEY")
                or os.getenv("GEMINI_API_KEY")
                or os.getenv("GOOGLE_AI_API_KEY")
                or os.getenv("EMBEDDING_PROVIDER")
            ),
        },
        "lastVerified": "17/08/2026",
    }
