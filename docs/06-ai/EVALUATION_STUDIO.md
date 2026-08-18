# Evaluation Studio Primitive

> **Last verified: 17/08/2026**
> **Brand: MODLIQER**
> **Status: Beta**

Automated evaluation scorecards for RAG citation accuracy, LLM answer quality, AutoML model metrics, and agent task execution.

---

## Evaluation Types
1. **RAG**: Evaluates citation grounding, page accuracy, and hallucination rate.
2. **LLM**: Evaluates prompt regression and quality response criteria.
3. **MODEL**: Evaluates R2, RMSE, MAE, and Cpk tolerance pass rates.
4. **AGENT**: Evaluates multi-step tool execution success and approval compliance.

---

## Endpoints
- **Run Test Suite**: `POST /api/v1/projects/:projectId/evals/run`
- **List Evaluation Runs**: `GET /api/v1/projects/:projectId/evals`
- **Get Run Details**: `GET /api/v1/projects/:projectId/evals/:evalRunId`

---

## Related Documentation
- `docs/06-ai/MODULAR_AI_STACK.md`
- `docs/06-ai/GENERATIVE_AI_STACK.md`
