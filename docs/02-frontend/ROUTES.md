# MODLIQER Frontend Routes Reference Table

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🗺️ Complete Route Table

| Route | Type | Auth Required | Purpose | Status |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Public | No | Homepage hero, platform value proposition, Qeltrava AI branding | Implemented |
| `/solutions` | Public | No | Manufacturing industry solutions overview | Implemented |
| `/solutions/[industry]` | Public | No | Tailored landing pages for 6 target manufacturing industries | Implemented |
| `/features` | Public | No | Platform features catalog showcase | Implemented |
| `/case-studies` | Public | No | Customer case studies & yield improvement stories | Implemented |
| `/comparison` | Public | No | MODLIQER vs traditional Python/Minitab/Consultant comparison | Implemented |
| `/roi` | Public | No | Interactive financial ROI & yield gain calculator | Implemented |
| `/system-architecture` | Public | No | Interactive live system topology blueprint | Implemented |
| `/about` | Public | No | About MODLIQER, Qeltrava AI, and Tamil Nadu engineering story | Implemented |
| `/contact` | Public | No | Free pilot application form & lead capture | Implemented |
| `/privacy` | Public | No | Privacy policy & data protection terms | Implemented |
| `/terms` | Public | No | Terms of service & free pilot guidelines | Implemented |
| `/disclaimer` | Public | No | Safety & AI estimation disclaimer | Implemented |
| `/docs` | Public | No | In-app product documentation viewer | Implemented |
| `/login` | Auth | No | User login & OAuth registration (Google, GitHub) | Implemented |
| `/(studio)` | User | Yes | Universal data ingestion (File, Document, Connector) & health report | Implemented |
| `/(studio)/optimization-progress` | User | Yes | Real-time AutoML optimization job progress bar & SSE listener | Implemented |
| `/(studio)/results` | User | Yes | Safe parameter windows, target bounds, SHAP drivers | Implemented |
| `/[userId]/modliq-console` | User | Yes | Unified Quality Studio console (Optimization, Operations, Supply Chain, Lean) | Implemented |
| `/[userId]/modliq-console/ai-labs` | User | Yes | MODLIQER AI Labs (Beta) landing hub & tool directory | Implemented |
| `/[userId]/modliq-console/ai-labs/documind-rag` | User | Yes | DocuMind RAG — PDF document intelligence with page citations | Implemented |
| `/[userId]/modliq-console/ai-labs/agent-task-pilot` | User | Yes | Agent Task Pilot — LangGraph agentic workflow with approval gates | Implemented |
| `/[userId]/modliq-console/ai-labs/voice-coach` | User | Yes | Voice AI Coach — Real-time voice practice with text fallback | Implemented |
| `/[userId]/modliq-console/ai-labs/browser-autoqa` | User | Yes | Browser AutoQA — Playwright web testing with domain allowlisting | Implemented |
| `/[userId]/modliq-console/ai-labs/spendlens` | User | Yes | SpendLens SaaS — OCR receipt intelligence & user verification | Implemented |
| `/share/quality-passport/[token]` | Share | No | Token-hashed, non-authenticated public Quality Passport report | Implemented |
| `/admin` | Admin | Yes (ADMIN) | Admin dashboard, user overview, system health & usage events | Implemented |
| `/admin/ai-labs` | Admin | Yes (ADMIN) | AI Labs feature flags, usage metrics, and audit controls | Implemented |

---

## 🔗 Related Documentation

- [FRONTEND_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/FRONTEND_OVERVIEW.md) — Frontend architecture overview
- [AI_LABS_UI.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/AI_LABS_UI.md) — AI Labs UI suite specifications
- [PUBLIC_WEBSITE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/PUBLIC_WEBSITE.md) — Public marketing site details
- [USER_CONSOLE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/USER_CONSOLE.md) — User console specifications
- [ADMIN_CONSOLE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/ADMIN_CONSOLE.md) — Admin console specifications
