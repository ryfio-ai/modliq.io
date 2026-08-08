# Modliq Database Models Documentation

## Overview
Modliq utilizes MongoDB with Prisma ORM.

### Key Models & Public IDs
- **User**: Includes `publicId` (`MODLIQ-USER-YYYYMMDD-1000`)
- **Project**: Includes `publicId` (`MODLIQ-PROJECT-YYYYMMDD-1000`)
- **Organization**: Includes `publicId` (`MODLIQ-ORG-YYYYMMDD-1000`)
- **Dataset**: Includes `publicId` (`MODLIQ-DATASET-YYYYMMDD-1000`)
- **OptimizationJob**: Includes `publicId` (`MODLIQ-JOB-YYYYMMDD-1000`)
- **QualityPassport**: Includes `publicId` (`MODLIQ-PASSPORT-YYYYMMDD-1000`)
- **SupportTicket**: Includes `publicId` (`MODLIQ-TICKET-YYYYMMDD-1000`)
- **PublicIdSequence**: Tracks daily sequences per entity type (`entityType`, `dateKey`, `nextSeq`).
