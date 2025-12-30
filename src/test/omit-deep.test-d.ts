import type { Decimal128, ObjectId } from "mongodb";
import type { OmitDeep } from "../types/omit-deep.ts";
import type { TItem, TOptions } from "./item.ts";
import { expectTypeOf } from "vitest";

expectTypeOf<OmitDeep<TItem, never>>().toEqualTypeOf<TItem>();

expectTypeOf<OmitDeep<TItem, "_id">>().toEqualTypeOf<{
	name: {
		en: string;
		ar: string;
	};
	price: Decimal128 | undefined;
	x: 5 | 10;
	y: 10;
	tag: [string, number];
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

expectTypeOf<OmitDeep<TItem, "_id" | "name.en">>().toEqualTypeOf<{
	name: {
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

expectTypeOf<
	OmitDeep<TItem, "_id" | "name.en" | "options.name.en">
>().toEqualTypeOf<{
	name: {
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
	options: Array<{
		name: {
			ar: string;
		};
		price: Decimal128;
		offerPrice: Decimal128 | null;
		values: number[];
		options: Array<TOptions>;
	}>;
}>();

// expectTypeOf<
// 	OmitDeep<
// 		{
// 			_id: ObjectId;
// 		} & (
// 			| {
// 				type: 1;
// 				value1: ObjectId;
// 			}
// 			| {
// 				type: 2;
// 				value2: ObjectId;
// 			}
// 		),
// 		"_id"
// 	>
// >().toEqualTypeOf<
// 	{
// 		type: 1;
// 		value1: ObjectId;
// 	} & {
// 		type: 2;
// 		value2: ObjectId;
// 	}
// >();

expectTypeOf<
	OmitDeep<
		{
			_id: ObjectId;
		} & (
			| {
				type: 1;
				value1: ObjectId;
			}
			| {
				type: 2;
				value2: ObjectId;
			}
		),
		"_id"
	>
>().toEqualTypeOf<
	| {
		type: 1;
		value1: ObjectId;
	}
	| {
		type: 2;
		value2: ObjectId;
	}
>();
