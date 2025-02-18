import type { Binary, Code, Decimal128, ObjectId, Timestamp, UUID } from "bson";
import type { BuiltIns, NonRecursiveType } from "type-fest/source/internal";

export type BSONPrimitives =
	| ObjectId
	| Code
	| Binary
	| Decimal128
	| Timestamp
	| UUID;

export type ExtendedPrimitive =
	| BuiltIns
	| NonRecursiveType
	| BSONPrimitives
	| ReadonlyMap<unknown, unknown>
	| ReadonlySet<unknown>;
