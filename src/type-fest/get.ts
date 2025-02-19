import type { Split, StringKeyOf, UnknownArray } from "type-fest";
import type { StringDigit } from "type-fest/source/internal";

interface GetOptions {
	strict?: boolean;
}

type GetWithPath<
	BaseType,
	Keys,
	Options extends GetOptions = {},
> = Keys extends readonly []
	? BaseType
	: Keys extends readonly [infer Head, ...infer Tail]
		? Head extends `${number}`
			? GetWithPath<
					PropertyOf<BaseType, Extract<Head, string>, Options>,
					Extract<Tail, string[]>,
					Options
				>
			: BaseType extends UnknownArray
				? Array<
						GetWithPath<
							PropertyOf<BaseType, Extract<Head, string>, Options>,
							Extract<Tail, string[]>,
							Options
						>
					>
				: GetWithPath<
						PropertyOf<BaseType, Extract<Head, string>, Options>,
						Extract<Tail, string[]>,
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

type UncheckedIndex<T, U extends string | number> = [T] extends [
	Record<string | number, any>,
]
	? T[U]
	: never;

type PropertyOf<
	BaseType,
	Key extends string,
	Options extends GetOptions = {},
> = BaseType extends null | undefined
	? undefined
	: Key extends keyof BaseType
		? StrictPropertyOf<BaseType, Key, Options>
		: BaseType extends readonly unknown[]
			? Key extends `${number}`
				? number extends BaseType["length"]
					? Strictify<BaseType[number], Options>
					: Key extends keyof BaseType
						? Strictify<BaseType[Key & keyof BaseType], Options>
						: unknown
				: PropertyOf<BaseType[number], Key, Options>
			: BaseType extends {
						[n: number]: infer Item;
						length: number;
					}
				? ConsistsOnlyOf<Key, StringDigit> extends true
					? Strictify<Item, Options>
					: unknown
				: Key extends keyof WithStringKeys<BaseType>
					? StrictPropertyOf<WithStringKeys<BaseType>, Key, Options>
					: never;

export type Get<
	BaseType,
	Path extends string,
	Options extends GetOptions = {},
> = GetWithPath<BaseType, ToPath<Path>, Options>;
