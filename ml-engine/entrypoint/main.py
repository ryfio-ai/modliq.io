from fastapi import FastAPI, Depends, Header, HTTPException
from pathlib import Path
import sys

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from main import app
from src.schemas.ingestion import ExtractDocumentRequest, ExtractDocumentResponse
from src.pipelines.document_extractor import extract_document_data
from dependencies import verify_service_key

@app.post("/extract-document", response_model=ExtractDocumentResponse, dependencies=[Depends(verify_service_key)])
def extract_document(req: ExtractDocumentRequest):
    res = extract_document_data(req.filename, req.fileType, req.fileContentBase64)
    return res

__all__ = ["app"]
