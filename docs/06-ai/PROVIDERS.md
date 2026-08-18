# MODLIQER AI Provider Configuration & Fallbacks

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 📋 Supported LLM Provider Matrix

| Provider | Model Identifier | Priority Order | Environment Variable | Purpose | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Groq** | `llama-3.3-70b-versatile` | Priority 1 | `GROQ_API_KEY` | Ultra-fast inference & primary copilot engine | Implemented |
| **Google Gemini** | `gemini-2.0-flash` | Priority 2 | `GEMINI_API_KEY` | Multimodal data extraction & fallback | Implemented |
| **NVIDIA Nim** | `meta/llama-3.1-70b-instruct`| Priority 3 | `NVIDIA_API_KEY` | High-accuracy technical domain reasoning | Implemented |
| **Cohere** | `command-r-plus` | Priority 4 | `COHERE_API_KEY` | Structured JSON extraction fallback | Implemented |
| **Cloudflare Workers AI** | `@cf/meta/llama-3-8b-instruct`| Priority 5 | `CLOUDFLARE_API_KEY` | Edge latency fallback | Implemented |
| **OpenRouter** | `auto` | Priority 6 | `OPENROUTER_API_KEY` | Universal multi-LLM emergency fallback | Implemented |

---

## 🔗 Related Documentation

- [AI_GATEWAY.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/06-ai/AI_GATEWAY.md) — AI Gateway topology
- [ENVIRONMENT_VARIABLES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/08-deployment/ENVIRONMENT_VARIABLES.md) — Env reference
