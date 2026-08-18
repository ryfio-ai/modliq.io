# YC-Style Modular AI Tech Stack Layer

> **Last verified: 17/08/2026**
> **Brand: MODLIQER**
> **Tagline: Analyze data. Build models. Prove results — without code.**

MODLIQER exposes a modular AI infrastructure layer inspired by modern YC-backed AI stack primitives.

---

## 10 Modular AI Primitives

| Primitive Key | Primitive Name | Status | Description | UI Console Route |
|---|---|---|---|---|
| DATA_LABELING | Data Labeling Workspace | Beta | Multi-modal tabular, defect, QA pair, and document tagging labeling workspace | `/ai-stack/labeling` |
| FINE_TUNING_PREP | Fine-Tuning Preparation | Beta | Export labeled examples into OpenAI Chat, Instruction, or Classification JSONL | `/ai-stack/fine-tuning` |
| MODEL_ROUTER | Multi-Provider Model Router | Live | Unified routing across Groq, Gemini, NVIDIA, Cohere, OpenRouter with fallback | `/admin/ai-stack/model-router` |
| AGENT_ORCHESTRATION | Agent Orchestration Engine | Beta | State-machine agent task pilot with tool controls and approval gates | `/ai-stack/agent-runs` |
| CREDENTIAL_VAULT | Credential Vault & Isolation | Beta | Server-side credential references ensuring raw keys are never passed to agents | `/admin/ai-stack` |
| VECTOR_SEARCH | Vector Search Layer | Beta | Qdrant vector collection management and similarity search | `/ai-stack/vector-search` |
| RAG | DocuMind RAG Engine | Beta | Grounded retrieval-augmented generation with exact document page citations | `/ai-stack/vector-search` |
| EVALUATION | Evaluation Studio | Beta | RAG citation accuracy, LLM answer quality, and agent task scorecards | `/ai-stack/evals` |
| INFERENCE_MONITOR | Inference & Performance Monitor | Live | Real-time tracking of LLM latency, failure rates, token usage, and ML job times | `/admin/ai-stack/inference-monitor` |
| AGENT_RUN_MANAGER | Agent Run Manager | Beta | Audit view, tool execution logs, step retries, and approval history | `/admin/ai-stack/agent-runs` |

---

## Public & Admin Status APIs
- Public Summary: `GET /api/v1/ai-stack/status`
- Admin Diagnostics: `GET /api/v1/admin/ai-stack/status`

---

## Related Documentation
- `docs/06-ai/DATA_LABELING.md`
- `docs/06-ai/FINE_TUNING_PREP.md`
- `docs/06-ai/MODEL_ROUTER.md`
- `docs/06-ai/VECTOR_SEARCH.md`
- `docs/06-ai/EVALUATION_STUDIO.md`
- `docs/06-ai/INFERENCE_MONITOR.md`
- `docs/06-ai/AGENT_RUN_MANAGER.md`
