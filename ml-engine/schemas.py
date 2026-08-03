from pydantic import BaseModel
from typing import Optional, Any, Dict, List
from enum import Enum

class TaskType(str, Enum):
    regression     = "regression"
    classification = "classification"
    clustering     = "clustering"
    timeseries     = "timeseries"

class TrainingJobRequest(BaseModel):
    dataset_path:     str
    target_column:    str
    features:         List[str]
    task_type:        TaskType = TaskType.regression
    objective:        str = "maximize"
    threshold:        Optional[float] = None
    constraints:      Optional[Dict[str, Any]] = None
    random_seed:      int = 42
    max_trials:       int = 30
    monthly_volume:   int = 100000
    unit_value:       float = 75.0
    is_demo:          bool = False

class TrainedModelResult(BaseModel):
    algorithm:    str
    metrics:      Dict[str, Any]
    hyperparams:  Dict[str, Any]
    is_winner:    bool

class OptimizationResult(BaseModel):
    job_id:                str
    recommended_settings:  Dict[str, float]
    recommended_range:     Dict[str, List[float]]
    expected_outcome:      float
    current_outcome:       float
    threshold_met:         bool
    confidence_score:      float
    roi:                   Dict[str, Any]
    summary:               str
    drivers:               List[Dict[str, Any]]
    chart_data:            Dict[str, Any]
    units:                 Dict[str, str] = {}
    advanced:              Dict[str, Any]
    is_demo_fallback:      bool = False
