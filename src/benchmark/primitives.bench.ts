import type { BSONPrimitives, ExtendedPrimitive } from "../types/primitives.d.ts";
import { bench } from "@ark/attest";

bench("BSONPrimitives type", () => {
	return {} as BSONPrimitives;
}).types([212, "instantiations"]);

bench("ExtendedPrimitive type", () => {
	return {} as ExtendedPrimitive;
}).types([222, "instantiations"]);

bench("ObjectId as BSON primitive", () => {
	return {} as import("bson").ObjectId;
}).types([0, "instantiations"]);

bench("String as extended primitive", () => {
	return {} as string;
}).types([0, "instantiations"]);
