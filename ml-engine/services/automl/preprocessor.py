"""
Automated Preprocessor — builds sklearn ColumnTransformer pipelines
from data profiles. Handles numeric imputation, scaling, categorical
encoding, datetime feature extraction, and text vectorization.
"""
import logging
from typing import Any, Dict, List, Optional, Tuple

import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder, OrdinalEncoder, FunctionTransformer
from sklearn.feature_extraction.text import TfidfVectorizer

logger = logging.getLogger("modliq.preprocessor")

class AutoPreprocessor:
    def __init__(self, max_categories: int = 50, text_max_features: int = 500):
        self.max_categories = max_categories
        self.text_max_features = text_max_features
        self.preprocessor: Optional[ColumnTransformer] = None
        self.feature_names: List[str] = []
        self.target_column: Optional[str] = None
        self.target_encoder = None

    def build_pipeline(self, df: pd.DataFrame, target_column: str,
                       task_type: str = "classification") -> Tuple[ColumnTransformer, pd.Series, Dict]:
        """
        Returns: (preprocessor, y_series, metadata)
        """
        self.target_column = target_column
        df = df.copy()

        if target_column not in df.columns:
            raise ValueError(f"Target column '{target_column}' not found in dataframe")

        y = df[target_column]
        X = df.drop(columns=[target_column])

        # Encode target if classification and object/bool
        if task_type == "classification" and not pd.api.types.is_numeric_dtype(y):
            from sklearn.preprocessing import LabelEncoder
            self.target_encoder = LabelEncoder()
            y = pd.Series(self.target_encoder.fit_transform(y.astype(str)), index=y.index)
            logger.info("Target encoded: %s", self.target_encoder.classes_)

        # Identify column types
        numeric_cols = []
        categorical_cols = []
        datetime_cols = []
        text_cols = []
        drop_cols = []

        for col in X.columns:
            inferred = self._infer_column_type(X[col])
            if inferred == "numeric":
                numeric_cols.append(col)
            elif inferred == "categorical":
                if X[col].nunique(dropna=True) <= self.max_categories:
                    categorical_cols.append(col)
                else:
                    logger.warning("Column '%s' has %d unique values; dropping", col, X[col].nunique(dropna=True))
                    drop_cols.append(col)
            elif inferred == "datetime":
                datetime_cols.append(col)
            elif inferred == "text":
                text_cols.append(col)
            else:
                drop_cols.append(col)

        transformers = []
        metadata = {
            "numeric_cols": numeric_cols,
            "categorical_cols": categorical_cols,
            "datetime_cols": datetime_cols,
            "text_cols": text_cols,
            "dropped_cols": drop_cols,
        }

        # Numeric pipeline
        if numeric_cols:
            num_pipe = Pipeline([
                ("imputer", SimpleImputer(strategy="median")),
                ("scaler", StandardScaler()),
            ])
            transformers.append(("num", num_pipe, numeric_cols))

        # Categorical pipeline
        if categorical_cols:
            cat_pipe = Pipeline([
                ("imputer", SimpleImputer(strategy="constant", fill_value="missing")),
                ("encoder", OneHotEncoder(handle_unknown="ignore", sparse_output=False)),
            ])
            transformers.append(("cat", cat_pipe, categorical_cols))

        # Datetime pipeline
        if datetime_cols:
            for col in datetime_cols:
                X[col] = pd.to_datetime(X[col], errors="coerce")
                X[f"{col}_year"] = X[col].dt.year
                X[f"{col}_month"] = X[col].dt.month
                X[f"{col}_day"] = X[col].dt.day
                X[f"{col}_dayofweek"] = X[col].dt.dayofweek
            dt_cols = [c for c in X.columns if c.startswith(tuple(datetime_cols)) and "_" in c]
            dt_pipe = Pipeline([
                ("imputer", SimpleImputer(strategy="median")),
                ("scaler", StandardScaler()),
            ])
            transformers.append(("dt", dt_pipe, dt_cols))
            metadata["datetime_extracted"] = dt_cols

        # Text pipeline
        if text_cols:
            for col in text_cols:
                text_pipe = Pipeline([
                    ("imputer", SimpleImputer(strategy="constant", fill_value="")),
                    ("ravel", FunctionTransformer(lambda x: x.ravel(), validate=False)),
                    ("tfidf", TfidfVectorizer(max_features=self.text_max_features, stop_words="english")),
                ])
                transformers.append((f"text_{col}", text_pipe, col))

        if not transformers:
            # Fallback if no specific column types identified
            numeric_cols = list(X.select_dtypes(include=[np.number]).columns)
            transformers = [("num", Pipeline([("imputer", SimpleImputer(strategy="median")), ("scaler", StandardScaler())]), numeric_cols)]

        self.preprocessor = ColumnTransformer(
            transformers=transformers,
            remainder="drop",
            verbose_feature_names_out=False,
        )

        self.preprocessor.fit(X)
        try:
            self.feature_names = list(self.preprocessor.get_feature_names_out())
        except Exception:
            self.feature_names = [f"feat_{i}" for i in range(self.preprocessor.transform(X).shape[1])]

        logger.info("Preprocessor built: %d features from %d columns", len(self.feature_names), X.shape[1])
        return self.preprocessor, y, metadata

    def transform(self, df: pd.DataFrame) -> np.ndarray:
        if self.preprocessor is None:
            raise RuntimeError("Preprocessor not fitted. Call build_pipeline first.")
        X = df.drop(columns=[self.target_column], errors="ignore")
        for col in X.columns:
            if pd.api.types.is_datetime64_any_dtype(X[col]):
                X[f"{col}_year"] = X[col].dt.year
                X[f"{col}_month"] = X[col].dt.month
                X[f"{col}_day"] = X[col].dt.day
                X[f"{col}_dayofweek"] = X[col].dt.dayofweek
        return self.preprocessor.transform(X)

    def _infer_column_type(self, series: pd.Series) -> str:
        if pd.api.types.is_datetime64_any_dtype(series):
            return "datetime"
        if pd.api.types.is_numeric_dtype(series):
            return "numeric"
        if pd.api.types.is_bool_dtype(series):
            return "categorical"
        if series.dtype == object:
            coerced = pd.to_numeric(series, errors="coerce")
            if coerced.notna().sum() / max(len(series), 1) > 0.9:
                return "numeric"
            try:
                parsed = pd.to_datetime(series, errors="coerce")
                if parsed.notna().sum() / max(len(series), 1) > 0.8:
                    return "datetime"
            except Exception:
                pass
            avg_len = series.dropna().astype(str).str.len().mean()
            n_unique = series.nunique(dropna=True)
            if avg_len and avg_len > 30 and n_unique > 20:
                return "text"
            return "categorical"
        return "unknown"

def build_preprocessing_pipeline(df: pd.DataFrame, target_column: str, features: List[str] = None):
    ap = AutoPreprocessor()
    preprocessor, y, meta = ap.build_pipeline(df, target_column)
    X = df[features] if features else df.drop(columns=[target_column], errors="ignore")
    return preprocessor, X, y, meta.get("numeric_cols", []), meta.get("categorical_cols", [])
