export type ChartType =
  | 'bar'
  | 'line'
  | 'scatter'
  | 'histogram'
  | 'boxplot'
  | 'heatmap'
  | 'pareto'
  | 'control_chart'
  | 'stacked_bar'
  | 'area'
  | 'pie'
  | 'donut'
  | 'radar'
  | 'kpi_card';

export type ChartStatus = 'LIVE' | 'BETA' | 'COMING_SOON';

export type ColumnTypeRequirement = 'numeric' | 'categorical' | 'datetime';

export interface ChartRegistryItem {
  id: ChartType;
  label: string;
  description: string;
  bestFor: string[];
  manufacturingUseCases: string[];
  requiredColumns: {
    x?: ColumnTypeRequirement;
    y?: ColumnTypeRequirement;
    groupBy?: ColumnTypeRequirement;
  };
  status: ChartStatus;
}

export const CHART_REGISTRY: Record<ChartType, ChartRegistryItem> = {
  bar: {
    id: 'bar',
    label: 'Bar Chart',
    description: 'Compares discrete categories such as suppliers, shifts, lines, machines, or defect causes.',
    bestFor: ['Comparing categorical metrics', 'Supplier ranking', 'Shift yield breakdown'],
    manufacturingUseCases: ['Average yield by supplier', 'Defects by shift', 'Scrap rate by line', 'Machine downtime frequency'],
    requiredColumns: { x: 'categorical', y: 'numeric' },
    status: 'LIVE',
  },
  line: {
    id: 'line',
    label: 'Line Chart',
    description: 'Tracks continuous trends over time or sequence numbers for process metrics.',
    bestFor: ['Time-series trends', 'Process drift analysis', 'Continuous parameter tracking'],
    manufacturingUseCases: ['Yield over time', 'Hourly throughput', 'Temperature stability over shift', 'Scrap rate trend'],
    requiredColumns: { x: 'datetime', y: 'numeric' },
    status: 'LIVE',
  },
  scatter: {
    id: 'scatter',
    label: 'Scatter Plot',
    description: 'Plots two continuous numeric variables to uncover correlations, clustering, and outliers.',
    bestFor: ['Process variable relationships', 'Root cause discovery', 'Correlation analysis'],
    manufacturingUseCases: ['Temperature vs Yield', 'Pressure vs Defect Rate', 'Speed vs Surface Roughness'],
    requiredColumns: { x: 'numeric', y: 'numeric' },
    status: 'LIVE',
  },
  histogram: {
    id: 'histogram',
    label: 'Histogram',
    description: 'Displays the frequency distribution and spread of a single numeric process variable.',
    bestFor: ['Evaluating distribution shape', 'Detecting skewness', 'Identifying bi-modal variations'],
    manufacturingUseCases: ['Yield distribution', 'Batch temperature spread', 'Part thickness distribution'],
    requiredColumns: { x: 'numeric' },
    status: 'LIVE',
  },
  boxplot: {
    id: 'boxplot',
    label: 'Boxplot Summary',
    description: 'Visualizes median, quartiles, interquartile range (IQR), and extreme process outliers.',
    bestFor: ['Outlier detection', 'Comparing distribution variance across categories'],
    manufacturingUseCases: ['Pressure variance by shift', 'Cycle time distribution per product line'],
    requiredColumns: { x: 'categorical', y: 'numeric' },
    status: 'LIVE',
  },
  heatmap: {
    id: 'heatmap',
    label: 'Correlation Heatmap',
    description: 'Shows pairwise Pearson correlation coefficients between multiple numeric process variables.',
    bestFor: ['Multi-variable correlation', 'Identifying colinear parameters', 'Root cause feature selection'],
    manufacturingUseCases: ['Process variable correlation matrix', 'Sensor cross-talk analysis'],
    requiredColumns: {},
    status: 'LIVE',
  },
  pareto: {
    id: 'pareto',
    label: 'Pareto Chart',
    description: 'Combines bars sorted by frequency/impact with a cumulative percentage line (80/20 rule).',
    bestFor: ['Identifying vital few downtime/defect drivers', 'Prioritizing Kaizen actions'],
    manufacturingUseCases: ['Downtime reason breakdown', 'Defect category distribution', 'Waste cost contribution'],
    requiredColumns: { x: 'categorical', y: 'numeric' },
    status: 'LIVE',
  },
  kpi_card: {
    id: 'kpi_card',
    label: 'KPI Summary Card',
    description: 'Highlights a single key performance indicator with status badges and comparison metrics.',
    bestFor: ['Executive summary', 'OEE total score', 'Audit readiness indicator'],
    manufacturingUseCases: ['Overall Plant OEE', 'First Pass Yield (FPY)', 'Cpk Capability Metric'],
    requiredColumns: { y: 'numeric' },
    status: 'LIVE',
  },
  control_chart: {
    id: 'control_chart',
    label: 'SPC Control Chart (I-MR)',
    description: 'Monitors process stability over time relative to Upper (UCL) and Lower (LCL) Control Limits.',
    bestFor: ['Statistical Process Control (SPC)', 'Detecting out-of-control signals'],
    manufacturingUseCases: ['Individual value & moving range (I-MR)', 'Critical dimension control'],
    requiredColumns: { x: 'datetime', y: 'numeric' },
    status: 'BETA',
  },
  stacked_bar: {
    id: 'stacked_bar',
    label: 'Stacked Bar Chart',
    description: 'Shows composition of totals split across sub-categories within main category groups.',
    bestFor: ['Category decomposition', 'Multi-shift defect breakdown'],
    manufacturingUseCases: ['Scrap types by machine', 'Downtime reasons per shift'],
    requiredColumns: { x: 'categorical', y: 'numeric', groupBy: 'categorical' },
    status: 'BETA',
  },
  area: {
    id: 'area',
    label: 'Area Chart',
    description: 'Highlights cumulative totals or volume changes over time.',
    bestFor: ['Cumulative output', 'Total energy consumption tracking'],
    manufacturingUseCases: ['Cumulative production output', 'Total downtime accumulation'],
    requiredColumns: { x: 'datetime', y: 'numeric' },
    status: 'BETA',
  },
  pie: {
    id: 'pie',
    label: 'Pie Chart',
    description: 'Displays proportional breakdown for datasets with few categories (<= 6).',
    bestFor: ['Proportional comparison for small category counts'],
    manufacturingUseCases: ['Scrap reason share', 'Shift volume ratio'],
    requiredColumns: { x: 'categorical', y: 'numeric' },
    status: 'BETA',
  },
  donut: {
    id: 'donut',
    label: 'Donut Chart',
    description: 'Displays proportions with a hollow center for summary statistics.',
    bestFor: ['OEE component breakdown', 'Yield vs scrap ratio'],
    manufacturingUseCases: ['Availability vs Performance vs Quality OEE components'],
    requiredColumns: { x: 'categorical', y: 'numeric' },
    status: 'BETA',
  },
  radar: {
    id: 'radar',
    label: 'Radar Chart',
    description: 'Multi-axis chart for comparing multidimensional performance scores.',
    bestFor: ['5S Audit comparisons', 'Supplier scorecard multi-attribute ratings'],
    manufacturingUseCases: ['5S Audit score across areas', 'Supplier rating across Quality, Delivery, Cost'],
    requiredColumns: { x: 'categorical', y: 'numeric' },
    status: 'BETA',
  },
};

export function getSupportedChartTypes(): ChartRegistryItem[] {
  return Object.values(CHART_REGISTRY);
}
