'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Upload,
  Database,
  FileText,
  History,
  FileSpreadsheet,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Loader2,
  Table as TableIcon,
  ShieldCheck,
  Lock,
  Plus,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { usePipelineStore } from '@/store/pipelineStore';
import { apiFetch } from '@/lib/apiFetch';

interface DataIngestionTabsProps {
  userId: string;
  projectId: string;
}

export default function DataIngestionTabs({ userId, projectId }: DataIngestionTabsProps) {
  const router = useRouter();
  const { setDataset, setProject } = usePipelineStore();

  const [activeTab, setActiveTab] = useState<'upload' | 'connect' | 'documents' | 'history'>('upload');

  // File Upload State
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [ingestResult, setIngestResult] = useState<any | null>(null);

  // Connect Database State
  const [connectorType, setConnectorType] = useState<'postgres' | 'mongodb' | 'mysql' | 'sqlserver'>('postgres');
  const [connectorName, setConnectorName] = useState('Plant Production DB');
  const [connString, setConnString] = useState('');
  const [host, setHost] = useState('localhost');
  const [port, setPort] = useState('5432');
  const [database, setDatabase] = useState('manufacturing');
  const [username, setUsername] = useState('postgres');
  const [password, setPassword] = useState('');
  const [sslMode, setSslMode] = useState(true);

  const [testingConn, setTestingConn] = useState(false);
  const [connTestResult, setConnTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [savedConnector, setSavedConnector] = useState<any | null>(null);
  const [schemaData, setSchemaData] = useState<any | null>(null);
  const [loadingSchema, setLoadingSchema] = useState(false);

  const [selectedTable, setSelectedTable] = useState<string>('');
  const [previewData, setPreviewData] = useState<any | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [importingData, setImportingData] = useState(false);

  // Documents & History State
  const [connectorsList, setConnectorsList] = useState<any[]>([]);
  const [documentsList, setDocumentsList] = useState<any[]>([]);
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Fetch Connectors & History
  const fetchConnectors = async () => {
    try {
      const res = await apiFetch(`/api/v1/projects/${projectId}/connectors`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) setConnectorsList(data.connectors || []);
      }
    } catch (err) {
      console.error('Failed to fetch connectors:', err);
    }
  };

  useEffect(() => {
    fetchConnectors();
  }, [projectId]);

  // Handle File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    setIngestResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await apiFetch(`/api/v1/projects/${projectId}/datasets/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Upload failed');

      setIngestResult(data);

      if (data.status === 'READY' && data.preview) {
        setProject(projectId);
        setDataset(file.name, data.analytics);
      }
    } catch (err: any) {
      setUploadError(err.message || 'File upload failed');
    } finally {
      setUploading(false);
    }
  };

  // Demo Dataset Load
  const handleLoadDemo = async () => {
    setUploading(true);
    setUploadError(null);

    try {
      const res = await apiFetch(`/api/v1/datasets/demo/${userId}`, { method: 'POST' });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Demo load failed');

      setProject(projectId);
      setDataset(data.filename, data.analytics);
      router.push(`/${userId}/modliq-console/projects/${projectId}/goal`);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to load demo dataset');
    } finally {
      setUploading(false);
    }
  };

  // Database Connection Actions
  const handleTestConnection = async () => {
    setTestingConn(true);
    setConnTestResult(null);

    try {
      const config = connString
        ? { connectionString: connString }
        : { host, port: parseInt(port, 10), database, username, password, sslMode };

      const res = await apiFetch(`/api/v1/projects/${projectId}/connectors/test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: connectorType, config }),
      });

      const data = await res.json();
      setConnTestResult({ success: data.success, message: data.message || (data.success ? 'Connected!' : 'Connection failed') });
    } catch (err: any) {
      setConnTestResult({ success: false, message: err.message || 'Connection test error' });
    } finally {
      setTestingConn(false);
    }
  };

  const handleSaveConnector = async () => {
    try {
      const config = connString
        ? { connectionString: connString }
        : { host, port: parseInt(port, 10), database, username, password, sslMode };

      const res = await apiFetch(`/api/v1/projects/${projectId}/connectors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: connectorName, type: connectorType, config }),
      });

      const data = await res.json();
      if (data.success) {
        setSavedConnector(data.connector);
        fetchConnectors();
        handleFetchSchema(data.connector.id);
      }
    } catch (err) {
      console.error('Failed to save connector:', err);
    }
  };

  const handleFetchSchema = async (connectorId: string) => {
    setLoadingSchema(true);
    try {
      const res = await apiFetch(`/api/v1/projects/${projectId}/connectors/${connectorId}/schema`);
      const data = await res.json();
      if (data.success) setSchemaData(data);
    } catch (err) {
      console.error('Failed to fetch schema:', err);
    } finally {
      setLoadingSchema(false);
    }
  };

  const handlePreviewTable = async (tableOrCol: string) => {
    setSelectedTable(tableOrCol);
    setPreviewLoading(true);
    if (!savedConnector?.id) return;

    try {
      const isMongo = connectorType === 'mongodb';
      const body = isMongo ? { collection: tableOrCol, limit: 100 } : { table: tableOrCol, limit: 100 };

      const res = await apiFetch(`/api/v1/projects/${projectId}/connectors/${savedConnector.id}/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) setPreviewData(data);
    } catch (err) {
      console.error('Failed to preview table:', err);
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleImportTable = async () => {
    if (!savedConnector?.id || !selectedTable) return;
    setImportingData(true);

    try {
      const isMongo = connectorType === 'mongodb';
      const body = isMongo ? { collection: selectedTable, limit: 10000 } : { table: selectedTable, limit: 10000 };

      const res = await apiFetch(`/api/v1/projects/${projectId}/connectors/${savedConnector.id}/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success && data.datasetId) {
        setProject(projectId);
        setDataset(`${savedConnector.name} - ${selectedTable}`, data.analytics);
        router.push(`/${userId}/modliq-console/projects/${projectId}/goal`);
      }
    } catch (err) {
      console.error('Import failed:', err);
    } finally {
      setImportingData(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Header Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        {[
          { id: 'upload', label: 'Upload File', icon: Upload },
          { id: 'connect', label: 'Connect Database', icon: Database },
          { id: 'documents', label: 'Reference Documents', icon: FileText },
          { id: 'history', label: 'Import History', icon: History },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-white text-[#2B70AB] border border-slate-200 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-[#2B70AB]' : 'text-slate-400'} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {uploadError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
          <AlertCircle size={18} className="shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* TAB 1: UPLOAD FILE */}
      {activeTab === 'upload' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Multi-Format File Drag & Drop */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2B70AB] flex items-center justify-center mx-auto">
                  <FileSpreadsheet size={32} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Upload Dataset or Document</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Supports .CSV, .XLSX, .XLS, .PDF, .DOCX (Max 50MB)
                  </p>
                </div>
              </div>

              <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2B70AB] text-white font-medium text-sm hover:bg-[#205887] transition-all shadow-sm">
                {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                Select File
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls,.pdf,.docx,.doc"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            {/* Load Pre-Packaged Demo Data */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                  <Sparkles size={32} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Load Demo Yield Dataset</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Instantly load 500 rows of pre-packaged yield & process metrics.
                  </p>
                </div>
              </div>

              <button
                onClick={handleLoadDemo}
                disabled={uploading}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-all shadow-sm"
              >
                {uploading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                Load Demo Data <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Ingested Results & Preview Display */}
          {ingestResult && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-emerald-600" />
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {ingestResult.status === 'READY' ? 'Structured Dataset Ingested' : 'Reference Document Ingested'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Source: {ingestResult.fileType?.toUpperCase()} · Status: {ingestResult.status}
                    </p>
                  </div>
                </div>

                {ingestResult.status === 'READY' && (
                  <button
                    onClick={() => router.push(`/${userId}/modliq-console/projects/${projectId}/goal`)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2B70AB] text-white font-medium text-sm hover:bg-[#205887] transition-all shadow-sm"
                  >
                    Continue to Goal <ArrowRight size={16} />
                  </button>
                )}
              </div>

              {/* Detected Modules */}
              {ingestResult.detectedModules && (
                <div className="flex items-center gap-2 pt-2 flex-wrap">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Detected Modules:</span>
                  {(() => {
                    const modules = ingestResult.detectedModules as any;
                    const entries = modules && typeof modules === 'object'
                      ? Object.entries(modules)
                      : [];
                    const safe = entries.filter(([, v]) => typeof v === 'boolean' && v);
                    if (!safe.length) return null;
                    return safe.map(([k]) => (
                      <span key={k} className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-[#2B70AB] border border-blue-200 capitalize">
                        {String(k)}
                      </span>
                    ));
                  })()}
                </div>
              )}

              {/* Preview Table */}
              {ingestResult.preview && ingestResult.preview.length > 0 && (
                <div className="overflow-x-auto max-h-64 border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] sticky top-0">
                      <tr>
                        {Object.keys(ingestResult.preview[0]).map((h) => (
                          <th key={h} className="px-3 py-2 border-b">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ingestResult.preview.slice(0, 5).map((row: any, i: number) => (
                        <tr key={i} className="border-b hover:bg-slate-50">
                          {Object.values(row).map((v: any, j: number) => (
                            <td key={j} className="px-3 py-2 truncate max-w-[150px]">{String(v)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CONNECT DATABASE */}
      {activeTab === 'connect' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Database size={20} className="text-[#2B70AB]" /> Read-Only Database Connectors
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Connect to your plant database. Modliq accesses tables with read-only SELECT queries only.
            </p>
          </div>

          {/* Database Types */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'postgres', label: 'Supabase / Postgres', enabled: true },
              { id: 'mongodb', label: 'MongoDB', enabled: true },
              { id: 'mysql', label: 'MySQL (Coming Soon)', enabled: false },
              { id: 'sqlserver', label: 'SQL Server (Coming Soon)', enabled: false },
            ].map((db) => (
              <button
                key={db.id}
                disabled={!db.enabled}
                onClick={() => setConnectorType(db.id as any)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  connectorType === db.id && db.enabled
                    ? 'border-[#2B70AB] bg-blue-50 ring-2 ring-blue-100 font-semibold text-[#2B70AB]'
                    : db.enabled
                    ? 'border-slate-200 hover:border-slate-300 text-slate-700'
                    : 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{db.label}</span>
                  {!db.enabled && <Lock size={14} className="text-slate-400" />}
                </div>
              </button>
            ))}
          </div>

          {/* Connection Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Connector Name</label>
              <input
                type="text"
                value={connectorName}
                onChange={(e) => setConnectorName(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Database Name</label>
              <input
                type="text"
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs text-slate-800"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Connection String (or fill Host/User below)
              </label>
              <input
                type="text"
                value={connString}
                onChange={(e) => setConnString(e.target.value)}
                placeholder="postgresql://user:pass@host:5432/dbname"
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs text-slate-800"
              />
            </div>
          </div>

          {/* Test & Save Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {connTestResult && (
              <span className={`text-xs font-medium ${connTestResult.success ? 'text-emerald-600' : 'text-red-600'}`}>
                {connTestResult.message}
              </span>
            )}
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={handleTestConnection}
                disabled={testingConn}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium text-xs hover:bg-slate-200 transition-colors"
              >
                {testingConn ? <Loader2 size={14} className="animate-spin" /> : 'Test Connection'}
              </button>
              <button
                onClick={handleSaveConnector}
                className="px-5 py-2 rounded-xl bg-[#2B70AB] text-white font-medium text-xs hover:bg-[#205887] transition-colors"
              >
                Save & Load Schema
              </button>
            </div>
          </div>

          {/* Table Selector & Import */}
          {schemaData && schemaData.success && (
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h4 className="text-sm font-semibold text-slate-900">Select Table to Import</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {(schemaData.tables || schemaData.collections || []).map((item: any) => {
                  const name = item.name || item;
                  return (
                    <button
                      key={name}
                      onClick={() => handlePreviewTable(name)}
                      className={`p-3 rounded-lg border text-left text-xs font-medium transition-colors ${
                        selectedTable === name ? 'bg-blue-50 border-[#2B70AB] text-[#2B70AB]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>

              {selectedTable && (
                <div className="flex items-center justify-between pt-4">
                  <span className="text-xs text-slate-500">Selected: {selectedTable}</span>
                  <button
                    onClick={handleImportTable}
                    disabled={importingData}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 transition-colors"
                  >
                    {importingData ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    Import 10,000 Rows to Dataset
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: REFERENCE DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <FileText size={20} className="text-[#2B70AB]" /> Reference Documents & Reports
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Uploaded PDF & Word reports saved as reference context for AI Copilot.
            </p>
          </div>

          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <FileText size={32} className="text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-500">Upload PDF or Word documents from the Upload File tab to view them here.</p>
          </div>
        </div>
      )}

      {/* TAB 4: IMPORT HISTORY */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <History size={20} className="text-[#2B70AB]" /> Import History
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Log of all ingested datasets, file uploads, and database snapshots.
            </p>
          </div>

          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <History size={32} className="text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-500">All historical ingestion snapshots for this project will be listed here.</p>
          </div>
        </div>
      )}
    </div>
  );
}
