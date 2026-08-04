# Modliq Frontend Architecture Overview

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🎨 Next.js 15 App Router Architecture

The Modliq frontend is built using **Next.js 15 App Router** in TypeScript, located in `frontend/`. It combines static public landing pages, interactive client-side application state, and dynamic user/admin consoles.

```mermaid
flowchart TD
  App[frontend/src/app] --> Public[Public Marketing Pages (/)]
  App --> Studio[Studio & Quality Console (/(studio))]
  App --> UserConsole[User Console (/[userId]/modliq-console)]
  App --> AdminConsole[Admin Console (/admin)]
  App --> SharePages[Public Share Links (/share/*)]
```

---

## 🛠️ Key Technical Specifications

- **Framework**: Next.js 15 (App Router with Client & Server Components).
- **Styling**: Vanilla Tailwind CSS + Custom CSS Variables in `frontend/src/app/globals.css`.
- **Typography**: Google Fonts **Poppins** (`font-sans`).
- **Icons**: Lucide React (`lucide-react`).
- **Data Fetching**: Centralized API Client (`frontend/src/lib/api.ts`) pointing to Express API Gateway.
- **Environment**: Centralized single source of truth in `frontend/src/lib/config/env.ts`.

---

## 🔒 Client-Side Authorization & Gating

- **NextAuth.js Session**: Provides client-side user context (`useSession()`).
- **Module Gating**: Navigation layout in `frontend/src/app/[userId]/modliq-console/layout.tsx` dynamically shows/hides modules (Optimization, Operations, Supply Chain, Lean) based on `user.enabledModules`.
- **Admin Protection**: Admin routes under `/admin` check `user.role === 'ADMIN'` and redirect unauthorized users to the user console.

---

## 🔗 Related Documentation

- [ROUTES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/ROUTES.md) — Complete Frontend Route Table
- [COMPONENTS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/COMPONENTS.md) — UI Component library
- [UI_THEME.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/UI_THEME.md) — Design system & color tokens
