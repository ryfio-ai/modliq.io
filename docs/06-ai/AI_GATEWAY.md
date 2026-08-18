# Multi-Provider AI Gateway

> **Last verified: 17/08/2026**
> **Brand: MODLIQER**
> **Tagline: Analyze data. Build models. Prove results — without code.**

The Multi-Provider AI Gateway orchestrates Generative AI requests across Groq, Gemini, NVIDIA, Cohere, Cloudflare, and OpenRouter.

---

## Key Capabilities
1. **Fallback Routing**: Automatically switches provider if the primary endpoint experiences latency spikes or errors.
2. **RAG Grounding**: Interfaces with DocuMind and Qdrant to supply document context and page citations before model inference.
3. **Prompt Guardrails**: Enforces input sanitization, PII masking, and prompt injection defense.
4. **Credential Isolation**: Raw API keys reside strictly on the server and are never sent to browser clients or agent tool calls.

---

## Status & Monitoring APIs
- Health Diagnostic: `GET /api/v1/ai/provider-health`
- Model Router Status: `GET /api/v1/ai-stack/model-router/status`
- RAG Status: `GET /api/v1/admin/ai/rag-status`

---

## Related Documentation
- `docs/06-ai/GENERATIVE_AI_STACK.md`
- `docs/06-ai/MODEL_ROUTER.md`
