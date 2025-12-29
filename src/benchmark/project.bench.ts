import type { TItem } from "../test/item.ts";
import type { TOrder } from "../test/order.ts";
import type { Projection, ProjectionType } from "../types/project.ts";
import { bench } from "@ark/attest";

bench("Projection with simple object", () => {
	return {} as Projection<TOrder>;
}).types([1036, "instantiations"]);

bench("ProjectionType with inclusion", () => {
	return {} as ProjectionType<TOrder, { a: 1 }>;
}).types([3428, "instantiations"]);

bench("ProjectionType with exclusion", () => {
	return {} as ProjectionType<TOrder, { b: 0 }>;
}).types([3284, "instantiations"]);

bench("ProjectionType with exclusion _id only", () => {
	return {} as ProjectionType<TOrder, { _id: 0 }>;
}).types([3372, "instantiations"]);

bench("ProjectionType with undefined", () => {
	return {} as ProjectionType<TOrder, undefined>;
}).types([1005, "instantiations"]);

bench("ProjectionType with path reference", () => {
	return {} as ProjectionType<TOrder, { _id: 0; alias: "$item" }>;
}).types([3234, "instantiations"]);

bench("ProjectionType with $literal", () => {
	return {} as ProjectionType<TOrder, { _id: 0; constant: { $literal: 42 } }>;
}).types([4228, "instantiations"]);

// Complex type benchmarks with TItem
bench("ProjectionType TItem with nested inclusion", () => {
	return {} as ProjectionType<TItem, { "_id": 1; "name.en": 1 }>;
}).types([4240, "instantiations"]);

bench("ProjectionType TItem with multiple fields", () => {
	return {} as ProjectionType<TItem, { name: 1; price: 1; options: 1 }>;
}).types([4334, "instantiations"]);
