from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any

class OptimizeYieldRequest(BaseModel):
    filename: Optional[str] = Field("demo_dataset.csv", description="Dataset file name")
    template_id: Optional[str] = "yield_optimizer"
    target: str = "Yield"
    features: Optional[List[str]] = None
    goal_direction: str = "maximize"
    constraints: Optional[Dict[str, Any]] = None

class OptimizeYieldResponse(BaseModel):
    success: bool = True
    jobId: Optional[str] = None
    status: Optional[str] = "queued"
    error: Optional[str] = None
    result: Optional[Dict[str, Any]] = None
