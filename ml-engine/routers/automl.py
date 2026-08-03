from fastapi import APIRouter, HTTPException, Depends
import pandas as pd
import numpy as np
from typing import Dict, Any, List

from dependencies import verify_service_key
from models.schemas import (
    ProfileRequest, DataProfile,
    TaskDetectionRequest, TaskDetectionResponse,
    TrainingJobRequest, TrainingJobResponse,
    PredictionRequest, PredictionResponse,
    TaskType
)
from services.ingestion.data_profiler import DataProfiler
from services.automl.task_detector import TaskDetector
from services.automl.preprocessor import AutoMLPreprocessor
from services.automl.trainer import AutoMLTrainer
from services.automl.tuner import AutoMLTuner

router = APIRouter(prefix="/automl", tags=["automl"], dependencies=[Depends(verify_service_key)])

MODEL_STORE: Dict[str, Dict[str, Any]] = {}

@router.post("/profile", response_model=DataProfile)
def profile_data(req: ProfileRequest):
    try:
        df = pd.DataFrame(req.data)
        if df.empty:
            raise HTTPException(status_code=400, detail="Data payload cannot be empty")
        return DataProfiler.profile_dataframe(df)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/detect-task", response_model=TaskDetectionResponse)
def detect_task(req: TaskDetectionRequest):
    try:
        return TaskDetector.detect_task(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/train", response_model=TrainingJobResponse)
def train_model(req: TrainingJobRequest):
    try:
        df = pd.DataFrame(req.data)
        if df.empty:
            raise HTTPException(status_code=400, detail="Data payload is empty")

        # Step 1: Detect Task
        if req.config and req.config.task_type:
            task_type = req.config.task_type
            target_col = req.config.target_column or df.columns[-1]
        else:
            det = TaskDetector.detect_task(TaskDetectionRequest(goal_text=req.goal, columns=list(df.columns), sample_data=req.data))
            task_type = det.task_type
            target_col = det.target_column or df.columns[-1]

        if target_col not in df.columns:
            raise HTTPException(status_code=400, detail=f"Target column '{target_col}' not found in dataset")

        # Step 2: Preprocess
        is_class = task_type in [TaskType.BINARY_CLASSIFICATION, TaskType.MULTICLASS_CLASSIFICATION]
        preprocessor = AutoMLPreprocessor()
        X_proc, y_proc, info = preprocessor.fit_transform(df, target_col, is_classification=is_class)

        # Step 3: Train Model Zoo
        cv_folds = req.config.cv_folds if req.config else 5
        leaderboard, models_map = AutoMLTrainer.train_and_evaluate(task_type, X_proc, y_proc, cv_folds=cv_folds)

        if not leaderboard:
            raise HTTPException(status_code=500, detail="No candidate models trained successfully")

        best_item = leaderboard[0]

        # Step 4: Hyperparameter Tuning for Best Model
        n_trials = req.config.n_trials if req.config else 20
        best_params, best_tuned_score = AutoMLTuner.tune_model(best_item.algorithm, task_type, X_proc, y_proc, n_trials=n_trials)
        best_item.hyperparameters = best_params

        # Store model state in memory for prediction
        for item in leaderboard:
            MODEL_STORE[item.model_id] = {
                "model": models_map.get(item.model_id),
                "preprocessor": preprocessor,
                "target_column": target_col,
                "task_type": task_type,
                "feature_columns": info["feature_columns"]
            }

        return TrainingJobResponse(
            job_id=req.job_id,
            status="completed",
            progress_pct=100.0,
            current_step="completed",
            message="AutoML training completed successfully",
            best_model_id=best_item.model_id,
            leaderboard=leaderboard
        )

    except Exception as e:
        return TrainingJobResponse(
            job_id=req.job_id,
            status="failed",
            progress_pct=0.0,
            current_step="failed",
            message="Training failed",
            error=str(e)
        )

@router.post("/predict", response_model=PredictionResponse)
def predict(req: PredictionRequest):
    if req.model_id not in MODEL_STORE:
        raise HTTPException(status_code=404, detail=f"Model '{req.model_id}' not found")

    model_entry = MODEL_STORE[req.model_id]
    model = model_entry["model"]
    preprocessor: AutoMLPreprocessor = model_entry["preprocessor"]

    df = pd.DataFrame(req.data)
    X_proc = preprocessor.transform(df)

    import time
    start_t = time.time()
    raw_preds = model.predict(X_proc)
    inf_time_ms = (time.time() - start_t) * 1000

    preds = raw_preds.tolist()

    probs = None
    if req.return_probabilities and hasattr(model, 'predict_proba'):
        probs = model.predict_proba(X_proc).tolist()

    return PredictionResponse(
        model_id=req.model_id,
        predictions=preds,
        probabilities=probs,
        inference_time_ms=round(inf_time_ms, 3)
    )
