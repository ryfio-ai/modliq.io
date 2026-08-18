# Traditional Machine Learning Stack

> **Last verified: 17/08/2026**
> **Brand: MODLIQER**
> **Tagline: Analyze data. Build models. Prove results — without code.**

The Traditional ML Stack provides classical tabular ML, AutoML benchmarking, hyperparameter optimization, and driver explainability inside MODLIQER's Python FastAPI ML Engine.

---

## Architecture & Framework Components

### 1. Data Preprocessing & Feature Imputation
- **Libraries**: `pandas`, `numpy`, `scipy`, `scikit-learn.impute.SimpleImputer`
- **Features**: Median numerical imputation, standard scaling, target split, train/test validation splits.

### 2. AutoML Model Zoo
- **Scikit-Learn Baselines (Implemented)**: `RandomForestRegressor`, `GradientBoostingRegressor`, `ExtraTreesRegressor`, `LinearRegression`.
- **Optional Gradient Boosting (Beta)**: Dynamic runtime import check for `xgboost` (`XGBRegressor`) and `lightgbm` (`LGBMRegressor`).
- **Deep Learning (Planned)**: PyTorch MLP regressors for high-dimensional tabular data.
- **Skipped Models Report**: Automatically records `skippedModels` with diagnostic reasons when optional dependencies are missing.

### 3. Hyperparameter Optimization (Beta)
- **Primary Strategy**: Optuna Bayesian Optimization (`optuna.create_study`).
- **Fallback Strategy**: Grid & Random Search fallback when Optuna is unavailable.

### 4. Model Explainability & Drivers (Implemented)
- **Primary Driver Analysis**: SHAP (`shap.TreeExplainer`) calculating mean absolute SHAP values.
- **Fallback Feature Importance**: Tree feature importances (`model.feature_importances_`) or permutation importance.

### 5. Model Registry & Artifact Export (Implemented / Beta)
- **Registry**: `ModelArtifact` metadata tracking target, features, sample size, metrics (R2, RMSE, MAE, CV Score), and dataset ID.
- **Joblib Export**: Native `.joblib` binary serialization.
- **ONNX Export (Beta)**: `.onnx` cross-platform model export.

---

## Python ML Engine Status Endpoint
Check runtime dependency status via:
`GET /stack/status`

Sample Response:
```json
{
  "traditionalMl": {
    "pandas": true,
    "numpy": true,
    "scipy": true,
    "sklearn": true,
    "xgboost": false,
    "lightgbm": false,
    "pytorch": false,
    "optuna": false,
    "shap": false,
    "onnx": false
  }
}
```

---

## Related Documentation
- `docs/04-ml-engine/ML_ENGINE_OVERVIEW.md`
- `docs/01-architecture/LAYERED_AI_ML_STACK.md`
