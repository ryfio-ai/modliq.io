# MODLIQER Testing Strategy & Philosophy

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase (`frontend/playwright.config.ts` & `demo/test_e2e_platform.py`)  
> **Status:** Implemented / Launch-Ready  

---

## 🧪 Multi-Tier Test Suite Architecture

MODLIQER enforces a multi-tier testing strategy across compile-time, unit, API contract, Playwright browser E2E, and Python integration probe levels.

```mermaid
flowchart TD
  Code[Codebase Changes] --> Tier1[1. Compile & Type Checks (tsc, py_compile)]
  Tier1 --> Tier2[2. Python PyTest & Node Vitest Suites]
  Tier2 --> Tier3[3. Playwright Multi-Browser E2E Suite (frontend/tests/e2e)]
  Tier3 --> Tier4[4. Automated Python E2E Probe Suite (demo/test_e2e_platform.py)]
  Tier4 --> Tier5[5. Pre-Flight QA Verification Checklist]
```

---

## 🛠️ Verification Execution Commands

### 1. Next.js Frontend Compilation & Typecheck
```bash
cd frontend && npx tsc --noEmit && npm run build
```

### 2. Express Backend API Compilation & Typecheck
```bash
cd backend && npx tsc --noEmit && npm run build
```

### 3. Python ML Engine Compilation & PyTest Suite
```bash
cd ml-engine && python -m compileall . && python -m pytest
```

### 4. Playwright Browser E2E Test Suite
```bash
cd frontend && npm run test:e2e
```

### 5. Automated 7-Step Python E2E Probe Test
```bash
python demo/test_e2e_platform.py
```

---

## 🔗 Related Documentation

- [E2E_TEST_FLOWS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/09-testing/E2E_TEST_FLOWS.md) — Playwright & Python E2E details
- [BUILD_VERIFICATION.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/09-testing/BUILD_VERIFICATION.md) — Build verification commands
- [QA_CHECKLIST.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/09-testing/QA_CHECKLIST.md) — QA verification checklist
