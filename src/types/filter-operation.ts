import type { FilterOperators } from "./filter-operators.ts";

export type FilterOperations<T> = T extends Record<string, any>
	? {
			[key in keyof T]?: FilterOperators<T[key]>;
		}
	: FilterOperators<T>;
