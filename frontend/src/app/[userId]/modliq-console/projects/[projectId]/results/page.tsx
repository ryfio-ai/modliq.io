'use client';

import React, { useEffect, use } from 'react';
import ResultsPage from '@/app/[userId]/modliq-console/results/page';
import { usePipelineStore } from '@/store/pipelineStore';

export default function ProjectResultsPage({
  params,
}: {
  params: Promise<{ userId: string; projectId: string }>;
}) {
  const resolvedParams = use(params);
  const { projectId } = resolvedParams;
  const { setProject } = usePipelineStore();

  useEffect(() => {
    setProject(projectId);
  }, [projectId, setProject]);

  return <ResultsPage />;
}
