import { Task } from "@/types";
import { GetTasksSchema } from "./validations";
import { tasksData } from "@/lib/data";

export function getSortedTasks(input: GetTasksSchema) {
  const offset = (input.page - 1) * input.perPage;

  // Sort tasks based on input.sort
  let sortedTasks = [...tasksData];

  if (input.sort.length > 0) {
    for (const sortItem of input.sort) {
      sortedTasks.sort((a, b) => {
        const aValue = a[sortItem.id as keyof Task];
        const bValue = b[sortItem.id as keyof Task];

        if (aValue < bValue) return sortItem.desc ? 1 : -1;
        if (aValue > bValue) return sortItem.desc ? -1 : 1;
        return 0;
      });
    }
  } else {
    // Default sort by createdAt ascending
    sortedTasks.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  const paginatedTasks = sortedTasks.slice(offset, offset + input.perPage);
  const total = tasksData.length;
  const pageCount = Math.ceil(total / input.perPage);

  return { sortedTasks: paginatedTasks, pageCount };
}

export type GetTasksReturn = { sortedTasks: Task[]; pageCount: number };
