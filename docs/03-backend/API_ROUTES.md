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
