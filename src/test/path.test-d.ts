import type { Paths } from "../types/path.ts";
import type { TItem } from "./item.ts";
import { expectTypeOf } from "vitest";

expectTypeOf<Paths<TItem>>().toEqualTypeOf<
	| "_id"
	| "name"
	| "name.en"
	| "name.ar"
	| "price"
	| "tag"
	| "tag.0"
	| "tag.1"
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
