import { SortableContext } from "@dnd-kit/sortable";
import { type UniqueIdentifier } from "@dnd-kit/core";
import { useMemo } from "react";
import { TaskCard } from "./task-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Task } from "@/types";
import { cn } from "@/lib/utils";
import { StatusIcon } from "@/components/status-icon";
import { TaskStatus } from "@/types";
import { Button } from "../ui/button";
import { EllipsisVerticalIcon } from "lucide-react";

export interface Column {
  id: UniqueIdentifier;
  title: string;
}

export type ColumnType = "Column";

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
}

export function BoardColumn({ column, tasks }: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  return (
    <div
      className={cn("w-full border-r last:border-r-0 min-h-screen")}
    >
      <div className="px-4 py-2 flex items-center gap-2 border-b">
        <StatusIcon className="size-4" status={column.id as TaskStatus} />
        <h3 className="text-sm font-medium">{column.title}</h3>
        <Button
          variant="ghost"
          size="icon-sm"
          className="ml-auto text-muted-foreground"
        >
          <EllipsisVerticalIcon />
        </Button>
      </div>
      <ScrollArea>
        <div className="flex grow flex-col gap-2 p-2">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </div>
      </ScrollArea>
    </div>
  );
}