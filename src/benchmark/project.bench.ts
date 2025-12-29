import type { TItem } from "../test/item.ts";
import type { TLargeItem } from "../test/large-item.ts";
import type { TOrder } from "../test/order.ts";
import type { Projection, ProjectionType } from "../types/project.ts";
import { bench } from "@ark/attest";

// Basic benchmarks with TOrder
bench("Projection with simple object", () => {
	return {} as Projection<TOrder>;
}).types([1036, "instantiations"]);

bench("ProjectionType with inclusion", () => {
	return {} as ProjectionType<TOrder, { a: 1 }>;
}).types([2152, "instantiations"]);

bench("ProjectionType with exclusion", () => {
	return {} as ProjectionType<TOrder, { b: 0 }>;
}).types([2216, "instantiations"]);

bench("ProjectionType with undefined", () => {
	return {} as ProjectionType<TOrder, undefined>;
}).types([1005, "instantiations"]);

// TItem benchmarks
bench("ProjectionType TItem with nested inclusion", () => {
	return {} as ProjectionType<TItem, { "_id": 1; "name.en": 1 }>;
}).types([3015, "instantiations"]);

// Large scale benchmarks with TLargeItem
bench("Projection TLargeItem", () => {
	return {} as Projection<TLargeItem>;
}).types([5118, "instantiations"]);

bench("ProjectionType TLargeItem undefined", () => {
	return {} as ProjectionType<TLargeItem, undefined>;
}).types([4259, "instantiations"]);

bench("ProjectionType TLargeItem simple inclusion", () => {
	return {} as ProjectionType<TLargeItem, { name: 1 }>;
}).types([6130, "instantiations"]);

bench("ProjectionType TLargeItem nested exclusion", () => {
	return {} as ProjectionType<TLargeItem, { "_id": 0; "inventory.warehouse": 0 }>;
}).types([6374, "instantiations"]);

bench("ProjectionType TLargeItem deep path", () => {
	return {} as ProjectionType<TLargeItem, { "_id": 1; "inventory.warehouse.location.coordinates": 1 }>;
}).types([6457, "instantiations"]);

bench("ProjectionType TLargeItem array field", () => {
	return {} as ProjectionType<TLargeItem, { _id: 1; variants: 1; reviews: 1 }>;
}).types([6350, "instantiations"]);

bench("ProjectionType TLargeItem with path reference", () => {
	return {} as ProjectionType<TLargeItem, { _id: 0; productName: "$name.en" }>;
}).types([6161, "instantiations"]);
