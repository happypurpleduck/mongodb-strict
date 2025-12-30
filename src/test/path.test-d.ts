import type { Paths } from "../types/path.ts";
import type { TItem } from "./item.ts";
import { expectTypeOf } from "vitest";

// Test that all expected base paths are present (using toMatchTypeOf allows additional recursive paths)
expectTypeOf<
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
	| "properties"
	| `properties.${string}`
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
	// Recursive options paths (from TOptions.options: Array<TOptions>)
	| "options.options"
	| `options.options.${number}`
	| "options.options.name"
	| "options.options.price"
	| "options.options.offerPrice"
	| "options.options.values"
	| "options.options.options"
	| "options.options.name.en"
	| "options.options.name.ar"
	| `options.${number}.options`
	| `options.${number}.options.${number}`
	| `options.${number}.options.name`
	| `options.${number}.options.price`
	| `options.${number}.options.offerPrice`
	| `options.${number}.options.values`
	| `options.${number}.options.options`
	| `options.${number}.options.name.en`
	| `options.${number}.options.name.ar`
>().toMatchTypeOf<Paths<TItem>>();
