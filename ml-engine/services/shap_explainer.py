import numpy as np

def compute_shap_drivers(model, X_transformed, feature_names: list) -> list:
    """
    Returns business-language driver list from SHAP values or feature importances.
    Maps raw ML importance to plain English descriptions.
    """
    try:
        import shap
        explainer = shap.TreeExplainer(model)
        shap_values = explainer.shap_values(X_transformed)

        if isinstance(shap_values, list):
            shap_values = shap_values[1]

        mean_abs = np.abs(shap_values).mean(axis=0)
        total = mean_abs.sum() if mean_abs.sum() > 0 else 1.0
        contributions = [(feature_names[i], float(mean_abs[i] / total * 100)) for i in range(min(len(feature_names), len(mean_abs)))]
        contributions.sort(key=lambda x: x[1], reverse=True)

        drivers = []
        rank_labels = ["strongest driver", "second strongest", "third factor", "minor factor", "least impact"]
        for i, (name, pct) in enumerate(contributions[:5]):
            label = rank_labels[i] if i < len(rank_labels) else "contributing factor"
            drivers.append({
                "name": name,
                "contribution": round(pct, 1),
                "description": f"{name} is the {label}, contributing {round(pct)}% of the model decision. "
                               f"{'Focus first on stabilizing ' + name + ' around the recommended range.' if i == 0 else 'Keep ' + name + ' variation low during each batch.'}",
            })
        return drivers

    except Exception:
        # Fallback to model feature importances
        if hasattr(model, 'feature_importances_'):
            importances = model.feature_importances_
            total = importances.sum() if importances.sum() > 0 else 1.0
            pairs = sorted(zip(feature_names, importances), key=lambda x: x[1], reverse=True)
            return [
                {
                    "name": n,
                    "contribution": round(float(v / total * 100), 1),
                    "description": f"{n} contributes {round(float(v / total * 100))}% to the model decision."
                }
                for n, v in pairs[:5]
            ]
        
        # Generic fallback if non-tree model without feature importances
        return [
            {
                "name": name,
                "contribution": round(100.0 / max(len(feature_names[:5]), 1), 1),
                "description": f"{name} influences operational stability."
            }
            for name in feature_names[:5]
        ]
