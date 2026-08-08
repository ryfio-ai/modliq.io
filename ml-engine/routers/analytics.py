from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from src.pipelines.query_planner import plan_and_execute_query
from src.pipelines.automl_engine import benchmark_automl_models
from src.pipelines.feature_engineering import suggest_feature_engineering
from src.pipelines.drift_monitor import check_model_drift

analytics_router = APIRouter(prefix="/analytics", tags=["analytics"])
automl_router = APIRouter(prefix="/automl", tags=["automl"])
features_router = APIRouter(prefix="/features", tags=["features"])
models_router = APIRouter(prefix="/models", tags=["models"])
goal_router = APIRouter(prefix="", tags=["goal"])

class DataQueryRequest(BaseModel):
    data: List[Dict[str, Any]]
    question: str

class ParseGoalRequest(BaseModel):
    goal_text: str
    template_id: Optional[str] = "yield_optimizer"
    columns: Optional[List[str]] = []

class AutoMlBenchmarkRequest(BaseModel):
    data: List[Dict[str, Any]]
    targetColumn: str
    featureColumns: Optional[List[str]] = None

class FeatureSuggestRequest(BaseModel):
    data: List[Dict[str, Any]]

class DriftCheckRequest(BaseModel):
    trainingData: List[Dict[str, Any]]
    currentData: List[Dict[str, Any]]
    targetColumn: Optional[str] = None

@analytics_router.post("/query-plan")
def query_plan_endpoint(req: DataQueryRequest):
    try:
        res = plan_and_execute_query(req.data, req.question)
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@automl_router.post("/benchmark")
def automl_benchmark_endpoint(req: AutoMlBenchmarkRequest):
    try:
        res = benchmark_automl_models(req.data, req.targetColumn, req.featureColumns)
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@features_router.post("/suggest")
def feature_suggest_endpoint(req: FeatureSuggestRequest):
    try:
        res = suggest_feature_engineering(req.data)
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@models_router.post("/drift-check")
def drift_check_endpoint(req: DriftCheckRequest):
    try:
        res = check_model_drift(req.trainingData, req.currentData, req.targetColumn)
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@goal_router.post("/parse-goal")
def parse_goal_endpoint(req: ParseGoalRequest):
    text = req.goal_text.lower()
    cols = req.columns or []
    candidate_cols = [c for c in cols if not any(k in c.lower() for k in ["exp", "experiment", "id", "no.", "sl_no", "index"])]
    cols_to_use = candidate_cols if candidate_cols else cols
    
    is_minimize = any(k in text for k in ["min", "lower", "reduce", "less", "decrease", "defect", "roughness", "stringing", "scrap", "downtime", "burr", "impurity"])
    goal_direction = "minimize" if is_minimize else "maximize"
    
    target = None
    for c in cols_to_use:
        if c.lower() in text:
            target = c
            break
    if not target:
        for c in cols_to_use:
            if any(k in c.lower() for k in ["yield", "quality", "roughness", "cylindricity", "thickness", "stringing", "moisture", "hardness", "density"]):
                target = c
                break
    if not target and cols_to_use:
        target = cols_to_use[-1]
    if not target:
        target = "Yield"
        
    features = [c for c in cols_to_use if c != target]
    if not features and cols:
        features = [c for c in cols if c != target]
        
    constraints = {f: {"min": 10.0, "max": 250.0} for f in features}
    
    return {
        "success": True,
        "raw_text": req.goal_text,
        "template_id": req.template_id or "yield_optimizer",
        "target": target,
        "goal_direction": goal_direction,
        "threshold": 0.5 if is_minimize else 92.0,
        "features": features,
        "constraints": constraints,
    }
