"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { tasksColumns } from './columns';
import { useSearchParams } from "next/navigation";
import { searchParamsCache } from "./validations";
import { generateSearchParams } from "@/lib/parsers";
import { getSortedTasks } from "./get-tasks";


export function ListView() {
    const searchParams = useSearchParams();
    const search = searchParamsCache.parse(generateSearchParams(searchParams));

    const { sortedTasks, pageCount } = getSortedTasks(search);

    const { table } = useDataTable({
        data: sortedTasks,
        columns: tasksColumns,
        pageCount,
        initialState: {
            sorting: [{ id: "createdAt", desc: true }],
            pagination: { pageSize: 20, pageIndex: 0 },
        },
        // Unique identifier for rows, can be used for unique row selection
        getRowId: (row) => row.id,
    });

    return (
        <DataTable table={table} className="pb-5" />
    )
}
