'use client';

import React, { use } from 'react';
import { Upload } from 'lucide-react';
import DataIngestionTabs from '@/components/data-ingestion/DataIngestionTabs';

export default function ProjectDataUploadPage({
  params,
}: {
  params: Promise<{ userId: string; projectId: string }>;
}) {
  const resolvedParams = use(params);
  const { userId, projectId } = resolvedParams;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1B2A4A] tracking-tight flex items-center gap-3">
          <Upload className="text-[#2B70AB]" size={28} /> Data Ingestion & Connectors
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Bring manufacturing data into Modliq from files (CSV, Excel, PDF, Word) or read-only database connectors.
        </p>
      </div>

      <DataIngestionTabs userId={userId} projectId={projectId} />
    </div>
  );
}
