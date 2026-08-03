"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveWorkflowId = exports.setActiveWorkflow = exports.setActiveDataset = exports.getWorkspace = void 0;
const prisma_1 = __importDefault(require("@/lib/prisma"));
async function getWorkspace(userId) {
    const workspace = await prisma_1.default.workspaceState.findUnique({
        where: { userId },
    });
    if (!workspace) {
        return { activeDatasetId: null, activeWorkflowId: null };
    }
    return {
        activeDatasetId: workspace.activeDatasetId,
        activeWorkflowId: workspace.activeWorkflowId,
    };
}
exports.getWorkspace = getWorkspace;
async function setActiveDataset(userId, datasetId) {
    await prisma_1.default.workspaceState.upsert({
        where: { userId },
        update: {
            activeDatasetId: datasetId,
            updatedAt: new Date(),
        },
        create: {
            userId,
            activeDatasetId: datasetId,
            updatedAt: new Date(),
        },
    });
    return { activeDatasetId: datasetId };
}
exports.setActiveDataset = setActiveDataset;
async function setActiveWorkflow(userId, workflowId) {
    await prisma_1.default.workspaceState.upsert({
        where: { userId },
        update: {
            activeWorkflowId: workflowId,
            updatedAt: new Date(),
        },
        create: {
            userId,
            activeWorkflowId: workflowId,
            updatedAt: new Date(),
        },
    });
    return { activeWorkflowId: workflowId };
}
exports.setActiveWorkflow = setActiveWorkflow;
async function getActiveWorkflowId(userId) {
    const workspace = await prisma_1.default.workspaceState.findUnique({
        where: { userId },
    });
    return workspace?.activeWorkflowId || null;
}
exports.getActiveWorkflowId = getActiveWorkflowId;
//# sourceMappingURL=workspaceStore.js.map