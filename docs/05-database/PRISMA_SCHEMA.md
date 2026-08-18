# MODLIQER Prisma Schema Architecture

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 📜 Authoritative Prisma Schema File

The single authoritative Prisma schema file for the entire project is located at:
[`backend/src/db/prisma/schema.prisma`](file:///c:/Users/sathish/Desktop/Modliq/Modliq/backend/src/db/prisma/schema.prisma)

---

## 🏗️ Indexing & Performance Strategy

1. **Unique Indexing**:
   - `User.email`: Fast user lookup.
   - `Organization.slug`: Organization slug lookups.
   - `ShareLink.tokenHash`: Public share link validation.
   - `ApiKey.keyHash`: API key authentication.
   - `Entitlement.organizationId`: 1:1 org quota mapping.
2. **Compound Indexing**:
   - `Account`: `@@unique([provider, providerAccountId])`
   - `VerificationToken`: `@@unique([identifier, token])`
   - `DatasetVersion`: `@@unique([datasetId, versionId])`, `@@index([datasetId])`
   - `ModelVersion`: `@@unique([modelId, version])`, `@@index([modelId])`
   - `ChatMessage`: `@@index([sessionId])`

---

## 🧪 MODLIQER AI Labs (Beta) Schema Models

The Prisma schema defines the data models for the 5 experimental AI Labs tools:

- **DocuMind Document & Chunk Models (`DocuMindDocument`, `DocuMindChunk`):**
  - PDF document intelligence, Qdrant embedding IDs, page citations, and extraction metadata.
- **Agent Task Pilot Runs & Approvals (`AgentRun`, `AgentApprovalGate`):**
  - LangGraph state machine step logs, execution status, and human approval gates.
- **Voice AI Coach (`VoiceSession`, `VoiceFeedbackRecord`):**
  - Voice practice session recordings, STT transcripts, and AI coaching scorecards.
- **Browser AutoQA (`AutoQARun`, `AutoQALog`):**
  - Playwright test executions, assertions, and video artifacts (allowlist: `localhost`, `modliq-io.vercel.app`).
- **SpendLens SaaS (`SpendLensReceipt`, `SpendLensLineItem`):**
  - OCR receipt image extraction, field verification gate, and spend analytics data.

---

## 🔗 Related Documentation

- [DATABASE_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/DATABASE_OVERVIEW.md) — Overview
- [MODELS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/05-database/MODELS.md) — Model catalog
