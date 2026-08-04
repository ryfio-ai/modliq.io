# Modliq AI Gateway Specifications

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection (`backend/src/ai/aiGateway.ts`)  
> **Status:** Implemented / Launch-Ready  

---

## 🤖 Multi-Provider AI Gateway Architecture

Located in `backend/src/ai/aiGateway.ts`, the AI Gateway orchestrates all LLM calls across 6 supported providers.

```mermaid
flowchart TD
  Req[AI Chat / Goal / SOP Request] --> CheckKill{AI_FEATURES_ENABLED?}
  CheckKill -- False --> Static[Return Static Operational Guidance]
  CheckKill -- True --> TryGroq[1. Try Groq (Llama 3.3 70B)]
  TryGroq -- Success --> Res[Return LLM Response]
  TryGroq -- Error / Rate Limit --> TryGemini[2. Try Google Gemini 2.0 Flash]
  TryGemini -- Success --> Res
  TryGemini -- Error --> TryNVIDIA[3. Try NVIDIA Nim]
  TryNVIDIA -- Success --> Res
  TryNVIDIA -- Error --> TryCohere[4. Try Cohere]
  TryCohere -- Success --> Res
  TryCohere -- Error --> TryCF[5. Try Cloudflare Workers AI]
  TryCF -- Success --> Res
  TryCF -- Error --> TryOR[6. Try OpenRouter]
  TryOR -- Success --> Res
  TryOR -- Error --> Static
```

---

## 🔑 Key Operational Policies

1. **Strict Server-Side Proxying**: Frontend clients never call AI providers directly.
2. **Stateless Gateway**: Provider calls do not store user prompts externally.
3. **Emergency Circuit Breaker**: Managed by `AI_FEATURES_ENABLED=true/false`.

---

## 🔗 Related Documentation

- [PROVIDERS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/06-ai/PROVIDERS.md) — Provider configurations
- [PROMPT_GUARDRAILS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/06-ai/PROMPT_GUARDRAILS.md) — Guardrails
- [AI_FAILURE_MODES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/06-ai/AI_FAILURE_MODES.md) — Fallback & failure behavior
