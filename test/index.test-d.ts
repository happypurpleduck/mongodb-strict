import type { Paths } from "../src/types/path.ts";
import type { Projection, ProjectionType } from "../src/types/project.ts";
import type { Get } from "../src/types/get.ts";
import type { TItem } from "./item.ts";
import { expectType } from "tsd";
import type { Decimal128 } from "mongodb";
import type { TDocument } from "../src/document.ts";
import type { Simplify } from "type-fest";

declare const item: TItem;

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

/* Project */

declare const projection: Projection<TItem>;
expectType<
	| Partial<
			Record<
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
				| `options.${number}.name.ar`,
				0 | 1
			>
	  >
	| undefined
>(projection);

declare const projectionType0: ProjectionType<TItem, undefined>;
expectType<TItem>(projectionType0);
expectType<typeof projectionType0>(item);

declare const projectionType1: ProjectionType<TItem, {}>;
expectType<TItem>(projectionType1);

declare const projectionType2: ProjectionType<TItem, { _id: 0 }>;
expectType<Omit<TItem, "_id">>(projectionType2);

declare const projectionType3: ProjectionType<TItem, { _id: 0; name: 0 }>;
expectType<Omit<TItem, "_id" | "name">>(projectionType3);

declare const projectionType4: ProjectionType<TItem, { _id: 0; "name.en": 0 }>;
expectType<
	Simplify<
		Omit<TItem, "_id" | "name"> & {
			name: Omit<TItem["name"], "en">;
		}
	>
>(projectionType4);
expectType<{
	name: {
		// en: string;
		ar: string;
	};
	price: Decimal128;
	options: Array<{
		name: {
			en: string;
			ar: string;
		};
		price: Decimal128;
	}>;
}>(projectionType4);

declare const projectionType5: ProjectionType<TItem, { "name.en": 1 }>;
expectType<
	Simplify<
		TDocument & {
			name: {
				en: string;
			};
		}
	>
>(projectionType5);

declare const projectionType6: ProjectionType<TItem, { name: 1 }>;
expectType<
	Simplify<
		TDocument & {
			name: {
				en: string;
				ar: string;
			};
		}
	>
>(projectionType6);

declare const projectionType7: ProjectionType<TItem, { _id: 0; name: 1 }>;
expectType<
	Simplify<{
		name: {
			en: string;
			ar: string;
		};
	}>
>(projectionType7);
