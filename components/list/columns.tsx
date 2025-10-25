import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Column, ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { MoreHorizontal } from 'lucide-react';
import { Task } from '@/types';
import { Pill } from "@/components/ui/pill";
import { StatusIcon } from '@/components/status-icon';
import { PriorityIcon } from '@/components/priority-icon';

export const tasksColumns: ColumnDef<Task>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        size: 32,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }: { column: Column<Task, unknown> }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ cell }) => <div>{cell.getValue<Task['name']>()}</div>,
        meta: {
            label: 'Name',
        },
    },
    {
        id: 'columnId',
        accessorKey: 'columnId',
        header: ({ column }: { column: Column<Task, unknown> }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ cell }) => {
            const columnId = cell.getValue() as Task['columnId'];

            return (
                <Pill variant="outline">
                    <StatusIcon status={columnId} />
                    {columnId}
                </Pill>
            )
        },
        meta: {
            label: 'Status',
        },
    },
    {
        id: 'priority',
        accessorKey: 'priority',
        header: ({ column }: { column: Column<Task, unknown> }) => (
            <DataTableColumnHeader column={column} title="Priority" />
        ),
        cell: ({ cell }) => {
            const priority = cell.getValue() as Task['priority'];

            return (
                <Pill>
                    <PriorityIcon priority={priority} />
                    {priority}</Pill>
            )
        },
        meta: {
            label: 'Priority',
        },
    },
    {
        id: 'actions',
        cell: function Cell() {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        size: 32,
    },
]