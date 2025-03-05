import type { Get } from "./get.ts";
import type { Paths } from "./path.ts";

export type PathsOfType<T, Type> = {
	[K in Paths<T>]: K extends string
		? Get<T, K> extends Type
			? K
			: never
		: never;
}[Paths<T>];

export type PathsOfNonExclusiveType<T, Type> = {
	[K in Paths<T>]: K extends string
		? Type extends Get<T, K>
			? K
			: never
		: never;
}[Paths<T>];
