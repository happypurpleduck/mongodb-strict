import type { Split, UnknownArray } from "type-fest";
import type { StringOrNumber } from "./property-key.ts";

type MaybeNumber = number | `${number}`;

type GetWithPath<
	BaseType,
	Keys extends readonly any[],
> = Keys extends readonly []
	? BaseType
	: Keys extends readonly [
		infer Head,
		...infer Tail,
	]
		? Head extends MaybeNumber
			? GetWithPath<
				PropertyOf<BaseType, Head>,
				Tail
			>
			: BaseType extends UnknownArray
				? BaseType[number] extends object
					? Array<
						GetWithPath<
							PropertyOf<BaseType[number], Head>,
							Tail
						>
					>
					: never
				: GetWithPath<
					PropertyOf<BaseType, Head>,
					Tail
				>
		: never;

// eslint-disable-next-line ts/consistent-type-definitions
type O = { strictLiteralChecks: false };
type Delimiter = ".";
type ToPath<S extends StringOrNumber> = S extends string ? Split<S, Delimiter, O> : [S];

type PropertyOf<BaseType, Key> = BaseType extends
	| null
	| undefined
	? undefined
	: Key extends keyof BaseType
		? BaseType[Key]
		: BaseType extends UnknownArray
			? Key extends MaybeNumber
				? BaseType[number] | undefined
				: Key extends keyof BaseType[number]
					? BaseType[number]
					: never
			: BaseType extends readonly unknown[]
				? Key extends MaybeNumber
					? BaseType[number]
					: never
				: Key extends keyof BaseType
					? BaseType[Key]
					: never;

export type Get<BaseType, Path extends PropertyKey> = Path extends StringOrNumber ? GetWithPath<BaseType, ToPath<Path>> : never;
