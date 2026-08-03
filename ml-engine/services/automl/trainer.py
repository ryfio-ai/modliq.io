"""
AutoML Trainer — 16-algorithm model zoo with cross-validation,
stratified splits, and unified scoring.
"""
import logging
import time
import warnings
from typing import Any, Dict, List, Optional, Tuple

import numpy as np
import pandas as pd
from sklearn.model_selection import cross_val_score, StratifiedKFold, KFold, train_test_split
from sklearn.metrics import (
    accuracy_score, f1_score, roc_auc_score,
    mean_squared_error, mean_absolute_error, r2_score,
)
from sklearn.pipeline import Pipeline

# Classification algorithms
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, ExtraTreesClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier

# Regression algorithms
from sklearn.linear_model import Ridge, Lasso, ElasticNet
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor, ExtraTreesRegressor
from sklearn.svm import SVR
from sklearn.neighbors import KNeighborsRegressor
from sklearn.tree import DecisionTreeRegressor

try:
    import xgboost as xgb
    HAS_XGB = True
except ImportError:
    HAS_XGB = False

try:
    import lightgbm as lgb
    HAS_LGB = True
except ImportError:
    HAS_LGB = False

logger = logging.getLogger("modliq.trainer")
warnings.filterwarnings("ignore", category=UserWarning)

class AutoMLTrainer:
    def __init__(self, task_type: str = "classification", cv_folds: int = 5,
                 test_size: float = 0.2, random_state: int = 42,
                 max_training_time_sec: float = 1800):
        self.task_type = task_type
        self.cv_folds = cv_folds
        self.test_size = test_size
        self.random_state = random_state
        self.max_training_time_sec = max_training_time_sec
        self.results: List[Dict[str, Any]] = []

    def get_model_zoo(self) -> Dict[str, Any]:
        if self.task_type == "classification":
            zoo = {
                "LogisticRegression": LogisticRegression(max_iter=1000, n_jobs=-1),
                "RandomForest": RandomForestClassifier(n_estimators=200, n_jobs=-1, random_state=self.random_state),
                "GradientBoosting": GradientBoostingClassifier(n_estimators=200, random_state=self.random_state),
                "ExtraTrees": ExtraTreesClassifier(n_estimators=200, n_jobs=-1, random_state=self.random_state),
                "SVM": SVC(probability=True, random_state=self.random_state),
                "KNN": KNeighborsClassifier(n_jobs=-1),
                "NaiveBayes": GaussianNB(),
                "DecisionTree": DecisionTreeClassifier(random_state=self.random_state),
            }
            if HAS_XGB:
                zoo["XGBoost"] = xgb.XGBClassifier(
                    n_estimators=200, eval_metric="logloss", n_jobs=-1, random_state=self.random_state
                )
            if HAS_LGB:
                zoo["LightGBM"] = lgb.LGBMClassifier(
                    n_estimators=200, n_jobs=-1, random_state=self.random_state, verbose=-1
                )
        else:  # regression
            zoo = {
                "Ridge": Ridge(random_state=self.random_state),
                "Lasso": Lasso(random_state=self.random_state, max_iter=5000),
                "ElasticNet": ElasticNet(random_state=self.random_state, max_iter=5000),
                "RandomForest": RandomForestRegressor(n_estimators=200, n_jobs=-1, random_state=self.random_state),
                "GradientBoosting": GradientBoostingRegressor(n_estimators=200, random_state=self.random_state),
                "ExtraTrees": ExtraTreesRegressor(n_estimators=200, n_jobs=-1, random_state=self.random_state),
                "SVM": SVR(),
                "KNN": KNeighborsRegressor(n_jobs=-1),
                "DecisionTree": DecisionTreeRegressor(random_state=self.random_state),
            }
            if HAS_XGB:
                zoo["XGBoost"] = xgb.XGBRegressor(
                    n_estimators=200, n_jobs=-1, random_state=self.random_state
                )
            if HAS_LGB:
                zoo["LightGBM"] = lgb.LGBMRegressor(
                    n_estimators=200, n_jobs=-1, random_state=self.random_state, verbose=-1
                )
        return zoo

    def train(self, X: Any, y: pd.Series, preprocessor,
              feature_names: List[str]) -> List[Dict[str, Any]]:
        start_time = time.time()
        zoo = self.get_model_zoo()

        if self.task_type == "classification":
            cv = StratifiedKFold(n_splits=self.cv_folds, shuffle=True, random_state=self.random_state)
            scoring = "roc_auc_ovr_weighted" if y.nunique() > 2 else "roc_auc"
        else:
            cv = KFold(n_splits=self.cv_folds, shuffle=True, random_state=self.random_state)
            scoring = "neg_root_mean_squared_error"

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=self.test_size, random_state=self.random_state,
            stratify=y if self.task_type == "classification" else None
        )

        self.results = []
        for name, model in zoo.items():
            if time.time() - start_time > self.max_training_time_sec:
                logger.warning("Max training time reached. Stopping model zoo.")
                break

            try:
                logger.info("Training %s…", name)
                t0 = time.time()

                # If X is already preprocessed matrix, train model directly without pipe wrapper
                pipe = model

                # Cross-validation
                cv_scores = cross_val_score(pipe, X_train, y_train, cv=cv, scoring=scoring, n_jobs=-1)
                cv_mean = float(np.mean(cv_scores))
                cv_std = float(np.std(cv_scores))

                # Fit on full train and evaluate on test
                pipe.fit(X_train, y_train)
                y_pred = pipe.predict(X_test)

                metrics = self._compute_metrics(y_test, y_pred)
                metrics["cv_mean"] = round(cv_mean, 5)
                metrics["cv_std"] = round(cv_std, 5)
                metrics["training_time_sec"] = round(time.time() - t0, 2)

                # Inference time benchmark
                inf_start = time.time()
                _ = pipe.predict(X_test[:100])
                metrics["inference_time_ms"] = round((time.time() - inf_start) / 100 * 1000, 4)

                self.results.append({
                    "name": name,
                    "algorithm": name,
                    "task_type": self.task_type,
                    "metrics": metrics,
                    "pipeline": pipe,
                    "feature_names": feature_names,
                })
                logger.info("%s — CV: %.4f ± %.4f", name, cv_mean, cv_std)

            except Exception as e:
                logger.warning("%s failed: %s", name, str(e))
                continue

        if self.task_type == "classification":
            self.results.sort(key=lambda r: r["metrics"]["cv_mean"], reverse=True)
        else:
            self.results.sort(key=lambda r: r["metrics"].get("rmse", 9999))

        return self.results

    def _compute_metrics(self, y_true, y_pred) -> Dict[str, float]:
        metrics = {}
        if self.task_type == "classification":
            metrics["accuracy"] = round(accuracy_score(y_true, y_pred), 5)
            avg = "binary" if len(np.unique(y_true)) == 2 else "weighted"
            metrics["f1_score"] = round(f1_score(y_true, y_pred, average=avg, zero_division=0), 5)
            try:
                if len(np.unique(y_true)) == 2:
                    metrics["roc_auc"] = round(roc_auc_score(y_true, y_pred), 5)
            except Exception:
                pass
        else:
            metrics["rmse"] = round(float(np.sqrt(mean_squared_error(y_true, y_pred))), 5)
            metrics["mae"] = round(float(mean_absolute_error(y_true, y_pred)), 5)
            metrics["r2"] = round(float(r2_score(y_true, y_pred)), 5)
        return metrics

    def get_best_model(self) -> Optional[Dict[str, Any]]:
        return self.results[0] if self.results else None
