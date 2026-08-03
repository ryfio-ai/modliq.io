"""
Model Artifact Storage — local filesystem with S3/MinIO compatible object storage support.
"""
import os
import shutil
import hashlib
import io
from pathlib import Path
from typing import Optional, Any
import joblib
import logging

logger = logging.getLogger("modliq.storage")

class ModelStorage:
    def __init__(self, base_path: str = "./model_artifacts"):
        self.base_path = Path(base_path)
        self.base_path.mkdir(parents=True, exist_ok=True)
        self.backend = os.getenv("STORAGE_BACKEND", "local")
        self.minio_key = os.getenv("MINIO_LICENSE_KEY", os.getenv("MINIO_MODEL_KEY", ""))
        self.s3_client = None

        if self.backend == "s3" or self.minio_key:
            try:
                import boto3
                self.s3_client = boto3.client(
                    "s3",
                    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID", "minioadmin"),
                    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY", "minioadmin"),
                    region_name=os.getenv("AWS_REGION", "us-east-1"),
                    endpoint_url=os.getenv("MINIO_ENDPOINT", os.getenv("S3_ENDPOINT_URL", "https://play.min.io")),
                )
                self.bucket = os.getenv("S3_BUCKET_NAME", "modliq-model-artifacts")
                logger.info("MinIO / S3 Storage initialized (Bucket: %s)", self.bucket)
            except Exception as e:
                logger.warning("Failed to initialize boto3 S3 client: %s. Falling back to local filesystem.", e)

    def _model_dir(self, model_id: str) -> Path:
        safe_id = hashlib.sha256(model_id.encode()).hexdigest()[:16]
        return self.base_path / safe_id

    def save_artifact(self, model_id: str, filename: str, data: bytes) -> str:
        if self.s3_client:
            try:
                key = f"models/{model_id}/{filename}"
                self.s3_client.put_object(Bucket=self.bucket, Key=key, Body=data)
                logger.info("Saved MinIO S3 artifact: s3://%s/%s", self.bucket, key)
                return f"s3://{self.bucket}/{key}"
            except Exception as e:
                logger.error("MinIO save failed: %s. Saving to local disk fallback.", e)

        model_dir = self._model_dir(model_id)
        model_dir.mkdir(parents=True, exist_ok=True)
        filepath = model_dir / filename
        filepath.write_bytes(data)
        logger.info("Saved artifact %s for model %s", filename, model_id)
        return str(filepath)

    def load_artifact(self, model_id: str, filename: str) -> Optional[bytes]:
        if self.s3_client:
            try:
                key = f"models/{model_id}/{filename}"
                obj = self.s3_client.get_object(Bucket=self.bucket, Key=key)
                return obj["Body"].read()
            except Exception:
                pass

        filepath = self._model_dir(model_id) / filename
        if filepath.exists():
            return filepath.read_bytes()
        return None

    def artifact_path(self, model_id: str, filename: str) -> Path:
        return self._model_dir(model_id) / filename

    def save_model(self, model_id: str, model_artifact: Any) -> str:
        buffer = io.BytesIO()
        joblib.dump(model_artifact, buffer)
        data = buffer.getvalue()

        if self.s3_client:
            try:
                key = f"models/{model_id}/model.joblib"
                self.s3_client.put_object(Bucket=self.bucket, Key=key, Body=data)
                logger.info("Saved model binary to MinIO S3: s3://%s/%s", self.bucket, key)
            except Exception as e:
                logger.error("MinIO model save failed: %s", e)

        filepath = self.artifact_path(model_id, "model.joblib")
        filepath.parent.mkdir(parents=True, exist_ok=True)
        filepath.write_bytes(data)
        return str(filepath)

    def load_model(self, model_id: str) -> Any:
        if self.s3_client:
            try:
                key = f"models/{model_id}/model.joblib"
                obj = self.s3_client.get_object(Bucket=self.bucket, Key=key)
                data = obj["Body"].read()
                return joblib.load(io.BytesIO(data))
            except Exception:
                pass

        filepath = self.artifact_path(model_id, "model.joblib")
        if not filepath.exists():
            raise FileNotFoundError(f"Model artifact {model_id} not found at {filepath}")
        return joblib.load(str(filepath))

    def delete_model(self, model_id: str) -> bool:
        if self.s3_client:
            try:
                key = f"models/{model_id}/model.joblib"
                self.s3_client.delete_object(Bucket=self.bucket, Key=key)
            except Exception:
                pass

        model_dir = self._model_dir(model_id)
        if model_dir.exists():
            shutil.rmtree(model_dir)
            return True
        return False

    def list_models(self):
        return [d.name for d in self.base_path.iterdir() if d.is_dir()]

storage_service = ModelStorage()
