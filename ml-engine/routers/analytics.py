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

class DataQueryRequest(BaseModel):
    data: List[Dict[str, Any]]
    question: str

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
