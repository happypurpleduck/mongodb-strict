import { MongoClient } from "mongodb";

const DATABASE_CONNECTION_URI = process.env.DATABASE_CONNECTION_URI;
if (!DATABASE_CONNECTION_URI) {
	throw new Error("DATABASE_CONNECTION_URI missing");
}

const DATABASE_NAME = process.env.DATABASE_NAME;
if (!DATABASE_NAME) {
	throw new Error("DATABASE_NAME missing");
}

export const client = new MongoClient(DATABASE_CONNECTION_URI);
await client.connect();

export const database = client.db(DATABASE_NAME);
