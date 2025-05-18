import type { BSONRegExp, BSONTypeAlias } from "mongodb";

export interface FilterOperators<TValue> {
	$eq?: TValue;
	$gt?: TValue;
	$gte?: TValue;
	$in?: Array<TValue>;
	$lt?: TValue;
	$lte?: TValue;
	$ne?: TValue;
	$nin?: Array<TValue>;
	// TODO: BSONRegExp?
	$not?: TValue extends string
		? FilterOperators<TValue> | RegExp
		: FilterOperators<TValue>;
	/**
	 * When `true`, `$exists` matches the documents that contain the field,
	 * including documents where the field value is null.
	 */
	$exists?: boolean;
	$type?: BSONTypeAlias;
	$expr?: Record<string, any>;
	$jsonSchema?: Record<string, any>;
	// TODO: number-like? (decimal128?)
	$mod?: TValue extends number ? [number, number] : never;
	$regex?: TValue extends string ? RegExp | BSONRegExp | string : never;
	$options?: TValue extends string ? string : never;
	// $geoIntersects?: {
	// 	$geometry: Document;
	// };
	// $geoWithin?: Document;
	// $near?: Document;
	// $nearSphere?: Document;
	$maxDistance?: number;
	$all?: Array<any>;
	// $elemMatch?: Document;
	$size?: TValue extends Array<any> ? number : never;
	// $bitsAllClear?: BitwiseFilter;
	// $bitsAllSet?: BitwiseFilter;
	// $bitsAnyClear?: BitwiseFilter;
	// $bitsAnySet?: BitwiseFilter;
	// $rand?: Record<string, never>;
}
