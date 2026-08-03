from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any

class QcSummaryRequest(BaseModel):
    filename: Optional[str] = "demo_dataset.csv"
    column: str = "yield"
    lsl: Optional[float] = None
    usl: Optional[float] = None

class QcSummaryResponse(BaseModel):
    success: bool = True
    analytics: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
