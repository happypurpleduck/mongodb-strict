import type { TOrder } from "../test/order.ts";
import type { Projection, ProjectionType } from "../types/project.ts";
import { bench } from "@ark/attest";

bench("Projection with simple object", () => {
	return {} as Projection<TOrder>;
}).types([1036, "instantiations"]);

bench("ProjectionType with inclusion", () => {
	return {} as ProjectionType<TOrder, { a: 1 }>;
}).types([3917, "instantiations"]);

bench("ProjectionType with exclusion", () => {
	return {} as ProjectionType<TOrder, { b: 0 }>;
}).types([3773, "instantiations"]);

bench("ProjectionType with exclusion", () => {
	return {} as ProjectionType<TOrder, { b: 0 }>;
}).types([3773, "instantiations"]);

bench("ProjectionType with undefined", () => {
	return {} as ProjectionType<TOrder, undefined>;
}).types([1005, "instantiations"]);
