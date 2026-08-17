'use client';

import React, { use } from 'react';
import QualityPassportView from '@/components/quality-passport/QualityPassportView';

import NextStepCard from '@/components/ux/NextStepCard';

export default function GlobalQualityPassportPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const resolvedParams = use(params);
  const { userId } = resolvedParams;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <NextStepCard
        currentStage="passport"
        userId={userId}
      />
      <QualityPassportView userId={userId} projectId="default" />
    </div>
  );
}
