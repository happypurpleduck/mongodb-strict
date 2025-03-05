import type { ObjectId } from "mongodb";
import { TypedCollection } from "../collection.ts";
import { database } from "./client.ts";
import type { TDocument } from "../document.ts";

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

export const Order = new TypedCollection<TOrder>(database.collection("order"));
