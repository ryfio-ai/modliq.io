import numpy as np
from typing import Dict, List, Any, Optional

def calculate_spc_metrics(values: List[float], lsl: Optional[float] = None, usl: Optional[float] = None) -> Dict[str, Any]:
    arr = np.array([v for v in values if v is not None and not np.isnan(v)], dtype=float)
    if len(arr) < 2:
        return {"count": len(arr), "error": "Insufficient data points"}

    mean_val = float(np.mean(arr))
    std_val = float(np.std(arr, ddof=1))

    cp = None
    cpk = None
    if lsl is not None and usl is not None and std_val > 0:
        cp = (usl - lsl) / (6 * std_val)
        cpu = (usl - mean_val) / (3 * std_val)
        cpl = (mean_val - lsl) / (3 * std_val)
        cpk = min(cpu, cpl)

    # Moving range for Individual-Moving Range (I-MR) chart
    mr = np.abs(np.diff(arr))
    mean_mr = float(np.mean(mr)) if len(mr) > 0 else 0.0
    d2 = 1.128  # Constant for subgroup size 2
    sigma_mr = mean_mr / d2 if mean_mr > 0 else std_val

    ucl_i = mean_val + 3 * sigma_mr
    lcl_i = mean_val - 3 * sigma_mr

    # Point-by-point status & rule violation checks
    points = []
    violations = []
    for idx, val in enumerate(arr):
        is_violation = val > ucl_i or val < lcl_i
        status = "violation" if is_violation else "normal"
        if is_violation:
            violations.append({"index": idx, "value": float(val), "rule": "Out of 3-sigma control limits"})
        points.append({"index": idx, "value": float(val), "status": status})

    return {
        "count": len(arr),
        "mean": round(mean_val, 4),
        "std": round(std_val, 4),
        "cp": round(cp, 4) if cp is not None else None,
        "cpk": round(cpk, 4) if cpk is not None else None,
        "control_limits": {
            "center_line": round(mean_val, 4),
            "ucl": round(ucl_i, 4),
            "lcl": round(lcl_i, 4),
        },
        "points": points,
        "violations": violations,
    }
