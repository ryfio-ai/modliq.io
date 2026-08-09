/**
 * Modliq Agent Intent Classifier
 * Classifies user manufacturing prompts into specialized agent modes and specific action intents.
 */

export type AgentMode =
  | 'DATA_ANALYST'
  | 'ML_ENGINEER'
  | 'QUALITY'
  | 'OPERATIONS'
  | 'SUPPLY_CHAIN'
  | 'PASSPORT'
  | 'GENERAL';

export type AgentIntentType =
  | 'DATA_QUERY'
  | 'EDA_ANALYSIS'
  | 'CLEANING_RECOMMENDATION'
  | 'GOAL_SETUP'
  | 'OPTIMIZATION'
  | 'QUALITY_ANALYSIS'
  | 'CAPA'
  | 'OEE_ANALYSIS'
  | 'SUPPLIER_RISK'
  | 'LEAN_ACTION'
  | 'QUALITY_PASSPORT'
  | 'SOP'
  | 'DRIFT_CHECK'
  | 'GENERAL_HELP';

export interface ClassifiedIntent {
  mode: AgentMode;
  intent: AgentIntentType;
  confidence: number;
  extractedParams?: Record<string, any>;
}

export function classifyUserPrompt(prompt: string, requestedMode?: string): ClassifiedIntent {
  const p = (prompt || '').toLowerCase();

  // 1. Supply Chain Agent
  if (p.includes('supplier') || p.includes('material lot') || p.includes('vendor') || p.includes('supply chain')) {
    return { mode: 'SUPPLY_CHAIN', intent: 'SUPPLIER_RISK', confidence: 0.95 };
  }

  // 2. Quality Engineer Agent
  if (p.includes('cpk') || p.includes('spc') || p.includes('control chart') || p.includes('capa') || p.includes('aql') || p.includes('defect')) {
    if (p.includes('capa')) return { mode: 'QUALITY', intent: 'CAPA', confidence: 0.95 };
    return { mode: 'QUALITY', intent: 'QUALITY_ANALYSIS', confidence: 0.92 };
  }

  // 3. Operations Agent
  if (p.includes('oee') || p.includes('downtime') || p.includes('bottleneck') || p.includes('shift') || p.includes('cycle time')) {
    return { mode: 'OPERATIONS', intent: 'OEE_ANALYSIS', confidence: 0.95 };
  }

  // 4. Quality Passport Agent
  if (p.includes('passport') || p.includes('buyer summary') || p.includes('sop') || p.includes('audit readiness') || p.includes('trial plan')) {
    if (p.includes('sop')) return { mode: 'PASSPORT', intent: 'SOP', confidence: 0.95 };
    return { mode: 'PASSPORT', intent: 'QUALITY_PASSPORT', confidence: 0.95 };
  }

  // 5. ML Engineer Agent
  if (p.includes('optimize') || p.includes('target') || p.includes('setpoint') || p.includes('benchmark') || p.includes('retrain') || p.includes('drift') || p.includes('feature importance')) {
    if (p.includes('drift') || p.includes('retrain')) return { mode: 'ML_ENGINEER', intent: 'DRIFT_CHECK', confidence: 0.90 };
    return { mode: 'ML_ENGINEER', intent: 'OPTIMIZATION', confidence: 0.95 };
  }

  // 6. Data Analyst Agent
  if (p.includes('eda') || p.includes('correlation') || p.includes('missing') || p.includes('outlier') || p.includes('clean') || p.includes('trend') || p.includes('summary')) {
    if (p.includes('clean')) return { mode: 'DATA_ANALYST', intent: 'CLEANING_RECOMMENDATION', confidence: 0.90 };
    return { mode: 'DATA_ANALYST', intent: 'EDA_ANALYSIS', confidence: 0.92 };
  }

  // Default fallback
  const mode = (requestedMode as AgentMode) || 'GENERAL';
  return { mode, intent: 'GENERAL_HELP', confidence: 0.80 };
}
