# Modliq Database Model Specifications

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection (`backend/src/db/prisma/schema.prisma`)  
> **Status:** Implemented / Launch-Ready  

---

## 📋 Data Model Catalog

Below is the exhaustive list of all 29 database models implemented in MongoDB Atlas via Prisma:

| Model | Status | Purpose | Key Fields | Security Scoping |
| :--- | :--- | :--- | :--- | :--- |
| **`User`** | Implemented | User account, profile, auth credentials & active state | `id`, `email`, `role`, `defaultOrgId`, `enabledModules` | Self / Admin |
| **`Account`** | Implemented | OAuth account linkage (Google, GitHub) | `userId`, `provider`, `providerAccountId` | Scoped to `User` |
| **`Session`** | Implemented | Active NextAuth user session tokens | `sessionToken`, `userId`, `expires` | Scoped to `User` |
| **`Organization`** | Implemented | Tenant organization entity | `id`, `name`, `slug`, `ownerUserId` | Org Members |
| **`OrganizationMember`**| Implemented | User membership in organization & RBAC role | `organizationId`, `userId`, `role` (`OWNER`, `ADMIN`, etc.) | Org Scoped |
| **`Entitlement`** | Implemented | Plan tier, enabled modules, & usage quotas | `organizationId`, `plan` (`DEMO`, `PILOT`, `PRO`), `limitsJson` | Org Scoped |
| **`Project`** | Implemented | Process optimization study container | `id`, `userId`, `organizationId`, `name`, `datasetId`, `status` | Org / User Scoped |
| **`Dataset`** | Implemented | Uploaded dataset metadata & health score | `id`, `userId`, `projectId`, `filename`, `healthScore`, `healthStatus` | User / Project |
| **`DataConnector`** | Implemented | Database connector config (Postgres, MongoDB, etc.) | `id`, `userId`, `name`, `type`, `encryptedConfig`, `status` | User / Project |
| **`IngestedDocument`** | Implemented | Uploaded PDF/Word document extract | `id`, `userId`, `name`, `fileType`, `status`, `textPreview` | User / Project |
| **`ImportJob`** | Implemented | Async data import task from connector | `id`, `userId`, `connectorId`, `status`, `progress`, `resultJson` | User Scoped |
| **`DatasetVersion`** | Implemented | Historical version snapshots of datasets | `datasetId`, `versionId`, `data` | Scoped to `Dataset` |
| **`OptimizationJob`** | Implemented | AutoML training job record & results | `id`, `userId`, `datasetId`, `status`, `progress`, `resultJson` | User / Project |
| **`OptimizationRun`** | Implemented | Execution run parameters & yield metrics | `id`, `userId`, `datasetId`, `intent`, `monthlyVolume`, `unitValue` | User Scoped |
| **`QualityPassport`** | Implemented | Audit-ready quality passport & readiness status | `id`, `userId`, `projectId`, `title`, `auditScore`, `readinessStatus` | User / Project |
| **`GoalReview`** | Implemented | Parsed goal review & confirmed safety bounds | `id`, `userId`, `projectId`, `parsedGoalJson`, `status` | User / Project |
| **`OperationsRecord`** | Implemented | Shift tracking, equipment downtime & OEE | `id`, `userId`, `machine`, `shift`, `plannedTimeMinutes`, `scrapRate` | User Scoped |
| **`Supplier`** | Implemented | Master supplier registry | `id`, `userId`, `name`, `category` | User Scoped |
| **`MaterialLot`** | Implemented | Incoming material lot & defect rate | `id`, `userId`, `supplierName`, `lotCode`, `defectRate` | User Scoped |
| **`LeanWasteEvent`** | Implemented | 8-waste incident log | `id`, `userId`, `wasteType`, `description`, `estimatedLoss`, `status` | User Scoped |
| **`KaizenAction`** | Implemented | Continuous improvement task & Kanban item | `id`, `userId`, `title`, `rootCause`, `countermeasure`, `priority` | User Scoped |
| **`FiveSAudit`** | Implemented | 5S workplace audit scoring | `id`, `userId`, `area`, `sort`, `setInOrder`, `shine`, `standardize`, `sustain` | User Scoped |
| **`AiInsight`** | Implemented | AI-generated process insight card | `id`, `userId`, `module`, `title`, `summary`, `payload` | User Scoped |
| **`AiConversation`** | Implemented | AI Copilot chat thread container | `id`, `userId`, `title` | User Scoped |
| **`AiMessage`** | Implemented | Single message in AI Copilot conversation | `id`, `userId`, `conversationId`, `role`, `content` | User Scoped |
| **`Notification`** | Implemented | System alert & user notification | `id`, `userId`, `type`, `title`, `message`, `severity`, `read` | User Scoped |
| **`SupportTicket`** | Implemented | Customer support ticket & admin response | `id`, `userId`, `subject`, `category`, `status`, `adminResponse` | User / Admin |
| **`ShareLink`** | Implemented | Token-hashed public share token | `id`, `userId`, `entityType`, `entityId`, `tokenHash`, `revoked` | Public / User |
| **`Template`** | Implemented | Industry SOP & control plan template | `id`, `type`, `industry`, `title`, `payloadJson`, `active` | System / User |
| **`AuditLog`** | Implemented | Tenant security audit log | `id`, `userId`, `actorId`, `organizationId`, `action`, `entityType` | Admin Scoped |
| **`UsageEvent`** | Implemented | System usage & token event log | `id`, `userId`, `organizationId`, `eventType`, `quantity` | Admin Scoped |
| **`OnboardingState`** | Implemented | User onboarding checklist state | `id`, `userId`, `completedJson`, `dismissed` | User Scoped |
| **`ContactLead`** | Implemented | Free pilot lead submission record | `id`, `name`, `email`, `company`, `industry`, `message` | Admin Scoped |

---

## 🔗 Related Documentation

- [PRISMA_SCHEMA.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/PRISMA_SCHEMA.md) — Schema definition
- [RELATIONSHIPS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/RELATIONSHIPS.md) — Entity relationships
