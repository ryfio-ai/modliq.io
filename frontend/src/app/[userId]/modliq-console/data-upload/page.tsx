'use client';

import React, { use } from 'react';
import { Upload } from 'lucide-react';
import DataIngestionTabs from '@/components/data-ingestion/DataIngestionTabs';

export default function DataUploadPage({ params }: { params: Promise<{ userId: string }> }) {
  const resolvedParams = use(params);
  const { userId } = resolvedParams;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1B2A4A] tracking-tight flex items-center gap-3">
          <Upload className="text-[#2B70AB]" size={28} /> Universal Data Ingestion & Connectors
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Import manufacturing data into Modliq from files (CSV, Excel, PDF, Word) or read-only database connectors.
        </p>
      </div>

      <DataIngestionTabs userId={userId} projectId="default" />
    </div>
  );
}
