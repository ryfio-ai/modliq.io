from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any

class ExtractDocumentRequest(BaseModel):
    filename: str = Field(..., description="Document file name")
    fileType: str = Field(..., description="pdf or docx")
    fileContentBase64: str = Field(..., description="Base64 encoded file content")

class DocumentTable(BaseModel):
    index: int
    columns: List[str]
    rows: List[Dict[str, Any]]
    confidence: float = 0.85

class ExtractDocumentResponse(BaseModel):
    success: bool = True
    textPreview: Optional[str] = None
    tables: List[DocumentTable] = []
    warnings: List[str] = []
    error: Optional[str] = None
