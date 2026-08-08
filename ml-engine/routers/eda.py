from fastapi import APIRouter, HTTPException, Depends
from src.schemas.eda import EdaRequest, EdaReportResponse
from src.pipelines.eda_analyzer import analyze_dataset_eda

router = APIRouter(prefix="/eda", tags=["EDA"])

@router.post("/analyze", response_model=EdaReportResponse)
async def analyze_eda(request: EdaRequest):
    """
    Perform No-Code Exploratory Data Analysis (EDA) on dataset rows.
    Calculates dataset overview, column profiles, numeric/categorical summaries,
    distributions, Pearson correlation matrix, target analysis, and data quality warnings.
    """
    try:
        if not request.rows:
            raise HTTPException(status_code=400, detail="rows cannot be empty")

        options_dict = request.options.model_dump() if request.options else {}
        result = analyze_dataset_eda(
            rows=request.rows,
            target_column=request.targetColumn,
            options=options_dict
        )

        if not result.get("success", False):
            raise HTTPException(status_code=400, detail=result.get("error", "EDA analysis failed"))

        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"EDA analysis failed: {str(e)}")
