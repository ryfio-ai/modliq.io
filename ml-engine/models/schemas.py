from typing import List, Dict, Any, Optional, Union
from enum import Enum
from pydantic import BaseModel, Field

class TaskType(str, Enum):
    BINARY_CLASSIFICATION = "binary_classification"
    MULTICLASS_CLASSIFICATION = "multiclass_classification"
    REGRESSION = "regression"
    CLUSTERING = "clustering"
    TIME_SERIES = "time_series"

class ColumnType(str, Enum):
    NUMERIC = "numeric"
    CATEGORICAL = "categorical"
    DATETIME = "datetime"
    TEXT = "text"
    BOOLEAN = "boolean"
    ID = "id"

class MetricType(str, Enum):
    ACCURACY = "accuracy"
    F1 = "f1"
    PRECISION = "precision"
    RECALL = "recall"
    ROC_AUC = "roc_auc"
    R2 = "r2"
    RMSE = "rmse"
    MAE = "mae"
    SILHOUETTE = "silhouette"

class ColumnProfile(BaseModel):
    name: str
    data_type: ColumnType
    missing_count: int
    missing_pct: float
    unique_count: int
    sample_values: List[Any] = []
    min_val: Optional[float] = None
    max_val: Optional[float] = None
    mean_val: Optional[float] = None
    std_val: Optional[float] = None

class DataProfile(BaseModel):
    row_count: int
    col_count: int
    quality_score: float = Field(..., ge=0, le=100)
    columns: List[ColumnProfile]
    duplicate_rows: int = 0
    missing_total_pct: float = 0.0

class ProfileRequest(BaseModel):
    data: List[Dict[str, Any]]

class TaskDetectionRequest(BaseModel):
    goal_text: str
    columns: List[str]
    sample_data: Optional[List[Dict[str, Any]]] = None

class TaskDetectionResponse(BaseModel):
    task_type: TaskType
    target_column: Optional[str] = None
    confidence: float
    reasoning: str
    suggested_metrics: List[MetricType]

class TrainingConfig(BaseModel):
    task_type: Optional[TaskType] = None
    target_column: Optional[str] = None
    test_size: float = Field(default=0.2, ge=0.05, le=0.5)
    cv_folds: int = Field(default=5, ge=2, le=10)
    n_trials: int = Field(default=30, ge=5, le=200)
    max_training_time_min: int = Field(default=10, ge=1, le=120)

class TrainingJobRequest(BaseModel):
    job_id: str
    dataset_id: str
    goal: str
    data: List[Dict[str, Any]]
    config: Optional[TrainingConfig] = None

class ModelMetrics(BaseModel):
    accuracy: Optional[float] = None
    f1_score: Optional[float] = None
    precision: Optional[float] = None
    recall: Optional[float] = None
    roc_auc: Optional[float] = None
    r2: Optional[float] = None
    rmse: Optional[float] = None
    mae: Optional[float] = None
    silhouette: Optional[float] = None
    cv_mean: float
    cv_std: float
    training_time_sec: float
    inference_time_ms: float

class LeaderboardItem(BaseModel):
    model_id: str
    name: str
    algorithm: str
    task_type: TaskType
    metrics: ModelMetrics
    feature_importance: Optional[Dict[str, float]] = None
    hyperparameters: Optional[Dict[str, Any]] = None
    is_best: bool = False

class TrainingJobResponse(BaseModel):
    job_id: str
    status: str
    progress_pct: float
    current_step: str
    message: str
    best_model_id: Optional[str] = None
    leaderboard: List[LeaderboardItem] = []
    error: Optional[str] = None

class PredictionRequest(BaseModel):
    model_id: str
    data: List[Dict[str, Any]]
    return_explanations: bool = False
    return_probabilities: bool = False

class PredictionResponse(BaseModel):
    model_id: str
    predictions: List[Any]
    probabilities: Optional[List[List[float]]] = None
    explanations: Optional[List[Dict[str, float]]] = None
    inference_time_ms: float
