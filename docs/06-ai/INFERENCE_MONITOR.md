# Inference & Performance Monitor Primitive

> **Last verified: 17/08/2026**
> **Brand: MODLIQER**
> **Status: Live / Beta**

Telemetry service tracking latency, success rates, failure codes, and token usage across LLM calls, AutoML trainings, RAG vector searches, and agent tool executions.

---

## Capabilities & Endpoints
- **Record Inference Log**: `POST /api/v1/ai-stack/inference-log`
- **Admin Telemetry Dashboard API**: `GET /api/v1/admin/ai-stack/inference-monitor`

---

## Log Telemetry Model (`InferenceLog`)
- `userId`, `projectId`, `inferenceType` (LLM, ML, RAG, AGENT, VOICE, AUTOQA).
- `provider`, `model`, `latencyMs`, `success`, `errorCode`, `metadataJson`.

---

## Related Documentation
- `docs/06-ai/MODEL_ROUTER.md`
- `docs/06-ai/MODULAR_AI_STACK.md`
