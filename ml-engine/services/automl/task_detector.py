"""
Task Detector — NLP goal parser + heuristic detection.
Maps plain-English goals to ML task types and suggests target columns.
"""
import logging
import re
from typing import Any, Dict, List, Optional

import pandas as pd

logger = logging.getLogger("modliq.task_detector")

class TaskDetector:
    CLASSIFICATION_KEYWORDS = [
        "predict", "classify", "category", "label", "churn", "fraud",
        "spam", "sentiment", "diagnose", "risk", "default", "approve",
        "reject", "qualify", "segment", "group", "cluster", "type",
    ]
    REGRESSION_KEYWORDS = [
        "forecast", "predict", "estimate", "price", "revenue", "sales",
        "amount", "quantity", "duration", "time", "cost", "expense",
        "yield", "return", "value", "score", "rating", "temperature",
    ]
    TIMESERIES_KEYWORDS = [
        "time series", "timeseries", "trend", "seasonal", "forecast",
        "future", "next month", "next week", "next year", "over time",
        "historical", "sequential", "sequence",
    ]
    ANOMALY_KEYWORDS = [
        "anomaly", "outlier", "unusual", "abnormal", "detect", "fraud",
        "intrusion", "error", "defect", "fault",
    ]

    def detect(self, df: pd.DataFrame, goal: Optional[str] = None,
               target_column: Optional[str] = None) -> Dict[str, Any]:
        """
        Returns: {
            task_type: 'classification' | 'regression' | 'clustering' | 'timeseries' | 'anomaly',
            suggested_target: str | None,
            confidence: float,
            reasoning: str
        }
        """
        goal_lower = (goal or "").lower()

        # 1. If user provided target, use heuristic on that column
        if target_column and target_column in df.columns:
            task = self._heuristic_from_column(df[target_column])
            return {
                "task_type": task,
                "suggested_target": target_column,
                "confidence": 0.95,
                "reasoning": f"User-specified target '{target_column}' inferred as {task}",
            }

        # 2. Check if goal explicitly names a column in df
        for col in df.columns:
            if re.search(r'\b' + re.escape(col.lower()) + r'\b', goal_lower):
                col_task = self._heuristic_from_column(df[col])
                return {
                    "task_type": "classification" if col_task == "classification" or self._score_keywords(goal_lower, self.CLASSIFICATION_KEYWORDS) > 0 else col_task,
                    "suggested_target": col,
                    "confidence": 0.95,
                    "reasoning": f"Goal explicitly referenced column '{col}'",
                }

        # 3. NLP keyword matching on goal
        task_scores = {
            "classification": self._score_keywords(goal_lower, self.CLASSIFICATION_KEYWORDS),
            "regression": self._score_keywords(goal_lower, self.REGRESSION_KEYWORDS),
            "timeseries": self._score_keywords(goal_lower, self.TIMESERIES_KEYWORDS),
            "anomaly": self._score_keywords(goal_lower, self.ANOMALY_KEYWORDS),
        }

        # 3. Heuristic column scan for best target candidate
        best_target, best_task, best_score = None, None, -1
        for col in df.columns:
            col_task = self._heuristic_from_column(df[col])
            score = self._column_suitability_score(df[col], col_task)
            if score > best_score:
                best_score = score
                best_target = col
                best_task = col_task

        # 4. Blend NLP + heuristic
        if goal_lower:
            nlp_best = max(task_scores, key=task_scores.get)
            nlp_score = task_scores[nlp_best]
            if nlp_score > 0 and best_task != nlp_best:
                if nlp_score >= 2:
                    best_task = nlp_best
                    best_target = self._find_best_column_for_task(df, nlp_best) or best_target

        confidence = min(0.5 + best_score * 0.1 + max(task_scores.values()) * 0.1, 0.98)

        return {
            "task_type": best_task or "classification",
            "suggested_target": best_target,
            "confidence": round(confidence, 2),
            "reasoning": f"Goal keywords scored {task_scores}; column heuristic selected '{best_target}' as {best_task}",
        }

    def _score_keywords(self, text: str, keywords: List[str]) -> int:
        return sum(1 for kw in keywords if kw in text)

    def _heuristic_from_column(self, series: pd.Series) -> str:
        n_unique = series.nunique(dropna=True)
        n_rows = len(series)

        if pd.api.types.is_datetime64_any_dtype(series):
            return "timeseries"

        if pd.api.types.is_bool_dtype(series):
            return "classification"

        if pd.api.types.is_integer_dtype(series) or pd.api.types.is_float_dtype(series):
            if n_unique <= 10 and n_rows > 20:
                return "classification"
            return "regression"

        if series.dtype == object:
            if n_unique <= 20 and n_rows > 20:
                return "classification"
            coerced = pd.to_numeric(series, errors="coerce")
            if coerced.notna().sum() / max(n_rows, 1) > 0.8:
                if n_unique <= 10:
                    return "classification"
                return "regression"
            return "classification"

        return "classification"

    def _column_suitability_score(self, series: pd.Series, task: str) -> float:
        score = 0.0
        null_rate = series.isnull().mean()
        score += (1 - null_rate) * 30

        n_unique = series.nunique(dropna=True)
        if task == "classification":
            score += max(0, 20 - n_unique)
            vc = series.value_counts(normalize=True)
            if len(vc) > 1:
                balance = 1 - (vc.max() - vc.min())
                score += balance * 20
        elif task == "regression":
            score += min(n_unique / 10, 20)
        elif task == "timeseries":
            if pd.api.types.is_datetime64_any_dtype(series):
                score += 50

        return score

    def _find_best_column_for_task(self, df: pd.DataFrame, task: str) -> Optional[str]:
        best_col, best_score = None, -1
        for col in df.columns:
            col_task = self._heuristic_from_column(df[col])
            if col_task == task:
                score = self._column_suitability_score(df[col], task)
                if score > best_score:
                    best_score = score
                    best_col = col
        return best_col
