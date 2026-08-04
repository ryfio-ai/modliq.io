# Modliq AI-Powered Platform Features

> **Last verified:** 2026-08-04  
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

## 🔗 Related Documentation

- [AI_GATEWAY.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/06-ai/AI_GATEWAY.md) — AI Gateway overview
- [PLATFORM_FEATURES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/00-overview/PLATFORM_FEATURES.md) — Feature matrix
