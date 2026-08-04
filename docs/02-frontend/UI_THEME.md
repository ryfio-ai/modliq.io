# Modliq Design System & UI Theme Specifications

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🎨 Aesthetic Vision: Notion × Figma × Vercel

Modliq features a clean, high-contrast light theme with rich industrial blue accents. It is designed to look crisp, professional, and accessible on both factory floor tablets and high-resolution desktop monitors.

---

## 🎨 Color Palette & Design Tokens

Configured in `frontend/src/app/globals.css`:

| Token | Color Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Background** | Clean White | `#FFFFFF` | Primary page & container background |
| **Primary Navy** | Deep Navy | `#1B2A4A` | Headings, primary text, dark cards |
| **Signal Blue** | Signal Blue | `#2B70AB` | Primary CTAs, active tab highlights, progress bars |
| **Soft Blue** | Soft Blue | `#F0F6FA` | Card backgrounds, subtle table zebra striping |
| **Border Gray** | Border Blue-Gray | `#D0E2F0` | Dividers, card borders, input borders |
| **Success Green** | Emerald Green | `#10B981` | Positive yield improvement, AUDIT_READY status |
| **Warning Amber** | Amber | `#F59E0B` | REVIEW_REQUIRED status, data warnings |
| **Danger Red** | Crimson Red | `#EF4444` | High defect rate, failed jobs, critical alerts |

---

## 🔤 Typography & Layout Guidelines

- **Font Family**: **Poppins** (`Google Font font-sans`).
- **Base Font Size**: 14px – 16px with crisp line heights for high scannability.
- **Card Styling**: `bg-white rounded-xl border border-[#D0E2F0] shadow-sm`.
- **Button Styling**: Signal Blue with subtle hover scaling and smooth transitions (`transition-all duration-200`).

---

## 🔗 Related Documentation

- [FRONTEND_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/FRONTEND_OVERVIEW.md) — Frontend overview
- [COMPONENTS.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/COMPONENTS.md) — UI Component library
