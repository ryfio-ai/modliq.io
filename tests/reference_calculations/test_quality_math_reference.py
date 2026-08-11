import pytest
import numpy as np

def calculate_spc_imr(values):
    """
    Calculates SPC Individuals and Moving Range (I-MR) control limits.
    For d2 = 1.128 (n=2 moving range sample size):
    Upper Control Limit (UCL) = Mean + 3 * (MR_bar / 1.128) = Mean + 2.66 * MR_bar
    Lower Control Limit (LCL) = Mean - 3 * (MR_bar / 1.128) = Mean - 2.66 * MR_bar
    """
    data = np.array(values, dtype=float)
    mean_val = np.mean(data)
    moving_ranges = np.abs(np.diff(data))
    mr_bar = np.mean(moving_ranges) if len(moving_ranges) > 0 else 0.0
    
    sigma_est = mr_bar / 1.128 if mr_bar > 0 else (np.std(data, ddof=1) if len(data) > 1 else 1e-6)
    ucl = mean_val + 3 * sigma_est
    lcl = mean_val - 3 * sigma_est
    
    return {
        "mean": mean_val,
        "mr_bar": mr_bar,
        "sigma_est": sigma_est,
        "ucl": ucl,
        "lcl": lcl
    }

def calculate_cp_cpk(values, lsl, usl):
    """
    Calculates Process Capability Cp and Cpk:
    Cp = (USL - LSL) / (6 * sigma)
    Cpu = (USL - mean) / (3 * sigma)
    Cpl = (mean - LSL) / (3 * sigma)
    Cpk = min(Cpu, Cpl)
    """
    data = np.array(values, dtype=float)
    mean_val = np.mean(data)
    sigma_val = np.std(data, ddof=1) if len(data) > 1 else 1e-6
    
    cp = (usl - lsl) / (6 * sigma_val) if sigma_val > 0 else 0.0
    cpu = (usl - mean_val) / (3 * sigma_val) if sigma_val > 0 else 0.0
    cpl = (mean_val - lsl) / (3 * sigma_val) if sigma_val > 0 else 0.0
    cpk = min(cpu, cpl)
    
    return {
        "cp": cp,
        "cpk": cpk,
        "cpu": cpu,
        "cpl": cpl,
        "mean": mean_val,
        "sigma": sigma_val
    }

def calculate_aql_sample_size(lot_size, inspection_level="II"):
    """
    AQL Sample size lookup logic based on ISO 2859-1 / ANSI/ASQ Z1.4 General Inspection Level II.
    """
    if lot_size <= 8:
        return 2
    elif lot_size <= 15:
        return 3
    elif lot_size <= 25:
        return 5
    elif lot_size <= 50:
        return 8
    elif lot_size <= 90:
        return 13
    elif lot_size <= 150:
        return 20
    elif lot_size <= 280:
        return 32
    elif lot_size <= 500:
        return 50
    elif lot_size <= 1200:
        return 80
    elif lot_size <= 3200:
        return 125
    elif lot_size <= 10000:
        return 200
    else:
        return 315


class TestQualityMathReference:
    def test_spc_imr_control_limits(self):
        sample_data = [98.2, 98.5, 98.1, 98.8, 98.4, 98.6, 98.3, 98.7, 98.5, 98.4]
        res = calculate_spc_imr(sample_data)
        
        assert abs(res["mean"] - 98.45) < 1e-6
        assert res["mr_bar"] > 0
        assert res["ucl"] > res["mean"]
        assert res["lcl"] < res["mean"]
        assert abs(res["ucl"] - (res["mean"] + 3 * res["sigma_est"])) < 1e-6

    def test_cp_cpk_capabilities(self):
        sample_data = [98.2, 98.5, 98.1, 98.8, 98.4, 98.6, 98.3, 98.7, 98.5, 98.4]
        lsl, usl = 96.0, 100.0
        res = calculate_cp_cpk(sample_data, lsl, usl)
        
        assert res["cp"] > 1.0  # Process is capable
        assert res["cpk"] > 1.0
        assert res["cpk"] <= res["cp"]  # Cpk is bounded by Cp

    def test_aql_sample_size(self):
        assert calculate_aql_sample_size(10) == 3
        assert calculate_aql_sample_size(100) == 20
        assert calculate_aql_sample_size(1000) == 80
        assert calculate_aql_sample_size(50000) == 315
