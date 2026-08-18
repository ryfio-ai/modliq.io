# Fine-Tuning Preparation Primitive

> **Last verified: 17/08/2026**
> **Brand: MODLIQER**
> **Status: Beta**

Converts verified labeled dataset examples and QA pairs into fine-tuning-ready JSONL files.

---

## Formats Supported
1. **OpenAI Chat JSONL (`OPENAI_CHAT_JSONL`)**: `{"messages": [{"role": "system", ...}, {"role": "user", ...}, {"role": "assistant", ...}]}`
2. **Instruction-Response JSONL (`INSTRUCTION_JSONL`)**: `{"instruction": "...", "response": "..."}`
3. **Classification JSONL (`CLASSIFICATION_JSONL`)**: `{"text": "...", "label": "..."}`

---

## Endpoints
- **Export Dataset**: `POST /api/v1/projects/:projectId/fine-tuning/export`
- **List Exports**: `GET /api/v1/projects/:projectId/fine-tuning/exports`

---

## Related Documentation
- `docs/06-ai/MODULAR_AI_STACK.md`
- `docs/06-ai/DATA_LABELING.md`
