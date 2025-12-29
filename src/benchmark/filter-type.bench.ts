import type { LiteralFilterType, LiteralsFilterType } from "../types/filter-type.ts";
import { bench } from "@ark/attest";

bench("LiteralFilterType with direct value", () => {
	return {} as LiteralFilterType<"active" | "inactive", "active">;
}).types([6, "instantiations"]);

bench("LiteralFilterType with $eq operator", () => {
	return {} as LiteralFilterType<"active" | "inactive", { $eq: "active" }>;
}).types([12, "instantiations"]);

bench("LiteralFilterType with $in operator", () => {
	return {} as LiteralFilterType<"active" | "inactive" | "pending", { $in: readonly ["active", "inactive"] }>;
}).types([61, "instantiations"]);

bench("LiteralFilterType with $ne operator", () => {
	return {} as LiteralFilterType<"active" | "inactive" | "pending", { $ne: "pending" }>;
}).types([43, "instantiations"]);

bench("LiteralFilterType with $nin operator", () => {
	return {} as LiteralFilterType<"active" | "inactive" | "pending", { $nin: readonly ["pending"] }>;
}).types([88, "instantiations"]);

bench("LiteralFilterType with $not operator", () => {
	return {} as LiteralFilterType<"active" | "inactive" | "pending", { $not: "pending" }>;
}).types([67, "instantiations"]);

bench("LiteralsFilterType simple object", () => {
	return {} as LiteralsFilterType<
		{ status: "active" | "inactive"; count: number },
		{ status: "active" }
	>;
}).types([715, "instantiations"]);

bench("LiteralsFilterType with nested literals", () => {
	return {} as LiteralsFilterType<
		{
			user: { role: "admin" | "user" | "guest" };
			status: "active" | "inactive";
		},
		{ status: { $eq: "active" } }
	>;
}).types([722, "instantiations"]);

bench("LiteralsFilterType with $in filter", () => {
	return {} as LiteralsFilterType<
		{ priority: 1 | 2 | 3 | 4 | 5; name: string },
		{ priority: { $in: readonly [1, 2, 3] } }
	>;
}).types([797, "instantiations"]);
