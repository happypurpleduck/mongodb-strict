import type { Decimal128 } from "mongodb";
import type { Simplify } from "type-fest";
import type { TDocument } from "../document.ts";
import type { Projection, ProjectionType } from "../types/project.ts";
import type { TItem } from "./item.ts";
import { expectTypeOf } from "vitest";

expectTypeOf<Projection<TItem>>().toEqualTypeOf<
	| Partial<
		Record<
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
			| `options.${number}.name.ar`,
				0 | 1
		>
	>
	| undefined
>();

expectTypeOf<ProjectionType<TItem, undefined>>().toEqualTypeOf<TItem>();
expectTypeOf<ProjectionType<TItem, {}>>().toEqualTypeOf<TItem>();

expectTypeOf<ProjectionType<TItem, { _id: 0 }>>().toEqualTypeOf<
	Omit<TItem, "_id">
>();

expectTypeOf<ProjectionType<TItem, { _id: 0; name: 0 }>>().toEqualTypeOf<
	Omit<TItem, "_id" | "name">
>();

expectTypeOf<ProjectionType<TItem, { "_id": 0; "name.en": 0 }>>().toEqualTypeOf<
	Simplify<
		Omit<TItem, "_id" | "name"> & {
			name: Omit<TItem["name"], "en">;
		}
	>
>();
expectTypeOf<ProjectionType<TItem, { "_id": 0; "name.en": 0 }>>().toEqualTypeOf<{
	name: {
		// en: string;
		ar: string;
	};
	price: Decimal128;
	tag: [string, number];
	options: Array<{
		name: {
			en: string;
			ar: string;
		};
		price: Decimal128;
	}>;
}>();

expectTypeOf<ProjectionType<TItem, { "name.en": 1 }>>().toEqualTypeOf<
	Simplify<
		TDocument & {
			name: {
				en: string;
			};
		}
	>
>();

expectTypeOf<ProjectionType<TItem, { name: 1 }>>().toEqualTypeOf<
	Simplify<
		TDocument & {
			name: {
				en: string;
				ar: string;
			};
		}
	>
>();

expectTypeOf<ProjectionType<TItem, { _id: 0; name: 1 }>>().toEqualTypeOf<
	Simplify<{
		name: {
			en: string;
			ar: string;
		};
	}>
>();

expectTypeOf<
	ProjectionType<TItem, { "_id": 0; "options.name.ar": 1 }>
>().toEqualTypeOf<
	Simplify<{
		options: Array<{
			name: {
				ar: string;
			};
		}>;
	}>
>();
