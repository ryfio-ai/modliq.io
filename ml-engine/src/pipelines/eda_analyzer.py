import datetime
import math
import numpy as np
import pandas as pd
from typing import Dict, Any, List, Optional

def analyze_dataset_eda(
    rows: List[Dict[str, Any]],
    target_column: Optional[str] = None,
    options: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    options = options or {}
    max_rows = options.get("maxRows", 10000)

    total_rows_input = len(rows)
    sampled = False
    if total_rows_input > max_rows:
        df = pd.DataFrame(rows[:max_rows])
        sampled = True
    else:
        df = pd.DataFrame(rows)

    rows_analyzed = len(df)
    total_columns = len(df.columns) if not df.empty else 0

    if df.empty:
        return {
            "success": False,
            "error": "Dataset is empty"
        }

    # 1. Overview
    duplicate_rows = int(df.duplicated().sum())
    missing_total = int(df.isna().sum().sum())
    total_cells = rows_analyzed * total_columns
    missing_pct = round((missing_total / total_cells * 100), 2) if total_cells > 0 else 0.0

    numeric_cols = []
    categorical_cols = []
    datetime_cols = []
    boolean_cols = []
    text_cols = []

    columns_summary = []
    for col in df.columns:
        series = df[col]
        missing_cnt = int(series.isna().sum())
        missing_p = round((missing_cnt / rows_analyzed * 100), 2)
        unique_cnt = int(series.nunique(dropna=True))
        non_null_samples = series.dropna().head(5).tolist()

        # Type detection logic
        col_type = "unknown"
        if pd.api.types.is_bool_dtype(series):
            col_type = "boolean"
            boolean_cols.append(col)
        elif pd.api.types.is_numeric_dtype(series):
            # Check if boolean represented as 0/1
            if set(series.dropna().unique()).issubset({0, 1}) and unique_cnt <= 2:
                col_type = "boolean"
                boolean_cols.append(col)
            else:
                col_type = "numeric"
                numeric_cols.append(col)
        elif pd.api.types.is_datetime64_any_dtype(series):
            col_type = "datetime"
            datetime_cols.append(col)
        else:
            # Try parsing datetime strings
            try:
                converted = pd.to_datetime(series.dropna().head(20), errors='coerce')
                if converted.notna().sum() > 15:
                    col_type = "datetime"
                    datetime_cols.append(col)
                else:
                    col_type = "categorical" if unique_cnt < 50 else "text"
                    if col_type == "categorical":
                        categorical_cols.append(col)
                    else:
                        text_cols.append(col)
            except Exception:
                col_type = "categorical" if unique_cnt < 50 else "text"
                if col_type == "categorical":
                    categorical_cols.append(col)
                else:
                    text_cols.append(col)

        columns_summary.append({
            "name": str(col),
            "type": col_type,
            "missingCount": missing_cnt,
            "missingPercentage": missing_p,
            "uniqueCount": unique_cnt,
            "sampleValues": [str(x) for x in non_null_samples],
        })

    overview = {
        "rowCount": rows_analyzed,
        "columnCount": total_columns,
        "numericColumnCount": len(numeric_cols),
        "categoricalColumnCount": len(categorical_cols),
        "datetimeColumnCount": len(datetime_cols),
        "booleanColumnCount": len(boolean_cols),
        "duplicateRows": duplicate_rows,
        "missingValuesTotal": missing_total,
        "missingValuePercentage": missing_pct,
    }

    # 2. Numeric Summary & Outliers
    numeric_summary = []
    distributions = []
    outlier_heavy_cols = []

    for col in numeric_cols:
        s = pd.to_numeric(df[col], errors='coerce').dropna()
        cnt = len(s)
        if cnt == 0:
            continue

        mean_val = float(s.mean())
        std_val = float(s.std()) if cnt > 1 else 0.0
        min_val = float(s.min())
        max_val = float(s.max())
        median_val = float(s.median())
        q1_val = float(s.quantile(0.25))
        q3_val = float(s.quantile(0.75))
        iqr_val = q3_val - q1_val
        skew_val = float(s.skew()) if cnt > 2 else 0.0

        # IQR Outliers
        lower_bound = q1_val - 1.5 * iqr_val
        upper_bound = q3_val + 1.5 * iqr_val
        outliers = s[(s < lower_bound) | (s > upper_bound)]
        outlier_cnt = len(outliers)
        outlier_pct = round((outlier_cnt / cnt * 100), 2)

        if outlier_pct > 5.0:
            outlier_heavy_cols.append(col)

        numeric_summary.append({
            "column": str(col),
            "count": cnt,
            "mean": round(mean_val, 4),
            "median": round(median_val, 4),
            "stdDev": round(std_val, 4),
            "min": round(min_val, 4),
            "max": round(max_val, 4),
            "q1": round(q1_val, 4),
            "q3": round(q3_val, 4),
            "iqr": round(iqr_val, 4),
            "skewness": round(skew_val, 4),
            "outlierCount": outlier_cnt,
            "outlierPercentage": outlier_pct,
        })

        # Distribution Bins (10 bins)
        try:
            counts, bin_edges = np.histogram(s, bins=10)
            bins = []
            for i in range(len(counts)):
                bins.append({
                    "min": round(float(bin_edges[i]), 2),
                    "max": round(float(bin_edges[i + 1]), 2),
                    "count": int(counts[i]),
                })
            distributions.append({
                "column": str(col),
                "bins": bins,
            })
        except Exception:
            pass

    # 3. Categorical Summary
    categorical_summary = []
    for col in categorical_cols + text_cols:
        s = df[col].astype(str).replace('nan', None).dropna()
        cnt = len(s)
        if cnt == 0:
            continue
        val_counts = s.value_counts().head(10)
        top_values = []
        for val, val_cnt in val_counts.items():
            top_values.append({
                "value": str(val),
                "count": int(val_cnt),
                "percentage": round((val_cnt / cnt * 100), 2),
            })
        categorical_summary.append({
            "column": str(col),
            "uniqueCount": int(df[col].nunique(dropna=True)),
            "topValues": top_values,
        })

    # 4. Correlation Matrix & Pairs
    corr_matrix_list = []
    strong_pairs = []

    if len(numeric_cols) >= 2:
        num_df = df[numeric_cols].apply(pd.to_numeric, errors='coerce')
        corr_matrix = num_df.corr(method='pearson')

        cols = list(corr_matrix.columns)
        for i in range(len(cols)):
            for j in range(len(cols)):
                val = corr_matrix.iloc[i, j]
                val = 0.0 if math.isnan(val) else float(val)
                corr_matrix_list.append({
                    "x": str(cols[i]),
                    "y": str(cols[j]),
                    "value": round(val, 4),
                })
                if i < j and abs(val) >= 0.80:
                    interpretation = "Strong linear correlation (>0.80)" if abs(val) < 0.95 else "Extremely high correlation / potential redundancy (>0.95)"
                    strong_pairs.append({
                        "columnA": str(cols[i]),
                        "columnB": str(cols[j]),
                        "correlation": round(val, 4),
                        "interpretation": interpretation,
                    })

    correlations = {
        "method": "pearson",
        "matrix": corr_matrix_list,
        "strongPairs": strong_pairs,
    }

    # 5. Target Analysis
    target_analysis = None
    if target_column and target_column in df.columns:
        ts = df[target_column]
        ts_num = pd.to_numeric(ts, errors='coerce').dropna()
        ts_type = "numeric" if len(ts_num) > 0 else "categorical"
        missing_cnt = int(ts.isna().sum())
        unique_cnt = int(ts.nunique(dropna=True))

        outlier_cnt = 0
        if ts_type == "numeric" and len(ts_num) > 4:
            q1 = float(ts_num.quantile(0.25))
            q3 = float(ts_num.quantile(0.75))
            iqr = q3 - q1
            outliers = ts_num[(ts_num < q1 - 1.5 * iqr) | (ts_num > q3 + 1.5 * iqr)]
            outlier_cnt = len(outliers)

        correlated_features = []
        leakage_warnings = []

        if ts_type == "numeric" and len(numeric_cols) > 1:
            num_df = df[numeric_cols].apply(pd.to_numeric, errors='coerce')
            target_corrs = num_df.corrwith(num_df[target_column]).drop(labels=[target_column], errors='ignore')
            for col_name, corr_val in target_corrs.items():
                if not math.isnan(corr_val):
                    correlated_features.append({
                        "feature": str(col_name),
                        "correlation": round(float(corr_val), 4),
                    })
                    # Check for leakage
                    if abs(corr_val) > 0.98:
                        leakage_warnings.append(f"Near-perfect correlation ({round(float(corr_val), 4)}) between '{col_name}' and target '{target_column}'. Verify if '{col_name}' is calculated post-process.")

        correlated_features = sorted(correlated_features, key=lambda x: abs(x["correlation"]), reverse=True)

        target_analysis = {
            "targetColumn": str(target_column),
            "type": ts_type,
            "missingCount": missing_cnt,
            "uniqueCount": unique_cnt,
            "outlierCount": outlier_cnt,
            "correlatedFeatures": correlated_features,
            "leakageWarnings": leakage_warnings,
        }

    # 6. Warnings & Recommendations Generation
    warnings = []
    recommendations = []

    if missing_pct > 20.0:
        warnings.append({
            "severity": "high" if missing_pct > 50.0 else "medium",
            "code": "HIGH_MISSING_DATA",
            "message": f"Dataset has {missing_pct}% total missing values. Data imputation or cleaning is recommended before optimization.",
        })
        recommendations.append("Apply missing value imputation or filter incomplete process rows.")

    if duplicate_rows > 0:
        warnings.append({
            "severity": "medium",
            "code": "DUPLICATE_ROWS_DETECTED",
            "message": f"Found {duplicate_rows} duplicate rows in dataset.",
        })
        recommendations.append("Deduplicate identical shift records to avoid artificial bias in ML models.")

    if rows_analyzed < 50:
        warnings.append({
            "severity": "high",
            "code": "LOW_SAMPLE_SIZE",
            "message": f"Dataset sample size is low ({rows_analyzed} rows). At least 100+ production batch rows are recommended.",
        })
        recommendations.append("Collect additional batch records before running high-confidence process optimization.")

    for col in df.columns:
        if df[col].nunique(dropna=True) == 1:
            warnings.append({
                "severity": "low",
                "code": "CONSTANT_COLUMN",
                "message": f"Column '{col}' has a single constant value.",
                "affectedColumns": [str(col)],
            })

    if len(strong_pairs) > 0:
        warnings.append({
            "severity": "medium",
            "code": "HIGH_FEATURE_CORRELATION",
            "message": f"Found {len(strong_pairs)} pairs of highly correlated features (>0.80).",
            "affectedColumns": [p["columnA"] for p in strong_pairs[:3]],
        })
        recommendations.append("Consider consolidating collinear sensor variables before model training.")

    if len(outlier_heavy_cols) > 0:
        warnings.append({
            "severity": "medium",
            "code": "OUTLIERS_DETECTED",
            "message": f"Outliers detected in {len(outlier_heavy_cols)} numeric variables.",
            "affectedColumns": outlier_heavy_cols[:5],
        })
        recommendations.append("Review extreme outlier points in Quality Studio to distinguish sensor spikes from real process shifts.")

    # Id columns check
    id_cols = [c for c in df.columns if any(k in str(c).lower() for k in ['id', 'batch', 'serial', 'lot', 'code']) and df[c].nunique() > 0.8 * rows_analyzed]
    if id_cols:
        warnings.append({
            "severity": "low",
            "code": "IDENTIFIER_COLUMNS",
            "message": f"Potential tracking/identifier columns detected: {', '.join(id_cols[:3])}.",
            "affectedColumns": id_cols,
        })
        recommendations.append("Exclude batch ID or serial number metadata columns from process controllable variables.")

    if not recommendations:
        recommendations.append("Dataset health is strong. Proceed to Goal Setup and ML Optimization.")

    return {
        "success": True,
        "generatedAt": datetime.datetime.utcnow().isoformat() + "Z",
        "sampled": sampled,
        "rowsAnalyzed": rows_analyzed,
        "totalRows": total_rows_input,
        "totalColumns": total_columns,
        "overview": overview,
        "columns": columns_summary,
        "numericSummary": numeric_summary,
        "categoricalSummary": categorical_summary,
        "distributions": distributions,
        "correlations": correlations,
        "targetAnalysis": target_analysis,
        "warnings": warnings,
        "recommendations": recommendations,
    }
