import { create } from 'zustand';

interface AutoMLState {
  datasetId: string | null;
  datasetProfile: any | null;
  goal: string;
  taskType: string;
  targetColumn: string;
  activeJobId: string | null;
  leaderboard: any[];
  setDataset: (id: string, profile: any) => void;
  setGoal: (goal: string) => void;
  setTaskType: (type: string) => void;
  setTargetColumn: (col: string) => void;
  setActiveJobId: (jobId: string | null) => void;
  setLeaderboard: (models: any[]) => void;
}

export const useAutoMLStore = create<AutoMLState>((set) => ({
  datasetId: null,
  datasetProfile: null,
  goal: '',
  taskType: 'auto',
  targetColumn: '',
  activeJobId: null,
  leaderboard: [],
  setDataset: (id, profile) => set({ datasetId: id, datasetProfile: profile }),
  setGoal: (goal) => set({ goal }),
  setTaskType: (taskType) => set({ taskType }),
  setTargetColumn: (targetColumn) => set({ targetColumn }),
  setActiveJobId: (activeJobId) => set({ activeJobId }),
  setLeaderboard: (leaderboard) => set({ leaderboard }),
}));
