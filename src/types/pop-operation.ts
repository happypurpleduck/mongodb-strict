import type { PathsOfType } from "./path-of-type.ts";

export type PopOperation<T> = {
	[K in PathsOfType<T, ReadonlyArray<any>>]: 1 | -1;
};
