# Modliq Phase 2 Features — Step-by-Step Implementation Guide

This guide provides architectural instructions, environment configurations, and production code snippets to implement the 6 Phase 2 features for Modliq.

---

## 📦 1. S3 / MinIO Binary Model Artifact Storage

### Overview
Replaces local disk model artifact storage (`./model_artifacts`) with S3 or MinIO object storage for scalable, multi-region model `.joblib` binary storage.

### Environment Variables
Add to `ml-engine/.env`:
```env
STORAGE_BACKEND=s3 # "local" or "s3"
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=modliq-model-artifacts
S3_ENDPOINT_URL=https://s3.amazonaws.com # Or http://minio:9000 for MinIO
```

### Python Implementation (`ml-engine/services/storage.py`)
```python
import os
import io
import boto3
from pathlib import Path
import logging

logger = logging.getLogger("modliq.storage")

class ModelStorage:
    def __init__(self):
        self.backend = os.getenv("STORAGE_BACKEND", "local")
        if self.backend == "s3":
            self.s3 = boto3.client(
                "s3",
                aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
                aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
                region_name=os.getenv("AWS_REGION", "us-east-1"),
                endpoint_url=os.getenv("S3_ENDPOINT_URL", None),
            )
            self.bucket = os.getenv("S3_BUCKET_NAME", "modliq-model-artifacts")

    def save_artifact(self, model_id: str, filename: str, data: bytes) -> str:
        if self.backend == "s3":
            key = f"models/{model_id}/{filename}"
            self.s3.put_object(Bucket=self.bucket, Key=key, Body=data)
            logger.info("Saved S3 artifact: s3://%s/%s", self.bucket, key)
            return f"s3://{self.bucket}/{key}"
        else:
            path = Path(f"./model_artifacts/{model_id}/{filename}")
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data)
            return str(path)
```

---

## 🔐 2. JWT + Google / GitHub OAuth Authentication

### Overview
Implements NextAuth.js on the frontend and JWT verification middleware on the Express backend.

### Frontend NextAuth Setup (`frontend/src/app/api/auth/[...nextauth]/route.ts`)
```typescript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || "EDITOR";
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.userId;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

### Express Backend JWT Verification (`backend/src/middleware/auth.ts`)
```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function requireJwtAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization bearer token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'modliq-secret-key');
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
```

---

## 🛡️ 3. Role-Based Access Control (RBAC: Admin, Editor, Viewer)

### Prisma Schema Enum (`backend/prisma/schema.prisma`)
```prisma
enum Role {
  ADMIN
  EDITOR
  VIEWER
}

model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  email String @unique
  role  Role   @default(EDITOR)
}
```

### Express RBAC Middleware (`backend/src/middleware/rbac.ts`)
```typescript
import { Request, Response, NextFunction } from 'express';

export function requireRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.role || 'VIEWER';
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        error: `Forbidden: Requires one of [${allowedRoles.join(', ')}] roles. Your role is ${userRole}.`,
      });
    }
    next();
  };
}
```
*Usage in routes:*
`router.delete('/projects/:id', requireJwtAuth, requireRole(['ADMIN']), deleteProject);`

---

## 🧪 4. Automated Test Suites (PyTest + Jest + Playwright)

### A. PyTest for Python ML Engine (`ml-engine/tests/test_automl.py`)
```python
import pytest
import pandas as pd
from services.automl.task_detector import TaskDetector

def test_task_detection_classification():
    df = pd.DataFrame({"age": [25, 30, 45], "churn": [0, 1, 0]})
    detector = TaskDetector()
    res = detector.detect(df, goal="Predict churn")
    assert res["task_type"] == "classification"
    assert res["suggested_target"] == "churn"
```
*Run command:* `pytest ml-engine/tests`

### B. Jest for Express Backend (`backend/tests/projects.test.ts`)
```typescript
import request from 'supertest';
import app from '../src/entrypoint/server';

describe('GET /api/v1/projects', () => {
  it('should return list of projects with status 200', async () => {
    const res = await request(app).get('/api/v1/projects');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.projects)).toBe(true);
  });
});
```
*Run command:* `cd backend && npx jest`

### C. Playwright E2E Test (`frontend/tests/e2e/workflow.spec.ts`)
```typescript
import { test, expect } from '@playwright/test';

test('Full workflow from dashboard to prediction results', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('h1')).toContainText('Modliq');
  await page.click('text=View Optimization Results');
  await expect(page.url()).toContain('/results');
});
```
*Run command:* `cd frontend && npx playwright test`

---

## 🚨 5. Sentry Error Tracking Integration

### Python ML Engine (`ml-engine/main.py`)
```python
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN_ML_ENGINE"),
    traces_sample_rate=1.0,
    profiles_sample_rate=1.0,
    integrations=[FastApiIntegration()],
)
```

### Express Backend (`backend/src/entrypoint/server.ts`)
```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN_BACKEND,
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

---

## 🔔 6. PSI Data Drift Slack Webhook Alerts

### Python Drift Webhook Service (`ml-engine/services/drift_detector.py`)
```python
import os
import requests
import logging

logger = logging.getLogger("modliq.drift")

def send_slack_drift_alert(model_id: str, feature: str, psi_score: float):
    webhook_url = os.getenv("SLACK_WEBHOOK_URL")
    if not webhook_url:
        logger.info("SLACK_WEBHOOK_URL not configured. Skipping alert.")
        return

    payload = {
        "text": f"⚠️ *MODLIQ DRIFT ALERT*: Feature drift detected in model `{model_id}`!",
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*MODLIQ DATA DRIFT ALERT*\nModel `{model_id}` feature *`{feature}`* PSI score is *{psi_score:.3f}* (Threshold: > 0.20)."
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {"type": "plain_text", "text": "Open Monitoring Dashboard"},
                        "url": "http://localhost:3000/results"
                    }
                ]
            }
        ]
    }

    try:
        r = requests.post(webhook_url, json=payload, timeout=5)
        logger.info("Slack alert sent: %d", r.status_code)
    except Exception as e:
        logger.error("Failed to send Slack webhook alert: %s", e)
```
