export declare function getWorkspace(userId: string): Promise<{
    activeDatasetId: string | null;
    activeWorkflowId: string | null;
}>;
export declare function setActiveDataset(userId: string, datasetId: string): Promise<{
    activeDatasetId: string;
}>;
export declare function setActiveWorkflow(userId: string, workflowId: string | null): Promise<{
    activeWorkflowId: string | null;
}>;
export declare function getActiveWorkflowId(userId: string): Promise<string | null>;
//# sourceMappingURL=workspaceStore.d.ts.map