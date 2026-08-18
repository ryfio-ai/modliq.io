/**
 * MODLIQER YC-Style Modular AI Infrastructure Stack Registry
 * Tracks modular AI primitives across data labeling, model routing, vector search, RAG, evals, and inference monitoring.
 * Last verified: 17/08/2026
 */

export type ModularAiStatus = "LIVE" | "BETA" | "PLANNED" | "ROADMAP" | "DISABLED";

export type ModularAiComponentKey =
  | "DATA_LABELING"
  | "FINE_TUNING_PREP"
  | "MODEL_ROUTER"
  | "AGENT_ORCHESTRATION"
  | "CREDENTIAL_VAULT"
  | "VECTOR_SEARCH"
  | "RAG"
  | "EVALUATION"
  | "INFERENCE_MONITOR"
  | "AGENT_RUN_MANAGER";

export type ModularAiComponent = {
  key: ModularAiComponentKey;
  name: string;
  status: ModularAiStatus;
  description: string;
  useCases: string[];
  docsPath: string;
  uiRoute?: string;
  apiEndpoint?: string;
};

export const MODULAR_AI_STACK_REGISTRY: Record<ModularAiComponentKey, ModularAiComponent> = {
  DATA_LABELING: {
    key: "DATA_LABELING",
    name: "Data Labeling Workspace",
    status: "BETA",
    description: "Multi-modal tabular, defect, QA pair, and document tagging labeling workspace.",
    useCases: [
      "Label defective vs non-defective parts",
      "Tag supplier risk categories",
      "Create QA pairs for DocuMind RAG",
    ],
    docsPath: "docs/06-ai/DATA_LABELING.md",
    uiRoute: "/ai-stack/labeling",
    apiEndpoint: "/api/v1/projects/:projectId/labeling/projects",
  },
  FINE_TUNING_PREP: {
    key: "FINE_TUNING_PREP",
    name: "Fine-Tuning Preparation",
    status: "BETA",
    description: "Export labeled examples into OpenAI Chat JSONL, Instruction JSONL, or Classification JSONL.",
    useCases: [
      "Export QA pairs for domain LLM fine-tuning",
      "Prepare manufacturing defect classification datasets",
    ],
    docsPath: "docs/06-ai/FINE_TUNING_PREP.md",
    uiRoute: "/ai-stack/fine-tuning",
    apiEndpoint: "/api/v1/projects/:projectId/fine-tuning/export",
  },
  MODEL_ROUTER: {
    key: "MODEL_ROUTER",
    name: "Multi-Provider Model Router",
    status: "LIVE",
    description: "Unified model routing across Groq, Gemini, NVIDIA, Cohere, Cloudflare, and OpenRouter with fallback strategies.",
    useCases: [
      "Fastest provider selection",
      "High-reasoning model fallback",
      "Low-cost latency-sensitive inference",
    ],
    docsPath: "docs/06-ai/MODEL_ROUTER.md",
    uiRoute: "/admin/ai-stack/model-router",
    apiEndpoint: "/api/v1/ai-stack/model-router/status",
  },
  AGENT_ORCHESTRATION: {
    key: "AGENT_ORCHESTRATION",
    name: "Agent Orchestration Engine",
    status: "BETA",
    description: "State-machine agent task pilot with tool execution controls and human approval gates.",
    useCases: [
      "Automated root-cause investigation",
      "Multi-step report synthesis",
      "Approval-gated data transformations",
    ],
    docsPath: "docs/01-architecture/AGENTIC_ARCHITECTURE.md",
    uiRoute: "/ai-stack/agent-runs",
    apiEndpoint: "/api/v1/projects/:projectId/agents/runs",
  },
  CREDENTIAL_VAULT: {
    key: "CREDENTIAL_VAULT",
    name: "Credential Vault & Isolation",
    status: "BETA",
    description: "Server-side credential references ensuring raw API keys and database strings are never passed to agents or clients.",
    useCases: [
      "Isolated agent connector access",
      "Tool permission scoping",
      "Revocable credential references",
    ],
    docsPath: "docs/07-security/SECURITY_OVERVIEW.md",
    uiRoute: "/admin/ai-stack",
    apiEndpoint: "/api/v1/projects/:projectId/credentials",
  },
  VECTOR_SEARCH: {
    key: "VECTOR_SEARCH",
    name: "Vector Search Layer",
    status: "BETA",
    description: "Qdrant vector collection management, chunk embeddings, and semantic similarity search.",
    useCases: [
      "PDF & SOP chunk search",
      "Quality Passport historical lookup",
      "Enterprise KB retrieval",
    ],
    docsPath: "docs/06-ai/VECTOR_SEARCH.md",
    uiRoute: "/ai-stack/vector-search",
    apiEndpoint: "/api/v1/projects/:projectId/vector/collections",
  },
  RAG: {
    key: "RAG",
    name: "DocuMind RAG Engine",
    status: "BETA",
    description: "Grounded retrieval-augmented generation with exact document page citations.",
    useCases: [
      "Manufacturing manual Q&A",
      "SOP compliance check",
      "Research paper summarization",
    ],
    docsPath: "docs/06-ai/GENERATIVE_AI_STACK.md",
    uiRoute: "/ai-stack/vector-search",
    apiEndpoint: "/api/v1/admin/ai/rag-status",
  },
  EVALUATION: {
    key: "EVALUATION",
    name: "Evaluation Studio",
    status: "BETA",
    description: "RAG citation accuracy check, LLM answer quality evals, and agent task scorecards.",
    useCases: [
      "Grounding citation verification",
      "Prompt regression test suites",
      "Automated answer quality scoring",
    ],
    docsPath: "docs/06-ai/EVALUATION_STUDIO.md",
    uiRoute: "/ai-stack/evals",
    apiEndpoint: "/api/v1/projects/:projectId/evals",
  },
  INFERENCE_MONITOR: {
    key: "INFERENCE_MONITOR",
    name: "Inference & Performance Monitor",
    status: "LIVE",
    description: "Real-time tracking of LLM provider latency, failure rates, token usage, ML job times, and agent tool execution times.",
    useCases: [
      "Provider SLA monitoring",
      "Latency breakdown analysis",
      "Error rate diagnostics",
    ],
    docsPath: "docs/06-ai/INFERENCE_MONITOR.md",
    uiRoute: "/admin/ai-stack/inference-monitor",
    apiEndpoint: "/api/v1/ai-stack/inference-monitor",
  },
  AGENT_RUN_MANAGER: {
    key: "AGENT_RUN_MANAGER",
    name: "Agent Run Manager",
    status: "BETA",
    description: "Audit view, tool execution logs, step retries, and approval history for agent runs.",
    useCases: [
      "Agent execution history audit",
      "Tool call failure inspection",
      "Step retry management",
    ],
    docsPath: "docs/06-ai/AGENT_RUN_MANAGER.md",
    uiRoute: "/admin/ai-stack/agent-runs",
    apiEndpoint: "/api/v1/projects/:projectId/agents/runs",
  },
};

export async function getPublicAiStackStatus() {
  const componentsList = Object.values(MODULAR_AI_STACK_REGISTRY);
  return {
    platform: "MODLIQER Modular AI Infrastructure Stack",
    tagline: "Analyze data. Build models. Prove results — without code.",
    lastVerified: "17/08/2026",
    summary: {
      totalPrimitives: componentsList.length,
      live: componentsList.filter((c) => c.status === "LIVE").length,
      beta: componentsList.filter((c) => c.status === "BETA").length,
    },
    primitives: componentsList.map((c) => ({
      key: c.key,
      name: c.name,
      status: c.status,
      description: c.description,
      docsPath: c.docsPath,
      uiRoute: c.uiRoute,
    })),
  };
}

export async function getDetailedAiStackDiagnostics() {
  const publicStatus = await getPublicAiStackStatus();
  return {
    ...publicStatus,
    detailedPrimitives: Object.values(MODULAR_AI_STACK_REGISTRY),
  };
}
