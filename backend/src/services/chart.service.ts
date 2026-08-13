import { PrismaClient } from '@prisma/client';
import { generateChartRecommendations, ColumnProfile } from './chartRecommendation.service';
import axios from 'axios';

const prisma = new PrismaClient();
const ML_ENGINE_URL = process.env.ML_ENGINE_URL || 'http://localhost:8000';
const ML_SERVICE_KEY = process.env.ML_INTERNAL_API_KEY || '';

export interface ChartConfig {
  chartType: string;
  x?: string;
  y?: string;
  groupBy?: string;
  aggregation?: 'mean' | 'median' | 'sum' | 'count' | 'min' | 'max';
  filters?: Array<{ column: string; operator: string; value: any }>;
  bins?: number;
  title?: string;
  limit?: number;
}

export interface PreviewChartResponse {
  success: boolean;
  chartType: string;
  title: string;
  data: any[];
  config: Record<string, any>;
  stats?: Record<string, any>;
  insight?: string;
  sampled: boolean;
  warnings?: string[];
}

/**
  * Safely parses dataset rows from Dataset previewJson / analyticsJson / database
  */
async function getDatasetRows(datasetId: string): Promise<{ rows: any[]; columns: ColumnProfile[] }> {
  const dataset = await prisma.dataset.findUnique({
    where: { id: datasetId },
  });

  if (!dataset) {
    throw new Error('Dataset not found');
  }

  let rows: any[] = [];
  let columns: ColumnProfile[] = [];

  // Parse previewJson / analyticsJson
  if (dataset.previewJson) {
    try {
      rows = JSON.parse(dataset.previewJson);
    } catch (e) {
      rows = [];
    }
  }

  if (dataset.columnsJson) {
    try {
      columns = JSON.parse(dataset.columnsJson);
    } catch (e) {
      columns = [];
    }
  }

  // Infer columns if missing
  if (columns.length === 0 && rows.length > 0) {
    const sample = rows[0];
    columns = Object.keys(sample).map((key) => {
      const val = sample[key];
      const isNum = typeof val === 'number' && !isNaN(val);
      const isDate = typeof val === 'string' && !isNaN(Date.parse(val)) && (key.includes('date') || key.includes('time'));
      return {
        name: key,
        type: isNum ? 'numeric' : isDate ? 'datetime' : 'categorical',
      };
    });
  }

  return { rows, columns };
}

/**
  * Generate smart recommendations for a dataset
  */
export async function getRecommendedCharts(datasetId: string) {
  const { columns, rows } = await getDatasetRows(datasetId);

  const dataset = await prisma.dataset.findUnique({ where: { id: datasetId } });
  let edaReport: any = null;
  if (dataset?.edaJson) {
    try {
      edaReport = JSON.parse(dataset.edaJson);
    } catch (e) {
      edaReport = null;
    }
  }

  const recommendations = generateChartRecommendations(columns, dataset?.analyticsJson, edaReport);

  return {
    success: true,
    datasetId,
    totalRows: rows.length,
    recommendations,
  };
}

/**
  * Preview chart data based on chartConfig
  */
export async function previewChart(datasetId: string, config: ChartConfig): Promise<PreviewChartResponse> {
  const { rows, columns } = await getDatasetRows(datasetId);

  // Try requesting ML Engine visualization service
  try {
    const res = await axios.post(
      `${ML_ENGINE_URL}/visualization/prepare`,
      {
        rows,
        chartType: config.chartType,
        x: config.x,
        y: config.y,
        groupBy: config.groupBy,
        aggregation: config.aggregation || 'mean',
        filters: config.filters || [],
        title: config.title,
        options: { bins: config.bins || 10, maxRows: config.limit || 10000 },
      },
      {
        headers: { 'X-Modliq-Service-Key': ML_SERVICE_KEY },
        timeout: 5000,
      }
    );

    if (res.data && res.data.success) {
      return {
        success: true,
        chartType: res.data.chartType,
        title: res.data.title || `${config.chartType.toUpperCase()} Preview`,
        data: res.data.data,
        config: res.data.config,
        stats: res.data.stats,
        insight: res.data.insight,
        sampled: res.data.sampled || false,
        warnings: res.data.warnings || [],
      };
    }
  } catch (err: any) {
    // Fallback to local Express JS aggregation if ML Engine is offline
  }

  // Local fallback aggregation logic
  let filteredRows = [...rows];

  if (config.filters && config.filters.length > 0) {
    for (const f of config.filters) {
      filteredRows = filteredRows.filter((r) => {
        const val = r[f.column];
        if (f.operator === 'equals') return val === f.value;
        if (f.operator === 'not_equals') return val !== f.value;
        if (f.operator === 'gt') return Number(val) > Number(f.value);
        if (f.operator === 'gte') return Number(val) >= Number(f.value);
        if (f.operator === 'lt') return Number(val) < Number(f.value);
        if (f.operator === 'lte') return Number(val) <= Number(f.value);
        return true;
      });
    }
  }

  const xKey = config.x || (columns[0] ? columns[0].name : 'x');
  const yKey = config.y || (columns[1] ? columns[1].name : 'y');
  const agg = config.aggregation || 'mean';

  const chartData: any[] = [];
  const map: Record<string, number[]> = {};

  for (const r of filteredRows) {
    const groupVal = String(r[xKey] ?? 'Unknown');
    const numVal = Number(r[yKey]);
    if (!map[groupVal]) map[groupVal] = [];
    if (!isNaN(numVal)) map[groupVal].push(numVal);
  }

  for (const [key, vals] of Object.entries(map)) {
    if (vals.length === 0) continue;
    let computed = 0;
    if (agg === 'mean') computed = vals.reduce((a, b) => a + b, 0) / vals.length;
    else if (agg === 'sum') computed = vals.reduce((a, b) => a + b, 0);
    else if (agg === 'min') computed = Math.min(...vals);
    else if (agg === 'max') computed = Math.max(...vals);
    else if (agg === 'count') computed = vals.length;

    chartData.push({
      [xKey]: key,
      [`${agg}_${yKey}`]: Number(computed.toFixed(2)),
      count: vals.length,
    });
  }

  const title = config.title || `${agg.toUpperCase()} ${yKey} by ${xKey}`;

  return {
    success: true,
    chartType: config.chartType,
    title,
    data: chartData.slice(0, 1000),
    config: { xKey, yKey: `${agg}_${yKey}`, aggregation: agg },
    insight: `Calculated ${agg} of ${yKey} grouped by ${xKey} across ${filteredRows.length} rows.`,
    sampled: filteredRows.length > 1000,
  };
}

/**
  * Save a chart config
  */
export async function saveChart(
  userId: string,
  projectId: string,
  datasetId: string,
  title: string,
  chartType: string,
  config: ChartConfig,
  source: string = 'CUSTOM'
) {
  const preview = await previewChart(datasetId, config);

  const saved = await prisma.savedChart.create({
    data: {
      userId,
      projectId,
      datasetId,
      title: title || preview.title,
      chartType,
      configJson: JSON.stringify(config),
      dataJson: JSON.stringify(preview.data),
      source,
    },
  });

  return {
    success: true,
    savedChart: saved,
  };
}

/**
  * Get saved charts for a project
  */
export async function getSavedCharts(userId: string, projectId: string) {
  const charts = await prisma.savedChart.findMany({
    where: { userId, projectId },
    orderBy: { createdAt: 'desc' },
  });

  return {
    success: true,
    charts,
  };
}

/**
  * Delete a saved chart
  */
export async function deleteSavedChart(userId: string, chartId: string) {
  await prisma.savedChart.deleteMany({
    where: { id: chartId, userId },
  });

  return {
    success: true,
    message: 'Chart deleted successfully',
  };
}
