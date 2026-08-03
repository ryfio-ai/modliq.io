"""
Optuna Bayesian Hyperparameter Optimization for the best model.
"""
import logging
import time
from typing import Any, Dict, Optional

import numpy as np
from sklearn.model_selection import cross_val_score, StratifiedKFold, KFold
from sklearn.pipeline import Pipeline

logger = logging.getLogger("modliq.tuner")

class OptunaTuner:
    def __init__(self, task_type: str, cv_folds: int = 5, random_state: int = 42,
                 n_trials: int = 50, timeout_sec: Optional[float] = None):
        self.task_type = task_type
        self.cv_folds = cv_folds
        self.random_state = random_state
        self.n_trials = n_trials
        self.timeout_sec = timeout_sec
        self.study = None

    def tune(self, X, y, preprocessor, base_model_name: str) -> Dict[str, Any]:
        try:
            import optuna
            optuna.logging.set_verbosity(optuna.logging.WARNING)
        except ImportError:
            logger.warning("Optuna is not installed; returning default parameters")
            return {"best_params": {}, "best_score": 0.0, "n_trials": 0, "optimization_history": []}

        from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
        from sklearn.ensemble import GradientBoostingClassifier, GradientBoostingRegressor
        from sklearn.linear_model import LogisticRegression, Ridge
        
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

        scoring = "roc_auc_ovr_weighted" if (self.task_type == "classification" and len(np.unique(y)) > 2) else ("roc_auc" if self.task_type == "classification" else "neg_root_mean_squared_error")

        def objective(trial):
            if base_model_name == "RandomForest":
                if self.task_type == "classification":
                    model = RandomForestClassifier(
                        n_estimators=trial.suggest_int("n_estimators", 50, 500),
                        max_depth=trial.suggest_int("max_depth", 3, 30),
                        min_samples_split=trial.suggest_int("min_samples_split", 2, 20),
                        min_samples_leaf=trial.suggest_int("min_samples_leaf", 1, 10),
                        n_jobs=-1, random_state=self.random_state,
                    )
                else:
                    model = RandomForestRegressor(
                        n_estimators=trial.suggest_int("n_estimators", 50, 500),
                        max_depth=trial.suggest_int("max_depth", 3, 30),
                        min_samples_split=trial.suggest_int("min_samples_split", 2, 20),
                        min_samples_leaf=trial.suggest_int("min_samples_leaf", 1, 10),
                        n_jobs=-1, random_state=self.random_state,
                    )
            elif base_model_name == "GradientBoosting":
                if self.task_type == "classification":
                    model = GradientBoostingClassifier(
                        n_estimators=trial.suggest_int("n_estimators", 50, 500),
                        max_depth=trial.suggest_int("max_depth", 2, 10),
                        learning_rate=trial.suggest_float("learning_rate", 0.01, 0.3, log=True),
                        subsample=trial.suggest_float("subsample", 0.5, 1.0),
                        random_state=self.random_state,
                    )
                else:
                    model = GradientBoostingRegressor(
                        n_estimators=trial.suggest_int("n_estimators", 50, 500),
                        max_depth=trial.suggest_int("max_depth", 2, 10),
                        learning_rate=trial.suggest_float("learning_rate", 0.01, 0.3, log=True),
                        subsample=trial.suggest_float("subsample", 0.5, 1.0),
                        random_state=self.random_state,
                    )
            elif base_model_name == "XGBoost" and HAS_XGB:
                if self.task_type == "classification":
                    model = xgb.XGBClassifier(
                        n_estimators=trial.suggest_int("n_estimators", 50, 500),
                        max_depth=trial.suggest_int("max_depth", 2, 12),
                        learning_rate=trial.suggest_float("learning_rate", 0.01, 0.3, log=True),
                        subsample=trial.suggest_float("subsample", 0.5, 1.0),
                        colsample_bytree=trial.suggest_float("colsample_bytree", 0.5, 1.0),
                        eval_metric="logloss",
                        n_jobs=-1, random_state=self.random_state,
                    )
                else:
                    model = xgb.XGBRegressor(
                        n_estimators=trial.suggest_int("n_estimators", 50, 500),
                        max_depth=trial.suggest_int("max_depth", 2, 12),
                        learning_rate=trial.suggest_float("learning_rate", 0.01, 0.3, log=True),
                        subsample=trial.suggest_float("subsample", 0.5, 1.0),
                        colsample_bytree=trial.suggest_float("colsample_bytree", 0.5, 1.0),
                        n_jobs=-1, random_state=self.random_state,
                    )
            elif base_model_name == "LightGBM" and HAS_LGB:
                if self.task_type == "classification":
                    model = lgb.LGBMClassifier(
                        n_estimators=trial.suggest_int("n_estimators", 50, 500),
                        max_depth=trial.suggest_int("max_depth", 3, 15),
                        learning_rate=trial.suggest_float("learning_rate", 0.01, 0.3, log=True),
                        num_leaves=trial.suggest_int("num_leaves", 10, 150),
                        subsample=trial.suggest_float("subsample", 0.5, 1.0),
                        n_jobs=-1, random_state=self.random_state, verbose=-1,
                    )
                else:
                    model = lgb.LGBMRegressor(
                        n_estimators=trial.suggest_int("n_estimators", 50, 500),
                        max_depth=trial.suggest_int("max_depth", 3, 15),
                        learning_rate=trial.suggest_float("learning_rate", 0.01, 0.3, log=True),
                        num_leaves=trial.suggest_int("num_leaves", 10, 150),
                        subsample=trial.suggest_float("subsample", 0.5, 1.0),
                        n_jobs=-1, random_state=self.random_state, verbose=-1,
                    )
            elif base_model_name == "LogisticRegression":
                model = LogisticRegression(
                    C=trial.suggest_float("C", 1e-4, 10.0, log=True),
                    solver="saga", max_iter=2000,
                    n_jobs=-1, random_state=self.random_state,
                )
            elif base_model_name == "Ridge":
                model = Ridge(
                    alpha=trial.suggest_float("alpha", 1e-4, 10.0, log=True),
                    random_state=self.random_state,
                )
            else:
                return -9999.0

            pipe = Pipeline([("preprocessor", preprocessor), ("model", model)])
            if self.task_type == "classification":
                cv = StratifiedKFold(n_splits=self.cv_folds, shuffle=True, random_state=self.random_state)
            else:
                cv = KFold(n_splits=self.cv_folds, shuffle=True, random_state=self.random_state)

            scores = cross_val_score(pipe, X, y, cv=cv, scoring=scoring, n_jobs=-1)
            return float(np.mean(scores))

        self.study = optuna.create_study(
            direction="maximize",
            sampler=optuna.samplers.TPESampler(seed=self.random_state),
        )
        self.study.optimize(objective, n_trials=self.n_trials, timeout=self.timeout_sec, show_progress_bar=False)

        best_params = dict(self.study.best_params)
        logger.info("Best params for %s: %s (score=%.4f)", base_model_name, best_params, self.study.best_value)

        return {
            "best_params": best_params,
            "best_score": round(self.study.best_value, 5),
            "n_trials": len(self.study.trials),
            "optimization_history": [t.value for t in self.study.trials if t.value is not None],
        }

def tune_winner(model_factory, X, y, winner_name: str, n_trials: int = 30, seed: int = 42) -> dict:
    try:
        tuner = OptunaTuner(task_type="regression", cv_folds=3, random_state=seed, n_trials=n_trials)
        from services.automl.preprocessor import build_preprocessing_pipeline
        from sklearn.compose import ColumnTransformer as SklearnCT
        ct = SklearnCT(transformers=[], remainder='passthrough')
        res = tuner.tune(X, y, ct, winner_name)
        return res.get("best_params", {})
    except Exception as e:
        logger.warning(f"Optuna tuning fallback: {e}")
        return {}
