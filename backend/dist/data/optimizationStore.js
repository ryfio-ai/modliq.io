"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOptimizations = exports.getOptimization = exports.saveOptimization = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const memoryStore = new Map();
async function saveOptimization(id, data) {
    const { userId, ...rest } = data || {};
    const toStore = { ...rest };
    if (toStore.result && typeof toStore.result === 'object') {
        toStore.result = JSON.stringify(toStore.result);
    }
    memoryStore.set(id, { id, userId, ...toStore, updatedAt: new Date() });
    try {
        let connectUser = false;
        if (userId && typeof userId === 'string' && /^[0-9a-fA-F]{24}$/.test(userId)) {
            const userExists = await prisma_1.default.user?.findUnique({ where: { id: userId } });
            if (userExists)
                connectUser = true;
        }
        const existing = await prisma_1.default.optimizationRun?.findUnique({
            where: { id },
        });
        if (existing) {
            await prisma_1.default.optimizationRun?.update({
                where: { id },
                data: { ...toStore, updatedAt: new Date() },
            });
        }
        else {
            await prisma_1.default.optimizationRun?.create({
                data: {
                    id,
                    ...(connectUser ? { user: { connect: { id: userId } } } : {}),
                    ...toStore,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
        }
    }
    catch (err) {
        console.warn(`[optimizationStore] Prisma save skipped for run ${id}:`, err.message);
    }
    return data;
}
exports.saveOptimization = saveOptimization;
async function getOptimization(id) {
    try {
        const res = await prisma_1.default.optimizationRun?.findUnique({
            where: { id },
        });
        if (res)
            return res;
    }
    catch (err) {
        console.warn(`[optimizationStore] Prisma get skipped for run ${id}:`, err.message);
    }
    return memoryStore.get(id) || null;
}
exports.getOptimization = getOptimization;
async function listOptimizations() {
    try {
        const list = await prisma_1.default.optimizationRun?.findMany({
            orderBy: { createdAt: 'desc' },
        });
        if (list && list.length > 0)
            return list;
    }
    catch (err) {
        console.warn('[optimizationStore] Prisma list skipped:', err.message);
    }
    return Array.from(memoryStore.values());
}
exports.listOptimizations = listOptimizations;
//# sourceMappingURL=optimizationStore.js.map