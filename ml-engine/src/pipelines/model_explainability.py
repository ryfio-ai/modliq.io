"""
Modliq ML Engine — Model Explainability Pipeline
Computes SHAP driver values if SHAP is installed; falls back to Tree/Permutation Feature Importance.
Last verified: 17/08/2026
"""

import importlib
import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional
from sklearn.ensemble import RandomForestRegressor
from sklearn.impute import SimpleImputer

def is_installed(package_name: str) -> bool:
    try:
        importlib.import_module(package_name)
        return True
    except Exception:
        return False

def explain_model_drivers(
    data: List[Dict[str, Any]],
    target_column: str,
    feature_columns: Optional[List[str]] = None
) -> Dict[str, Any]:
    """
    Computes feature drivers and SHAP explainability.
    """
    if not data or not target_column:
        return {"success": False, "error": "Invalid data or target column"}

    df = pd.DataFrame(data)
    if target_column not in df.columns:
        return {"success": False, "error": f"Target column '{target_column}' not found"}

    numeric_df = df.select_dtypes(include=[np.number]).dropna(subset=[target_column])
    if len(numeric_df) < 10:
        return {"success": False, "error": "Insufficient rows for driver explainability"}

    y = numeric_df[target_column]
    features = feature_columns if feature_columns else [c for c in numeric_df.columns if c != target_column]
    X = numeric_df[features]

    imputer = SimpleImputer(strategy='median')
    X_imputed = imputer.fit_transform(X)

    model = RandomForestRegressor(n_estimators=50, random_state=42)
    model.fit(X_imputed, y)

    importances = model.feature_importances_
    feature_importance_map = {
        feat: float(np.round(imp, 4))
        for feat, imp in zip(features, importances)
    }

    shap_installed = is_installed("shap")
    shap_values_summary = {}

    if shap_installed:
        try:
            import shap
            explainer = shap.TreeExplainer(model)
            shap_vals = explainer.shap_values(X_imputed[:50])
            mean_abs_shap = np.abs(shap_vals).mean(axis=0)
            shap_values_summary = {
                feat: float(np.round(val, 4))
                for feat, val in zip(features, mean_abs_shap)
            }
        except Exception as e:
            shap_installed = False

    return {
        "success": True,
        "explainabilityType": "SHAP Values" if shap_installed and shap_values_summary else "Feature Importance Fallback",
        "shapInstalled": shap_installed,
        "targetColumn": target_column,
        "featureImportance": feature_importance_map,
        "shapSummary": shap_values_summary if shap_values_summary else feature_importance_map,
        "lastVerified": "17/08/2026",
    }
