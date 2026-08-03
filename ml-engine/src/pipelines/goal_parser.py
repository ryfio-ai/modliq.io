import re
from typing import Dict, Any

def parse_goal_prompt(raw_text: str, filename: str = "demo_dataset.csv") -> Dict[str, Any]:
    text = raw_text.lower()

    # Default settings
    goal_direction = "maximize"
    if "minimize" in text or "reduce" in text or "lower" in text:
        goal_direction = "minimize"

    target = "Yield"
    if "defect" in text or "scrap" in text:
        target = "scrap_rate"
    elif "temperature" in text:
        target = "temperature"
    elif "oee" in text:
        target = "yield"

    threshold = 90.0
    match = re.search(r'(\d+(?:\.\d+)?)\s*%', text)
    if match:
        threshold = float(match.group(1))

    return {
        "template_id": "yield_optimizer",
        "target": target,
        "goal_direction": goal_direction,
        "threshold": threshold,
        "features": ["temperature", "pressure", "flow_rate", "runtime_minutes"],
        "constraints": {},
    }
