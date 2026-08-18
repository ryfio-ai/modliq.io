# Generative AI & Agentic Stack

> **Last verified: 17/08/2026**
> **Brand: MODLIQER**
> **Tagline: Analyze data. Build models. Prove results — without code.**

The Generative AI & Agentic Stack manages LLM orchestration, DocuMind RAG, Qdrant vector search, agent state machines, and multimodal shopfloor assistants.

---

## Core Components

### 1. Multi-Provider AI Gateway (Implemented)
- **Providers**: Groq, Google Gemini, NVIDIA NIM, Cohere AI, Cloudflare AI, OpenRouter.
- **Routing Strategy**: Latency-aware selection with automatic provider failover.
- **Backend Isolation**: AI keys remain strictly server-side; clients call gateway routes only.

### 2. Qdrant Vector Search & DocuMind RAG (Beta)
- **Vector Database**: Qdrant vector collection management and similarity search.
- **Ingestion**: PDF manuals, SOP documents, and Quality Passport logs chunked and embedded.
- **Grounded Citations**: Answers cite exact document page numbers to ensure compliance and eliminate hallucinated claims.

### 3. Agent Orchestration Engine (Implemented / Beta)
- **Orchestrator**: Agent Task Pilot executing state-machine tasks.
- **Safety Gates**: Risky operations (model retraining, dataset cleaning, data export) require explicit human approval.
- **Tool Auditing**: Tool calls logged with latency, parameter payloads, and success statuses.

### 4. Multimodal Assistants & Automation (Beta)
- **Voice AI Coach**: Web Speech STT/TTS hands-free audio interaction with text fallback.
- **Browser AutoQA Engine**: Playwright web UI verification with domain allowlisting.

---

## Backend RAG Status Endpoint
Query diagnostics via:
`GET /api/v1/admin/ai/rag-status`

Sample Response:
```json
{
  "qdrantConfigured": true,
  "embeddingProvider": "Groq",
  "collections": 2,
  "documentsIndexed": 12,
  "lastIngestStatus": "READY"
}
```

---

## Related Documentation
- `docs/06-ai/AI_GATEWAY.md`
- `docs/06-ai/MODULAR_AI_STACK.md`
- `docs/06-ai/VECTOR_SEARCH.md`
