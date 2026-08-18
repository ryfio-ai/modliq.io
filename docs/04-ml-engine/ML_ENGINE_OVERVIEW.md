# ML Engine Overview

> **Last verified: 17/08/2026**
> **Brand: MODLIQER**
> **Tagline: Analyze data. Build models. Prove results — without code.**

The ML Engine provides Python-native analytics, classical ML, statistical process control, and document extraction microservices for MODLIQER.

---

## Python ML Stack Component Breakdown

### Data Infrastructure & ETL
- `pandas` (Implemented): Tabular data parsing and transformation.
- `numpy` (Implemented): Array processing and numerical operations.
- `scipy` (Implemented): Statistical hypothesis tests and Kolmogorov-Smirnov drift detection.

### Model Training & Tuning
- `scikit-learn` (Implemented): Core regression and classification algorithm zoo.
- `xgboost` (Beta): Optional gradient boosting model candidate.
- `lightgbm` (Beta): Optional light gradient boosting candidate.
- `optuna` (Beta): Bayesian hyperparameter optimization.

### Explainability & Serving
- `shap` (Implemented / Beta): Driver explainability values.
- `joblib` (Implemented): Model artifact binary serialization.
- `onnx` (Beta / Planned): Cross-platform model export format.

---

## Service Security & Authentication
- Authenticated with internal service key header: `X-Modliq-Service-Key`.
- Compute-only execution — state persists in MongoDB via Express API Gateway.

---

## Related Documentation
- `docs/04-ml-engine/TRADITIONAL_ML_STACK.md`
- `docs/01-architecture/ML_ENGINE_ARCHITECTURE.md`
