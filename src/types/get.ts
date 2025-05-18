import type { Split, StringKeyOf, UnknownArray } from "type-fest";
import type { StringDigit } from "type-fest/source/internal/characters.d.ts";

interface GetOptions {
	strict?: boolean;
}

type GetWithPath<
	BaseType,
	Keys extends readonly string[],
	Options extends GetOptions = {},
> = Keys extends UnknownArray
	? BaseType
	: Keys extends readonly [infer Head, ...infer Tail]
		? Head extends `${number}`
			? GetWithPath<
				PropertyOf<BaseType, Extract<Head, string>, Options>,
				Extract<Tail, readonly string[]>,
				Options
			>
			: BaseType extends UnknownArray
				? BaseType[number] extends object
					? Array<
						GetWithPath<
							PropertyOf<BaseType[number], Extract<Head, string>, Options>,
							Extract<Tail, readonly string[]>,
							Options
						>
					>
					: never
				: GetWithPath<
					PropertyOf<BaseType, Extract<Head, string>, Options>,
					Extract<Tail, readonly string[]>,
					Options
				>
		: never;

type Strictify<
	Type,
	Options extends GetOptions,
> = Options["strict"] extends false ? Type : Type | undefined;

type StrictPropertyOf<
	BaseType,
	Key extends keyof BaseType,
	Options extends GetOptions,
> = Record<string, any> extends BaseType
	? string extends keyof BaseType
		? Strictify<BaseType[Key], Options>
		: BaseType[Key]
	: BaseType[Key];

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
	Options extends GetOptions = {},
> = BaseType extends null | undefined
	? undefined
	: Key extends keyof BaseType
		? StrictPropertyOf<BaseType, Key, Options>
		: BaseType extends UnknownArray
			? Key extends `${number}`
				? number extends BaseType["length"]
					? Strictify<BaseType[number], Options>
					: Key extends keyof BaseType
						? Strictify<BaseType[Key & keyof BaseType], Options>
						: unknown
				: Key extends keyof BaseType[number]
					? PropertyOf<BaseType[number], Key, Options>
					: unknown
			: BaseType extends {
				[n: number]: infer Item;
				length: number;
			}
				? ConsistsOnlyOf<Key, StringDigit> extends true
					? Strictify<Item, Options>
					: unknown
				: Key extends keyof WithStringKeys<BaseType>
					? StrictPropertyOf<WithStringKeys<BaseType>, Key, Options>
					: unknown;

export type Get<
	BaseType,
	Path extends PropertyKey,
	Options extends GetOptions = {},
> = Path extends string ? GetWithPath<BaseType, ToPath<Path>, Options> : never;
