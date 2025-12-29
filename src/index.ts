import type { BuiltIns, NonRecursiveType } from "type-fest/source/internal/index.d.ts";

export type * from "./types/build-dot-object.ts";
export type * from "./types/exactly.ts";
export type * from "./types/filter-operation.ts";
export type * from "./types/filter-operators.ts";
export type * from "./types/filter-operators.ts";
export type * from "./types/filter-type.ts";
export type * from "./types/filter.ts";
export type * from "./types/get.ts";
export type * from "./types/not-acceptable-fields.ts";
export type * from "./types/omit-deep.ts";
export type * from "./types/path-of-literal.ts";
export type * from "./types/path-of-type.ts";
export type * from "./types/path.ts";
export type * from "./types/pick-deep.ts";
export type * from "./types/pop-operation.ts";
export type * from "./types/project.ts";
export type * from "./types/pull-all-operator.ts";
export type * from "./types/pull-operator.ts";
export type * from "./types/push-operator.ts";
export type * from "./types/set-fields.ts";
export type * from "./types/simplify-deep.ts";
export type * from "./types/singular.ts";
export type * from "./types/strict-match-keys-and-values.ts";
export type * from "./types/unset-operation.ts";
export type * from "./types/update-filter.ts";

export interface BSONPrimitives {
	get _bsontype(): string;
}

export interface Primitives {
	BuiltIns: BuiltIns;
	NonRecursiveType: NonRecursiveType;
	BSONPrimitives: BSONPrimitives;
	ReadonlyMap: ReadonlyMap<unknown, unknown>;
	ReadonlySet: ReadonlySet<unknown>;
}

export type ExtendedPrimitive = Primitives[keyof Primitives];
