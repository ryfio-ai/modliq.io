# MODLIQER AI Security & Prompt Injection Defense

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🛡️ AI Security Controls

1. **Input Sanitization**: User-supplied text goals and chat prompts are sanitized to remove control tokens, markdown injection, and instructions attempting to override system prompts.
2. **PII Masking**: Datasets processed through LLMs have column names and row values stripped of identifiable personal credentials.
3. **Stateless API Interactions**: Zero training on customer data. API agreements with external providers mandate no-log policies.

---

## 🔗 Related Documentation

- [PROMPT_GUARDRAILS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/06-ai/PROMPT_GUARDRAILS.md) — Guardrail rules
- [AI_GATEWAY.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/06-ai/AI_GATEWAY.md) — Gateway topology
