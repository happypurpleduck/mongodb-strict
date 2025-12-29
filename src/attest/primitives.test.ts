import type { BSONPrimitives, ExtendedPrimitive } from "../index.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("primitives types", () => {
	it("bSONPrimitives includes BSON types", () => {
		attest({} as BSONPrimitives)
			.type
			.toString
			.snap("BSONPrimitives");
	});

	it("extendedPrimitive includes all primitive types", () => {
		attest({} as ExtendedPrimitive)
			.type
			.toString
			.snap("ExtendedPrimitive");
	});

	it("handles ObjectId as BSON primitive", () => {
		attest({} as import("bson").ObjectId)
			.type
			.toString
			.snap("ObjectId");
	});

	it("handles string as extended primitive", () => {
		attest({} as string)
			.type
			.toString
			.snap("string");
	});
});
