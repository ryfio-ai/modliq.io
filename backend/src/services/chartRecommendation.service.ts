export interface ColumnProfile {
  name: string;
  type: 'numeric' | 'categorical' | 'datetime';
  uniqueValues?: number;
  missingValues?: number;
  min?: number;
  max?: number;
  mean?: number;
}

export interface ChartRecommendation {
  id: string;
  title: string;
  whyRecommended: string;
  chartType: string;
  source: 'EDA' | 'QUALITY' | 'OPERATIONS' | 'SUPPLY_CHAIN' | 'LEAN' | 'CUSTOM';
  config: {
    x?: string;
    y?: string;
    groupBy?: string;
    aggregation?: 'mean' | 'median' | 'sum' | 'count' | 'min' | 'max';
    bins?: number;
  };
}

export function generateChartRecommendations(
  columns: ColumnProfile[],
  datasetAnalytics?: any,
  edaReport?: any
): ChartRecommendation[] {
  const recommendations: ChartRecommendation[] = [];

  if (!columns || columns.length === 0) {
    return recommendations;
  }

  const numericCols = columns.filter((c) => c.type === 'numeric');
  const categoricalCols = columns.filter((c) => c.type === 'categorical');
  const datetimeCols = columns.filter((c) => c.type === 'datetime' || /date|time|timestamp|created|shift_date/i.test(c.name));

  const colNames = columns.map((c) => c.name.toLowerCase());

  // Helper to find column matching patterns
  const findCol = (patterns: RegExp[]) => {
    return columns.find((c) => patterns.some((p) => p.test(c.name.toLowerCase())));
  };

  // 1. Downtime Pareto
  const downtimeReasonCol = findCol([/downtime_reason/, /downtime_cause/, /stop_reason/, /failure_reason/, /waste_type/]);
  const downtimeMinutesCol = findCol([/downtime_minutes/, /downtime/, /duration_minutes/, /loss_minutes/]);

  if (downtimeReasonCol && downtimeMinutesCol) {
    recommendations.push({
      id: 'rec_downtime_pareto',
      title: 'Downtime Pareto Analysis',
      whyRecommended: `Ranks top root-cause drivers for ${downtimeMinutesCol.name} using the 80/20 Pareto rule.`,
      chartType: 'pareto',
      source: 'OPERATIONS',
      config: {
        x: downtimeReasonCol.name,
        y: downtimeMinutesCol.name,
        aggregation: 'sum',
      },
    });
  }

  // 2. Supply Chain / Supplier Scorecard
  const supplierCol = findCol([/supplier/, /vendor/, /material_lot/, /lot_code/]);
  const yieldCol = findCol([/yield/, /pass_rate/, /first_pass_yield/, /quality_rate/]);
  const defectCol = findCol([/defect/, /reject_count/, /scrap_rate/]);

  if (supplierCol && yieldCol) {
    recommendations.push({
      id: 'rec_supplier_yield',
      title: `Average ${yieldCol.name} by ${supplierCol.name}`,
      whyRecommended: `Highlights supplier variance and low-performing raw material vendor lots.`,
      chartType: 'bar',
      source: 'SUPPLY_CHAIN',
      config: {
        x: supplierCol.name,
        y: yieldCol.name,
        aggregation: 'mean',
      },
    });
  }

  if (supplierCol && defectCol) {
    recommendations.push({
      id: 'rec_supplier_defects',
      title: `Total ${defectCol.name} by ${supplierCol.name}`,
      whyRecommended: `Identifies high-defect vendors impacting incoming material quality.`,
      chartType: 'bar',
      source: 'SUPPLY_CHAIN',
      config: {
        x: supplierCol.name,
        y: defectCol.name,
        aggregation: 'sum',
      },
    });
  }

  // 3. Time Series Trends
  const timeCol = datetimeCols[0] || findCol([/timestamp/, /datetime/, /date/, /time/]);
  const metricCol = yieldCol || numericCols[0];

  if (timeCol && metricCol) {
    recommendations.push({
      id: 'rec_time_trend',
      title: `${metricCol.name} Over Time`,
      whyRecommended: `Tracks shift-by-shift or daily process stability and detects temporal drift.`,
      chartType: 'line',
      source: 'OPERATIONS',
      config: {
        x: timeCol.name,
        y: metricCol.name,
        aggregation: 'mean',
      },
    });
  }

  // 4. Scatter Plots for Process Variable Relationships
  const tempCol = findCol([/temp/, /temperature/]);
  const pressureCol = findCol([/pressure/, /kpa/, /psi/, /force/]);

  if (tempCol && yieldCol) {
    recommendations.push({
      id: 'rec_temp_vs_yield',
      title: `${tempCol.name} vs ${yieldCol.name} Correlation`,
      whyRecommended: `Reveals operational window sweet spots and thermal threshold impact on quality.`,
      chartType: 'scatter',
      source: 'QUALITY',
      config: {
        x: tempCol.name,
        y: yieldCol.name,
      },
    });
  } else if (pressureCol && yieldCol) {
    recommendations.push({
      id: 'rec_pressure_vs_yield',
      title: `${pressureCol.name} vs ${yieldCol.name}`,
      whyRecommended: `Examines mechanical pressure influence on final product yield.`,
      chartType: 'scatter',
      source: 'QUALITY',
      config: {
        x: pressureCol.name,
        y: yieldCol.name,
      },
    });
  } else if (numericCols.length >= 2) {
    const n1 = numericCols[0];
    const n2 = numericCols[1];
    recommendations.push({
      id: `rec_scatter_${n1.name}_${n2.name}`,
      title: `${n1.name} vs ${n2.name}`,
      whyRecommended: `Evaluates relationship and clustering between ${n1.name} and ${n2.name}.`,
      chartType: 'scatter',
      source: 'EDA',
      config: {
        x: n1.name,
        y: n2.name,
      },
    });
  }

  // 5. Histograms & Boxplots for Distributions
  if (numericCols.length > 0) {
    const targetDistCol = yieldCol || numericCols[0];
    recommendations.push({
      id: `rec_hist_${targetDistCol.name}`,
      title: `${targetDistCol.name} Frequency Distribution`,
      whyRecommended: `Shows normality, spread, and process centering around nominal targets.`,
      chartType: 'histogram',
      source: 'QUALITY',
      config: {
        x: targetDistCol.name,
        bins: 12,
      },
    });

    const shiftCol = findCol([/shift/, /line/, /machine/, /operator/]) || categoricalCols[0];
    if (shiftCol) {
      recommendations.push({
        id: `rec_boxplot_${targetDistCol.name}`,
        title: `${targetDistCol.name} Spread by ${shiftCol.name}`,
        whyRecommended: `Compares variance, median, IQR, and extreme outliers across operating shifts/lines.`,
        chartType: 'boxplot',
        source: 'QUALITY',
        config: {
          x: shiftCol.name,
          y: targetDistCol.name,
        },
      });
    }
  }

  // 6. Correlation Heatmap
  if (numericCols.length >= 3) {
    recommendations.push({
      id: 'rec_correlation_heatmap',
      title: 'Process Variable Correlation Matrix',
      whyRecommended: `Multi-variable Pearson correlation matrix to pinpoint co-linear sensor parameters.`,
      chartType: 'heatmap',
      source: 'EDA',
      config: {},
    });
  }

  // 7. OEE KPI Cards
  const goodCountCol = findCol([/good_count/, /passed_units/]);
  const totalCountCol = findCol([/total_count/, /total_produced/]);

  if (goodCountCol || yieldCol) {
    recommendations.push({
      id: 'rec_oee_kpi',
      title: 'Overall Quality & Yield KPI Card',
      whyRecommended: `Summarizes key production health score for Quality Passport reporting.`,
      chartType: 'kpi_card',
      source: 'OPERATIONS',
      config: {
        y: (goodCountCol || yieldCol)!.name,
        aggregation: 'mean',
      },
    });
  }

  // 8. SPC Control Chart
  if (yieldCol || tempCol) {
    const spcCol = yieldCol || tempCol;
    recommendations.push({
      id: 'rec_spc_chart',
      title: `${spcCol!.name} Statistical Process Control (I-MR)`,
      whyRecommended: `Checks whether ${spcCol!.name} is operating within 3-sigma Upper/Lower control limits.`,
      chartType: 'control_chart',
      source: 'QUALITY',
      config: {
        x: timeCol ? timeCol.name : undefined,
        y: spcCol!.name,
      },
    });
  }

  return recommendations;
}
