import { create } from "zustand";
import { persist } from "zustand/middleware";
import { tasksData } from "@/lib/data";
import type { Task } from "@/types";

type State = {
    tasks: Task[];
    setTasks: (updater: (tasks: Task[]) => Task[]) => void;
};

export const useTasksBoard = create<State>()(
    persist(
        (set) => ({
            tasks: tasksData,
            setTasks: (updater) => set((state) => ({ tasks: updater(state.tasks) })),
        }),
        {
            name: "tasks-store",
        }
    )
);
