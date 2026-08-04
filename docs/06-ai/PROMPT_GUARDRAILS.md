# Modliq AI Prompt Safety & Guardrail Specifications

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🛡️ Safety System Prompt Architecture

All prompts constructed in `backend/src/ai/` include strict system instructions to enforce safety, groundedness, and structured outputs:

1. **Anti-Hallucination Guardrail**: Instructs the LLM to rely strictly on provided numeric datasets and statistical outputs; prohibiting invention of unsupported manufacturing parameters.
2. **Output Schema Enforcement**: Enforces valid JSON response schemas when extracting goals or SOP steps.
3. **Prompt Injection Shield**: Input sanitizer stripping system instruction overrides or attempt to reveal system prompts.
4. **Safety Disclaimers**: Appends mandatory engineering verification notes to generated SOP actions.

---

## 🔗 Related Documentation

- [AI_GATEWAY.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/06-ai/AI_GATEWAY.md) — AI Gateway overview
- [AI_SECURITY.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/AI_SECURITY.md) — AI security controls
