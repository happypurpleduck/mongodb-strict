import type { Decimal128 } from "mongodb";
import type { TDocument } from "../document.ts";

export interface TItem extends TDocument {
	name: {
		en: string;
		ar: string;
	};
	price: Decimal128 | undefined;
	x: 5 | 10;
	y: 10;
	tag: [string, number];
	options: Array<{
		name: {
			en: string;
			ar: string;
		};
		price: Decimal128;
	}>;
}
