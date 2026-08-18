# Layered AI & Machine Learning Tech Stack Architecture

> **Last verified: 17/08/2026**
> **Brand: MODLIQER**
> **Tagline: Analyze data. Build models. Prove results — without code.**

MODLIQER organizes its intelligent data capabilities into a 7-Layer AI & Machine Learning Architecture.

---

## 7-Layer Architecture Overview

### Layer 1 — Data Infrastructure
- **Status**: Implemented / Beta
- **Technologies**: MongoDB Atlas, Prisma ORM, Cloudflare R2 object storage abstraction, Redis / BullMQ job queues, Postgres / Supabase connectors, Qdrant vector database.
- **Roadmap Connectors**: SCADA historians, OPC-UA, MQTT, Modbus, Apache Kafka, Apache Spark.

### Layer 2 — Traditional ML Stack
- **Status**: Implemented / Beta
- **Technologies**: Pandas, NumPy, SciPy, Scikit-Learn (RandomForest, GradientBoosting, ExtraTrees, LinearRegression), Joblib, Optuna Bayesian tuning (Beta), SHAP drivers, XGBoost (Beta), LightGBM (Beta), PyTorch MLP (Planned).

### Layer 3 — Generative AI & Agentic Stack
- **Status**: Implemented / Beta
- **Technologies**: Multi-provider AI Gateway (Groq, Gemini, NVIDIA, Cohere, Cloudflare, OpenRouter), DocuMind RAG, Qdrant, Agent Task Pilot, Voice AI Coach, Playwright Browser AutoQA.

### Layer 4 — MLOps and Model Evidence
- **Status**: Implemented / Beta
- **Technologies**: ModelArtifact metadata registry, Quality Passport evidence engine, SciPy KS-test drift monitor.
- **Roadmap Platforms**: MLflow, Kubeflow, AWS SageMaker, Google Vertex AI, Kubernetes autoscaling, Triton, Ray Serve.

### Layer 5 — Edge & Real-Time Inference
- **Status**: Roadmap / Beta
- **Technologies**: ONNX model export (Beta), ONNX Runtime (Beta), TensorFlow Lite (Roadmap), CoreML (Roadmap), SCADA streaming sensor inference (Roadmap).

### Layer 6 — Visualization Engine
- **Status**: Implemented
- **Technologies**: PyGal, Bokeh, Seaborn, Matplotlib, Altair multi-library chart generation.

### Layer 7 — Security & Credential Isolation
- **Status**: Implemented / Beta
- **Technologies**: Input sanitization, prompt guardrails, server-side Credential Vault, role-based access control.

---

## Detailed Tech Stack Status Matrix

| Layer | Component | Framework / Tool | Status | Used For |
|---|---|---|---|---|
| 1. Data | Operational DB | MongoDB Atlas / Prisma | Implemented | System State & Project Storage |
| 1. Data | Job Queue | BullMQ / Redis | Implemented | Asynchronous Job Execution |
| 1. Data | Vector DB | Qdrant | Beta | DocuMind RAG Search |
| 2. Traditional ML | Tabular AutoML | Scikit-Learn | Implemented | Predictive Regressors & Classifiers |
| 2. Traditional ML | Gradient Boosting | XGBoost / LightGBM | Beta | High-performance Model Benchmarks |
| 2. Traditional ML | Tuning | Optuna | Beta | Bayesian Hyperparameter Optimization |
| 2. Traditional ML | Explainability | SHAP | Implemented | Driver Analysis & Feature Rankings |
| 3. Generative AI | LLM Gateway | Groq/Gemini/NVIDIA/Cohere | Implemented | Copilots, Summarization, Reports |
| 3. Generative AI | RAG Engine | DocuMind / Qdrant | Beta | PDF Ingestion & Cited Search |
| 3. Generative AI | Agent Pilots | Internal / LangGraph | Implemented | Autonomous Multi-step Tasks |
| 4. MLOps | Model Artifacts | MongoDB ModelArtifact | Implemented | Passport Evidence Metadata |
| 4. MLOps | Drift Monitor | SciPy KS-Test | Implemented | Feature & Concept Drift Checks |
| 5. Edge | Model Export | ONNX | Beta | Cross-Platform Edge Runtime |
| 5. Edge | Industrial Protocols | OPC-UA / MQTT | Roadmap | Real-Time Telemetry Streaming |
| 6. Visualization | Graphic Engine | PyGal / Bokeh / Seaborn | Implemented | Chart Specs & Graphic Plots |
| 7. Security | Credential Vault | MODLIQER Vault | Beta | Isolated Credential References |

---

## Related Documentation
- `docs/01-architecture/AI_ARCHITECTURE.md`
- `docs/04-ml-engine/TRADITIONAL_ML_STACK.md`
- `docs/06-ai/GENERATIVE_AI_STACK.md`
- `docs/08-deployment/MLOPS_AND_EDGE_ROADMAP.md`
