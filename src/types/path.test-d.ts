import { expectTypeOf } from "vitest";
import type { Paths } from "./path";
import type { TItem } from "../../test/item.ts";

expectTypeOf<Paths<TItem>>().toEqualTypeOf<
	| "_id"
	| "name"
	| "name.en"
	| "name.ar"
	| "price"
	| "options"
	| `options.${number}`
	| "options.name"
	| "options.price"
	| "options.name.en"
	| "options.name.ar"
	| `options.${number}.name`
	| `options.${number}.price`
	| `options.${number}.name.en`
	| `options.${number}.name.ar`
>();
