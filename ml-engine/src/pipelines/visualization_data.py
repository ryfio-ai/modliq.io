import math
import logging
from typing import Any, Dict, List, Tuple
import pandas as pd
import numpy as np
from scipy import stats

logger = logging.getLogger("modliq.ml.visualization")

MAX_ROWS_ANALYZED = 10000
MAX_VISIBLE_POINTS = 1000

def prepare_visualization_data(
    rows: List[Dict[str, Any]],
    chart_type: str,
    x: str | None = None,
    y: str | None = None,
    group_by: str | None = None,
    aggregation: str | None = "mean",
    filters: List[Dict[str, Any]] | None = None,
    options: Dict[str, Any] | None = None
) -> Tuple[List[Dict[str, Any]], Dict[str, Any], str | None, List[str], bool]:
    warnings: List[str] = []
    sampled = False
    options = options or {}

    if not rows:
        return [], {}, "Dataset contains no rows.", ["Empty dataset"], False

    df = pd.DataFrame(rows)

    # 1. Row capping / sampling
    if len(df) > MAX_ROWS_ANALYZED:
        df = df.sample(n=MAX_ROWS_ANALYZED, random_state=42)
        sampled = True
        warnings.append(f"Dataset sampled to {MAX_ROWS_ANALYZED:,} rows for fast visualization.")

    # 2. Apply filters safely
    if filters:
        for f in filters:
            col = f.get("column")
            op = f.get("operator")
            val = f.get("value")
            if col in df.columns:
                try:
                    if op == "equals":
                        df = df[df[col] == val]
                    elif op == "not_equals":
                        df = df[df[col] != val]
                    elif op == "gt":
                        df = df[pd.to_numeric(df[col], errors="coerce") > float(val)]
                    elif op == "gte":
                        df = df[pd.to_numeric(df[col], errors="coerce") >= float(val)]
                    elif op == "lt":
                        df = df[pd.to_numeric(df[col], errors="coerce") < float(val)]
                    elif op == "lte":
                        df = df[pd.to_numeric(df[col], errors="coerce") <= float(val)]
                    elif op == "contains" and isinstance(val, str):
                        df = df[df[col].astype(str).str.contains(val, case=False, na=False)]
                except Exception as e:
                    logger.warning(f"Filter skipped for {col} {op} {val}: {e}")

    if df.empty:
        return [], {}, "No data points matching the applied filters.", ["Filter returned 0 rows."], sampled

    # 3. Chart-specific data transformations
    result_data: List[Dict[str, Any]] = []
    stats_out: Dict[str, Any] = {}
    insight: str | None = None

    if chart_type == "histogram":
        col = x or (df.select_dtypes(include=[np.number]).columns[0] if not df.select_dtypes(include=[np.number]).empty else None)
        if not col or col not in df.columns:
            return [], {}, "Histogram requires a numeric column.", ["Invalid column for histogram"], sampled

        s = pd.to_numeric(df[col], errors="coerce").dropna()
        if s.empty:
            return [], {}, f"Column '{col}' has no numeric values.", ["No numeric values"], sampled

        num_bins = int(options.get("bins", 10))
        counts, bin_edges = np.histogram(s, bins=num_bins)
        
        for i in range(len(counts)):
            low = float(bin_edges[i])
            high = float(bin_edges[i+1])
            result_data.append({
                "bin": f"{low:.1f} - {high:.1f}",
                "bin_low": round(low, 2),
                "bin_high": round(high, 2),
                "count": int(counts[i]),
                "frequency": round(float(counts[i] / len(s)), 4)
            })

        mean_val = float(s.mean())
        std_val = float(s.std()) if len(s) > 1 else 0.0
        stats_out = {
            "count": len(s),
            "mean": round(mean_val, 2),
            "std": round(std_val, 2),
            "min": round(float(s.min()), 2),
            "max": round(float(s.max()), 2),
            "skewness": round(float(stats.skew(s)), 2) if len(s) > 2 else 0
        }
        insight = f"Distribution of {col} centers at {mean_val:.2f} (std dev {std_val:.2f})."

    elif chart_type == "pareto":
        cat_col = x or df.select_dtypes(include=["object", "string", "category"]).columns[0]
        val_col = y or df.select_dtypes(include=[np.number]).columns[0]

        if not cat_col or not val_col:
            return [], {}, "Pareto chart requires categorical category column and numeric metric.", ["Missing columns"], sampled

        df[val_col] = pd.to_numeric(df[val_col], errors="coerce").fillna(0)
        grouped = df.groupby(cat_col)[val_col].sum().reset_index()
        grouped = grouped.sort_values(by=val_col, ascending=False).reset_index(drop=True)

        total_sum = float(grouped[val_col].sum()) or 1.0
        running_sum = 0.0

        for _, row in grouped.iterrows():
            val = float(row[val_col])
            running_sum += val
            cum_pct = round((running_sum / total_sum) * 100, 1)
            result_data.append({
                cat_col: str(row[cat_col]),
                val_col: round(val, 2),
                "cumulative_percent": cum_pct
            })

        top_driver = result_data[0][cat_col] if result_data else "Unknown"
        top_pct = result_data[0]["cumulative_percent"] if result_data else 0
        insight = f"Top contributor is '{top_driver}' accounting for {top_pct}% of total {val_col}."

    elif chart_type == "heatmap":
        numeric_df = df.select_dtypes(include=[np.number]).dropna(how="all")
        if numeric_df.shape[1] < 2:
            return [], {}, "Correlation heatmap requires at least 2 numeric columns.", ["Insufficient numeric columns"], sampled

        corr_matrix = numeric_df.corr(method="pearson").round(2)
        cols = list(corr_matrix.columns)

        for r_idx, col1 in enumerate(cols):
            for c_idx, col2 in enumerate(cols):
                val = float(corr_matrix.iloc[r_idx, c_idx])
                if not math.isnan(val):
                    result_data.append({
                        "x": col1,
                        "y": col2,
                        "value": val
                    })

        stats_out = {"columns": cols}
        insight = f"Computed Pearson correlation matrix across {len(cols)} process variables."

    elif chart_type == "boxplot":
        num_col = y or df.select_dtypes(include=[np.number]).columns[0]
        cat_col = x

        if cat_col and cat_col in df.columns:
            groups = df.groupby(cat_col)
            for name, group in groups:
                s = pd.to_numeric(group[num_col], errors="coerce").dropna()
                if not s.empty:
                    q1 = float(s.quantile(0.25))
                    med = float(s.median())
                    q3 = float(s.quantile(0.75))
                    iqr = q3 - q1
                    low_whisker = float(s[s >= (q1 - 1.5 * iqr)].min()) if not s[s >= (q1 - 1.5 * iqr)].empty else q1
                    high_whisker = float(s[s <= (q3 + 1.5 * iqr)].max()) if not s[s <= (q3 + 1.5 * iqr)].empty else q3
                    outliers = [float(val) for val in s[(s < q1 - 1.5 * iqr) | (s > q3 + 1.5 * iqr)]]
                    result_data.append({
                        cat_col: str(name),
                        "min": round(low_whisker, 2),
                        "q1": round(q1, 2),
                        "median": round(med, 2),
                        "q3": round(q3, 2),
                        "max": round(high_whisker, 2),
                        "outliers_count": len(outliers)
                    })
        else:
            s = pd.to_numeric(df[num_col], errors="coerce").dropna()
            q1 = float(s.quantile(0.25))
            med = float(s.median())
            q3 = float(s.quantile(0.75))
            iqr = q3 - q1
            result_data.append({
                "group": num_col,
                "min": round(float(s.min()), 2),
                "q1": round(q1, 2),
                "median": round(med, 2),
                "q3": round(q3, 2),
                "max": round(float(s.max()), 2),
                "outliers_count": len(s[(s < q1 - 1.5 * iqr) | (s > q3 + 1.5 * iqr)])
            })

        insight = f"Boxplot summary evaluated spread and quartiles for {num_col}."

    elif chart_type in ["bar", "line", "area", "stacked_bar", "pie", "donut", "radar"]:
        x_col = x or df.columns[0]
        y_col = y or (df.select_dtypes(include=[np.number]).columns[0] if not df.select_dtypes(include=[np.number]).empty else None)

        if not y_col:
            # Fallback to row count aggregation per category
            grouped = df.groupby(x_col).size().reset_index(name="count")
            result_data = grouped.rename(columns={x_col: x_col, "count": "value"}).to_dict(orient="records")
            insight = f"Count of records aggregated by {x_col}."
        else:
            df[y_col] = pd.to_numeric(df[y_col], errors="coerce")
            agg_func = aggregation if aggregation in ["mean", "median", "sum", "count", "min", "max"] else "mean"
            
            if group_by and group_by in df.columns:
                grouped = df.groupby([x_col, group_by])[y_col].agg(agg_func).reset_index()
                val_key = f"{agg_func}_{y_col}"
                grouped = grouped.rename(columns={y_col: val_key})
                result_data = grouped.to_dict(orient="records")
            else:
                grouped = df.groupby(x_col)[y_col].agg(agg_func).reset_index()
                val_key = f"{agg_func}_{y_col}"
                grouped = grouped.rename(columns={y_col: val_key})
                
                # Limit visible points
                if len(grouped) > MAX_VISIBLE_POINTS:
                    grouped = grouped.iloc[:MAX_VISIBLE_POINTS]
                    sampled = True
                    warnings.append(f"Visible chart points capped at {MAX_VISIBLE_POINTS}.")

                result_data = grouped.to_dict(orient="records")

            insight = f"{agg_func.capitalize()} {y_col} grouped by {x_col}."

    elif chart_type == "scatter":
        x_col = x or df.select_dtypes(include=[np.number]).columns[0]
        y_col = y or (df.select_dtypes(include=[np.number]).columns[1] if len(df.select_dtypes(include=[np.number]).columns) > 1 else x_col)

        sub_df = df[[x_col, y_col]].dropna()
        sub_df[x_col] = pd.to_numeric(sub_df[x_col], errors="coerce")
        sub_df[y_col] = pd.to_numeric(sub_df[y_col], errors="coerce")
        sub_df = sub_df.dropna()

        if len(sub_df) > MAX_VISIBLE_POINTS:
            sub_df = sub_df.sample(n=MAX_VISIBLE_POINTS, random_state=42)
            sampled = True
            warnings.append(f"Scatter plot points sampled to {MAX_VISIBLE_POINTS} for performance.")

        result_data = sub_df.to_dict(orient="records")
        
        # Pearson correlation
        if len(sub_df) > 2:
            r_val, p_val = stats.pearsonr(sub_df[x_col], sub_df[y_col])
            stats_out = {"pearson_r": round(float(r_val), 3), "p_value": round(float(p_val), 4)}
            insight = f"Pearson correlation between {x_col} and {y_col} is r = {r_val:.3f}."
        else:
            insight = f"Scatter plot generated for {x_col} vs {y_col}."

    elif chart_type == "kpi_card":
        metric_col = y or (df.select_dtypes(include=[np.number]).columns[0] if not df.select_dtypes(include=[np.number]).empty else None)
        if metric_col:
            s = pd.to_numeric(df[metric_col], errors="coerce").dropna()
            val = float(s.mean()) if aggregation == "mean" else float(s.sum())
            result_data = [{"metric": metric_col, "value": round(val, 2), "total_records": len(s)}]
            insight = f"Average {metric_col} is {val:.2f} across {len(s):,} records."
        else:
            result_data = [{"metric": "Total Records", "value": len(df)}]
            insight = f"Total dataset size is {len(df):,} records."

    else:
        # Fallback to preview rows
        result_data = df.head(100).to_dict(orient="records")
        insight = f"Rendered preview data for chart type '{chart_type}'."

    return result_data, stats_out, insight, warnings, sampled
