import type { ObjectId } from "mongodb";
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
