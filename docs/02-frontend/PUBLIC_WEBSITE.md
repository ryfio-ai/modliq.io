# Modliq Public Website & Marketing Architecture

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🌐 Public Site Structure

Modliq's public marketing website is located in `frontend/src/app/`. It serves as the primary acquisition channel for manufacturing leads and pilot applications.

```mermaid
flowchart TD
  Home[/] --> Solutions[/solutions]
  Home --> Features[/features]
  Home --> ROI[/roi]
  Home --> Architecture[/system-architecture]
  Home --> Contact[/contact]
```

---

## 📄 Key Pages & Purpose

1. **Homepage (`/`)**: High-impact hero section, live interactive demo widget, 6 manufacturing use cases, Qeltrava AI parent brand attribution, and Free Pilot CTA.
2. **Solutions Pages (`/solutions`, `/solutions/[industry]`)**: Tailored value propositions for Specialty Chemicals, Food Processing, Pharma/Nutraceuticals, Automotive Components, Packaging/Plastics, and Textiles.
3. **ROI Calculator (`/roi`)**: Interactive yield improvement, scrap reduction, and annual cost savings calculator.
4. **Live System Architecture (`/system-architecture`)**: Transparent breakdown of 3-tier microservice architecture, multi-provider AI gateway, and zero-trust security.
5. **Contact Page (`/contact`)**: Lead capture form persisting leads to `ContactLead` in MongoDB Atlas.

---

## 🔍 SEO / AEO / GEO Optimization

- **SEO (Search Engine Optimization)**: Comprehensive `<title>` and `<meta name="description">` tags on every page, dynamic `sitemap.ts`, and `robots.ts`.
- **AEO (Answer Engine Optimization)**: Schema.org JSON-LD structured data (`SoftwareApplication`, `Organization`) optimized for ChatGPT, Perplexity, and Claude answer engines.
- **GEO (Generative Engine Optimization)**: Clear, entity-rich markdown headers and authoritative manufacturing terminology.

---

## 🔗 Related Documentation

- [ROUTES.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/02-frontend/ROUTES.md) — Route table
- [SEO_AEO_GEO.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/10-launch/SEO_AEO_GEO.md) — Launch SEO strategy
