import pytest
import pandas as pd
from services.automl.task_detector import TaskDetector
from services.ingestion.data_profiler import DataProfiler

def test_data_profiler():
    df = pd.DataFrame({"temp": [80.0, 85.0, 90.0], "pressure": [400.0, 420.0, 440.0]})
    profiler = DataProfiler()
    profile = profiler.profile(df)
    assert profile["row_count"] == 3
    assert profile["col_count"] == 2
    assert profile["quality_score"] > 90.0

def test_task_detection():
    df = pd.DataFrame({"temp": [80.0, 85.0, 90.0], "churn": [0, 1, 0]})
    detector = TaskDetector()
    res = detector.detect(df, goal="Predict customer churn")
    assert res["task_type"] == "classification"
    assert res["suggested_target"] == "churn"
