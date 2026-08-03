import { create } from 'zustand';

interface StudioState {
  datasetId: string | null;
  optimizationId: string | null;
  progress: number;
  currentStep: string;
  result: any | null;
  setDatasetId: (id: string | null) => void;
  setOptimizationId: (id: string | null) => void;
  setProgress: (progress: number, step: string) => void;
  setResult: (result: any) => void;
}

export const useStudioStore = create<StudioState>((set) => ({
  datasetId: null,
  optimizationId: null,
  progress: 0,
  currentStep: 'Starting...',
  result: null,
  setDatasetId: (datasetId) => set({ datasetId }),
  setOptimizationId: (optimizationId) => set({ optimizationId }),
  setProgress: (progress, currentStep) => set({ progress, currentStep }),
  setResult: (result) => set({ result }),
}));
