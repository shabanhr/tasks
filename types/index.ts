export type TaskStatus = "backlog" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  name: string;
  description: string;
  columnId: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
};
