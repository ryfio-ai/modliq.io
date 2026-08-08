import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional

def suggest_feature_engineering(data: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Analyzes dataset columns and suggests safe manufacturing derived features:
    - Datetime components (day_of_week, month, shift_bucket)
    - Process variable interactions (e.g. Temp * Pressure)
    - Defect ratios (defect_count / total_count)
    - Rolling/Moving average trends
    """
    if not data:
        return {"success": False, "suggestions": []}

    df = pd.DataFrame(data)
    cols = df.columns.tolist()
    suggestions = []

    # 1. Date/Time Features
    datetime_cols = [c for c in cols if 'date' in c.lower() or 'time' in c.lower() or 'timestamp' in c.lower()]
    for dcol in datetime_cols:
        suggestions.append({
            "id": f"feat_date_{dcol}",
            "type": "datetime_extract",
            "sourceColumn": dcol,
            "proposedFeatures": [f"{dcol}_day_of_week", f"{dcol}_hour", f"{dcol}_month"],
            "description": f"Extract day of week, hour of shift, and month from `{dcol}` to uncover shift/seasonal trends.",
            "impact": "High"
        })

    # 2. Defect / Scrap Ratio Features
    count_cols = [c for c in cols if 'count' in c.lower() or 'total' in c.lower() or 'quantity' in c.lower()]
    defect_cols = [c for c in cols if 'defect' in c.lower() or 'reject' in c.lower() or 'scrap' in c.lower()]

    if count_cols and defect_cols:
        suggestions.append({
            "id": "feat_ratio_defect",
            "type": "ratio",
            "sourceColumn": f"{defect_cols[0]} / {count_cols[0]}",
            "proposedFeatures": ["calculated_defect_rate_pct"],
            "description": f"Compute normalized defect percentage = ({defect_cols[0]} / {count_cols[0]}) * 100.",
            "impact": "High"
        })

    # 3. Process Interaction Features
    temp_cols = [c for c in cols if 'temp' in c.lower()]
    press_cols = [c for c in cols if 'press' in c.lower()]
    speed_cols = [c for c in cols if 'speed' in c.lower() or 'flow' in c.lower()]

    if temp_cols and press_cols:
        suggestions.append({
            "id": "feat_interaction_tp",
            "type": "interaction",
            "sourceColumn": f"{temp_cols[0]} * {press_cols[0]}",
            "proposedFeatures": [f"{temp_cols[0]}_x_{press_cols[0]}"],
            "description": f"Create thermal-pressure energy interaction feature: `{temp_cols[0]}` × `{press_cols[0]}`.",
            "impact": "Medium"
        })

    # 4. Moving Average Trend
    yield_cols = [c for c in cols if 'yield' in c.lower() or 'quality' in c.lower()]
    if yield_cols:
        suggestions.append({
            "id": "feat_moving_avg",
            "type": "trend",
            "sourceColumn": yield_cols[0],
            "proposedFeatures": [f"{yield_cols[0]}_ma_5batch"],
            "description": f"Compute 5-batch moving average for `{yield_cols[0]}` to filter high-frequency process noise.",
            "impact": "Medium"
        })

    return {
        "success": True,
        "totalSuggestions": len(suggestions),
        "suggestions": suggestions
    }
