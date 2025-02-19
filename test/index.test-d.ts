import type { Paths } from "../src/type-fest/path.ts";
import type { Get } from "../src/type-fest/get.ts";
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

/* Get */

declare const _id: Get<TItem, "_id">;
expectType<TItem["_id"]>(_id);

declare const name: Get<TItem, "name">;
expectType<TItem["name"]>(name);

declare const nameEn: Get<TItem, "name.en">;
expectType<TItem["name"]["en"]>(nameEn);

declare const nameAr: Get<TItem, "name.ar">;
expectType<TItem["name"]["ar"]>(nameAr);

declare const price: Get<TItem, "price">;
expectType<TItem["price"]>(price);

declare const options: Get<TItem, "options">;
expectType<TItem["options"]>(options);

declare const optionsName: Get<TItem, "options.name">;
expectType<Array<TItem["options"][number]["name"]>>(optionsName);

declare const optionsNameEn: Get<TItem, "options.name.en">;
expectType<Array<TItem["options"][number]["name"]["en"]>>(optionsNameEn);

declare const options0: Get<TItem, "options.0">;
expectType<TItem["options"][0] | undefined>(options0);

declare const options0Name: Get<TItem, "options.0.name">;
expectType<TItem["options"][0]["name"] | undefined>(options0Name);

declare const options0NameEn: Get<TItem, "options.0.name.en">;
expectType<TItem["options"][0]["name"]["en"] | undefined>(options0NameEn);
