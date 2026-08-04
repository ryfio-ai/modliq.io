# Modliq Developer Contributing Guidelines

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 📜 Code Standards & Pull Request Rules

1. **Code is Source of Truth**: Whenever routes, Prisma models, ML endpoints, or environment variables change, update corresponding docs in `/docs` in the **same pull request**.
2. **TypeScript Strictness**: Zero `any` types; all API payloads must use typed interfaces. Run `npx tsc --noEmit` before committing.
3. **Python Quality**: Python code must compile cleanly (`python -m compileall .`) and pass `pytest`.
4. **Secret Protection**: Zero real API keys or connection strings in git commits. Run secret scan prior to opening PR.

---

## 🔗 Related Documentation

- [SETUP_LOCAL.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/11-developer-onboarding/SETUP_LOCAL.md) — Local setup
- [TESTING_STRATEGY.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/09-testing/TESTING_STRATEGY.md) — Testing guidelines
