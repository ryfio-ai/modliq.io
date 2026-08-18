"""
Modliq ML Engine — Model Export Pipeline
Export trained ML models to Joblib (implemented) and ONNX (Beta/Planned).
Last verified: 17/08/2026
"""

import os
import importlib
import joblib
from typing import Dict, Any, Optional

def is_installed(package_name: str) -> bool:
    try:
        importlib.import_module(package_name)
        return True
    except Exception:
        return False

def export_model(
    model_object: Any,
    export_format: str = "joblib",
    output_path: str = "./model_artifacts/exported_model"
) -> Dict[str, Any]:
    """
    Exports trained model to Joblib or ONNX format.
    """
    if export_format.lower() == "joblib":
        full_path = f"{output_path}.joblib"
        joblib.dump(model_object, full_path)
        return {
            "success": True,
            "format": "joblib",
            "status": "IMPLEMENTED",
            "path": full_path,
        }

    elif export_format.lower() == "onnx":
        if is_installed("skl2onnx") and is_installed("onnx"):
            try:
                from skl2onnx import convert_sklearn
                from skl2onnx.common.data_types import FloatTensorType

                initial_type = [("float_input", FloatTensorType([None, getattr(model_object, "n_features_in_", 5)]))]
                onnx_model = convert_sklearn(model_object, initial_types=initial_type)
                full_path = f"{output_path}.onnx"
                with open(full_path, "wb") as f:
                    f.write(onnx_model.SerializeToString())

                return {
                    "success": True,
                    "format": "onnx",
                    "status": "BETA",
                    "path": full_path,
                }
            except Exception as e:
                return {
                    "success": False,
                    "format": "onnx",
                    "status": "FAILED",
                    "error": f"ONNX conversion failed: {str(e)}",
                }
        else:
            return {
                "success": False,
                "format": "onnx",
                "status": "NOT_INSTALLED",
                "reason": "skl2onnx or onnx package not installed. ONNX export is in ROADMAP/BETA.",
            }

    return {"success": False, "error": f"Unsupported export format '{export_format}'"}
