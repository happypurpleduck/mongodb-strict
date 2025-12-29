import type { Paths } from "../types/path.ts";
import type { TItem } from "./item.ts";
import { expectTypeOf } from "vitest";

expectTypeOf<Paths<TItem>>().toEqualTypeOf<
	| "_id"
	| "x"
	| "y"
	| "name"
	| "name.en"
	| "name.ar"
	| "price"
	| "tag"
	| "tag.0"
	| "tag.1"
	| "location"
	| "location.type"
	| "location.latitude"
	| "location.longitude"
	| "options"
	| `options.${number}`
	| "options.name"
	| "options.price"
	| "options.offerPrice"
	| "options.values"
	| `options.values.${number}`
	| "options.name.en"
	| "options.name.ar"
	| `options.${number}.name`
	| `options.${number}.price`
	| `options.${number}.offerPrice`
	| `options.${number}.name.en`
	| `options.${number}.name.ar`
	| `options.${number}.values`
	| `options.${number}.values.${number}`
>();
