# MODLIQER Backend API Routes

> **Last verified:** 17/08/2026


## MODLIQER Agent Routes (`/api/v1/projects/:projectId/agent` & `/api/v1/agent`)
- `POST /agent/run` — Run MODLIQER Agent with mode classification and plan execution (Rate limit: 10/min).
- `GET  /agent/runs` — Fetch list of historical agent runs.
- `GET  /agent/runs/:agentRunId` — Fetch single agent run trajectory and task execution steps.
- `GET  /agent/approvals` — Fetch pending human-in-the-loop approval requests.
- `POST /agent/approvals/:approvalId/approve` — Approve pending critical action request.
- `POST /agent/approvals/:approvalId/reject` — Reject pending critical action request.

---

## 🧪 MODLIQER AI Labs (Beta) API Endpoints (`/api/v1/ai-labs/*`)

- **DocuMind RAG:**
  - `POST /api/v1/ai-labs/documind/documents/upload` — Upload PDF document for vector indexing
  - `GET  /api/v1/ai-labs/documind/documents` — List indexed document repository
  - `POST /api/v1/ai-labs/documind/query` — RAG vector search with page citations

- **Agent Task Pilot:**
  - `POST /api/v1/ai-labs/agent/run` — Start bounded LangGraph agent workflow
  - `GET  /api/v1/ai-labs/agent/runs` — Get agent execution logs
  - `POST /api/v1/ai-labs/agent/approvals/:approvalId/approve` — Human approval gate approve
  - `POST /api/v1/ai-labs/agent/approvals/:approvalId/reject` — Human approval gate reject

- **Voice AI Coach:**
  - `POST /api/v1/ai-labs/voice/session` — Initiate voice practice session
  - `GET  /api/v1/ai-labs/voice/sessions/:sessionId` — Fetch session transcript & feedback

- **Browser AutoQA:**
  - `POST /api/v1/ai-labs/autoqa/run` — Execute Playwright test script (`localhost`, `modliq-io.vercel.app`)
  - `GET  /api/v1/ai-labs/autoqa/runs` — Fetch automated QA run history & video recordings

- **SpendLens SaaS:**
  - `POST /api/v1/ai-labs/spendlens/receipts/upload` — OCR receipt image extraction
  - `GET  /api/v1/ai-labs/spendlens/receipts` — List parsed receipts
  - `PATCH /api/v1/ai-labs/spendlens/receipts/:receiptId/validate` — Validate & verify spending fields
  - `GET  /api/v1/ai-labs/spendlens/summary` — Spend analytics breakdown
  - `POST /api/v1/ai-labs/spendlens/chat` — Conversational receipt assistant

---

## 🔗 Related Documentation

- [BACKEND_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/BACKEND_OVERVIEW.md) — Backend service architecture
- [AI_LABS_APIS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/AI_LABS_APIS.md) — AI Labs API specifications
