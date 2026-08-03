"use client";

import React, { useState } from "react";
import { UploadCloud, Database, Globe, CheckCircle2, FileSpreadsheet, Loader2, ArrowRight } from "lucide-react";

interface UniversalUploaderProps {
  onUploadSuccess?: (datasetId: string, profile: any) => void;
  className?: string;
}

export const UniversalUploader: React.FC<UniversalUploaderProps> = ({
  onUploadSuccess,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<"file" | "db" | "api">("file");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewData, setPreviewData] = useState<any[] | null>(null);

  const handleDrop = async (e: React.DragEvent | React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(20);

    // Simulate ingestion & profiling pipeline
    setTimeout(() => setUploadProgress(60), 600);
    setTimeout(() => {
      setUploadProgress(100);
      setIsUploading(false);
      const mockProfile = {
        row_count: 1000,
        col_count: 10,
        quality_score: 95.5,
      };
      const mockPreview = [
        { temperature: 85.0, pressure: 425.0, yield_rate: 94.1 },
        { temperature: 87.5, pressure: 450.0, yield_rate: 96.8 },
        { temperature: 90.0, pressure: 460.0, yield_rate: 97.2 },
      ];
      setPreviewData(mockPreview);
      onUploadSuccess && onUploadSuccess("ds_a1b2c3d4e5f6", mockProfile);
    }, 1200);
  };

  return (
    <div
      className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm ${className}`}
    >
      {/* Source Selector Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6">
        <button
          onClick={() => setActiveTab("file")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-all ${
            activeTab === "file"
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
          }`}
        >
          <UploadCloud className="h-4 w-4" />
          <span>File Upload (CSV / Excel / JSON)</span>
        </button>

        <button
          onClick={() => setActiveTab("db")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-all ${
            activeTab === "db"
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
          }`}
        >
          <Database className="h-4 w-4" />
          <span>Database Connector (SQL / Mongo)</span>
        </button>

        <button
          onClick={() => setActiveTab("api")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-all ${
            activeTab === "api"
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
          }`}
        >
          <Globe className="h-4 w-4" />
          <span>REST API Fetch</span>
        </button>
      </div>

      {/* Tab 1: File Dropzone */}
      {activeTab === "file" && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 p-10 text-center transition-all hover:border-blue-500 hover:bg-blue-50/10"
        >
          <input
            type="file"
            onChange={handleDrop}
            accept=".csv,.xlsx,.xls,.json,.parquet"
            className="absolute inset-0 cursor-pointer opacity-0"
          />

          {isUploading ? (
            <div className="flex flex-col items-center py-4">
              <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
              <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Ingesting and profiling dataset ({uploadProgress}%)
              </p>
            </div>
          ) : previewData ? (
            <div className="flex flex-col items-center py-2">
              <CheckCircle2 className="h-12 w-12 text-emerald-500" />
              <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-slate-100">
                Dataset Upload Complete!
              </h4>
              <p className="text-xs text-slate-500">1,000 rows × 10 columns profiled</p>
            </div>
          ) : (
            <>
              <div className="rounded-full bg-blue-50 dark:bg-blue-950/50 p-4 text-blue-600 dark:text-blue-400">
                <UploadCloud className="h-8 w-8" />
              </div>
              <h4 className="mt-4 text-base font-bold text-slate-900 dark:text-slate-100">
                Drag and drop your file here, or click to browse
              </h4>
              <p className="mt-1 text-xs text-slate-500">
                Supports CSV, Excel (.xlsx), JSON, Parquet, and PDF tables up to 500MB
              </p>
            </>
          )}
        </div>
      )}

      {/* Tab 2: Database Connector Form */}
      {activeTab === "db" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500">Host</label>
              <input
                type="text"
                placeholder="db.example.com"
                className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500">Port</label>
              <input
                type="text"
                placeholder="5432"
                className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">SQL Query</label>
            <textarea
              rows={3}
              placeholder="SELECT * FROM process_metrics WHERE batch_date >= '2026-01-01'"
              className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 font-mono text-xs"
            />
          </div>
          <button
            onClick={() => handleDrop({ preventDefault: () => {} } as any)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
          >
            <span>Connect & Ingest DB</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Tab 3: REST API Form */}
      {activeTab === "api" && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <select className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-semibold">
              <option>GET</option>
              <option>POST</option>
            </select>
            <input
              type="text"
              placeholder="https://api.example.com/v1/telemetry"
              className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
            />
          </div>
          <button
            onClick={() => handleDrop({ preventDefault: () => {} } as any)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
          >
            <span>Fetch & Ingest API</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Preview Table */}
      {previewData && (
        <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-4">
          <h5 className="text-xs font-semibold uppercase text-slate-500 mb-2">Dataset Preview (First 3 Rows)</h5>
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 uppercase text-slate-500 font-semibold">
                <tr>
                  <th className="px-4 py-2.5">Temperature</th>
                  <th className="px-4 py-2.5">Pressure</th>
                  <th className="px-4 py-2.5">Yield Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {previewData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 font-mono">{row.temperature}</td>
                    <td className="px-4 py-2 font-mono">{row.pressure}</td>
                    <td className="px-4 py-2 font-mono font-bold text-blue-600">{row.yield_rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
