# MODLIQER Database Models

> **Last verified:** 17/08/2026


## Agent & Audit Models
- `AgentRun` — Represents an agent execution run (`id`, `publicId`, `userId`, `projectId`, `mode`, `userPrompt`, `status`, `planJson`, `resultJson`).
- `AgentTask` — Individual tool execution step (`id`, `agentRunId`, `toolName`, `status`, `inputJson`, `outputJson`, `error`).
- `ApprovalRequest` — Human-in-the-loop action approval request (`id`, `publicId`, `userId`, `projectId`, `agentRunId`, `actionType`, `payloadJson`, `status`, `approvedAt`).
- `AgentMemory` — Learned user preference memory (`id`, `userId`, `projectId`, `memoryType`, `contentJson`).
- `ToolCallLog` — Auditable log of tool calls (`id`, `userId`, `projectId`, `agentRunId`, `toolName`, `success`, `latencyMs`).
