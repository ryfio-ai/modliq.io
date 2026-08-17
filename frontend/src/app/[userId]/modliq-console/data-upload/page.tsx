'use client';

import React, { use } from 'react';
import { Upload } from 'lucide-react';
import DataIngestionTabs from '@/components/data-ingestion/DataIngestionTabs';

import NextStepCard from '@/components/ux/NextStepCard';
import SampleDataDownload from '@/components/ux/SampleDataDownload';

export default function DataUploadPage({ params }: { params: Promise<{ userId: string }> }) {
  const resolvedParams = use(params);
  const { userId } = resolvedParams;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1B2A4A] tracking-tight flex items-center gap-3">
          <Upload className="text-[#2B70AB]" size={28} /> Universal Data Ingestion &amp; Connectors
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Start with CSV or Excel. Modliq profiles your columns and checks dataset health automatically — no data science team needed.
        </p>
      </div>

      <NextStepCard
        currentStage="upload"
        userId={userId}
      />

      <SampleDataDownload />

      <DataIngestionTabs userId={userId} projectId="default" />
    </div>
  );
}
