from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class EdaOptions(BaseModel):
    maxRows: Optional[int] = 10000
    includeCorrelation: Optional[bool] = True
    includeDistributions: Optional[bool] = True
    includeOutliers: Optional[bool] = True

class EdaRequest(BaseModel):
    rows: List[Dict[str, Any]]
    targetColumn: Optional[str] = None
    options: Optional[EdaOptions] = Field(default_factory=EdaOptions)

class ColumnOverview(BaseModel):
    name: str
    type: str  # "numeric" | "categorical" | "datetime" | "boolean" | "text" | "unknown"
    missingCount: int
    missingPercentage: float
    uniqueCount: int
    sampleValues: List[Any]

class NumericSummaryItem(BaseModel):
    column: str
    count: int
    mean: Optional[float] = None
    median: Optional[float] = None
    stdDev: Optional[float] = None
    min: Optional[float] = None
    max: Optional[float] = None
    q1: Optional[float] = None
    q3: Optional[float] = None
    iqr: Optional[float] = None
    skewness: Optional[float] = None
    outlierCount: int
    outlierPercentage: float

class CategoricalValue(BaseModel):
    value: str
    count: int
    percentage: float

class CategoricalSummaryItem(BaseModel):
    column: str
    uniqueCount: int
    topValues: List[CategoricalValue]

class HistogramBin(BaseModel):
    min: float
    max: float
    count: int

class DistributionItem(BaseModel):
    column: str
    bins: List[HistogramBin]

class CorrelationPair(BaseModel):
    x: str
    y: str
    value: float

class StrongCorrelationPair(BaseModel):
    columnA: str
    columnB: str
    correlation: float
    interpretation: str

class CorrelationSummary(BaseModel):
    method: str = "pearson"
    matrix: List[CorrelationPair]
    strongPairs: List[StrongCorrelationPair]

class CorrelatedFeature(BaseModel):
    feature: str
    correlation: float

class TargetAnalysisSummary(BaseModel):
    targetColumn: str
    type: str
    missingCount: int
    uniqueCount: int
    outlierCount: Optional[int] = 0
    correlatedFeatures: Optional[List[CorrelatedFeature]] = []
    leakageWarnings: Optional[List[str]] = []

class EdaWarningItem(BaseModel):
    severity: str  # "low" | "medium" | "high"
    code: str
    message: str
    affectedColumns: Optional[List[str]] = []

class EdaReportResponse(BaseModel):
    success: bool = True
    generatedAt: str
    sampled: bool
    rowsAnalyzed: int
    totalRows: int
    totalColumns: int
    overview: Dict[str, Any]
    columns: List[ColumnOverview]
    numericSummary: List[NumericSummaryItem]
    categoricalSummary: List[CategoricalSummaryItem]
    distributions: List[DistributionItem]
    correlations: CorrelationSummary
    targetAnalysis: Optional[TargetAnalysisSummary] = None
    warnings: List[EdaWarningItem]
    recommendations: List[str]
