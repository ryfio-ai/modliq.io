'use client';

import React, { useEffect, use } from 'react';
import QualityStudioPage from '@/app/[userId]/modliq-console/studio/quality/page';
import { usePipelineStore } from '@/store/pipelineStore';

export default function ProjectQualityStudioPage({
  params,
}: {
  params: Promise<{ userId: string; projectId: string }>;
}) {
  const resolvedParams = use(params);
  const { userId, projectId } = resolvedParams;
  const { setProject } = usePipelineStore();

  useEffect(() => {
    setProject(projectId);
  }, [projectId, setProject]);

  return <QualityStudioPage params={Promise.resolve({ userId })} />;
}
