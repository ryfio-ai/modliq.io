export type GoalCrosscheckInput = {
  datasetAnalytics?: any;
  healthReport?: any;
  datasetColumns?: string[];
  parsedGoal: {
    target: string;
    goal_direction: 'maximize' | 'minimize';
    threshold?: number | null;
    features?: string[];
    constraints?: Record<string, { min?: number | null; max?: number | null }>;
  };
  detectedModules?: any;
};

export type GoalCrosscheckReview = {
  target: string;
  direction: 'maximize' | 'minimize';
  threshold?: number | null;
  controllableFeatures: string[];
  removedFeatures: string[];
  metadataColumns: string[];
  constraints: Record<string, { min?: number | null; max?: number | null }>;
  warnings: string[];
  recommendedModules: {
    optimization: boolean;
    qualityStudio: boolean;
    trialSop: boolean;
    qualityPassport: boolean;
    trialTracker: boolean;
    operations: boolean;
    supplyChain: boolean;
    lean: boolean;
  };
  recommendedActions: string[];
};

const IDENTIFIER_KEYWORDS = [
  'id',
  'batch_id',
  'lot_id',
  'serial',
  'serial_no',
  'timestamp',
  'date',
  'index',
  'row_id',
  'guid',
  'uuid',
];

export function runGoalCrosscheck(input: GoalCrosscheckInput): GoalCrosscheckReview {
  const { parsedGoal, datasetColumns = [], healthReport, datasetAnalytics } = input;

  const target = (parsedGoal.target || 'yield').trim();
  const direction = parsedGoal.goal_direction || 'maximize';
  const threshold = parsedGoal.threshold ?? null;
  const rawFeatures = parsedGoal.features || [];
  const rawConstraints = parsedGoal.constraints || {};

  const warnings: string[] = [];
  const removedFeatures: string[] = [];
  const metadataColumns: string[] = [];
  const controllableFeatures: string[] = [];

  // Determine available columns
  const allColumns = datasetColumns.length > 0
    ? datasetColumns
    : (datasetAnalytics?.columns || Object.keys(rawConstraints).concat(rawFeatures, [target]));

  const targetLower = target.toLowerCase();

  // ── 1. Target Protection & Feature Scanning ─────────────────────────
  for (const rawFeat of rawFeatures) {
    const featLower = rawFeat.toLowerCase();

    // Target protection
    if (featLower === targetLower) {
      removedFeatures.push(rawFeat);
      warnings.push(`Target variable '${rawFeat}' was removed from controllable process features.`);
      continue;
    }

    // Identifier / Metadata protection
    const isIdentifier = IDENTIFIER_KEYWORDS.some((kw) =>
      featLower === kw || featLower.includes(`_${kw}`) || featLower.includes(`${kw}_`)
    );

    if (isIdentifier) {
      removedFeatures.push(rawFeat);
      metadataColumns.push(rawFeat);
      warnings.push(`'${rawFeat}' appears to be an identifier or timestamp and will be treated as metadata.`);
      continue;
    }

    controllableFeatures.push(rawFeat);
  }

  // Also scan any dataset columns not explicitly listed in features
  allColumns.forEach((col: string) => {
    const colLower = col.toLowerCase();
    const isIdentifier = IDENTIFIER_KEYWORDS.some((kw) =>
      colLower === kw || colLower.includes(`_${kw}`) || colLower.includes(`${kw}_`)
    );

    if (isIdentifier && !metadataColumns.includes(col)) {
      metadataColumns.push(col);
    }
  });

  // If no controllable features were selected, auto-select numeric columns from dataset
  if (controllableFeatures.length === 0 && allColumns.length > 0) {
    allColumns.forEach((col: string) => {
      const colLower = col.toLowerCase();
      if (
        colLower !== targetLower &&
        !metadataColumns.map((m: string) => m.toLowerCase()).includes(colLower)
      ) {
        controllableFeatures.push(col);
      }
    });
  }

  // ── 2. Constraint Validation ────────────────────────────────────────
  const validatedConstraints: Record<string, { min?: number | null; max?: number | null }> = {};

  Object.entries(rawConstraints).forEach(([col, bounds]) => {
    if (allColumns.length > 0 && !allColumns.map((c: string) => c.toLowerCase()).includes(col.toLowerCase())) {
      warnings.push(`Constraint column '${col}' does not exist in the dataset.`);
    }

    if (bounds.min !== undefined && bounds.min !== null && bounds.max !== undefined && bounds.max !== null) {
      if (bounds.min > bounds.max) {
        warnings.push(`Constraint for '${col}' has min (${bounds.min}) greater than max (${bounds.max}).`);
      }
    }

    validatedConstraints[col] = bounds;
  });

  // ── 3. Feature Validation Warning ──────────────────────────────────
  if (controllableFeatures.length === 0) {
    warnings.push('No controllable process variables were identified. Select at least one valid feature before optimization.');
  }

  // ── 4. Health Report Warnings ──────────────────────────────────────
  if (healthReport) {
    if (healthReport.healthScore && healthReport.healthScore < 70) {
      warnings.push(`Dataset health score is low (${healthReport.healthScore}/100). Consider cleaning missing values before trial rollout.`);
    }
    if (healthReport.rowCount && healthReport.rowCount < 50) {
      warnings.push(`Dataset has fewer than 50 rows (${healthReport.rowCount} rows). Optimization confidence may be reduced.`);
    }
  }

  // ── 5. Intelligent Module Recommendations ──────────────────────────
  const colsLower = allColumns.map((c: string) => c.toLowerCase());

  const hasNumericTarget = Boolean(target);
  const isQualityCol = colsLower.some((c: string) =>
    ['yield', 'defect', 'quality', 'measurement', 'dimension', 'assay', 'cpk', 'rejection', 'purity'].some((k) => c.includes(k))
  );

  const hasOperationsCols = colsLower.some((c: string) =>
    ['line', 'machine', 'shift', 'downtime', 'runtime', 'good_count', 'reject_count', 'total_count'].some((k) => c.includes(k))
  );

  const hasSupplyChainCols = colsLower.some((c: string) =>
    ['supplier', 'vendor', 'material_lot', 'raw_material_lot', 'lot_id', 'incoming_quality'].some((k) => c.includes(k))
  );

  const hasLeanCols = colsLower.some((c: string) =>
    ['waste_type', 'downtime_reason', 'scrap', 'rework', 'waiting_time', 'changeover_time'].some((k) => c.includes(k))
  );

  const isOptimizationValid = Boolean(target) && controllableFeatures.length > 0;

  const recommendedModules = {
    optimization: isOptimizationValid,
    qualityStudio: hasNumericTarget || isQualityCol,
    trialSop: isOptimizationValid,
    qualityPassport: true,
    trialTracker: isOptimizationValid,
    operations: hasOperationsCols,
    supplyChain: hasSupplyChainCols,
    lean: hasLeanCols,
  };

  // ── 6. Recommended Actions List ────────────────────────────────────
  const recommendedActions: string[] = [];

  if (controllableFeatures.length > 0) {
    recommendedActions.push(
      `Run ML optimization targeting '${target}' using ${controllableFeatures.slice(0, 3).join(', ')} as controllable process variables.`
    );
  }

  recommendedActions.push(`Validate recommendations through a 7-batch controlled trial plan before plant rollout.`);

  if (recommendedModules.qualityStudio) {
    recommendedActions.push(`Run Quality Studio SPC control charts to verify process stability (Cpk limits).`);
  }

  if (recommendedModules.qualityPassport) {
    recommendedActions.push(`Export a buyer-ready Quality Passport certificate for executive and customer sign-off.`);
  }

  return {
    target,
    direction,
    threshold,
    controllableFeatures,
    removedFeatures,
    metadataColumns,
    constraints: validatedConstraints,
    warnings,
    recommendedModules,
    recommendedActions,
  };
}
