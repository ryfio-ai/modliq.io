# Modliq Backend API Routes

## Modliq Agent Routes (`/api/v1/projects/:projectId/agent` & `/api/v1/agent`)
- `POST /agent/run` — Run Modliq Agent with mode classification and plan execution (Rate limit: 10/min).
- `GET  /agent/runs` — Fetch list of historical agent runs.
- `GET  /agent/runs/:agentRunId` — Fetch single agent run trajectory and task execution steps.
- `GET  /agent/approvals` — Fetch pending human-in-the-loop approval requests.
- `POST /agent/approvals/:approvalId/approve` — Approve pending critical action request.
- `POST /agent/approvals/:approvalId/reject` — Reject pending critical action request.
