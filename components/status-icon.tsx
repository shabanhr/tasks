import { BadgeIcon, CircleCheckIcon, CircleDotDashedIcon } from "lucide-react";
import type React from "react";
import type { TaskStatus } from "@/types";
import { cn } from "@/lib/utils";


export const statusIcons = {
  backlog: BadgeIcon,
  "in-progress": CircleDotDashedIcon,
  done: CircleCheckIcon,
};

export const statusColors = {
  done: "text-emerald-500",
  "in-progress": "text-amber-500",
  backlog: "text-rose-500",
};


export const StatusIcon = (
  { className, ...props }: React.ComponentProps<"svg"> & { status: TaskStatus }
) => {
  const IconComponent = statusIcons[props.status];


  return <IconComponent className={cn("size-4", statusColors[props.status], className)} {...props} />;
};
