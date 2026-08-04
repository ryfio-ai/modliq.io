# Modliq Python ML Engine Render Container Deployment

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection (`ml-engine/Dockerfile`, `render.yaml`)  
> **Status:** Implemented / Launch-Ready  

---

## 🐍 Docker Container Configuration

Configured in `ml-engine/Dockerfile` and `ml-engine/render.yaml`:

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Health Check Endpoint
- **Path**: `GET /health`
- **Response**: `{ "status": "ok", "service": "ml-engine" }`

---

## 🔗 Related Documentation

- [DEPLOYMENT_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/08-deployment/DEPLOYMENT_OVERVIEW.md) — Deployment overview
- [ML_ENGINE_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/04-ml-engine/ML_ENGINE_OVERVIEW.md) — ML engine details
