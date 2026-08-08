import prisma from '../lib/prisma';
import { generatePublicId } from '../services/publicId.service';

const isMongoObjectId = (str: any): boolean => typeof str === 'string' && /^[0-9a-fA-F]{24}$/.test(str);

export async function listProjects(userId: string) {
  try {
    return await prisma.project.findMany({
      where: { userId },
      include: {
        dataset: true,
        optimizationJob: true,
      },
      orderBy: { updatedAt: 'desc' },
    });
  } catch (err) {
    console.error('Failed to list projects:', err);
    return [];
  }
}

export async function getProject(id: string) {
  if (!isMongoObjectId(id)) {
    console.warn(`[projects] getProject skipped for non-ObjectId id '${id}'`);
    return null;
  }
  try {
    return await prisma.project.findUnique({
      where: { id },
      include: {
        dataset: true,
        optimizationJob: true,
      },
    });
  } catch (err) {
    console.error('Failed to get project:', err);
    return null;
  }
}

export async function createProject(userId: string, name?: string) {
  try {
    let projectName = name;
    if (!projectName) {
      const existingCount = await prisma.project.count({ where: { userId } });
      projectName = `Project ${existingCount + 1}`;
    }

    const publicId = await generatePublicId('PROJECT');

    return await prisma.project.create({
      data: {
        userId,
        publicId,
        name: projectName,
        status: 'draft',
      },
    });
  } catch (err) {
    console.error('Failed to create project:', err);
    throw err;
  }
}

export async function updateProject(id: string, data: {
  name?: string;
  datasetId?: string | null;
  parsedGoal?: string | null;
  optimizationJobId?: string | null;
  status?: string;
}) {
  if (!isMongoObjectId(id)) {
    console.warn(`[projects] updateProject skipped for non-ObjectId id '${id}'`);
    return null;
  }

  try {
    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.parsedGoal !== undefined) updateData.parsedGoal = data.parsedGoal;
    if (data.status !== undefined) updateData.status = data.status;

    if (data.optimizationJobId !== undefined) {
      if (isMongoObjectId(data.optimizationJobId)) {
        updateData.optimizationJobId = data.optimizationJobId;
      }
    }
    if (data.datasetId !== undefined) {
      if (isMongoObjectId(data.datasetId)) {
        updateData.datasetId = data.datasetId;
      }
    }

    return await prisma.project.update({
      where: { id },
      data: updateData,
    });
  } catch (err: any) {
    console.warn('Prisma project update warning:', err.message);
    return null;
  }
}

export async function deleteProject(id: string) {
  if (!isMongoObjectId(id)) {
    console.warn(`[projects] deleteProject skipped for non-ObjectId id '${id}'`);
    return null;
  }

  try {
    return await prisma.project.delete({
      where: { id },
    });
  } catch (err) {
    console.error('Failed to delete project:', err);
    return null;
  }
}

export async function getLatestProject(userId: string) {
  try {
    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      take: 1,
      include: { dataset: true, optimizationJob: true },
    });

    if (projects.length > 0) {
      return projects[0];
    }

    return await createProject(userId, 'Project 1');
  } catch (err) {
    console.error('Failed to get latest project:', err);
    return null;
  }
}
