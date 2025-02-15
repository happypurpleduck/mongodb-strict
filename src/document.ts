import type { ObjectId, Document } from "mongodb";

export interface TDocument extends Document {
	_id: ObjectId;
}
