# Modliq Human-Readable Public ID System

## Overview & Purpose
Modliq uses a dual-identifier architecture:
1. **Internal Primary Key (`_id` / `id`)**: MongoDB ObjectId string preserved for high-performance database queries and internal relational links.
2. **Public Identifier (`publicId`)**: Human-readable, branded, date-sortable identifier formatted as:
   `MODLIQ-<ENTITY>-YYYYMMDD-SEQ`

Public IDs are designed for display in user interfaces, Quality Passport certificates, support tickets, admin console searches, and audit reports.

> [!IMPORTANT]
> **Security Rule**: `publicId` is strictly for display, support lookup, and reports. It MUST NEVER be used as a sole authorization key. Authorization must always enforce user session verification and ownership checks against internal tenant records.

---

## Entity Format Matrix

| Entity Type | Format | Example |
| :--- | :--- | :--- |
| **User** | `MODLIQ-USER-YYYYMMDD-####` | `MODLIQ-USER-20260808-1000` |
| **Project** | `MODLIQ-PROJECT-YYYYMMDD-####` | `MODLIQ-PROJECT-20260808-1000` |
| **Organization** | `MODLIQ-ORG-YYYYMMDD-####` | `MODLIQ-ORG-20260808-1000` |
| **Dataset** | `MODLIQ-DATASET-YYYYMMDD-####` | `MODLIQ-DATASET-20260808-1000` |
| **Optimization Job** | `MODLIQ-JOB-YYYYMMDD-####` | `MODLIQ-JOB-20260808-1000` |
| **Quality Passport** | `MODLIQ-PASSPORT-YYYYMMDD-####` | `MODLIQ-PASSPORT-20260808-1000` |
| **Support Ticket** | `MODLIQ-TICKET-YYYYMMDD-####` | `MODLIQ-TICKET-20260808-1000` |

---

## Sequence & Concurrency Architecture

- **Daily Counters**: Managed via the `PublicIdSequence` MongoDB model (`entityType` + `dateKey`).
- **Initial Sequence**: Sequences reset daily to `1000`.
- **Atomic Tracking & Fallback**: `generatePublicId()` atomically updates the database sequence with retry logic and fallback memory counters to prevent duplicate creation errors under heavy concurrent traffic.

---

## Admin Lookup API
Admin engineers can query any entity by Public ID or internal ID:

`GET /api/v1/admin/lookup?publicId=MODLIQ-USER-20260808-1000`

### Example Response:
```json
{
  "success": true,
  "data": {
    "type": "USER",
    "id": "673abc1234567890abcdef12",
    "publicId": "MODLIQ-USER-20260808-1000",
    "summary": {
      "name": "Sathish Pandiyan",
      "email": "sathish@company.com",
      "role": "USER",
      "isDemo": false
    }
  }
}
```

---

## Backfill Process

To populate `publicId` for legacy records:
```bash
cd backend
npm run backfill:public-ids
```
