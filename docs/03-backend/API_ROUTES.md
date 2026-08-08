# Modliq Backend API Routes Documentation

## Authentication & User Routes
- `POST /api/v1/auth/signup`: Create user account & return `publicId`.
- `POST /api/v1/auth/login`: Authenticate user & return `publicId`.
- `GET /api/v1/auth/me`: Fetch current authenticated user with `publicId`.

## Project Routes
- `GET /api/v1/projects`: List user projects with `publicId`.
- `POST /api/v1/projects`: Create project with `publicId`.

## Admin Routes
- `GET /api/v1/admin/users`: List users with `publicId` search filter.
- `GET /api/v1/admin/lookup?publicId=...`: Global Public ID entity lookup for admin support.

## Public Marketing Routes
- `POST /api/v1/public/contact`: Handle public contact submissions.

## EDA & Analytics Workflow Routes
- `POST /api/v1/projects/:projectId/datasets/:datasetId/eda`: Generate EDA report via ML Engine.
- `GET /api/v1/projects/:projectId/datasets/:datasetId/eda`: Fetch latest EDA report.
- `POST /api/v1/projects/:projectId/datasets/:datasetId/eda/export`: Export EDA markdown report.
- `POST /api/v1/projects/:projectId/analytics/data-query`: Ask Your Factory Data (deterministic natural language query).
- `GET /api/v1/projects/:projectId/analytics/datasets/:datasetId/cleaning/recommend`: Fetch Data Cleaning Advisor recommendations.
- `POST /api/v1/projects/:projectId/analytics/datasets/:datasetId/cleaning/apply`: Apply recommendations & create Dataset Version 2.
- `GET /api/v1/projects/:projectId/analytics/datasets/:datasetId/charts/suggest`: Smart Chart Suggestions.
- `GET /api/v1/projects/:projectId/analytics/insights/narrative`: Generate plain-language executive insight narratives.
- `GET /api/v1/projects/:projectId/analytics/datasets/:datasetId/kpi-map`: KPI Auto-Mapping.
- `GET /api/v1/projects/:projectId/analytics/datasets/:datasetId/features/suggest`: Feature Engineering Suggestions.
- `POST /api/v1/projects/:projectId/analytics/datasets/:datasetId/automl/benchmark`: AutoML Benchmark Leaderboard (Beta).
- `GET /api/v1/projects/:projectId/analytics/datasets/:datasetId/drift-check`: Model Trust & Drift Monitor (Beta).
