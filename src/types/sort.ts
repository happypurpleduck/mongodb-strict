import type { Paths } from "./path.ts";

export type SortDirection = 1 | -1 | "asc" | "desc" | "ascending" | "descending";

export type Sort<T> = ReadonlyArray<Paths<T>>
	| Partial<Record<Paths<T>, SortDirection>>
	| ReadonlyMap<string, SortDirection>
	| ReadonlyArray<readonly [Paths<T>, SortDirection]>
	| readonly [Paths<T>, SortDirection];
