import type { Metadata } from 'next';
import Link from 'next/link';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';
import AlgorithmTransparencyGrid from '@/components/marketing/AlgorithmTransparencyGrid';
import AutoMLComparisonTable from '@/components/marketing/AutoMLComparisonTable';
import { Cpu, Sparkles, ArrowRight, ShieldCheck, BarChart2, CheckCircle2, Lock, SlidersHorizontal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Modliq Algorithms & White-Box AutoML — Physics-Constrained Machine Learning',
  description:
    'Discover Modliq algorithms: XGBoost, LightGBM, Random Forest, Bayesian Optimization, SHAP explainability, and equipment safety constraint checks.',
  alternates: {
    canonical: 'https://modliq-io.vercel.app/algorithms',
  },
};

export default function AlgorithmsPage() {
  const models = [
    {
      name: 'Gradient Boosted Trees (XGBoost / LightGBM)',
      purpose: 'Non-linear process yield & quality optimization',
      bestFor: 'Batch reactors, extrusion speeds, thermal logs',
      explainability: 'SHAP values & feature importance metrics',
    },
    {
      name: 'Random Forest Regressor',
      purpose: 'Robust baseline modeling & noisy sensor telemetry',
      bestFor: 'Continuous SCADA feeds, multi-variable plant data',
      explainability: 'Gini impurity importance & partial dependence',
    },
    {
      name: 'Constrained Bayesian Optimization',
      purpose: 'Optimal machine setpoint discovery',
      bestFor: 'Target optimization with strict physical boundaries',
      explainability: 'Acquisition function bounds & safety checks',
    },
    {
      name: 'Statistical Process Control (SPC)',
      purpose: 'X-bar / R control charts & capability analysis',
      bestFor: 'Cp, Cpk calculation & Nelson rule anomaly detection',
      explainability: 'Exact 3-sigma control limits & Western Electric rules',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1B2A4A] font-sans antialiased">
      <PublicNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#F0F6FA] via-white to-white py-16 sm:py-24 border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-[#2B70AB]">
            <Cpu className="w-3.5 h-3.5" />
            <span>White-Box Physics-Constrained Machine Learning</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1B2A4A] tracking-tight leading-tight max-w-4xl mx-auto">
            Transparent ML Models Built for Physical Manufacturing
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            No black-box guesses. Modliq uses white-box machine learning models combined with strict physical equipment bounds, feature importance metrics, and automated capability mathematics.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?interest=free-pilot"
              className="px-6 py-3.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md"
            >
              Apply for Free Pilot <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/workflow"
              className="px-6 py-3.5 bg-white hover:bg-[#F0F6FA] text-[#1B2A4A] border border-[#D0E2F0] rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
            >
              See Workflow Steps
            </Link>
          </div>
        </div>
      </section>

      {/* Algorithm Matrix */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2B70AB] bg-[#F0F6FA] px-3.5 py-1 rounded-full border border-[#D0E2F0]">
              Model Library
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B2A4A]">
              Manufacturing ML Algorithms & Math Engines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {models.map((m, idx) => (
              <div key={idx} className="p-6 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-[#2B70AB]" />
                  <h3 className="text-base sm:text-lg font-bold text-[#1B2A4A]">{m.name}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  <span className="font-bold text-[#1B2A4A]">Purpose:</span> {m.purpose}
                </p>
                <div className="p-3 bg-white border border-[#D0E2F0] rounded-xl text-xs space-y-1 text-slate-600">
                  <p><span className="font-bold text-[#1B2A4A]">Best For:</span> {m.bestFor}</p>
                  <p><span className="font-bold text-[#2B70AB]">Explainability:</span> {m.explainability}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithm Transparency Visual Grid */}
      <section className="py-16 sm:py-24 bg-[#F0F6FA] border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2B70AB] bg-white px-3.5 py-1 rounded-full border border-[#D0E2F0]">
              Explainability & Safety
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B2A4A]">
              White-Box Model Transparency
            </h2>
          </div>

          <AlgorithmTransparencyGrid />
        </div>
      </section>

      {/* AutoML Comparison Table */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#D0E2F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2B70AB] bg-[#F0F6FA] px-3.5 py-1 rounded-full border border-[#D0E2F0]">
              Why Dedicated Manufacturing ML
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B2A4A]">
              Modliq vs. Generic AutoML Tools
            </h2>
          </div>

          <AutoMLComparisonTable />
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 bg-[#1B2A4A] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">Validate Your Plant Data with White-Box ML</h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Test Modliq on your factory dataset during a 30-day free pilot.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?interest=free-pilot"
              className="px-7 py-3.5 bg-[#2B70AB] hover:bg-blue-600 text-white rounded-xl font-bold text-sm transition-all shadow-lg"
            >
              Apply for Free Pilot →
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
