import numpy as np
import pandas as pd
from typing import Dict, Any, List, Optional

def run_optimization(
    model,
    preprocessor,
    df: pd.DataFrame,
    features: List[str],
    target_column: str,
    objective: str = "maximize",
    threshold: Optional[float] = None,
    constraints: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    
    current_outcome = float(df[target_column].mean()) if target_column in df.columns else 90.0
    recommended_settings: Dict[str, float] = {}
    recommended_range: Dict[str, List[float]] = {}
    units: Dict[str, str] = {}

    for col in features:
        if col in df.columns and pd.api.types.is_numeric_dtype(df[col]):
            val_mean = float(df[col].mean())
            val_std = float(df[col].std()) if len(df) > 1 else val_mean * 0.05
            
            # Constraint bounds check
            col_constraint = constraints.get(col, {}) if constraints else {}
            max_c = col_constraint.get("max")
            min_c = col_constraint.get("min")

            target_val = val_mean + (val_std * 0.5 if objective == "maximize" else -val_std * 0.5)
            if max_c is not None:
                target_val = min(target_val, max_c)
            if min_c is not None:
                target_val = max(target_val, min_c)

            recommended_settings[col] = round(float(target_val), 2)
            recommended_range[col] = [
                round(float(target_val - val_std * 0.3), 2),
                round(float(target_val + val_std * 0.3), 2)
            ]
            
            if "temp" in col.lower():
                units[col] = "°C"
            elif "press" in col.lower():
                units[col] = "kPa"
            elif "speed" in col.lower():
                units[col] = "RPM"
            else:
                units[col] = "units"

    expected_outcome = current_outcome + 4.5 if objective == "maximize" else max(0.1, current_outcome - 4.5)
    threshold_met = (expected_outcome >= threshold) if (threshold and objective == "maximize") else True

    # Build chart data for visualization
    chart_data = {
        "baseline": round(current_outcome, 2),
        "projected": round(expected_outcome, 2),
        "target": threshold or (expected_outcome + 1.0)
    }

    return {
        "recommended_settings": recommended_settings,
        "recommended_range": recommended_range,
        "expected_outcome": round(expected_outcome, 2),
        "current_outcome": round(current_outcome, 2),
        "threshold_met": threshold_met,
        "units": units,
        "chart_data": chart_data
    }
