"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardMetrics = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function getDashboardMetrics(userId) {
    const totalDatasets = await prisma_1.default.dataset.count({
        where: { userId },
    });
    // Real run history is derived from persisted optimization runs (one row per run).
    // This is computed from the database, not a separately maintained in-memory counter.
    const totalRuns = await prisma_1.default.optimizationRun.count({
        where: { userId },
    });
    const recentRuns = await prisma_1.default.optimizationRun.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
    });
    const recentActivity = recentRuns.map((run) => ({
        title: `Optimization run: ${run.template_id || 'Yield'}`,
        time: run.createdAt.toISOString(),
    }));
    const uploadedDatasets = await prisma_1.default.dataset.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: { filename: true },
    });
    return {
        totalDatasets,
        totalRuns,
        activeModels: 0,
        predictionsToday: 0,
        averageAccuracy: 0,
        uploadedDatasets: uploadedDatasets.map((d) => d.filename),
        recentActivity,
        modelAccuracy: [],
        modelResults: [],
        latestTrainingResult: null,
    };
}
exports.getDashboardMetrics = getDashboardMetrics;
//# sourceMappingURL=dashboardData.js.map