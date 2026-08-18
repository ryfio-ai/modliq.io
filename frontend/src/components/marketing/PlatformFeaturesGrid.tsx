'use client';

import React from 'react';
import {
  FileSpreadsheet,
  Activity,
  Target,
  Cpu,
  Sliders,
  ShieldCheck,
  BarChart3,
  Truck,
  Recycle,
  Award,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface PlatformFeaturesGridProps {
  onOpenDemoModal?: (interest?: string) => void;
}

export default function PlatformFeaturesGrid({ onOpenDemoModal }: PlatformFeaturesGridProps) {
  const features = [
    {
      id: 'ingestion',
      title: '1. Universal Multi-Source Ingestion',
      category: 'DATA ENGINE',
      icon: FileSpreadsheet,
      description:
        'Upload CSV, Excel (XLSX/XLS), PDF spec sheets, or Word documents. Connect direct SQL/NoSQL databases including PostgreSQL, Supabase, MongoDB, MySQL, and SQL Server.',
      details: ['CSV & XLSX Parser', 'PDF & DOCX Extraction', 'SQL Connector Hub', 'Health Profiling'],
    },
    {
      id: 'eda',
      title: '2. Dataset Profiling & EDA Studio',
      category: 'ANALYTICS ENGINE',
      icon: Activity,
      description:
        'Automated exploratory data analysis with correlation matrices, missing value detection, distribution histograms, outlier identification, and a 0–100 Dataset Health Score.',
      details: ['Health Scorecard', 'Correlation Matrix', 'Missing Row Alerts', 'Anomaly Flags'],
    },
    {
      id: 'goal-parser',
      title: '3. NLP Manufacturing Goal Parser',
      category: 'INTENT AI',
      icon: Target,
      description:
        'State plain-English goals like "Maximize tensile strength above 95 MPa while keeping temp under 90°C". Automatically detects target columns and constraint boundaries.',
      details: ['Natural Language Parsing', 'Variable Scoping', 'Safety Boundary Detection', 'Engineer Approval'],
    },
    {
      id: 'automl',
      title: '4. AutoML Process Model Zoo',
      category: 'ML ENGINE',
      icon: Cpu,
      description:
        '16-algorithm regression & classification model zoo powered by Optuna Bayesian hyperparameter tuning, BullMQ background queues, and instant cross-validation metrics.',
      details: ['16 Model Zoo', 'Optuna Bayesian Tuning', 'R² & RMSE Scoring', 'BullMQ Async Queue'],
    },
    {
      id: 'shap-windows',
      title: '5. Safe Parameter Ranges & SHAP Drivers',
      category: 'OPTIMIZATION',
      icon: Sliders,
      description:
        'Plain-English key process drivers ranked by SHAP feature importance. Computes safe operating parameter setpoint windows with step-by-step 7-batch trial SOPs.',
      details: ['SHAP Importance', 'Optimal Setpoint Ranges', '7-Batch Trial SOPs', 'Rollback Triggers'],
    },
    {
      id: 'quality-studio',
      title: '6. Quality Studio & Six Sigma Analytics',
      category: 'QUALITY ASSURANCE',
      icon: ShieldCheck,
      description:
        'Statistical Process Control (SPC X-bar R charts), Process Capability indices (Cp, Cpk), AQL sampling inspection tables, FMEA risk matrix, and Ishikawa fishbone diagrams.',
      details: ['SPC X-bar R Control', 'Cp / Cpk Capability', 'AQL Sampling Tables', 'FMEA & Fishbone'],
    },
    {
      id: 'operations',
      title: '7. Operations & OEE Downtime Tracker',
      category: 'PLANT OPERATIONS',
      icon: BarChart3,
      description:
        'Real-time shift log tracking, machine availability × performance × quality OEE gauge calculation, downtime Pareto breakdown, and hourly scrap logging.',
      details: ['OEE Gauge Math', 'Downtime Pareto', 'Shift Scrap Tracking', 'Machine Availability'],
    },
    {
      id: 'supply-chain',
      title: '8. Supplier & Material Lot Traceability',
      category: 'SUPPLY CHAIN',
      icon: Truck,
      description:
        'Link incoming vendor raw material batch lot codes directly to final product line yield. Calculates vendor defect scores and supplier risk indices.',
      details: ['Material Lot Linkage', 'Vendor Defect Index', 'Batch Traceability', 'Incoming Inspection'],
    },
    {
      id: 'lean',
      title: '9. Lean Manufacturing & Kaizen Hub',
      category: 'CONTINUOUS IMPROVEMENT',
      icon: Recycle,
      description:
        'Track 8-Waste events (Defects, Motion, Waiting, Overproduction), score 5S workplace audits (Sort, Set, Shine, Standardize, Sustain), and run Kaizen Kanban boards.',
      details: ['8-Waste Logging', '5S Audit Radar', 'Kaizen Kanban', 'Action Owner Tracking'],
    },
    {
      id: 'quality-passport',
      title: '10. Buyer-Ready Quality Passport Generator',
      category: 'COMPLIANCE',
      icon: Award,
      description:
        'Generate buyer-ready Quality Passports and PPAP/ISIR compliance packs. Export Markdown/PDF reports and share token-hashed compliance links with buyers.',
      details: ['Audit Readiness Score', 'PDF / Markdown Export', 'Public Share Links', 'PPAP / ISIR Packs'],
    },
    {
      id: 'admin-console',
      title: '11. Enterprise Admin Console & RBAC',
      category: 'PLATFORM GOVERNANCE',
      icon: Lock,
      description:
        'Multi-tenant workspace scoping, role-based access control (ADMIN vs USER), multi-provider AI failover matrix (Groq, Gemini, NVIDIA), audit logs, and lead pipeline.',
      details: ['Multi-Tenant Entitlements', 'Role RBAC Gates', 'AI Provider Failover', 'Security Audit Logs'],
    },
  ];

  return (
    <section id="features" className="w-full py-16 sm:py-24 bg-[#F0F6FA] border-b border-[#D0E2F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 border border-blue-200 text-xs font-extrabold text-[#2B70AB] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#2B70AB]" />
            <span>Complete Modular Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1B2A4A] tracking-tight">
            11 Core Modules. One Unified Platform.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Modliq integrates data ingestion, AutoML optimization, Six Sigma quality validation, plant operations, and audit compliance into a single no-code workspace.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.id}
                className="bg-white border border-[#D0E2F0] hover:border-[#2B70AB] rounded-3xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-[#2B70AB] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 uppercase tracking-wider">
                      {f.category}
                    </span>
                    <div className="p-2.5 bg-[#F0F6FA] text-[#2B70AB] group-hover:bg-[#2B70AB] group-hover:text-white rounded-xl transition">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-[#1B2A4A] group-hover:text-[#2B70AB] transition">
                      {f.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
                      {f.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-700 font-medium">
                    {f.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2B70AB]" />
                        <span className="truncate">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Banner */}
        <div className="bg-gradient-to-r from-[#1B2A4A] via-[#1B2A4A] to-[#2B70AB] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to see all features live on your data?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100">
              Book a live quote demo. We'll simulate your industry process variables and show you immediate optimization potential.
            </p>
          </div>
          <button
            onClick={() => onOpenDemoModal && onOpenDemoModal('Quote & Live Demo')}
            className="px-8 py-4 bg-white text-[#1B2A4A] hover:bg-blue-50 font-extrabold text-sm rounded-2xl flex items-center gap-2 transition shadow-lg shrink-0"
          >
            <span>Book Quote & Demo Now</span>
            <ArrowRight className="w-4 h-4 text-[#2B70AB]" />
          </button>
        </div>
      </div>
    </section>
  );
}
