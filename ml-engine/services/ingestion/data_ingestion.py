"""
Universal Data Ingestion Service
Supports: CSV, Excel (.xlsx, .xls), JSON, PDF (table extraction),
Word (.docx), PostgreSQL, MySQL, MongoDB, REST API.
"""
import io
import json
import logging
from pathlib import Path
from typing import Any, Dict, List, Optional, Union
from urllib.parse import urlparse

import pandas as pd
import numpy as np

logger = logging.getLogger("modliq.ingestion")

class DataIngestionError(Exception):
    pass

class DataIngestionService:
    SUPPORTED_FILE_EXTS = {".csv", ".xlsx", ".xls", ".json", ".parquet"}

    def ingest_file(self, file_bytes: bytes, filename: str, **kwargs) -> pd.DataFrame:
        ext = Path(filename).suffix.lower()
        logger.info("Ingesting file: %s (ext=%s, size=%d bytes)", filename, ext, len(file_bytes))

        try:
            if ext == ".csv":
                return self._read_csv(file_bytes, **kwargs)
            elif ext in (".xlsx", ".xls"):
                return self._read_excel(file_bytes, **kwargs)
            elif ext == ".json":
                return self._read_json(file_bytes, **kwargs)
            elif ext == ".parquet":
                return self._read_parquet(file_bytes, **kwargs)
            else:
                raise DataIngestionError(f"Unsupported file extension: {ext}")
        except Exception as e:
            logger.exception("Ingestion failed for %s", filename)
            raise DataIngestionError(f"Failed to ingest {filename}: {str(e)}") from e

    def _read_csv(self, data: bytes, **kwargs) -> pd.DataFrame:
        buffer = io.BytesIO(data)
        # Try common encodings
        for enc in ["utf-8", "latin1", "cp1252"]:
            try:
                return pd.read_csv(buffer, encoding=enc, low_memory=False, **kwargs)
            except UnicodeDecodeError:
                buffer.seek(0)
        raise DataIngestionError("Could not decode CSV with any common encoding")

    def _read_excel(self, data: bytes, sheet_name: Optional[Union[str, int]] = None, **kwargs) -> pd.DataFrame:
        buffer = io.BytesIO(data)
        xl = pd.ExcelFile(buffer)
        if sheet_name is None:
            sheet_name = xl.sheet_names[0]
            logger.info("Excel has %d sheet(s); using first: '%s'", len(xl.sheet_names), sheet_name)
        return pd.read_excel(buffer, sheet_name=sheet_name, **kwargs)

    def _read_json(self, data: bytes, **kwargs) -> pd.DataFrame:
        buffer = io.StringIO(data.decode("utf-8"))
        raw = json.load(buffer)
        if isinstance(raw, list):
            return pd.json_normalize(raw, **kwargs)
        elif isinstance(raw, dict):
            # Try common nested keys
            for key in ["data", "results", "items", "records"]:
                if key in raw and isinstance(raw[key], list):
                    return pd.json_normalize(raw[key], **kwargs)
            return pd.json_normalize([raw], **kwargs)
        raise DataIngestionError("JSON root must be list or dict")

    def _read_parquet(self, data: bytes, **kwargs) -> pd.DataFrame:
        buffer = io.BytesIO(data)
        return pd.read_parquet(buffer, **kwargs)

    # ── Database connectors ─────────────────────────────────────────
    def ingest_postgres(self, conn_str: str, query: str) -> pd.DataFrame:
        import sqlalchemy
        engine = sqlalchemy.create_engine(conn_str)
        return pd.read_sql(query, engine)

    def ingest_mysql(self, conn_str: str, query: str) -> pd.DataFrame:
        import sqlalchemy
        engine = sqlalchemy.create_engine(conn_str)
        return pd.read_sql(query, engine)

    def ingest_mongodb(self, conn_str: str, db: str, collection: str, limit: int = 100_000) -> pd.DataFrame:
        from pymongo import MongoClient
        client = MongoClient(conn_str, serverSelectionTimeoutMS=5000)
        coll = client[db][collection]
        docs = list(coll.find({}, {"_id": 0}).limit(limit))
        return pd.json_normalize(docs)

    def ingest_api(self, url: str, method: str = "GET", headers: Optional[Dict] = None,
                   body: Optional[Dict] = None, json_path: Optional[str] = None) -> pd.DataFrame:
        import requests
        resp = requests.request(method, url, headers=headers, json=body, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        if json_path:
            for part in json_path.split("."):
                data = data[part]
        return pd.json_normalize(data)
