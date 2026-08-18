import prisma from '../lib/prisma';
import { generatePublicId } from './publicId.service';

export interface CreateLabelingProjectInput {
  userId: string;
  projectId?: string;
  name: string;
  taskType: 'CLASSIFICATION' | 'REGRESSION' | 'QA_PAIR' | 'DOCUMENT_TAGGING';
  labels?: string[];
}

export async function createLabelingProject(input: CreateLabelingProjectInput) {
  const publicId = await generatePublicId('LABELING');
  return prisma.labelingProject.create({
    data: {
      publicId,
      userId: input.userId,
      projectId: input.projectId || null,
      name: input.name,
      taskType: input.taskType,
      labelsJson: input.labels ? JSON.stringify(input.labels) : null,
      status: 'ACTIVE',
    },
  });
}

export async function getLabelingProjects(userId: string, projectId?: string) {
  return prisma.labelingProject.findMany({
    where: {
      userId,
      ...(projectId ? { projectId } : {}),
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getLabelingProjectById(id: string) {
  const project = await prisma.labelingProject.findUnique({
    where: { id },
  });
  if (!project) return null;

  const examples = await prisma.labeledExample.findMany({
    where: { labelingProjectId: id },
    orderBy: { createdAt: 'desc' },
  });

  return {
    ...project,
    labels: project.labelsJson ? JSON.parse(project.labelsJson) : [],
    examples: examples.map((e) => ({
      ...e,
      input: JSON.parse(e.inputJson),
      label: e.labelJson ? JSON.parse(e.labelJson) : null,
    })),
  };
}

export async function addLabeledExample(labelingProjectId: string, input: any, label?: any) {
  return prisma.labeledExample.create({
    data: {
      labelingProjectId,
      inputJson: JSON.stringify(input),
      labelJson: label ? JSON.stringify(label) : null,
      status: label ? 'LABELED' : 'UNLABELED',
    },
  });
}

export async function updateLabeledExample(
  exampleId: string,
  label: any,
  status: 'LABELED' | 'REVIEWED' | 'REJECTED',
  reviewerId?: string
) {
  return prisma.labeledExample.update({
    where: { id: exampleId },
    data: {
      labelJson: JSON.stringify(label),
      status,
      reviewerId: reviewerId || null,
    },
  });
}
