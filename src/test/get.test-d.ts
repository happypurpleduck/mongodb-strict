import type { Get } from "../types/get.ts";
import type { TItem } from "./item.ts";
import { expectTypeOf } from "vitest";

expectTypeOf<Get<TItem, "_id">>().toEqualTypeOf<TItem["_id"]>();
expectTypeOf<Get<TItem, "name">>().toEqualTypeOf<TItem["name"]>();
expectTypeOf<Get<TItem, "name.en">>().toEqualTypeOf<TItem["name"]["en"]>();
expectTypeOf<Get<TItem, "name.ar">>().toEqualTypeOf<TItem["name"]["ar"]>();
expectTypeOf<Get<TItem, "price">>().toEqualTypeOf<TItem["price"]>();
expectTypeOf<Get<TItem, "tag">>().toEqualTypeOf<TItem["tag"]>();
expectTypeOf<Get<TItem, "tag.0">>().toEqualTypeOf<TItem["tag"][0]>();
expectTypeOf<Get<TItem, "options">>().toEqualTypeOf<TItem["options"]>();
expectTypeOf<Get<TItem, "options.0">>().toEqualTypeOf<
	TItem["options"][0] | undefined
>();
expectTypeOf<Get<TItem, `options.${number}`>>().toEqualTypeOf<
	TItem["options"][0] | undefined
>();
expectTypeOf<Get<TItem, "options.0.name">>().toEqualTypeOf<
	TItem["options"][0]["name"] | undefined
>();
expectTypeOf<Get<TItem, "options.0.name.en">>().toEqualTypeOf<
	TItem["options"][0]["name"]["en"] | undefined
>();
expectTypeOf<Get<TItem, `options.${number}`>>().toEqualTypeOf<
	TItem["options"][0] | undefined
>();
expectTypeOf<Get<TItem, `options.${number}.name.en`>>().toEqualTypeOf<
	TItem["options"][0]["name"]["en"] | undefined
>();
expectTypeOf<Get<TItem, "options.name">>().toEqualTypeOf<
	Array<TItem["options"][number]["name"]>
>();
expectTypeOf<Get<TItem, "options.name.en">>().toEqualTypeOf<
	Array<TItem["options"][number]["name"]["en"]>
>();
expectTypeOf<Get<TItem, "location">>().toEqualTypeOf<TItem["location"]>();
expectTypeOf<Get<TItem, "location.latitude">>().toEqualTypeOf<TItem["location"]["latitude"]>();
