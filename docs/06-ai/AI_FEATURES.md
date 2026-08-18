# MODLIQER AI-Powered Platform Features

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🤖 AI Capability Overview

| Feature | Description | Backend Handler | Provider Used | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Natural Language Goal Parser**| Converts plain-text engineering intent into target variables and constraints | `POST /api/v1/goal/parse` | Groq / Gemini | Implemented |
| **Process Copilot Chat** | Interactive assistant answering plant questions & analyzing SHAP drivers | `POST /api/v1/ai/chat` | Groq / Fallbacks | Implemented |
| **Automated SOP Generation** | Generates step-by-step Standard Operating Procedures from optimization results | `backend/src/ai/sopGenerator.ts` | Groq / Gemini | Implemented |
| **Quality Passport Executive Summary**| Synthesizes dataset health & process capability into audit summaries | `backend/src/services/qualityPassport.service.ts` | Groq / Gemini | Implemented |

---

## 🧪 MODLIQER AI Labs (Beta) Feature Matrix

| AI Labs Feature | Capabilities & Guardrails | API Endpoint Prefix | Status |
| :--- | :--- | :--- | :--- |
| **DocuMind RAG** | PDF document intelligence with Qdrant vector retrieval and real page citations | `/api/v1/ai-labs/documind/*` | Beta |
| **Agent Task Pilot** | Bounded agentic workflow using LangGraph state machine with human approval gates | `/api/v1/ai-labs/agent/*` | Beta |
| **Voice AI Coach** | Real-time interruptible voice practice sessions with STT/TTS and text fallback | `/api/v1/ai-labs/voice/*` | Beta |
| **Browser AutoQA** | Playwright web testing with strict domain allowlisting (`localhost`, `modliq-io.vercel.app`) | `/api/v1/ai-labs/autoqa/*` | Beta |
| **SpendLens SaaS** | OCR receipt extraction, field verification, and spending analytics gate | `/api/v1/ai-labs/spendlens/*` | Beta |

---

## 🔗 Related Documentation

- [AI_GATEWAY.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/06-ai/AI_GATEWAY.md) — AI Gateway overview
- [AI_LABS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/06-ai/AI_LABS.md) — AI Labs architecture & specifications
- [PLATFORM_FEATURES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/00-overview/PLATFORM_FEATURES.md) — Feature matrix
