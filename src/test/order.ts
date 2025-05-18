import type { ObjectId } from "mongodb";
import type { TDocument } from "../document.ts";
import { TypedCollection } from "../collection.ts";
import { database } from "./client.ts";

export type TOrder = TDocument & {
	item: ObjectId;
	done: true | null;
} & (
	| {
		type: "Pickup";
		name: string;
	}
	| {
		type: "Delivery";
		location: {
			longitude: number;
			latitude: number;
		};
	}
	);

export const Order: TypedCollection<TOrder> = new TypedCollection(
	database.collection("order"),
);
