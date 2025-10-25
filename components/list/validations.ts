import { createSearchParamsCache, parseAsInteger } from 'nuqs/server';
import { getSortingStateParser } from '@/lib/parsers';
import { Task } from '@/types';

export const searchParamsCache = createSearchParamsCache({
	page: parseAsInteger.withDefault(1),
	perPage: parseAsInteger.withDefault(20),
	sort: getSortingStateParser<Task>().withDefault([{ id: 'createdAt', desc: true }]),
});

export type GetTasksSchema = Awaited<ReturnType<typeof searchParamsCache.parse>>;
