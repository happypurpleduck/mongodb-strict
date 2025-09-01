import type { OmitDeep } from "../types/omit-deep.ts";
import { bench } from "@ark/attest";

bench("OmitDeep with simple object", () => {
	return {} as OmitDeep<{ a: number; b: string }, "a">;
}).types([665, "instantiations"]);

bench("OmitDeep with nested object", () => {
	return {} as OmitDeep<{ a: { b: number; c: string } }, "a.b">;
}).types([738, "instantiations"]);

bench("OmitDeep with array", () => {
	return {} as OmitDeep<{ a: number[] }, "a.0">;
}).types([738, "instantiations"]);

bench("OmitDeep with multiple paths", () => {
	return {} as OmitDeep<{ a: number; b: string; c: boolean }, "a" | "c">;
}).types([810, "instantiations"]);
