"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Task } from "@/types";
import { PriorityIcon } from "@/components/priority-icon";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import React from "react";
import { Pill } from "../ui/pill";
import { StatusIcon } from "../status-icon";
import { formatDate, truncate } from "@/lib/format";

export function TaskCard({ task }: { task: Task }) {
  const [open, setOpen] = React.useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <React.Fragment>
      <button
        className={cn(
          "min-w-xs flex items-center gap-2 w-full justify-between rounded-md bg-secondary/50 border p-1 cursor-pointer hover:bg-secondary/70",
          isDragging && "opacity-50"
        )}
        ref={setNodeRef}
        style={style}
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-2">
          <div
            {...attributes}
            {...listeners}
            className={buttonVariants({ variant: "ghost", size: "icon", className: "cursor-grab text-muted-foreground" })}
          >
            <GripVertical />
          </div>
          <h3 title={task.name} className="font-medium text-sm text-left">{truncate(task.name, 36)}</h3>
        </div>
        <div className="flex items-center justify-center size-9">
          <PriorityIcon priority={task.priority} />
        </div>
      </button>
      <TaskSheet open={open} onOpenChange={setOpen} task={task} />
    </React.Fragment>
  );
}


interface TaskSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
}

function TaskSheet({ open, onOpenChange, task }: TaskSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{task.name}</SheetTitle>
          <SheetDescription>
            {task.description}
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <span className="text-muted-foreground text-xs">status</span>
            <Pill variant="outline">
              <StatusIcon status={task.columnId} />
              {task.columnId}
            </Pill>
          </div>
          <div className="grid gap-3">
            <span className="text-muted-foreground text-xs">priority</span>
            <Pill variant="secondary">
              <PriorityIcon priority={task.priority} />
              {task.priority}
            </Pill>
          </div>
          <div className="grid gap-3">
            <span className="text-muted-foreground text-xs">last Updated</span>
            <Pill variant="secondary">
              {formatDate(task.updatedAt)}
            </Pill>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}


