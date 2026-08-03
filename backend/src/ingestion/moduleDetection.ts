export interface ModuleDetectionResult {
  optimization: boolean;
  qualityStudio: boolean;
  operations: boolean;
  supplyChain: boolean;
  lean: boolean;
  detectedColumns: {
    optimization: string[];
    qualityStudio: string[];
    operations: string[];
    supplyChain: string[];
    lean: string[];
  };
}

const MODULE_KEYWORDS = {
  optimization: ['yield', 'defect', 'temperature', 'pressure', 'flow_rate', 'ph', 'humidity', 'quality', 'measurement', 'speed'],
  qualityStudio: ['yield', 'defect', 'defect_count', 'lsl', 'usl', 'cp', 'cpk', 'measurement', 'is_pass', 'reject_count', 'scrap_rate'],
  operations: ['line', 'machine', 'shift', 'operator', 'downtime', 'downtime_minutes', 'runtime', 'planned_time', 'cycle_time', 'good_count', 'reject_count', 'total_count', 'scrap_rate'],
  supplyChain: ['supplier', 'vendor', 'material_lot', 'raw_material_lot', 'lot_id', 'incoming_quality', 'received_date', 'incoming_defects'],
  lean: ['waste_type', 'loss_minutes', 'waiting_time', 'changeover_time', 'wip', 'inventory', 'rework', 'motion', 'overprocessing', 'kaizen', '5s'],
};

export function detectModulesFromColumns(columns: string[]): ModuleDetectionResult {
  const normalizedCols = columns.map((c) => c.toLowerCase().trim().replace(/[^a-z0-9_]/g, '_'));

  const detectedColumns = {
    optimization: [] as string[],
    qualityStudio: [] as string[],
    operations: [] as string[],
    supplyChain: [] as string[],
    lean: [] as string[],
  };

  normalizedCols.forEach((col, idx) => {
    const originalCol = columns[idx];
    for (const [moduleKey, keywords] of Object.entries(MODULE_KEYWORDS)) {
      if (keywords.some((kw) => col.includes(kw))) {
        detectedColumns[moduleKey as keyof typeof detectedColumns].push(originalCol);
      }
    }
  });

  // Optimization is enabled if any yield or numeric process variable exists
  const optimization = detectedColumns.optimization.length > 0 || columns.length >= 2;
  const qualityStudio = detectedColumns.qualityStudio.length > 0;
  const operations = detectedColumns.operations.length > 0;
  const supplyChain = detectedColumns.supplyChain.length > 0;
  const lean = detectedColumns.lean.length > 0;

  return {
    optimization,
    qualityStudio,
    operations,
    supplyChain,
    lean,
    detectedColumns,
  };
}
