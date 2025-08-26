import type { Binary, Code, Decimal128, ObjectId, Timestamp, UUID } from "bson";
import type {
	BuiltIns,
	NonRecursiveType,
} from "type-fest/source/internal/type.d.ts";

export type BSONPrimitives
	= | ObjectId
		| Code
		| Binary
		| Decimal128
		| Timestamp
		| UUID;

export interface Primitives {
	BuiltIns: BuiltIns;
	NonRecursiveType: NonRecursiveType;
	BSONPrimitives: BSONPrimitives;
	ReadonlyMap: ReadonlyMap<unknown, unknown>;
	ReadonlySet: ReadonlySet<unknown>;
}

export type ExtendedPrimitive = Primitives[keyof Primitives];
