import { create } from "zustand";

type Task = {
  id: number;
  title: string;
  description: string;
};

type TaskCacheState = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
};

export const useTaskCache = create<TaskCacheState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
}));
