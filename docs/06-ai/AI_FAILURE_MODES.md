# Modliq AI Failure Modes & Resiliency Specifications

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🛑 Failure Handling & Degradation Strategy

1. **Provider Outage / Rate Limit (HTTP 429 / 503)**: Automatically cascades to the next provider in the priority chain (Groq $\rightarrow$ Gemini $\rightarrow$ NVIDIA $\rightarrow$ Cohere $\rightarrow$ Cloudflare $\rightarrow$ OpenRouter).
2. **All External Providers Unreachable**: Falls back to rule-based static operational templates; ensuring core AutoML optimization and Quality Passport functions continue uninterrupted.
3. **Emergency AI Kill Switch**: Setting `AI_FEATURES_ENABLED=false` disables external network AI calls immediately across all instances.

---

## 🔗 Related Documentation

- [AI_GATEWAY.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/06-ai/AI_GATEWAY.md) — AI Gateway overview
- [INCIDENT_RESPONSE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/INCIDENT_RESPONSE.md) — Incident procedures
