# MODLIQER Terminology Glossary

> **Last verified:** 17/08/2026
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 📖 Key Terminology & Definitions

### Manufacturing & Quality Terms
- **SPC (Statistical Process Control)**: The application of statistical methods to monitor and control industrial processes, ensuring operations stay within specified quality limits.
- **$C_p$ (Process Capability Ratio)**: A statistical measure of a process's potential capability to manufacture products within specification limits, regardless of process centering.
- **$C_{pk}$ (Process Capability Index)**: A statistical measure indicating how closely a process is running to its target specification limits, accounting for process centering.
- **AQL (Acceptable Quality Limit)**: The maximum percentage of defective items that, for audit inspection purposes, is considered satisfactory as a process average.
- **OEE (Overall Equipment Effectiveness)**: The gold-standard metric for measuring manufacturing productivity, calculated as $\text{Availability} \times \text{Performance} \times \text{Quality}$.
- **Quality Passport**: MODLIQER's aggregate audit document summarizing process capability, optimization results, compliance readiness, and recommended SOP actions for a given batch or project.
- **Kaizen**: The continuous improvement methodology involving all employees to implement small, incremental changes in processes.
- **CAPA (Corrective and Preventive Action)**: Systemic actions taken to eliminate the root causes of identified non-conformities or quality defects.
- **Supplier Traceability**: The ability to track material lots from raw supplier intake through processing batches to finished goods.

### Platform & AI Engineering Terms
- **Dataset Health**: Automated scoring (0–100) assessing missing data, correlation collinearity, duplicate rows, constant values, and suspicious ID columns in an uploaded dataset.
- **Goal Parser**: Natural language understanding engine (rule-based + LLM) that converts plain text optimization targets into structured math constraints.
- **Optimization Job**: An asynchronous computational job managed by BullMQ and executed by the FastAPI ML Engine to train models and compute safe operating windows.
- **Quality Studio**: MODLIQER's unified console environment where users configure goals, review AutoML results, and generate Quality Passports.
- **Tenant Isolation**: Architectural pattern ensuring that organization and user data is strictly segregated via `organizationId`, `userId`, and `projectId` query scoping.
- **AI Copilot**: MODLIQER's multi-provider LLM assistant providing real-time process insights, SOP recommendations, and natural language troubleshooting.
