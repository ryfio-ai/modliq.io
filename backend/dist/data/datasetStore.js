"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatasetVersion = exports.getDatasetVersions = exports.getAllDatasets = exports.getDataset = exports.saveDataset = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function saveDataset(datasetId, data) {
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
        const existing = await prisma_1.default.dataset.findFirst({
            where: { userId, filename: payload.filename },
        });
        let record;
        if (existing) {
            record = await prisma_1.default.dataset.update({
                where: { id: existing.id },
                data: { ...payload, updatedAt: new Date() },
            });
        }
        else {
            record = await prisma_1.default.dataset.create({
                data: { user: { connect: { id: userId } }, ...payload },
            });
        }
        await prisma_1.default.datasetVersion.create({
            data: { ...version, datasetId: record.id },
        });
        return { ...payload, id: record.id };
    }
    catch (err) {
        console.error(`[datasetStore] Error saving dataset ${datasetId}:`, err);
        return data;
    }
}
exports.saveDataset = saveDataset;
async function getDataset(datasetId) {
    const byId = await prisma_1.default.dataset.findUnique({
        where: { id: datasetId },
    });
    if (byId)
        return byId;
    return await prisma_1.default.dataset.findFirst({
        where: { filename: datasetId },
    });
}
exports.getDataset = getDataset;
async function getAllDatasets() {
    return await prisma_1.default.dataset.findMany({
        orderBy: { createdAt: 'desc' },
    });
}
exports.getAllDatasets = getAllDatasets;
async function getDatasetVersions(datasetId) {
    return await prisma_1.default.datasetVersion.findMany({
        where: { datasetId },
        orderBy: { createdAt: 'desc' },
    });
}
exports.getDatasetVersions = getDatasetVersions;
async function getDatasetVersion(datasetId, versionId) {
    return await prisma_1.default.datasetVersion.findFirst({
        where: { datasetId, versionId },
    });
}
exports.getDatasetVersion = getDatasetVersion;
//# sourceMappingURL=datasetStore.js.map