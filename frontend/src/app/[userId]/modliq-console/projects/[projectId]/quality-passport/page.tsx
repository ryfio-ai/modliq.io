'use client';

import React, { use } from 'react';
import QualityPassportView from '@/components/quality-passport/QualityPassportView';

export default function ProjectQualityPassportPage({
  params,
}: {
  params: Promise<{ userId: string; projectId: string }>;
}) {
  const resolvedParams = use(params);
  const { userId, projectId } = resolvedParams;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <QualityPassportView userId={userId} projectId={projectId} />
    </div>
  );
}
