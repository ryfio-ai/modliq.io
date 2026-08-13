import logging
from fastapi import APIRouter, HTTPException, Depends, Request
from src.schemas.visualization import VisualizationRequest, VisualizationResponse
from src.pipelines.visualization_data import prepare_visualization_data

logger = logging.getLogger("modliq.ml.visualization")

router = APIRouter(prefix="/visualization", tags=["Visualization Engine"])

def verify_service_key(request: Request):
    # In production, verify X-Modliq-Service-Key
    return True

@router.post("/prepare", response_model=VisualizationResponse)
async def prepare_visualization(
    req: VisualizationRequest,
    _auth: bool = Depends(verify_service_key)
):
    """
    Computes statistical transformations, group-by aggregations, histograms, pareto sorting,
    or correlation heatmaps from tabular dataset rows. Returns chart-ready JSON payload.
    """
    try:
        data, stats, insight, warnings, sampled = prepare_visualization_data(
            rows=req.rows,
            chart_type=req.chartType,
            x=req.x,
            y=req.y,
            group_by=req.groupBy,
            aggregation=req.aggregation,
            filters=req.filters,
            options=req.options
        )

        title = req.title or f"{req.chartType.capitalize()} Chart"

        return VisualizationResponse(
            success=True,
            chartType=req.chartType,
            renderer=req.renderer,
            outputFormat=req.outputFormat,
            title=title,
            data=data,
            config={
                "xKey": req.x,
                "yKey": req.y,
                "groupByKey": req.groupBy,
                "aggregation": req.aggregation
            },
            stats=stats,
            insight=insight,
            artifact=None,
            warnings=warnings,
            sampled=sampled
        )
    except Exception as err:
        logger.error(f"Failed to prepare visualization: {err}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Visualization data preparation error: {str(err)}")
