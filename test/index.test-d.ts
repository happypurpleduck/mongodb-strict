import type { Paths } from "../src/type-fest/path.ts";
import type { TItem } from "./item.ts";
import { expectType } from "tsd";

/* Path */

declare const paths: Paths<TItem>;
declare const paths_expected:
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
	| `options.${number}.name.ar`;

expectType<typeof paths_expected>(paths);
expectType<typeof paths>(paths_expected);
