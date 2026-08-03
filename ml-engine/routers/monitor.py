from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import pandas as pd
from services.drift_detector import detect_feature_drift

router = APIRouter(prefix="/monitor", tags=["monitoring"])

class DriftCheckRequest(BaseModel):
    model_id: str
    baseline_data: List[Dict[str, Any]]
    current_data: List[Dict[str, Any]]
    features: List[str]

@router.post("/drift")
def check_data_drift(req: DriftCheckRequest):
    if not req.baseline_data or not req.current_data:
        raise HTTPException(status_code=400, detail="baseline_data and current_data cannot be empty")

    baseline_df = pd.DataFrame(req.baseline_data)
    current_df = pd.DataFrame(req.current_data)

    report = detect_feature_drift(baseline_df, current_df, req.features)
    report["model_id"] = req.model_id
    return report
