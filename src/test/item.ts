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
	location:
		| {
			type: "direct";
			latitude: number;
			longitude: number;
		}
		| {
			type: "indirect";
			latitude: number;
			longitude: number;
		};
	properties: Record<string, string>;
	options: Array<TOptions>;
}

export interface TOptions {
	name: {
		en: string;
		ar: string;
	};
	price: Decimal128;
	offerPrice: Decimal128 | null;
	values: number[];
	options: Array<TOptions>;
}
