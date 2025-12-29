// TODO: extract/remove if is implemented elsewhere
type IsNumeric<Key> = Key extends number | `${number}` ? true : false;

type PropertyOf<BaseType, Key>
	= BaseType extends null | undefined
		? undefined
		: Key extends keyof BaseType
			? BaseType[Key]
			: BaseType extends readonly unknown[]
				? IsNumeric<Key> extends true
					? BaseType[number] | undefined
					: Key extends keyof BaseType[number]
						? BaseType[number]
						: never
				: never;

type ArrayPropertyOf<BaseType, Key>
	= BaseType extends readonly unknown[]
		? Key extends keyof BaseType[number]
			? Array<BaseType[number][Key]>
			: never
		: never;

type GetImpl<BaseType, Path extends string>
	= Path extends `${infer Head}.${infer Tail}`
		? IsNumeric<Head> extends true
			? GetImpl<PropertyOf<BaseType, Head>, Tail>
			: BaseType extends readonly unknown[]
				? BaseType[number] extends object
					? Array<GetImpl<PropertyOf<BaseType[number], Head>, Tail>>
					: never
				: GetImpl<PropertyOf<BaseType, Head>, Tail>
		: IsNumeric<Path> extends true
			? PropertyOf<BaseType, Path>
			: BaseType extends readonly unknown[]
				? BaseType[number] extends object
					? ArrayPropertyOf<BaseType, Path>
					: PropertyOf<BaseType, Path>
				: PropertyOf<BaseType, Path>;

export type Get<BaseType, Path extends PropertyKey>
	= Path extends string
		? GetImpl<BaseType, Path>
		: Path extends number
			? `${Path}` extends keyof BaseType
				? BaseType[`${Path}`]
				: BaseType extends readonly unknown[]
					? BaseType[number] | undefined
					: PropertyOf<BaseType, Path>
			: never;
