import type { NotAcceptedFields } from "../types/not-acceptable-fields.ts";
import { bench } from "@ark/attest";

bench("NotAcceptedFields with simple object", () => {
	return {} as NotAcceptedFields<{ a: number; b: string }, number>;
}).types([1406, "instantiations"]);

bench("NotAcceptedFields with nested object", () => {
	return {} as NotAcceptedFields<{ a: { b: number }; c: string }, number>;
}).types([1533, "instantiations"]);

bench("NotAcceptedFields with arrays", () => {
	return {} as NotAcceptedFields<{ a: number[]; b: string }, number[]>;
}).types([1554, "instantiations"]);

bench("NotAcceptedFields with empty object", () => {
	return {} as NotAcceptedFields<{}, number>;
}).types([1258, "instantiations"]);
