# Modliq Frontend Routes Reference Table

> **Last verified:** 2026-08-04  
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
| `/comparison` | Public | No | Modliq vs traditional Python/Minitab/Consultant comparison | Implemented |
| `/roi` | Public | No | Interactive financial ROI & yield gain calculator | Implemented |
| `/system-architecture` | Public | No | Interactive live system topology blueprint | Implemented |
| `/about` | Public | No | About Modliq, Qeltrava AI, and Tamil Nadu engineering story | Implemented |
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
| `/share/quality-passport/[token]` | Share | No | Token-hashed, non-authenticated public Quality Passport report | Implemented |
| `/admin` | Admin | Yes (ADMIN) | Admin dashboard, user overview, system health & usage events | Implemented |

---

## 🔗 Related Documentation

- [FRONTEND_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/FRONTEND_OVERVIEW.md) — Frontend architecture overview
- [PUBLIC_WEBSITE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/PUBLIC_WEBSITE.md) — Public marketing site details
- [USER_CONSOLE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/USER_CONSOLE.md) — User console specifications
- [ADMIN_CONSOLE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/ADMIN_CONSOLE.md) — Admin console specifications
