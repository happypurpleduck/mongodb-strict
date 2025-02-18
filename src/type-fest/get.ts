import type { Paths, Split, StringKeyOf } from "type-fest";
import type { StringDigit, ToString } from "type-fest/source/internal";
import type { LiteralStringUnion } from "type-fest/source/literal-union";

type GetOptions = {
	strict?: boolean;
};

type GetWithPath<
	BaseType,
	Keys,
	Options extends GetOptions = {},
> = Keys extends readonly []
	? BaseType
	: Keys extends readonly [infer Head, ...infer Tail]
		? GetWithPath<
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

type ToPath<S extends string> = Split<FixPathSquareBrackets<S>, ".">;

type FixPathSquareBrackets<Path extends string> =
	Path extends `[${infer Head}]${infer Tail}`
		? Tail extends `[${string}`
			? `${Head}.${FixPathSquareBrackets<Tail>}`
			: `${Head}${FixPathSquareBrackets<Tail>}`
		: Path extends `${infer Head}[${infer Middle}]${infer Tail}`
			? `${Head}.${FixPathSquareBrackets<`[${Middle}]${Tail}`>}`
			: Path;

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
	Path extends
		| readonly string[]
		| LiteralStringUnion<
				ToString<
					| Paths<BaseType, { bracketNotation: false; maxRecursionDepth: 2 }>
					| Paths<BaseType, { bracketNotation: true; maxRecursionDepth: 2 }>
				>
		  >,
	Options extends GetOptions = {},
> = GetWithPath<BaseType, Path extends string ? ToPath<Path> : Path, Options>;
