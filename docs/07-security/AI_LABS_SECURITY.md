# MODLIQER AI Labs Security & Safety Guardrails

> **Last verified:** 17/08/2026


## 🔐 Core Security Principles

1. **Zero Direct Frontend Service Calls:** All LLM, vector database (Qdrant), Playwright workers, and STT/TTS calls run strictly through the backend Express gateway (`/api/v1/ai-labs/*`).
2. **Domain Allowlist Protection:** Browser AutoQA strictly enforces an allowlist (`localhost`, `modliq-io.vercel.app`). Third-party domain testing is prohibited.
3. **Human-in-the-Loop Approval Gates:** Agent Task Pilot pauses at critical decision gates and requires explicit human user approval before execution.
4. **No Code / SQL Execution:** Zero arbitrary code or SQL execution is permitted in any lab module.

---

## 🧪 Security & Guardrails per AI Labs Tool

### 1. DocuMind RAG
- **Vector Isolation:** Qdrant collections are scoped by tenant organization ID.
- **Page Citations:** Retrieval results require verified page numbers and chunk hashes to eliminate hallucinated citations.

### 2. Agent Task Pilot
- **Bounded State Machine:** Built using LangGraph with fixed maximum step depths.
- **Human Approval Gate:** Any external mutation or data write triggers a step pause requiring human confirmation.

### 3. Voice AI Coach
- **Ephemeral Audio Buffers:** Audio payloads are processed in memory and discarded immediately after transcription/TTS generation.
- **Text Fallback Mode:** Provides graceful fallback to text input when Web Speech or audio devices are unavailable.

### 4. Browser AutoQA
- **Strict Domain Allowlist:** Playwright headless execution is strictly constrained to `localhost` and `modliq-io.vercel.app`.
- **Navigation Lockdown:** Outbound network requests to unlisted external domains are intercepted and dropped.

### 5. SpendLens SaaS
- **Receipt Verification Gate:** OCR extracted receipt totals and vendor fields require user verification before saving to accounting records.
- **Data Scrubbing:** Sensitive personal identification numbers are masked during vision model processing.

---

## 🔗 Related Documentation

- [SECURITY_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/SECURITY_OVERVIEW.md) — Platform security architecture
- [AGENT_GUARDRAILS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/AGENT_GUARDRAILS.md) — Agentic guardrails & boundaries
