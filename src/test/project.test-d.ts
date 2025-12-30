import type { Decimal128, ObjectId } from "mongodb";
import type { Simplify } from "type-fest";
import type { TDocument } from "../document.ts";
import type { Projection, ProjectionType } from "../types/project.ts";
import type { TItem, TOptions } from "./item.ts";
import { expectTypeOf } from "vitest";

expectTypeOf<
	| Partial<
		Record<
			| "_id"
			| "name"
			| "name.en"
			| "name.ar"
			| "price"
			| "x"
			| "y"
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
			| "options.name.en"
			| "options.name.ar"
			| `options.${number}.name`
			| `options.${number}.price`
			| `options.${number}.name.en`
			| `options.${number}.name.ar`,
				0 | 1 | true | false
		>
	>
	| undefined
>().toExtend<Projection<TItem>>();

expectTypeOf<ProjectionType<TItem, undefined>>().toEqualTypeOf<TItem>();
expectTypeOf<ProjectionType<TItem, {}>>().toEqualTypeOf<TItem>();

expectTypeOf<ProjectionType<TItem, { _id: 0 }>>().toEqualTypeOf<
	Omit<TItem, "_id">
>();

expectTypeOf<ProjectionType<TItem, { _id: "$_id" }>>().toEqualTypeOf<
	Pick<TItem, "_id">
>();

expectTypeOf<
	ProjectionType<
		TItem,
		{
			_id: false;
			id: "$_id";
			abc: "$name.en";
		}
	>
>().toEqualTypeOf<{
	id: ObjectId;
	abc: string;
}>();

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
	price: Decimal128 | undefined;
	tag: [string, number];
	x: 5 | 10;
	y: 10;
	properties: Record<string, string>;
	location:
		| {
			type: "direct";
			latitude: number;
			longitude: number;
		}
		| {
			type: "indirect";
			latitude: number;
			longitude: number;
		};
	options: Array<TOptions>;
}>();

expectTypeOf<ProjectionType<TItem, { "name.en": 1 }>>().toEqualTypeOf<{
	_id: ObjectId;
	name: {
		en: string;
	};
}>();

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

expectTypeOf<
	ProjectionType<
		TItem,
		{
			_id: 0;
			tuple: ["$name", "$_id"];
		}
	>
>().toEqualTypeOf<
	Simplify<{
		tuple: [{ en: string; ar: string }, ObjectId];
	}>
>();

expectTypeOf<
	ProjectionType<
		TItem,
		{
			"_id": false;
			"name": true;
			"options.name": 1;
			"options.price": 1;
			"options.offerPrice": 1;
			"options.values": 1;
		}
	>
>().toEqualTypeOf<
	Simplify<{
		name: {
			ar: string;
			en: string;
		};
		options: Array<{
			name: {
				ar: string;
				en: string;
			};
			price: Decimal128;
			offerPrice: Decimal128 | null;
			values: number[];
		}>;
	}>
>();
