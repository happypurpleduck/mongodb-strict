import type { Decimal128 } from "mongodb";
import type { TDocument } from "../document.ts";
import { TypedCollection } from "../collection.ts";
import { database } from "./client.ts";

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

export const Item: TypedCollection<TItem> = new TypedCollection(
	database.collection("item"),
);
