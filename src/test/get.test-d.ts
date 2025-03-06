import { expectTypeOf } from "vitest";
import type { TItem } from "./item.ts";
import type { Get } from "../types/get.ts";

expectTypeOf<Get<TItem, "_id">>().toMatchTypeOf<TItem["_id"]>();
expectTypeOf<Get<TItem, "name">>().toMatchTypeOf<TItem["name"]>();
expectTypeOf<Get<TItem, "name.en">>().toMatchTypeOf<TItem["name"]["en"]>();
expectTypeOf<Get<TItem, "name.ar">>().toMatchTypeOf<TItem["name"]["ar"]>();
expectTypeOf<Get<TItem, "price">>().toMatchTypeOf<TItem["price"]>();
expectTypeOf<Get<TItem, "tag">>().toMatchTypeOf<TItem["tag"]>();
expectTypeOf<Get<TItem, "options">>().toMatchTypeOf<TItem["options"]>();
expectTypeOf<Get<TItem, "options.0">>().toMatchTypeOf<
	TItem["options"][0] | undefined
>();
expectTypeOf<Get<TItem, "options.0.name">>().toMatchTypeOf<
	TItem["options"][0]["name"] | undefined
>();
expectTypeOf<Get<TItem, "options.0.name.en">>().toMatchTypeOf<
	TItem["options"][0]["name"]["en"] | undefined
>();
expectTypeOf<Get<TItem, "options.name">>().toMatchTypeOf<
	Array<TItem["options"][number]["name"]>
>();
expectTypeOf<Get<TItem, "options.name.en">>().toMatchTypeOf<
	Array<TItem["options"][number]["name"]["en"]>
>();
