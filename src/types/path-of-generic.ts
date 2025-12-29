import type { IsLiteral } from "type-fest";
import type { Get } from "./get.ts";
import type { Paths } from "./path.ts";

export type PathsOfGeneric<T> = {
	[K in Paths<T>]: K extends string
		? IsLiteral<Get<T, K>> extends true
			? never
			: K
		: never;
}[Paths<T>];
