"use client";

import React, { useState } from "react";
import { Sparkles, Code, Play, CheckCircle2, ShieldCheck } from "lucide-react";

interface PredictionFormProps {
  modelId?: string;
  features?: string[];
  className?: string;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({
  modelId = "mdl_q1r2s3t4",
  features = ["temperature", "pressure", "flow_rate", "residence_time"],
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<"single" | "api">("single");
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    temperature: "87.5",
    pressure: "440.0",
    flow_rate: "12.5",
    residence_time: "55.0",
  });
  const [predictionResult, setPredictionResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPredictionResult({
        prediction: "96.4%",
        confidence: 0.94,
        shap_breakdown: [
          { feature: "temperature", contribution: "+1.8%" },
          { feature: "pressure", contribution: "+1.2%" },
        ],
      });
    }, 600);
  };

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm ${className}`}
    >
      {/* Left Input Column */}
      <div className="space-y-4">
        <div className="flex border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab("single")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === "single"
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 font-bold"
                : "text-slate-500"
            }`}
          >
            Single Prediction
          </button>
          <button
            onClick={() => setActiveTab("api")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === "api"
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 font-bold"
                : "text-slate-500"
            }`}
          >
            API Snippets (cURL / Python)
          </button>
        </div>

        {activeTab === "single" ? (
          <div className="space-y-3">
            {features.map((feat) => (
              <div key={feat}>
                <label className="text-xs font-semibold uppercase text-slate-500">{feat}</label>
                <input
                  type="text"
                  value={formValues[feat] || ""}
                  onChange={(e) => setFormValues({ ...formValues, [feat]: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-mono"
                />
              </div>
            ))}

            <button
              onClick={handlePredict}
              disabled={isLoading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-500 transition-colors shadow-sm"
            >
              {isLoading ? (
                <span>Predicting...</span>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-white" />
                  <span>Run Model Inference</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="rounded-lg bg-slate-950 p-4 font-mono text-xs text-blue-400 overflow-x-auto">
            <p className="text-slate-500"># cURL API Prediction Request</p>
            <p className="mt-2 text-emerald-400">curl -X POST http://localhost:8000/predict \</p>
            <p className="text-emerald-400"> -H &quot;Content-Type: application/json&quot; \</p>
            <p className="text-emerald-400"> -d &apos;&#123;&quot;modelId&quot;: &quot;{modelId}&quot;, &quot;data&quot;: [&#123;&quot;temperature&quot;: 87.5&#125;]&#125;&apos;</p>
          </div>
        )}
      </div>

      {/* Right Output Column */}
      <div className="flex flex-col justify-between rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 p-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Prediction Output
          </span>

          {predictionResult ? (
            <div className="mt-4 space-y-4">
              <div>
                <span className="text-xs text-slate-500">Expected Process Outcome</span>
                <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                  {predictionResult.prediction}
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Model Confidence</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {(predictionResult.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${predictionResult.confidence * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase text-slate-400">Key Feature Contributions</span>
                <div className="mt-2 space-y-1.5">
                  {predictionResult.shap_breakdown.map((item: any) => (
                    <div key={item.feature} className="flex justify-between text-xs rounded bg-white dark:bg-slate-900 p-2 border border-slate-200 dark:border-slate-800">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{item.feature}</span>
                      <span className="font-mono font-bold text-emerald-600">{item.contribution}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-12 text-center text-slate-400">
              <Sparkles className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600 mb-2" />
              <p className="text-xs">Fill feature parameters and click &quot;Run Model Inference&quot; to see real-time output.</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Monitored for Data Drift</span>
          </div>
        </div>
      </div>
    </div>
  );
};
