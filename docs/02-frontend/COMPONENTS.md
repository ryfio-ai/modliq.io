# MODLIQER Frontend UI Component Library

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🧩 Key Component Catalog

Located in `frontend/src/components/`:

### 🌐 Public & Layout Components
- **`PublicNavbar`**: Top navigation header featuring main links, Quick Pilot CTA, and responsive mobile menu drawer.
- **`PublicFooter`**: Footer featuring Qeltrava AI attribution, Tamil Nadu positioning, legal links, and sitemap.
- **`OnboardingChecklist`**: Interactive user onboarding widget guiding new users through upload, goal setup, and optimization.

### 📊 Quality Studio & Data Components
- **`DataIngestionTabs`**: Multi-tab ingestion interface (File Upload, PDF/Word Document Parser, Database Connectors, Demo Datasets).
- **`GoalCrosscheckWizard`**: Interactive modal/wizard allowing engineers to verify parsed target variables and boundary safety ranges before model training.
- **`QualityPassportView`**: Detailed audit-ready view displaying Audit Readiness Score, executive summaries, SPC capability metrics, and Markdown export CTA.
- **`SHAPVisualizer`**: Interactive bar chart and driver list rendering SHAP process importance rankings.
- **`MetricCard`**: Standardized metric display card with baseline, target, improvement delta, and trend indicators.

### 🤖 AI & Navigation Components
- **`AiCopilotDrawer`**: Slide-out chat drawer providing real-time multi-provider AI assistance and SOP recommendations.
- **`NotificationBell`**: System notification dropdown displaying alerts, severity icons, and action links.
- **`AdminSidebar`**: Gated sidebar navigation for the enterprise admin console (`/admin`).

---

## 🔗 Related Documentation

- [FRONTEND_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/FRONTEND_OVERVIEW.md) — Frontend architecture
- [UI_THEME.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/UI_THEME.md) — Design system & color tokens
