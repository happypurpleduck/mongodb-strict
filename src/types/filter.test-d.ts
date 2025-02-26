import { expectTypeOf } from "vitest";
import type { Filter } from "./filter";
import type { TItem } from "../../test/item";
import { Decimal128 } from "mongodb";

type ItemFilter = Filter<TItem>;

expectTypeOf({
	"name.en": "",
	"options.price": { $gt: new Decimal128("0") },
	// "options.0.name.9.en": "",
	"options.0.name.en": "",
} satisfies ItemFilter).toMatchTypeOf<ItemFilter>();
