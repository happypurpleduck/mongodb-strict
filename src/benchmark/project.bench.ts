import type { TOrder } from "../test/order.ts";
import type { Projection, ProjectionType } from "../types/project.ts";
import { bench } from "@ark/attest";

bench("Projection with simple object", () => {
	return {} as Projection<TOrder>;
}).types([806, "instantiations"]);

bench("ProjectionType with inclusion", () => {
	return {} as ProjectionType<TOrder, { a: 1 }>;
}).types([2883, "instantiations"]);

bench("ProjectionType with exclusion", () => {
	return {} as ProjectionType<TOrder, { b: 0 }>;
}).types([2805, "instantiations"]);

bench("ProjectionType with exclusion", () => {
	return {} as ProjectionType<TOrder, { b: 0 }>;
}).types([2805, "instantiations"]);

bench("ProjectionType with undefined", () => {
	return {} as ProjectionType<TOrder, undefined>;
}).types([822, "instantiations"]);
