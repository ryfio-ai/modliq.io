import pytest

def calculate_oee_components(planned_time_min, downtime_min, total_pieces, good_pieces, ideal_run_rate_per_min):
    """
    Independent OEE reference calculations:
    Operating Time = Planned Time - Downtime
    Availability = Operating Time / Planned Time
    Performance = (Total Pieces / Operating Time) / Ideal Run Rate
    Quality Rate = Good Pieces / Total Pieces
    OEE = Availability * Performance * Quality
    """
    operating_time = max(0.0, planned_time_min - downtime_min)
    availability = operating_time / planned_time_min if planned_time_min > 0 else 0.0
    
    actual_run_rate = (total_pieces / operating_time) if operating_time > 0 else 0.0
    performance = min(1.0, actual_run_rate / ideal_run_rate_per_min) if ideal_run_rate_per_min > 0 else 0.0
    
    quality = (good_pieces / total_pieces) if total_pieces > 0 else 0.0
    scrap_rate = 1.0 - quality
    
    oee = availability * performance * quality
    
    return {
        "operating_time": operating_time,
        "availability": availability,
        "performance": performance,
        "quality": quality,
        "scrap_rate": scrap_rate,
        "oee": oee
    }

def calculate_roi_estimate(delta_yield_pct, annual_batch_units, price_per_unit_inr):
    """
    Calculates estimated ROI in INR:
    Annual Value Addition = (delta_yield / 100) * annual_batch_units * price_per_unit_inr
    """
    annual_value_inr = (delta_yield_pct / 100.0) * annual_batch_units * price_per_unit_inr
    return annual_value_inr


class TestOEEReference:
    def test_oee_calculation(self):
        res = calculate_oee_components(
            planned_time_min=480.0,
            downtime_min=48.0,       # Operating = 432 min (Availability = 0.90)
            total_pieces=4320,       # Actual Rate = 10 pcs/min
            good_pieces=4233,        # Scrap = 87 pcs (Quality = 0.98)
            ideal_run_rate_per_min=10.0 # Performance = 1.0
        )
        
        assert abs(res["availability"] - 0.90) < 1e-4
        assert abs(res["performance"] - 1.00) < 1e-4
        assert abs(res["quality"] - 0.97986) < 1e-4
        assert abs(res["oee"] - (0.90 * 1.00 * 0.97986)) < 1e-4
        assert abs(res["scrap_rate"] - (1.0 - 0.97986)) < 1e-4

    def test_roi_estimate_inr(self):
        # 2.5% yield gain on 100,000 units at ₹500/unit = ₹1,250,000
        roi = calculate_roi_estimate(delta_yield_pct=2.5, annual_batch_units=100000, price_per_unit_inr=500.0)
        assert abs(roi - 1250000.0) < 1e-4
