"""
Automatic Data Profiler — type detection, quality scoring, missingness.
"""
import logging
from typing import Any, Dict, List, Optional

import pandas as pd
import numpy as np

logger = logging.getLogger("modliq.profiler")

class DataProfiler:
    def profile(self, df: pd.DataFrame) -> Dict[str, Any]:
        n_rows, n_cols = df.shape
        logger.info("Profiling dataframe: %d rows x %d columns", n_rows, n_cols)

        columns = []
        for col in df.columns:
            col_profile = self._profile_column(df[col])
            columns.append({"name": col, **col_profile})

        quality_score = self._compute_quality_score(columns, n_rows)

        return {
            "row_count": n_rows,
            "col_count": n_cols,
            "columns": columns,
            "quality_score": round(quality_score, 2),
            "memory_mb": round(df.memory_usage(deep=True).sum() / 1024 / 1024, 2),
            "dtypes": {c: str(df[c].dtype) for c in df.columns},
        }

    def _profile_column(self, series: pd.Series) -> Dict[str, Any]:
        dtype = str(series.dtype)
        null_count = int(series.isnull().sum())
        null_pct = round(null_count / len(series) * 100, 2) if len(series) > 0 else 0.0
        n_unique = int(series.nunique(dropna=True))

        inferred_type = self._infer_type(series)

        profile = {
            "dtype": dtype,
            "inferred_type": inferred_type,
            "null_count": null_count,
            "null_pct": null_pct,
            "unique_count": n_unique,
            "sample_values": self._safe_sample(series),
        }

        if inferred_type in ("numeric", "integer", "float"):
            profile["stats"] = {
                "mean": self._safe_float(series.mean()),
                "std": self._safe_float(series.std()),
                "min": self._safe_float(series.min()),
                "max": self._safe_float(series.max()),
                "median": self._safe_float(series.median()),
            }
        elif inferred_type == "categorical":
            top_vals = series.value_counts().head(5).to_dict()
            profile["stats"] = {
                "top_categories": {str(k): int(v) for k, v in top_vals.items()},
                "cardinality_ratio": round(n_unique / len(series), 4) if len(series) > 0 else 0,
            }
        elif inferred_type == "datetime":
            profile["stats"] = {
                "min": str(series.min()),
                "max": str(series.max()),
            }
        elif inferred_type == "text":
            lengths = series.dropna().astype(str).str.len()
            profile["stats"] = {
                "avg_length": round(float(lengths.mean()), 2) if len(lengths) > 0 else 0,
                "max_length": int(lengths.max()) if len(lengths) > 0 else 0,
            }

        return profile

    def _infer_type(self, series: pd.Series) -> str:
        if pd.api.types.is_datetime64_any_dtype(series):
            return "datetime"
        if pd.api.types.is_integer_dtype(series):
            return "integer"
        if pd.api.types.is_float_dtype(series):
            return "float"
        if pd.api.types.is_bool_dtype(series):
            return "boolean"

        coerced = pd.to_numeric(series, errors="coerce")
        if coerced.notna().sum() / max(len(series), 1) > 0.9:
            return "numeric"

        if series.dtype == object:
            try:
                parsed = pd.to_datetime(series, errors="coerce")
                if parsed.notna().sum() / max(len(series), 1) > 0.8:
                    return "datetime"
            except Exception:
                pass

        n_unique = series.nunique(dropna=True)
        if n_unique <= 20 or (n_unique / max(len(series), 1) < 0.05):
            return "categorical"

        if series.dtype == object:
            avg_len = series.dropna().astype(str).str.len().mean()
            if avg_len and avg_len > 50:
                return "text"
            return "categorical"

        return "unknown"

    def _safe_sample(self, series: pd.Series, n: int = 3) -> List[Any]:
        sample = series.dropna().head(n).tolist()
        return [self._serialize(v) for v in sample]

    def _serialize(self, val: Any) -> Any:
        if isinstance(val, (np.integer, np.floating)):
            return float(val)
        if isinstance(val, np.bool_):
            return bool(val)
        if pd.isna(val):
            return None
        return val

    def _safe_float(self, val: Any) -> Optional[float]:
        if pd.isna(val):
            return None
        return round(float(val), 6)

    def _compute_quality_score(self, columns: List[Dict], n_rows: int) -> float:
        if n_rows == 0:
            return 0.0
        scores = []
        for col in columns:
            s = 100.0
            s -= col["null_pct"] * 0.8
            if col["inferred_type"] == "unknown":
                s -= 10
            if col["unique_count"] == n_rows and col["inferred_type"] in ("integer", "numeric"):
                s -= 5
            scores.append(max(0, s))
        return sum(scores) / len(scores) if scores else 0.0
