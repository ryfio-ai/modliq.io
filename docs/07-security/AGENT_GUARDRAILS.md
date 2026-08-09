# Modliq Agent Security Guardrails & Policy

## Security Principles
Modliq Agent is an **auditable, tool-bounded manufacturing assistant**.

### Explicitly Forbidden Operations
1. Arbitrary code execution (`eval`, `exec`, system shells).
2. Raw SQL queries or direct database mutations not wrapped in an authorized tool.
3. System command calls (`rm -rf`, `process.env` access, secret exposure).
4. Direct connector queries without user authentication.
5. Audit log mutation or admin role changes.
6. Execution of critical actions without human approval.

### Mandatory Human Approval Actions
- `RUN_OPTIMIZATION`
- `APPLY_CLEANING`
- `RETRAIN_MODEL`
- `CREATE_SHARE_LINK`
- `EXPORT_QUALITY_PASSPORT`
- `CREATE_TRIAL_PLAN`

### Rate Limiting & Audit Logging
- **Rate Limit**: 10 agent runs per user per minute.
- **Audit Logging**: `AgentRun`, `AgentTask`, and `ToolCallLog` models track every tool latency and outcome in MongoDB.
