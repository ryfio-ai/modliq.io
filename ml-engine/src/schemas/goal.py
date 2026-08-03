from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any

class GoalParseRequest(BaseModel):
    raw_text: str = Field(..., description="Natural language optimization target")
    filename: Optional[str] = Field("demo_dataset.csv", description="Target dataset name")

class GoalIntent(BaseModel):
    template_id: str = "yield_optimizer"
    target: str = "Yield"
    goal_direction: str = "maximize"
    threshold: Optional[float] = 90.0
    features: List[str] = ["Temperature", "Pressure", "FlowRate", "Speed"]
    constraints: Dict[str, Any] = {}

class GoalParseResponse(BaseModel):
    success: bool = True
    intent: GoalIntent
    error: Optional[str] = None
