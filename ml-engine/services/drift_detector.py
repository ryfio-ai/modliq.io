import os
import requests
import logging
import numpy as np
import pandas as pd
from scipy.stats import ks_2samp
from typing import Dict, Any, List

logger = logging.getLogger("modliq.drift")

def send_slack_drift_alert(model_id: str, feature: str, psi_score: float):
    webhook_url = os.getenv("SLACK_WEBHOOK_URL")
    if not webhook_url:
        logger.info("SLACK_WEBHOOK_URL not configured. Skipping Slack alert.")
        return

    payload = {
        "text": f"⚠️ *MODLIQ DRIFT ALERT*: Feature drift detected in model `{model_id}`!",
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*MODLIQ DATA DRIFT ALERT*\nModel `{model_id}` feature *`{feature}`* PSI score is *{psi_score:.3f}* (Threshold: > 0.20)."
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {"type": "plain_text", "text": "Open Monitoring Dashboard"},
                        "url": os.getenv("CLIENT_ORIGIN", "http://localhost:3000") + "/results"
                    }
                ]
            }
        ]
    }

    try:
        r = requests.post(webhook_url, json=payload, timeout=5)
        logger.info("Slack alert sent for %s: %d", feature, r.status_code)
    except Exception as e:
        logger.error("Failed to send Slack webhook alert: %s", e)

def calculate_psi(baseline: np.ndarray, current: np.ndarray, num_buckets: int = 10) -> float:
    """Calculates Population Stability Index (PSI) between baseline and current data distributions."""
    try:
        baseline = baseline[~np.isnan(baseline)]
        current = current[~np.isnan(current)]
        
        if len(baseline) == 0 or len(current) == 0:
            return 0.0

        percentiles = np.linspace(0, 100, num_buckets + 1)
        buckets = np.percentile(baseline, percentiles)
        buckets[0] = -np.inf
        buckets[-1] = np.inf

        baseline_counts = np.histogram(baseline, bins=buckets)[0]
        current_counts = np.histogram(current, bins=buckets)[0]

        baseline_pct = np.maximum(baseline_counts / len(baseline), 1e-4)
        current_pct = np.maximum(current_counts / len(current), 1e-4)

        psi_val = np.sum((current_pct - baseline_pct) * np.log(current_pct / baseline_pct))
        return float(psi_val)
    except Exception:
        return 0.0

def detect_feature_drift(baseline_df: pd.DataFrame, current_df: pd.DataFrame, features: List[str], model_id: str = "mdl_demo") -> Dict[str, Any]:
    """Computes drift metrics (PSI, KS statistic, p-value) across all numerical feature columns."""
    drift_report = {}
    overall_drift_detected = False

    for col in features:
        if col in baseline_df.columns and col in current_df.columns:
            if pd.api.types.is_numeric_dtype(baseline_df[col]):
                base_vals = baseline_df[col].dropna().values
                curr_vals = current_df[col].dropna().values

                psi = calculate_psi(base_vals, curr_vals)
                ks_stat, p_value = ks_2samp(base_vals, curr_vals) if len(base_vals) > 0 and len(curr_vals) > 0 else (0.0, 1.0)

                drift_status = "significant_drift" if (psi > 0.20 or p_value < 0.01) else ("moderate_drift" if psi > 0.1 else "stable")
                if drift_status == "significant_drift":
                    overall_drift_detected = True
                    send_slack_drift_alert(model_id, col, psi)

                drift_report[col] = {
                    "psi": round(psi, 4),
                    "ks_stat": round(float(ks_stat), 4),
                    "p_value": round(float(p_value), 4),
                    "status": drift_status
                }

    return {
        "overall_drift_detected": overall_drift_detected,
        "feature_metrics": drift_report
    }
