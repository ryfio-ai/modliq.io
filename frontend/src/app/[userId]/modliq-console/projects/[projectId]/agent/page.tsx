'use client';

import React, { use } from 'react';
import ModliqAgentPanel from '@/components/agent/ModliqAgentPanel';

export default function ProjectAgentConsolePage({
  params,
}: {
  params: Promise<{ userId: string; projectId: string }>;
}) {
  const resolvedParams = use(params);
  const { projectId } = resolvedParams;

  return <ModliqAgentPanel projectId={projectId} />;
}
