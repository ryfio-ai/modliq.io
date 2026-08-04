# Modliq Frontend State Management

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🔄 State Management Strategy

Modliq utilizes a lightweight, highly resilient state management architecture combining React Context, local state hooks, `localStorage` fallbacks, and server state fetching via the centralized API client (`frontend/src/lib/api.ts`).

```mermaid
flowchart TD
  Server[Express Backend API] <--> API[Centralized API Client (lib/api.ts)]
  API <--> AuthCtx[NextAuth Session Context]
  API <--> WorkspaceCtx[WorkspaceState Model / Context]
  WorkspaceCtx <--> LocalStorage[Browser localStorage Fallback]
  WorkspaceCtx <--> UI[React Component State]
```

---

## 📦 Key State Domains

1. **Authentication State**: Managed via NextAuth.js session provider (`useSession()`). Provides `user.id`, `user.email`, `user.role`, and `user.enabledModules`.
2. **Workspace State**: Persisted server-side in the `WorkspaceState` MongoDB model and synchronized client-side. Tracks `activeDatasetId`, `activeDatasetFilename`, `parsedIntent`, `activeOptimizationJobId`, and `latestOptimizationResult`.
3. **Local Storage Fallback**: When users operate in demo mode or offline, key selections are safely cached in browser `localStorage`.
4. **Server Data Fetching**: Standardized `async/await` fetch calls handled via `frontend/src/lib/api.ts` with automatic auth token header injection.

---

## 🔗 Related Documentation

- [FRONTEND_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/FRONTEND_OVERVIEW.md) — Frontend architecture
- [USER_CONSOLE.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/USER_CONSOLE.md) — User console workflows
