# Multi-Provider Model Router Primitive

> **Last verified: 17/08/2026**
> **Brand: MODLIQER**
> **Status: Live**

Unified LLM provider routing across Groq, Gemini, NVIDIA, Cohere, Cloudflare, and OpenRouter.

---

## Capabilities & Strategies
- **Latency Monitoring**: Dynamic provider availability and latency checks.
- **Strategies**:
  - `fastest_with_fallback`: Routes to lowest-latency active provider.
  - `high_reasoning`: Prioritizes high-parameter reasoning models.
  - `cost_optimized`: Minimizes token cost across providers.
- **Backend Isolation**: Client applications and agent tools call server-mediated routes only; provider keys are never exposed.

---

## Endpoints
- **Public Router Status**: `GET /api/v1/ai-stack/model-router/status`
- **Admin Settings Update**: `PATCH /api/v1/admin/ai-stack/model-router/settings`

---

## Related Documentation
- `docs/06-ai/AI_GATEWAY.md`
- `docs/06-ai/MODULAR_AI_STACK.md`
