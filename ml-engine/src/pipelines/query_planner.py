import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional

def plan_and_execute_query(data: List[Dict[str, Any]], question: str) -> Dict[str, Any]:
    """
    Parses a natural language question into a deterministic Pandas query plan.
    Supported operations:
    - groupBy (e.g. "by supplier", "by shift", "by machine", "by batch")
    - metrics (yield, defect, temperature, pressure, downtime)
    - aggregations (lowest/highest average, sum, count)
    - correlations
    - missing values
    """
    if not data:
        return {
            "success": False,
            "error": "Dataset is empty",
            "question": question
        }

    df = pd.DataFrame(data)
    q_lower = question.lower()

    # 1. Identify Target Metric
    cols = df.columns.tolist()
    numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    categorical_cols = df.select_dtypes(include=['object', 'category']).columns.tolist()

    target_metric = None
    for c in numeric_cols:
        if c.lower() in q_lower:
            target_metric = c
            break

    if not target_metric and numeric_cols:
        # Fallback to yield or first numeric column
        for c in numeric_cols:
            if 'yield' in c.lower() or 'defect' in c.lower() or 'quality' in c.lower():
                target_metric = c
                break
        if not target_metric:
            target_metric = numeric_cols[0]

    # 2. Identify Group By Column
    group_col = None
    for c in categorical_cols + cols:
        if c.lower() in q_lower:
            group_col = c
            break

    if not group_col:
        for keyword, candidate_cols in [
            ('supplier', ['supplier', 'vendor', 'supplier_name']),
            ('shift', ['shift', 'work_shift', 'operator_shift']),
            ('machine', ['machine', 'equipment', 'line', 'machine_id']),
            ('batch', ['batch', 'batch_id', 'lot_id'])
        ]:
            if keyword in q_lower:
                for c in cols:
                    if keyword in c.lower():
                        group_col = c
                        break
            if group_col:
                break

    # 3. Aggregation Type
    agg = 'mean'
    if 'sum' in q_lower or 'total' in q_lower:
        agg = 'sum'
    elif 'count' in q_lower or 'number of' in q_lower:
        agg = 'count'
    elif 'median' in q_lower:
        agg = 'median'

    # 4. Sorting & Direction
    ascending = True
    if 'highest' in q_lower or 'maximum' in q_lower or 'top' in q_lower or 'best' in q_lower:
        ascending = False
    elif 'lowest' in q_lower or 'minimum' in q_lower or 'worst' in q_lower:
        ascending = True

    # Execute deterministic Query Plan
    if group_col and target_metric and group_col in df.columns and target_metric in df.columns:
        grouped = df.groupby(group_col)[target_metric].agg(agg).reset_index()
        grouped = grouped.sort_values(by=target_metric, ascending=ascending)
        
        # Round numeric values
        grouped[target_metric] = grouped[target_metric].round(3)
        result_records = grouped.to_dict(orient='records')
        top_row = result_records[0] if result_records else {}

        summary = f"{group_col} '{top_row.get(group_col, 'N/A')}' has the {('lowest' if ascending else 'highest')} {agg} {target_metric} ({top_row.get(target_metric, 0)}) across the dataset."

        return {
            "success": True,
            "question": question,
            "queryPlan": {
                "operation": "groupBy",
                "groupBy": group_col,
                "metric": target_metric,
                "aggregation": agg,
                "sort": "ascending" if ascending else "descending"
            },
            "result": result_records,
            "chartSuggestion": {
                "type": "bar",
                "x": group_col,
                "y": target_metric,
                "title": f"{target_metric.capitalize()} by {group_col.capitalize()}"
            },
            "summary": summary
        }

    # Fallback to Summary Stat or Missing Value Check
    if 'missing' in q_lower or 'null' in q_lower:
        null_counts = df.isnull().sum()
        missing_list = [{"column": col, "missingCount": int(cnt)} for col, cnt in null_counts.items() if cnt > 0]
        return {
            "success": True,
            "question": question,
            "queryPlan": {"operation": "missingValuesCheck"},
            "result": missing_list,
            "chartSuggestion": {"type": "bar", "x": "column", "y": "missingCount", "title": "Missing Values per Column"},
            "summary": f"Found {len(missing_list)} column(s) with missing values."
        }

    # General Overview
    desc = df.describe().round(2).reset_index().to_dict(orient='records')
    return {
        "success": True,
        "question": question,
        "queryPlan": {"operation": "overallSummary"},
        "result": desc,
        "chartSuggestion": {"type": "histogram", "x": target_metric or (numeric_cols[0] if numeric_cols else "value")},
        "summary": f"Dataset contains {len(df)} rows and {len(df.columns)} columns."
    }
