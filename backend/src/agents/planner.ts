import { ClassifiedIntent } from './intentClassifier';
import { AgentContext } from './contextBuilder';
import { isActionRequiringApproval } from './agentGuardrails';

export interface PlannedTask {
  step: number;
  toolName: string;
  description: string;
  requiresApproval: boolean;
  actionType?: string;
  input: Record<string, any>;
}

export interface AgentPlan {
  runId?: string;
  mode: string;
  intent: string;
  requiresApproval: boolean;
  approvalActionType?: string;
  tasks: PlannedTask[];
  summary: string;
}

export function planAgentExecution(intent: ClassifiedIntent, context: AgentContext, prompt: string): AgentPlan {
  const tasks: PlannedTask[] = [];
  let requiresApproval = false;
  let approvalActionType: string | undefined = undefined;

  switch (intent.intent) {
    case 'OPTIMIZATION':
      requiresApproval = true;
      approvalActionType = 'RUN_OPTIMIZATION';
      tasks.push(
        { step: 1, toolName: 'parseGoal', description: 'Parse optimization target & constraints from goal prompt', requiresApproval: false, input: { prompt } },
        { step: 2, toolName: 'crosscheckGoal', description: 'Validate feature alignment and safety bounds', requiresApproval: false, input: { prompt } },
        { step: 3, toolName: 'runOptimization', description: 'Execute ML optimization job and calculate setpoints', requiresApproval: true, actionType: 'RUN_OPTIMIZATION', input: { prompt } }
      );
      break;

    case 'CLEANING_RECOMMENDATION':
      requiresApproval = true;
      approvalActionType = 'APPLY_CLEANING';
      tasks.push(
        { step: 1, toolName: 'recommendCleaning', description: 'Analyze missing timestamps, outliers, and flatline sensors', requiresApproval: false, input: { prompt } },
        { step: 2, toolName: 'applyCleaning', description: 'Apply data cleaning and create new dataset version', requiresApproval: true, actionType: 'APPLY_CLEANING', input: { prompt } }
      );
      break;

    case 'QUALITY_PASSPORT':
      requiresApproval = true;
      approvalActionType = 'EXPORT_QUALITY_PASSPORT';
      tasks.push(
        { step: 1, toolName: 'generateQualityPassport', description: 'Compile industrial data lineage, MLOps evidence, and quality checks', requiresApproval: false, input: { prompt } },
        { step: 2, toolName: 'exportPassport', description: 'Export buyer-ready Quality Passport document', requiresApproval: true, actionType: 'EXPORT_QUALITY_PASSPORT', input: { prompt } }
      );
      break;

    case 'SOP':
    case 'CAPA':
      tasks.push(
        { step: 1, toolName: 'runQualitySummary', description: 'Fetch SPC & Cpk out-of-control indicators', requiresApproval: false, input: {} },
        { step: 2, toolName: intent.intent === 'CAPA' ? 'generateCapa' : 'generateSop', description: `Draft ${intent.intent} corrective action report`, requiresApproval: false, input: { prompt } }
      );
      break;

    case 'OEE_ANALYSIS':
      tasks.push(
        { step: 1, toolName: 'runOeeSummary', description: 'Evaluate availability, performance, and quality metrics', requiresApproval: false, input: {} }
      );
      break;

    case 'SUPPLIER_RISK':
      tasks.push(
        { step: 1, toolName: 'runSupplyChainSummary', description: 'Correlate supplier lots with yield and defect rates', requiresApproval: false, input: {} }
      );
      break;

    case 'EDA_ANALYSIS':
    case 'DATA_QUERY':
    default:
      tasks.push(
        { step: 1, toolName: 'runEda', description: 'Inspect dataset distributions, correlations, and missing data', requiresApproval: false, input: {} },
        { step: 2, toolName: 'suggestCharts', description: 'Identify key process variables and correlation drivers', requiresApproval: false, input: {} }
      );
      break;
  }

  const summary = `Modliq Agent planned ${tasks.length} step(s) under ${intent.mode} mode.${requiresApproval ? ' Human approval required before critical execution.' : ''}`;

  return {
    mode: intent.mode,
    intent: intent.intent,
    requiresApproval,
    approvalActionType,
    tasks,
    summary,
  };
}
