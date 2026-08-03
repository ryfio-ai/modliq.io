import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))

from src.pipelines.qc_statistics import calculate_spc_metrics

def test_spc_metrics_calculation():
    data = [10.0, 10.2, 9.8, 10.1, 10.3, 9.9, 10.0, 10.1, 9.7, 10.2]
    res = calculate_spc_metrics(data, lsl=9.0, usl=11.0)

    assert res["count"] == 10
    assert res["mean"] == 10.03
    assert res["cp"] is not None
    assert res["cpk"] is not None
    assert "control_limits" in res
    assert len(res["points"]) == 10

if __name__ == "__main__":
    test_spc_metrics_calculation()
    print("test_spc_metrics_calculation passed!")
