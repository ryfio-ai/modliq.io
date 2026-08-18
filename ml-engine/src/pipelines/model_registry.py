"""
Modliq ML Engine — Model Registry Pipeline
Abstractions for registering model metadata, training parameters, performance metrics,
and storing model binary files safely.
Last verified: 17/08/2026
"""

import os
import time
import joblib
from typing import Dict, Any, Optional

class ModelRegistry:
    def __init__(self, base_storage_path: str = "./model_artifacts"):
        self.base_storage_path = base_storage_path
        os.makedirs(self.base_storage_path, exist_ok=True)

    def register_model_artifact(
        self,
        model_id: str,
        model_type: str,
        target_column: str,
        features: list,
        metrics: Dict[str, float],
        model_object: Any,
        dataset_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Saves joblib binary to storage directory and constructs ModelArtifact metadata.
        """
        artifact_filename = f"{model_id}.joblib"
        artifact_path = os.path.join(self.base_storage_path, artifact_filename)

        joblib.dump(model_object, artifact_path)

        artifact_metadata = {
            "modelId": model_id,
            "modelType": model_type,
            "targetColumn": target_column,
            "features": features,
            "metrics": metrics,
            "datasetId": dataset_id,
            "storagePath": artifact_path,
            "artifactFilename": artifact_filename,
            "createdAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "lastVerified": "17/08/2026",
        }

        return artifact_metadata

    def load_model_artifact(self, model_id: str) -> Optional[Any]:
        artifact_path = os.path.join(self.base_storage_path, f"{model_id}.joblib")
        if os.path.exists(artifact_path):
            return joblib.load(artifact_path)
        return None
