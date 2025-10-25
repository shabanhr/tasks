import type React from "react";
import type { TaskPriority } from "@/types";
import { cn } from "@/lib/utils";

export const PriorityIcon = (
  { className, priority, ...props }: React.ComponentProps<"span"> & { priority: TaskPriority }
) => {

  return (<span className={cn("relative flex size-2", className)} {...props}>
    <span
      className={cn(
        "relative inline-flex size-2 rounded-full",
        priority === "low" && "bg-emerald-500",
        priority === "high" && "bg-rose-500",
        priority === "medium" && "bg-amber-500"
      )}
    />
  </span>);
};
