/**
 * MODLIQER AI/ML Stack Registry Service
 * Central source of truth for Layered AI & Machine Learning Tech Stack components.
 * Last verified: 17/08/2026
 */

export type StackComponentStatus =
  | "IMPLEMENTED"
  | "BETA"
  | "PLANNED"
  | "ROADMAP"
  | "NOT_INSTALLED";

export type AiMlStackCategory =
  | "DATA_INFRASTRUCTURE"
  | "TRADITIONAL_ML"
  | "GENERATIVE_AI"
  | "MLOPS"
  | "EDGE_REALTIME"
  | "VISUALIZATION"
  | "SECURITY";

export type AiMlStackComponent = {
  name: string;
  category: AiMlStackCategory;
  status: StackComponentStatus;
  description: string;
  toolOrLibrary?: string;
  runtimeCheck?: boolean;
  docsPath?: string;
  notes?: string;
};

export const AI_ML_STACK_REGISTRY: AiMlStackComponent[] = [
  // Layer 1: Data Infrastructure
  {
    name: "Primary Operational Database",
    category: "DATA_INFRASTRUCTURE",
    status: "IMPLEMENTED",
    description: "MongoDB Atlas document database via Prisma ORM for structured and semi-structured storage.",
    toolOrLibrary: "MongoDB Atlas / Prisma",
    docsPath: "docs/05-database/MONGODB_SCHEMA.md",
    runtimeCheck: true,
  },
  {
    name: "Job Queue & Event Cache",
    category: "DATA_INFRASTRUCTURE",
    status: "IMPLEMENTED",
    description: "BullMQ on Redis for asynchronous background tasks, AutoML jobs, and document extraction.",
    toolOrLibrary: "BullMQ / Redis",
    docsPath: "docs/03-backend/BACKGROUND_JOBS.md",
    runtimeCheck: true,
  },
  {
    name: "Vector Database (RAG)",
    category: "DATA_INFRASTRUCTURE",
    status: "BETA",
    description: "Qdrant vector database for DocuMind PDF RAG, embeddings storage, and similarity search.",
    toolOrLibrary: "Qdrant",
    docsPath: "docs/06-ai/VECTOR_SEARCH.md",
    runtimeCheck: true,
  },
  {
    name: "Relational Connectors",
    category: "DATA_INFRASTRUCTURE",
    status: "IMPLEMENTED",
    description: "PostgreSQL & Supabase data connectors for enterprise tabular ingestion.",
    toolOrLibrary: "Prisma Postgres Connector",
    docsPath: "docs/01-architecture/LAYERED_AI_ML_STACK.md",
  },
  {
    name: "Industrial Streaming Historians",
    category: "DATA_INFRASTRUCTURE",
    status: "ROADMAP",
    description: "SCADA, OPC-UA, MQTT, and Modbus streaming ingestion connectors for real-time manufacturing telemetry.",
    toolOrLibrary: "Kafka / OPC-UA / MQTT",
    docsPath: "docs/01-architecture/EDGE_REALTIME_ROADMAP.md",
  },

  // Layer 2: Traditional ML Stack
  {
    name: "Tabular AutoML Engine",
    category: "TRADITIONAL_ML",
    status: "IMPLEMENTED",
    description: "Classical regression & classification leaderboard using Scikit-Learn (RandomForest, GradientBoosting, ExtraTrees, LinearRegression).",
    toolOrLibrary: "Scikit-Learn / Pandas / NumPy",
    docsPath: "docs/04-ml-engine/TRADITIONAL_ML_STACK.md",
    runtimeCheck: true,
  },
  {
    name: "Gradient Boosting Benchmarks",
    category: "TRADITIONAL_ML",
    status: "BETA",
    description: "XGBoost and LightGBM models enabled via dynamic runtime feature detection in ML Engine.",
    toolOrLibrary: "XGBoost / LightGBM",
    docsPath: "docs/04-ml-engine/TRADITIONAL_ML_STACK.md",
    runtimeCheck: true,
  },
  {
    name: "Bayesian Hyperparameter Optimization",
    category: "TRADITIONAL_ML",
    status: "BETA",
    description: "Optuna Bayesian tuning pipeline with grid/random fallback when Optuna is unavailable.",
    toolOrLibrary: "Optuna",
    docsPath: "docs/04-ml-engine/TRADITIONAL_ML_STACK.md",
    runtimeCheck: true,
  },
  {
    name: "Model Explainability & Drivers",
    category: "TRADITIONAL_ML",
    status: "IMPLEMENTED",
    description: "SHAP driver analysis and feature importance ranking for transparent decision making.",
    toolOrLibrary: "SHAP / Scikit-Learn Feature Importance",
    docsPath: "docs/04-ml-engine/TRADITIONAL_ML_STACK.md",
    runtimeCheck: true,
  },
  {
    name: "Deep Learning (PyTorch MLP)",
    category: "TRADITIONAL_ML",
    status: "PLANNED",
    description: "PyTorch Multi-Layer Perceptron neural networks for high-dimensional tabular modeling.",
    toolOrLibrary: "PyTorch",
    docsPath: "docs/04-ml-engine/TRADITIONAL_ML_STACK.md",
    runtimeCheck: true,
  },

  // Layer 3: Generative AI & Agentic Stack
  {
    name: "Multi-Provider AI Gateway",
    category: "GENERATIVE_AI",
    status: "IMPLEMENTED",
    description: "Backend-mediated LLM gateway routing calls across Groq, Gemini, NVIDIA, Cohere, Cloudflare, and OpenRouter.",
    toolOrLibrary: "Groq / Gemini / NVIDIA / Cohere / OpenRouter",
    docsPath: "docs/06-ai/AI_GATEWAY.md",
    runtimeCheck: true,
  },
  {
    name: "DocuMind Document RAG",
    category: "GENERATIVE_AI",
    status: "BETA",
    description: "Document ingestion, page-cited retrieval, and grounding for PDF manuals, SOPs, and reports.",
    toolOrLibrary: "Qdrant / Custom PDF Parser",
    docsPath: "docs/06-ai/GENERATIVE_AI_STACK.md",
    runtimeCheck: true,
  },
  {
    name: "Agent Task Pilot & Orchestrator",
    category: "GENERATIVE_AI",
    status: "IMPLEMENTED",
    description: "State-machine agent execution with tool registries, human approval gates, and step audits.",
    toolOrLibrary: "Internal Agent Orchestrator / LangGraph Ready",
    docsPath: "docs/01-architecture/AGENTIC_ARCHITECTURE.md",
  },
  {
    name: "Voice AI Coach",
    category: "GENERATIVE_AI",
    status: "BETA",
    description: "Multimodal Web Speech STT/TTS interaction with text fallback for hands-free shopfloor navigation.",
    toolOrLibrary: "Web Speech API / LLM Gateway",
    docsPath: "docs/06-ai/AI_FEATURES.md",
  },
  {
    name: "Browser AutoQA Engine",
    category: "GENERATIVE_AI",
    status: "BETA",
    description: "Automated QA web testing and visual verification with domain allowlisting.",
    toolOrLibrary: "Playwright",
    docsPath: "docs/06-ai/AI_FEATURES.md",
  },

  // Layer 4: MLOps and Model Evidence
  {
    name: "Model Artifact & Metadata Registry",
    category: "MLOPS",
    status: "IMPLEMENTED",
    description: "Persistent ModelArtifact metadata tracking metrics, training dataset ID, features, and constraints.",
    toolOrLibrary: "MongoDB ModelArtifact / Joblib Storage",
    docsPath: "docs/08-deployment/MLOPS_AND_EDGE_ROADMAP.md",
  },
  {
    name: "Quality Passport MLOps Evidence",
    category: "MLOPS",
    status: "IMPLEMENTED",
    description: "Auditable Quality Passports binding raw data, SPC metrics, model version, and trust scores.",
    toolOrLibrary: "MODLIQER Evidence Engine",
    docsPath: "docs/00-overview/PLATFORM_FEATURES.md",
  },
  {
    name: "Data & Model Drift Monitor",
    category: "MLOPS",
    status: "IMPLEMENTED",
    description: "Statistical drift detection on feature distributions and retraining recommendations.",
    toolOrLibrary: "SciPy KS-Test / Custom Drift Monitor",
    docsPath: "docs/04-ml-engine/DATASET_HEALTH.md",
  },
  {
    name: "Enterprise MLOps Platforms",
    category: "MLOPS",
    status: "ROADMAP",
    description: "Integration with MLflow, Kubeflow, AWS SageMaker, and Google Vertex AI.",
    toolOrLibrary: "MLflow / SageMaker / Vertex AI",
    docsPath: "docs/08-deployment/MLOPS_AND_EDGE_ROADMAP.md",
  },

  // Layer 5: Edge & Real-Time Inference
  {
    name: "ONNX Model Export & Runtime",
    category: "EDGE_REALTIME",
    status: "BETA",
    description: "Cross-platform model export format for edge runtime deployment.",
    toolOrLibrary: "ONNX / ONNXRuntime",
    docsPath: "docs/01-architecture/EDGE_REALTIME_ROADMAP.md",
    runtimeCheck: true,
  },
  {
    name: "Edge Device & Micro-Controller Inference",
    category: "EDGE_REALTIME",
    status: "ROADMAP",
    description: "On-device inference for constrained edge compute using TensorFlow Lite or CoreML.",
    toolOrLibrary: "TFLite / CoreML",
    docsPath: "docs/01-architecture/EDGE_REALTIME_ROADMAP.md",
  },

  // Layer 6: Visualization
  {
    name: "Python Graphics Engine",
    category: "VISUALIZATION",
    status: "IMPLEMENTED",
    description: "Multi-library charting engine generating PyGal, Bokeh, Seaborn, Matplotlib, and Altair specs.",
    toolOrLibrary: "PyGal / Bokeh / Seaborn / Matplotlib",
    docsPath: "docs/04-ml-engine/ML_ENGINE_OVERVIEW.md",
    runtimeCheck: true,
  },

  // Layer 7: Security
  {
    name: "Prompt Guardrails & Content Safety",
    category: "SECURITY",
    status: "IMPLEMENTED",
    description: "Input sanitization, prompt injection defenses, and PII masking before LLM dispatch.",
    toolOrLibrary: "MODLIQER Security Guardrails",
    docsPath: "docs/06-ai/PROMPT_GUARDRAILS.md",
  },
  {
    name: "Credential Vault & Isolation",
    category: "SECURITY",
    status: "BETA",
    description: "Server-side credential reference resolution ensuring raw secrets are never passed to agents or clients.",
    toolOrLibrary: "MODLIQER Credential Vault",
    docsPath: "docs/07-security/SECURITY_OVERVIEW.md",
  },
];

export async function getPublicAiMlStackSummary() {
  const implementedCount = AI_ML_STACK_REGISTRY.filter((c) => c.status === "IMPLEMENTED").length;
  const betaCount = AI_ML_STACK_REGISTRY.filter((c) => c.status === "BETA").length;
  const roadmapCount = AI_ML_STACK_REGISTRY.filter((c) => c.status === "ROADMAP" || c.status === "PLANNED").length;

  return {
    platform: "MODLIQER Dual-Stack AI/ML Platform",
    tagline: "Analyze data. Build models. Prove results — without code.",
    lastVerified: "17/08/2026",
    summary: {
      totalComponents: AI_ML_STACK_REGISTRY.length,
      implemented: implementedCount,
      beta: betaCount,
      roadmap: roadmapCount,
    },
    components: AI_ML_STACK_REGISTRY.map((c) => ({
      name: c.name,
      category: c.category,
      status: c.status,
      description: c.description,
      toolOrLibrary: c.toolOrLibrary,
      docsPath: c.docsPath,
    })),
  };
}

export async function getDetailedAiMlStackRegistry() {
  const publicSummary = await getPublicAiMlStackSummary();
  const qdrantConfigured = Boolean(process.env.QDRANT_URL);
  const groqConfigured = Boolean(process.env.GROQ_API_KEY);
  const geminiConfigured = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY);

  return {
    ...publicSummary,
    environmentDiagnostics: {
      qdrantConfigured,
      groqConfigured,
      geminiConfigured,
      nodeEnv: process.env.NODE_ENV || "development",
      mlEngineUrl: process.env.ML_ENGINE_URL || "http://localhost:8000",
    },
    detailedComponents: AI_ML_STACK_REGISTRY,
  };
}
