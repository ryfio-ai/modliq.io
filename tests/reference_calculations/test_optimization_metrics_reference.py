import pytest
import numpy as np

def calculate_ml_metrics_reference(y_true, y_pred):
    """
    R^2 = 1 - (SS_res / SS_tot)
    RMSE = sqrt(mean((y_true - y_pred)^2))
    MAE = mean(abs(y_true - y_pred))
    """
    y_true_arr = np.array(y_true, dtype=float)
    y_pred_arr = np.array(y_pred, dtype=float)
    
    ss_res = np.sum((y_true_arr - y_pred_arr) ** 2)
    ss_tot = np.sum((y_true_arr - np.mean(y_true_arr)) ** 2)
    
    r2 = 1.0 - (ss_res / ss_tot) if ss_tot > 0 else 0.0
    rmse = np.sqrt(np.mean((y_true_arr - y_pred_arr) ** 2))
    mae = np.mean(np.abs(y_true_arr - y_pred_arr))
    
    return {
        "r2": r2,
        "rmse": rmse,
        "mae": mae
    }


class TestOptimizationMetricsReference:
    def test_perfect_fit_metrics(self):
        y = [10.0, 20.0, 30.0, 40.0, 50.0]
        y_hat = [10.0, 20.0, 30.0, 40.0, 50.0]
        res = calculate_ml_metrics_reference(y, y_hat)
        
        assert abs(res["r2"] - 1.0) < 1e-6
        assert abs(res["rmse"] - 0.0) < 1e-6
        assert abs(res["mae"] - 0.0) < 1e-6

    def test_noisy_fit_metrics(self):
        y = [10.0, 20.0, 30.0, 40.0, 50.0]
        y_hat = [11.0, 19.0, 31.0, 39.0, 51.0]
        res = calculate_ml_metrics_reference(y, y_hat)
        
        assert res["r2"] > 0.90
        assert res["rmse"] == 1.0
        assert res["mae"] == 1.0
