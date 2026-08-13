from pydantic import BaseModel, Field
from typing import Any, Literal

ChartType = Literal[
    "bar",
    "line",
    "scatter",
    "histogram",
    "boxplot",
    "heatmap",
    "pareto",
    "area",
    "pie",
    "donut",
    "radar",
    "kpi_card",
    "control_chart"
]

RendererType = Literal[
    "data",
    "matplotlib",
    "seaborn",
    "pygal",
    "altair",
    "bokeh",
    "plotnine"
]

OutputFormat = Literal[
    "json",
    "png_base64",
    "svg",
    "html",
    "vega_lite"
]

class VisualizationRequest(BaseModel):
    rows: list[dict[str, Any]]
    chartType: ChartType
    renderer: RendererType = "data"
    outputFormat: OutputFormat = "json"
    x: str | None = None
    y: str | None = None
    groupBy: str | None = None
    aggregation: Literal["mean", "median", "sum", "count", "min", "max"] | None = "mean"
    filters: list[dict[str, Any]] = Field(default_factory=list)
    title: str | None = None
    options: dict[str, Any] = Field(default_factory=dict)

class VisualizationResponse(BaseModel):
    success: bool
    chartType: str
    renderer: str
    outputFormat: str
    title: str | None = None
    data: list[dict[str, Any]] = Field(default_factory=list)
    config: dict[str, Any] = Field(default_factory=dict)
    stats: dict[str, Any] = Field(default_factory=dict)
    insight: str | None = None
    artifact: str | None = None
    warnings: list[str] = Field(default_factory=list)
    sampled: bool = False
