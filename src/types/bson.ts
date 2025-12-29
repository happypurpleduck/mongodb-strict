export interface BSONRegExpLike {
	get _bsontype(): "BSONRegExp";
}

export interface BSONSymbolLike {
	get _bsontype(): "BSONSymbol";
}

//

export interface BSONBinaryLike {
	get _bsontype(): "Binary";
}

export interface BSONCodeLike {
	get _bsontype(): "Code";
}

export interface BSONDBRefLike {
	get _bsontype(): "DBRef";
}

export interface BSONDecimal128Like {
	get _bsontype(): "Decimal128";
}

export interface BSONDoubleLike {
	get _bsontype(): "Double";
}

export interface BSONInt32Like {
	get _bsontype(): "Int32";
}

export interface BSONLongLike {
	get _bsontype(): "Long";
}

export interface BSONMaxKeyLike {
	get _bsontype(): "MaxKey";
}

export interface BSONMinKeyLike {
	get _bsontype(): "MinKey";
}

export interface BSONObjectIdLike {
	get _bsontype(): "ObjectId";

}

export interface BSONTimestampLike {
	get _bsontype(): "Timestamp";
}

//

export type BSONIntegerTypeLike = number | bigint | BSONInt32Like | BSONLongLike;
export type BSONNumericTypeLike = BSONIntegerTypeLike | BSONDecimal128Like | BSONDoubleLike;
