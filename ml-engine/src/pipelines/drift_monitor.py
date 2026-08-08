import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional
from scipy.stats import ks_2samp

def check_model_drift(
    training_data: List[Dict[str, Any]],
    current_data: List[Dict[str, Any]],
    target_column: Optional[str] = None
) -> Dict[str, Any]:
    """
    Compares training dataset with current dataset to detect:
    - Input feature distribution drift (Kolmogorov-Smirnov test)
    - Schema differences & missing columns
    - Model trust status ('Stable', 'Needs Review', 'Retraining Recommended')
    """
    if not training_data or not current_data:
        return {
            "status": "Needs Review",
            "trustScore": 75,
            "warnings": ["Insufficient historical data to benchmark distribution drift."],
            "retrainingRecommended": False
        }

    train_df = pd.DataFrame(training_data)
    curr_df = pd.DataFrame(current_data)

    warnings = []
    drifted_features = []

    # 1. Schema check
    missing_cols = set(train_df.columns) - set(curr_df.columns)
    if missing_cols:
        warnings.append(f"Current dataset is missing features present during model training: {', '.join(missing_cols)}")

    # 2. Distribution Drift test per numeric column
    numeric_cols = train_df.select_dtypes(include=[np.number]).columns
    for col in numeric_cols:
        if col in curr_df.columns:
            s_train = train_df[col].dropna()
            s_curr = curr_df[col].dropna()

            if len(s_train) >= 10 and len(s_curr) >= 10:
                # Kolmogorov-Smirnov 2-sample test
                ks_stat, p_val = ks_2samp(s_train, s_curr)
                if p_val < 0.05:
                    drifted_features.append(col)
                    warnings.append(f"Significant distribution drift detected in feature `{col}` (p = {p_val:.4f}).")

    # Determine Overall Trust Status
    if len(drifted_features) > 2 or missing_cols:
        status = "Retraining Recommended"
        trust_score = max(40, 100 - (len(drifted_features) * 15) - (len(missing_cols) * 20))
        retrain = True
        recommendation = f"Retrain model with latest dataset due to drift in {len(drifted_features)} feature(s)."
    elif len(drifted_features) > 0:
        status = "Needs Review"
        trust_score = 80
        retrain = False
        recommendation = "Review recent process parameter drift before launching next optimization trial."
    else:
        status = "Stable"
        trust_score = 98
        retrain = False
        recommendation = "Model inputs remain consistent with training distribution. No retraining required."

    return {
        "status": status,
        "trustScore": trust_score,
        "driftedFeaturesCount": len(drifted_features),
        "driftedFeatures": drifted_features,
        "warnings": warnings if warnings else ["All feature distributions lie within training parameters."],
        "retrainingRecommended": retrain,
        "recommendationText": recommendation
    }
