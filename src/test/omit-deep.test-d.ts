import type { Decimal128, ObjectId } from "mongodb";
import type { OmitDeep } from "../types/omit-deep.ts";
import type { TItem } from "./item.ts";
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
	options: Array<{
		name: {
			en: string;
			ar: string;
		};
		price: Decimal128;
		offerPrice: Decimal128 | null;
		values: number[];
	}>;
}>();

expectTypeOf<OmitDeep<TItem, "_id" | "name.en">>().toEqualTypeOf<{
	name: {
		ar: string;
	};
	price: Decimal128 | undefined;
	tag: [string, number];
	x: 5 | 10;
	y: 10;
	options: Array<{
		name: {
			en: string;
			ar: string;
		};
		price: Decimal128;
		offerPrice: Decimal128 | null;
		values: number[];
	}>;
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
	options: Array<{
		name: {
			ar: string;
		};
		price: Decimal128;
		offerPrice: Decimal128 | null;
		values: number[];
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
