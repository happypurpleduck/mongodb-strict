import type { Paths } from "./path.ts";

// TODO: check if can unset deep of arrays?
export type UnsetOperation<T> = {
	[K in Paths<T>]: "" | true | 1;
};
