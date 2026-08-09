import prisma from '../lib/prisma';

export interface AgentContext {
  userId: string;
  projectId?: string;
  projectName?: string;
  datasetId?: string;
  datasetFilename?: string;
  datasetRows?: number;
  datasetColumns?: string[];
  healthScore?: number;
  detectedUnits?: Record<string, string>;
  latestOptimizationId?: string;
  latestOptimizationStatus?: string;
  userPreferences?: Record<string, any>;
}

export async function buildAgentContext(userId: string, projectId?: string): Promise<AgentContext> {
  const context: AgentContext = { userId };

  if (projectId) {
    try {
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: { dataset: true },
      });

      if (project) {
        context.projectId = project.id;
        context.projectName = project.name;
        context.latestOptimizationId = project.optimizationJobId || undefined;
        context.latestOptimizationStatus = project.status;

        if (project.dataset) {
          context.datasetId = project.dataset.id;
          context.datasetFilename = project.dataset.originalName;
          context.datasetRows = project.dataset.totalRows || undefined;
          context.healthScore = project.dataset.healthScore || undefined;

          if (project.dataset.columnsJson) {
            try {
              context.datasetColumns = JSON.parse(project.dataset.columnsJson);
            } catch {}
          }
          if ((project.dataset as any)?.unitProfileJson) {
            try {
              const u = JSON.parse((project.dataset as any).unitProfileJson);
              context.detectedUnits = u.units || {};
            } catch {}
          }
        }
      }
    } catch (err) {
      console.warn('[contextBuilder] Failed to fetch project context:', err);
    }
  }

  // Load user memories (preferences)
  try {
    const memories = await prisma.agentMemory.findMany({
      where: { userId, ...(projectId ? { projectId } : {}) },
      take: 5,
    });
    if (memories.length > 0) {
      context.userPreferences = memories.reduce((acc, m) => {
        try {
          return { ...acc, [m.memoryType]: JSON.parse(m.contentJson) };
        } catch {
          return acc;
        }
      }, {});
    }
  } catch {}

  return context;
}
