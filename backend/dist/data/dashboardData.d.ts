export declare function getDashboardMetrics(userId: string): Promise<{
    totalDatasets: number;
    totalRuns: number;
    activeModels: number;
    predictionsToday: number;
    averageAccuracy: number;
    uploadedDatasets: string[];
    recentActivity: {
        title: string;
        time: string;
    }[];
    modelAccuracy: never[];
    modelResults: never[];
    latestTrainingResult: null;
}>;
//# sourceMappingURL=dashboardData.d.ts.map