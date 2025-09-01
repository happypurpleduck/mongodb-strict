import type { Projection, ProjectionType } from "../types/project.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("projection types", () => {
	it("projection creates projection object", () => {
		attest({} as Projection<{ a: number; b: string }>).type.toString.snap(
			"Projection<{ a: number; b: string }>",
		);
	});

	it("projectionType applies projection", () => {
		attest({} as ProjectionType<{ a: number; b: string }, { a: 1 }>).type.toString.snap(
			"{ a: number }",
		);
	});

	it("handles exclusion projection", () => {
		attest({} as ProjectionType<{ a: number; b: string }, { b: 0 }>).type.toString.snap(
			"{ a: number }",
		);
	});

	it("handles undefined projection", () => {
		attest({} as ProjectionType<{ a: number; b: string }, undefined>).type.toString.snap(
			"{ a: number; b: string }",
		);
	});
});
