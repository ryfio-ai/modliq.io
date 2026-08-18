import prisma from '../lib/prisma';
import { generatePublicId } from './publicId.service';

export interface ExportFineTuneDatasetInput {
  userId: string;
  projectId?: string;
  labelingProjectId: string;
  format: 'OPENAI_CHAT_JSONL' | 'INSTRUCTION_JSONL' | 'CLASSIFICATION_JSONL';
  systemPrompt?: string;
}

export async function exportFineTuneDataset(input: ExportFineTuneDatasetInput) {
  const labelingProject = await prisma.labelingProject.findUnique({
    where: { id: input.labelingProjectId },
  });
  if (!labelingProject) throw new Error('Labeling project not found');

  const examples = await prisma.labeledExample.findMany({
    where: { labelingProjectId: input.labelingProjectId, status: { in: ['LABELED', 'REVIEWED'] } },
  });

  const formattedRows: string[] = [];

  for (const ex of examples) {
    try {
      const inputData = JSON.parse(ex.inputJson);
      const labelData = ex.labelJson ? JSON.parse(ex.labelJson) : null;

      if (!labelData) continue;

      if (input.format === 'OPENAI_CHAT_JSONL') {
        const messages = [
          { role: 'system', content: input.systemPrompt || 'You are an AI domain expert assistant.' },
          { role: 'user', content: typeof inputData === 'string' ? inputData : JSON.stringify(inputData) },
          { role: 'assistant', content: typeof labelData === 'string' ? labelData : JSON.stringify(labelData) },
        ];
        formattedRows.push(JSON.stringify({ messages }));
      } else if (input.format === 'INSTRUCTION_JSONL') {
        formattedRows.push(
          JSON.stringify({
            instruction: typeof inputData === 'string' ? inputData : JSON.stringify(inputData),
            response: typeof labelData === 'string' ? labelData : JSON.stringify(labelData),
          })
        );
      } else if (input.format === 'CLASSIFICATION_JSONL') {
        formattedRows.push(
          JSON.stringify({
            text: typeof inputData === 'string' ? inputData : JSON.stringify(inputData),
            label: labelData,
          })
        );
      }
    } catch (e) {
      continue;
    }
  }

  const jsonlContent = formattedRows.join('\n');
  const publicId = await generatePublicId('FINETUNE');

  const record = await prisma.fineTuneDataset.create({
    data: {
      publicId,
      userId: input.userId,
      projectId: input.projectId || null,
      sourceId: input.labelingProjectId,
      format: input.format,
      status: 'EXPORTED',
      metadataJson: JSON.stringify({
        recordCount: formattedRows.length,
        systemPrompt: input.systemPrompt,
        exportedAt: new Date().toISOString(),
      }),
    },
  });

  return {
    ...record,
    jsonlContent,
    recordCount: formattedRows.length,
  };
}

export async function getFineTuneDatasets(userId: string, projectId?: string) {
  return prisma.fineTuneDataset.findMany({
    where: {
      userId,
      ...(projectId ? { projectId } : {}),
    },
    orderBy: { createdAt: 'desc' },
  });
}
