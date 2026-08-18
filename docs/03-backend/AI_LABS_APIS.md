# MODLIQER AI Labs Backend API Endpoints

> **Last verified:** 17/08/2026


## 🧪 API Endpoints Matrix

### 1. DocuMind RAG (PDF Document Intelligence)
```http
POST   /api/v1/ai-labs/documind/documents/upload
GET    /api/v1/ai-labs/documind/documents
POST   /api/v1/ai-labs/documind/query
```

### 2. Agent Task Pilot (LangGraph Agentic Workflow)
```http
POST   /api/v1/ai-labs/agent/run
GET    /api/v1/ai-labs/agent/runs
POST   /api/v1/ai-labs/agent/approvals/:approvalId/approve
POST   /api/v1/ai-labs/agent/approvals/:approvalId/reject
```

### 3. Voice AI Coach (Real-Time Voice Sessions)
```http
POST   /api/v1/ai-labs/voice/session
GET    /api/v1/ai-labs/voice/sessions/:sessionId
```

### 4. Browser AutoQA (Playwright Automated Web QA)
```http
POST   /api/v1/ai-labs/autoqa/run
GET    /api/v1/ai-labs/autoqa/runs
```

### 5. SpendLens SaaS (OCR Receipt Intelligence)
```http
POST   /api/v1/ai-labs/spendlens/receipts/upload
GET    /api/v1/ai-labs/spendlens/receipts
PATCH  /api/v1/ai-labs/spendlens/receipts/:receiptId/validate
GET    /api/v1/ai-labs/spendlens/summary
POST   /api/v1/ai-labs/spendlens/chat
```

---

## 🔗 Related Documentation

- [API_ROUTES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/API_ROUTES.md) — Main backend API routes
- [AI_LABS_SECURITY.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/AI_LABS_SECURITY.md) — AI Labs security guardrails
