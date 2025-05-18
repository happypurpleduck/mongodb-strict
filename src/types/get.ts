import type { Split, StringKeyOf, UnknownArray } from "type-fest";
import type { StringDigit } from "type-fest/source/internal/characters.d.ts";

type GetWithPath<
	BaseType,
	Keys extends readonly string[],
> = Keys extends readonly []
	? BaseType
	: Keys extends readonly [infer Head, ...infer Tail]
		? Head extends `${number}`
			? GetWithPath<
				PropertyOf<BaseType, Extract<Head, string>>,
				Extract<Tail, readonly string[]>
			>
			: BaseType extends UnknownArray
				? BaseType[number] extends object
					? Array<
						GetWithPath<
							PropertyOf<BaseType[number], Extract<Head, string>>,
							Extract<Tail, readonly string[]>
						>
					>
					: never
				: GetWithPath<
					PropertyOf<BaseType, Extract<Head, string>>,
					Extract<Tail, readonly string[]>
				>
		: never;

type ToPath<S extends string> = Split<S, ".">;

type ConsistsOnlyOf<
	LongString extends string,
	Substring extends string,
> = LongString extends ""
	? true
	: LongString extends `${Substring}${infer Tail}`
		? ConsistsOnlyOf<Tail, Substring>
		: false;

type WithStringKeys<BaseType> = {
	[Key in StringKeyOf<BaseType>]: UncheckedIndex<BaseType, Key>;
};

type UncheckedIndex<T, K extends string | number> = [T] extends [
	Record<string | number, any>,
]
	? T[K]
	: never;

type PropertyOf<
	BaseType,
	Key extends string,
> = BaseType extends null | undefined
	? undefined
	: Key extends keyof BaseType
		? BaseType[Key]
		: BaseType extends UnknownArray
			? Key extends `${number}`
				? number extends BaseType["length"]
					? BaseType[number] | undefined
					: Key extends keyof BaseType
						? BaseType[Key & keyof BaseType]
						: never
				: Key extends keyof BaseType[number]
					? BaseType[number]
					: never
			: BaseType extends {
				[n: number]: infer Item;
				length: number;
			}
				? ConsistsOnlyOf<Key, StringDigit> extends true
					? Item
					: never
				: Key extends keyof WithStringKeys<BaseType>
					? WithStringKeys<BaseType>[Key]
					: never;

export type Get<
	BaseType,
	Path extends PropertyKey,
> = Path extends string ? GetWithPath<BaseType, ToPath<Path>> : never;
