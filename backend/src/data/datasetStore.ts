import prisma from '../lib/prisma';

export async function saveDataset(datasetId: string, data: any) {
  try {
    const userId = data.userId || 'demo-user-static-backend';
    const payload = {
      ...data,
      userId,
      analytics: typeof data.analytics === 'object' ? JSON.stringify(data.analytics) : data.analytics,
      preview: typeof data.preview === 'object' ? JSON.stringify(data.preview) : data.preview,
    };

    const version = {
      datasetId,
      versionId: `${datasetId}@v${Date.now()}`,
      data: JSON.stringify(payload),
      createdAt: new Date(),
    };

    const existing = await prisma.dataset.findFirst({
      where: { userId, filename: payload.filename },
    });

    let record;
    if (existing) {
      record = await prisma.dataset.update({
        where: { id: existing.id },
        data: { ...payload, updatedAt: new Date() },
      });
    } else {
      record = await prisma.dataset.create({
        data: { user: { connect: { id: userId } }, ...payload },
      });
    }

    await prisma.datasetVersion.create({
      data: { ...version, datasetId: record.id },
    });

    return { ...payload, id: record.id };
  } catch (err) {
    console.error(`[datasetStore] Error saving dataset ${datasetId}:`, err);
    return data;
  }
}

export async function getDataset(datasetId: string) {
  const byId = await prisma.dataset.findUnique({
    where: { id: datasetId },
  });
  if (byId) return byId;

  return await prisma.dataset.findFirst({
    where: { filename: datasetId },
  });
}

export async function getAllDatasets() {
  return await prisma.dataset.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getDatasetVersions(datasetId: string) {
  return await prisma.datasetVersion.findMany({
    where: { datasetId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getDatasetVersion(datasetId: string, versionId: string) {
  return await prisma.datasetVersion.findFirst({
    where: { datasetId, versionId },
  });
}
