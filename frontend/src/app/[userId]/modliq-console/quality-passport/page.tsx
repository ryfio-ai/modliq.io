'use client';

import React, { use } from 'react';
import QualityPassportView from '@/components/quality-passport/QualityPassportView';

export default function GlobalQualityPassportPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const resolvedParams = use(params);
  const { userId } = resolvedParams;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <QualityPassportView userId={userId} projectId="default" />
    </div>
  );
}
