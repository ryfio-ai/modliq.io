import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor, ExtraTreesRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error
from sklearn.impute import SimpleImputer

def benchmark_automl_models(
    data: List[Dict[str, Any]],
    target_column: str,
    feature_columns: Optional[List[str]] = None
) -> Dict[str, Any]:
    """
    Benchmarks candidate ML models (Random Forest, Gradient Boosting, Extra Trees, Linear Regression)
    and returns a competitive leaderboard with R2, RMSE, and MAE metrics.
    """
    if not data or not target_column:
        return {"success": False, "error": "Invalid data or target column"}

    df = pd.DataFrame(data)
    if target_column not in df.columns:
        return {"success": False, "error": f"Target column '{target_column}' not found"}

    # Select numerical features
    numeric_df = df.select_dtypes(include=[np.number]).dropna(subset=[target_column])
    if numeric_df.empty or len(numeric_df) < 10:
        return {"success": False, "error": "Insufficient numerical data for AutoML modeling"}

    y = numeric_df[target_column]
    if feature_columns:
        valid_features = [f for f in feature_columns if f in numeric_df.columns and f != target_column]
    else:
        valid_features = [c for c in numeric_df.columns if c != target_column]

    if not valid_features:
        return {"success": False, "error": "No valid numerical features for training"}

    X = numeric_df[valid_features]
    
    # Impute missing feature values
    imputer = SimpleImputer(strategy='median')
    X_imputed = imputer.fit_transform(X)

    # Train/Test Split
    X_train, X_test, y_train, y_test = train_test_split(X_imputed, y, test_size=0.2, random_state=42)

    candidates = [
        ("Random Forest Regressor", RandomForestRegressor(n_estimators=50, random_state=42)),
        ("Gradient Boosting Regressor", GradientBoostingRegressor(n_estimators=50, random_state=42)),
        ("Extra Trees Regressor", ExtraTreesRegressor(n_estimators=50, random_state=42)),
        ("Linear Regression Baseline", LinearRegression())
    ]

    leaderboard = []
    best_model_name = ""
    best_r2 = -999.0
    best_feature_importance = {}

    for name, model in candidates:
        try:
            model.fit(X_train, y_train)
            preds = model.predict(X_test)

            r2 = float(np.round(r2_score(y_test, preds), 4))
            rmse = float(np.round(np.sqrt(mean_squared_error(y_test, preds)), 4))
            mae = float(np.round(mean_absolute_error(y_test, preds), 4))

            # CV Score if enough samples
            cv_scores = cross_val_score(model, X_imputed, y, cv=min(3, len(X_imputed)))
            cv_mean = float(np.round(np.mean(cv_scores), 4))

            leaderboard.append({
                "model": name,
                "r2": max(0.0, r2),
                "rmse": rmse,
                "mae": mae,
                "cvScore": max(0.0, cv_mean)
            })

            if r2 > best_r2:
                best_r2 = r2
                best_model_name = name
                if hasattr(model, "feature_importances_"):
                    importances = model.feature_importances_
                    best_feature_importance = {
                        feat: float(np.round(imp, 4))
                        for feat, imp in zip(valid_features, importances)
                    }
        except Exception as e:
            continue

    leaderboard = sorted(leaderboard, key=lambda x: x["r2"], reverse=True)
    if not best_model_name and leaderboard:
        best_model_name = leaderboard[0]["model"]

    return {
        "success": True,
        "bestModel": best_model_name,
        "targetColumn": target_column,
        "sampleSize": len(numeric_df),
        "featuresUsed": valid_features,
        "leaderboard": leaderboard,
        "featureImportance": best_feature_importance
    }
