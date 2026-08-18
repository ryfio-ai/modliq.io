# Data Labeling Workspace Primitive

> **Last verified: 17/08/2026**
> **Brand: MODLIQER**
> **Status: Beta**

The Data Labeling Workspace enables teams to create, review, and export labeled datasets for classical ML modeling, defect categorization, QA pair creation, and document tagging.

---

## Features & Endpoints
- **Create Labeling Project**: `POST /api/v1/projects/:projectId/labeling/projects`
- **List Labeling Projects**: `GET /api/v1/projects/:projectId/labeling/projects`
- **Get Project Details & Examples**: `GET /api/v1/projects/:projectId/labeling/projects/:labelingProjectId`
- **Add Labeled Example**: `POST /api/v1/projects/:projectId/labeling/projects/:labelingProjectId/examples`
- **Update Example Review Status**: `PATCH /api/v1/projects/:projectId/labeling/examples/:exampleId`

---

## Data Models
- `LabelingProject`: Name, taskType (CLASSIFICATION, REGRESSION, QA_PAIR, DOCUMENT_TAGGING), status.
- `LabeledExample`: Input JSON, label JSON, reviewer ID, review status.

---

## Related Documentation
- `docs/06-ai/MODULAR_AI_STACK.md`
- `docs/06-ai/FINE_TUNING_PREP.md`
