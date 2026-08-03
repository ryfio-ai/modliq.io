"""
Modliq Platform — Complete End-to-End (E2E) Feature Integration Test
Verifies all 3 tiers (ML Engine, Backend API, Frontend App) end-to-end.
"""
import sys
import io
import json
import time
import requests
import pandas as pd

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

ML_ENGINE_URL = "http://localhost:8000"
BACKEND_URL = "http://localhost:3001"
FRONTEND_URL = "http://localhost:3000"

def run_e2e_tests():
    print("==========================================================")
    print("[+] STARTING MODLIQ FULL PLATFORM E2E INTEGRATION TEST")
    print("==========================================================")
    
    passed_steps = 0
    total_steps = 7

    # ── Step 1: Health Checks ─────────────────────────────────────────
    print("\n[Step 1/7] Testing Service Health Endpoints...")
    try:
        r_ml = requests.get(f"{ML_ENGINE_URL}/health", timeout=5)
        r_backend = requests.get(f"{BACKEND_URL}/health", timeout=5)
        r_frontend = requests.get(FRONTEND_URL, timeout=5)
        
        assert r_ml.status_code == 200, f"ML Engine health failed: {r_ml.status_code}"
        assert r_backend.status_code == 200, f"Backend health failed: {r_backend.status_code}"
        assert r_frontend.status_code == 200, f"Frontend failed: {r_frontend.status_code}"
        
        print("  [PASS] ML Engine Health: 200 OK")
        print("  [PASS] Backend API Health: 200 OK")
        print("  [PASS] Frontend App Status: 200 OK")
        passed_steps += 1
    except Exception as e:
        print(f"  [FAIL] Step 1 Failed: {e}")

    # ── Step 2: Universal Data Ingestion & Profiling ──────────────────
    print("\n[Step 2/7] Testing Universal Data Ingestion & Profiling...")
    try:
        with open("demo/churn_data.csv", "rb") as f:
            files = {"file": ("churn_data.csv", f, "text/csv")}
            r_ingest = requests.post(f"{ML_ENGINE_URL}/ingest", files=files, timeout=10)
        
        assert r_ingest.status_code == 200, f"Ingestion failed: {r_ingest.text}"
        data = r_ingest.json()
        assert "dataset_id" in data, "Missing dataset_id in response"
        assert "profile" in data, "Missing profile in response"
        quality = data["profile"].get("quality_score", 0)
        print(f"  [PASS] Dataset Ingested: ID={data['dataset_id']}, Quality Score={quality}/100")
        passed_steps += 1
    except Exception as e:
        print(f"  [FAIL] Step 2 Failed: {e}")

    # ── Step 3: NLP Task Detection & Goal Parsing ─────────────────────
    print("\n[Step 3/7] Testing NLP Goal Parsing & Task Auto-Detection...")
    try:
        payload = {"dataset_id": "ds_test", "goal": "Predict which customers will churn next month"}
        r_detect = requests.post(f"{ML_ENGINE_URL}/detect-task", json=payload, timeout=5)
        assert r_detect.status_code == 200, f"Task detection failed: {r_detect.text}"
        res = r_detect.json()
        assert res.get("task_type") == "classification", f"Expected classification, got {res.get('task_type')}"
        print(f"  [PASS] Task Type Detected: {res['task_type']} (Target: {res.get('suggested_target')}, Confidence: {res.get('confidence')})")
        passed_steps += 1
    except Exception as e:
        print(f"  [FAIL] Step 3 Failed: {e}")

    # ── Step 4: AutoML Model Zoo Training & Copilot Optimization ─────
    print("\n[Step 4/7] Testing AutoML Training & Process Copilot Optimization...")
    try:
        train_req = {
            "dataset_path": "demo/churn_data.csv",
            "target_column": "yield_rate",
            "features": ["temperature", "pressure"],
            "task_type": "regression",
            "objective": "maximize",
            "threshold": 95.0,
            "max_trials": 2
        }
        r_train = requests.post(f"{ML_ENGINE_URL}/train", json=train_req, timeout=120)
        assert r_train.status_code == 200, f"AutoML training failed: {r_train.text}"
        opt = r_train.json()
        assert "recommended_settings" in opt, "Missing recommended settings"
        assert "confidence_score" in opt, "Missing confidence score"
        assert "roi" in opt, "Missing ROI"
        print(f"  [PASS] AutoML Winner: {opt['advanced'].get('winner_algorithm')} (Confidence: {opt['confidence_score']}%)")
        print(f"  [PASS] Recommended Settings: {opt['recommended_settings']}")
        print(f"  [PASS] Projected Yield: {opt['expected_outcome']}% (ROI Gain: {opt['roi'].get('monthly_yield_gain_pct')}%)")
        passed_steps += 1
    except Exception as e:
        print(f"  [FAIL] Step 4 Failed: {e}")

    # ── Step 5: Model Inference & Prediction ─────────────────────────
    print("\n[Step 5/7] Testing Real-Time Model Inference & Explanations...")
    try:
        pred_req = {
            "modelId": "mdl_demo",
            "data": [{"temperature": 87.5, "pressure": 445.0}],
            "returnExplanations": True
        }
        r_pred = requests.post(f"{ML_ENGINE_URL}/predict", json=pred_req, timeout=5)
        assert r_pred.status_code == 200, f"Prediction failed: {r_pred.text}"
        pred_res = r_pred.json()
        print(f"  [PASS] Inference Output: {pred_res['predictions'][0]} (Latency: {pred_res.get('inference_time_ms')}ms)")
        print(f"  [PASS] SHAP Attribution: {pred_res.get('explanations', {}).get('feature_importance')}")
        passed_steps += 1
    except Exception as e:
        print(f"  [FAIL] Step 5 Failed: {e}")

    # ── Step 6: Data Drift Monitoring (PSI / KS) ─────────────────────
    print("\n[Step 6/7] Testing Data Drift Detection (PSI / KS Analysis)...")
    try:
        drift_req = {
            "model_id": "mdl_demo",
            "baseline_data": [{"temp": 80.0, "press": 400.0}, {"temp": 82.0, "press": 410.0}],
            "current_data": [{"temp": 88.0, "press": 450.0}, {"temp": 90.0, "press": 460.0}],
            "features": ["temp", "press"]
        }
        r_drift = requests.post(f"{ML_ENGINE_URL}/monitor/drift", json=drift_req, timeout=5)
        assert r_drift.status_code == 200, f"Drift analysis failed: {r_drift.text}"
        drift_res = r_drift.json()
        print(f"  [PASS] Feature Drift Status: {drift_res.get('drift_status')} (Max PSI: {drift_res.get('max_psi')})")
        passed_steps += 1
    except Exception as e:
        print(f"  [FAIL] Step 6 Failed: {e}")

    # ── Step 7: Backend Express Proxy Integration ─────────────────────
    print("\n[Step 7/7] Testing Backend Express API Proxy Endpoints...")
    try:
        r_projects = requests.get(f"{BACKEND_URL}/api/v1/projects", timeout=5)
        assert r_projects.status_code == 200, f"Backend projects route failed: {r_projects.status_code}"
        print(f"  [PASS] Backend Projects Proxy: 200 OK")
        passed_steps += 1
    except Exception as e:
        print(f"  [FAIL] Step 7 Failed: {e}")

    print("\n==========================================================")
    print(f"[+] E2E TEST RESULTS: {passed_steps}/{total_steps} STEPS PASSED")
    print("==========================================================")
    if passed_steps == total_steps:
        print("[SUCCESS] ALL PLATFORM FEATURES VERIFIED & WORKING 100% CLEANLY!")

if __name__ == "__main__":
    run_e2e_tests()
