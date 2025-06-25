import type { Decimal128, ObjectId } from "mongodb";
import type { PickDeep } from "../types/pick-deep.ts";
import type { TItem } from "./item.ts";
import { expectTypeOf } from "vitest";

expectTypeOf<PickDeep<TItem, never>>().toEqualTypeOf(null as never);

expectTypeOf<PickDeep<TItem, "_id">>().toEqualTypeOf<{
	_id: ObjectId;
}>();

expectTypeOf<PickDeep<TItem, "_id" | "name.en">>().toEqualTypeOf<{
	_id: ObjectId;
	name: {
		en: string;
	};
}>();

expectTypeOf<
	PickDeep<TItem, "_id" | "name.en" | "options.name.en">
>().toEqualTypeOf<{
	_id: ObjectId;
	name: {
		en: string;
	};
	options: Array<{
		name: {
			en: string;
		};
	}>;
}>();

expectTypeOf<
	PickDeep<TItem, "options.name" | "options.price" | "tag">
>().toEqualTypeOf<{
	options: Array<{
		name: { en: string; ar: string };
		price: Decimal128;
	}>;
	tag: [string, number];
}>();

expectTypeOf<
	PickDeep<
		| {
			_id: ObjectId;
		}
		| ({
			type: 1;
			value1: ObjectId;
		} & {
			type: 2;
			value2: ObjectId;
		}),
		"_id"
	>
>().toEqualTypeOf<{
	_id: ObjectId;
}>();

// expectTypeOf<
// 	PickDeepOriginal<
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
// 		"type"
// 	>
// >().toEqualTypeOf<{
// 	type: 1 | 2;
// }>();

expectTypeOf<
	PickDeep<
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
		"type" | "value1" | "value2"
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

expectTypeOf<
	PickDeep<
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
		"type" | "value1"
	>
>().toEqualTypeOf<
	| {
		type: 1;
		value1: ObjectId;
	}
	| {
		type: 2;
	}
>();
