import type { PathsOfType } from "./path-of-type.ts";

// TODO: check if NotAcceptedFields is required (PathsOfType should be stricter than native Mongodb implementations)
export type NotAcceptedFields<TSchema, FieldType> = {
	readonly [key in PathsOfType<TSchema, FieldType>]?: never;
};
