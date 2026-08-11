import pytest
import numpy as np
import pandas as pd

def calculate_dataset_health_reference(df, target_col=None):
    total_rows = len(df)
    total_cols = len(df.columns)
    
    if total_rows == 0:
        return {"health_score": 0, "missing_pct": 100.0, "duplicate_count": 0}
    
    missing_cells = df.isnull().sum().sum()
    total_cells = total_rows * total_cols
    missing_pct = (missing_cells / total_cells) * 100.0
    
    duplicate_count = df.duplicated().sum()
    
    # Penalties
    missing_penalty = min(40, missing_pct * 2)
    duplicate_penalty = min(20, (duplicate_count / total_rows) * 100)
    
    health_score = max(0, min(100, int(100 - missing_penalty - duplicate_penalty)))
    
    # Statistical Outliers (IQR method)
    numeric_df = df.select_dtypes(include=[np.number])
    iqr_outliers = 0
    z_outliers = 0
    
    for col in numeric_df.columns:
        series = numeric_df[col].dropna()
        if len(series) > 0:
            q1 = series.quantile(0.25)
            q3 = series.quantile(0.75)
            iqr = q3 - q1
            iqr_outliers += int(((series < (q1 - 1.5 * iqr)) | (series > (q3 + 1.5 * iqr))).sum())
            
            std_val = series.std()
            if std_val > 0:
                z_scores = np.abs((series - series.mean()) / std_val)
                z_outliers += int((z_scores > 3.0).sum())
                
    return {
        "health_score": health_score,
        "missing_pct": missing_pct,
        "duplicate_count": duplicate_count,
        "iqr_outliers": iqr_outliers,
        "z_outliers": z_outliers
    }


class TestDatasetHealthReference:
    def test_clean_dataset_health(self):
        data = {
            "temp": [80.1, 82.3, 81.0, 80.5, 81.8],
            "pressure": [1.2, 1.3, 1.25, 1.21, 1.28],
            "yield": [98.1, 98.4, 98.2, 98.0, 98.5]
        }
        df = pd.DataFrame(data)
        res = calculate_dataset_health_reference(df)
        
        assert res["health_score"] == 100
        assert res["missing_pct"] == 0.0
        assert res["duplicate_count"] == 0
        assert res["iqr_outliers"] == 0

    def test_messy_dataset_with_outliers(self):
        data = {
            "temp": [80.1, 82.3, np.nan, 80.5, 500.0], # 500.0 is an outlier
            "pressure": [1.2, 1.3, 1.25, 1.21, 1.28],
            "yield": [98.1, 98.4, 98.2, 98.0, 98.5]
        }
        df = pd.DataFrame(data)
        res = calculate_dataset_health_reference(df)
        
        assert res["missing_pct"] > 0
        assert res["health_score"] < 100
        assert res["iqr_outliers"] >= 1
