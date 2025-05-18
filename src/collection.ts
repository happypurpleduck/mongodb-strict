import type {
	BulkWriteOptions,
	Collection,
	DeleteOptions,
	DeleteResult,
	FindOneAndDeleteOptions,
	FindOneAndReplaceOptions,
	FindOneAndUpdateOptions,
	FindOptions,
	InsertManyResult,
	InsertOneOptions,
	InsertOneResult,
	ModifyResult,
	UpdateOptions,
	UpdateResult,
	WithoutId,
} from "mongodb";
import type { IfNever } from "type-fest";
import type { TDocument } from "./document.ts";
import type { Filter, LiteralsFilterType } from "./types/filter.ts";
import type { Projection, ProjectionType } from "./types/project.ts";
import type { UpdateFilter } from "./types/update-filter.ts";

export class TypedCollection<T extends TDocument> {
	collection: Collection<T>;

	constructor(collection: Collection<T>) {
		this.collection = collection;
	}

	// TODO: extend Find Cursor?
	// find<
	// 	const TFilter extends Filter<T>,
	// 	const TFiltered = T & LiteralsFilterType<T, TFilter>,
	// 	const TProjection extends Projection<TFiltered> = undefined,
	// >(
	// 	filter: TFilter,
	// 	options?: Omit<FindOptions, "projection"> & { projection?: TProjection },
	// ): FindCursor<ProjectionType<TFiltered, TProjection>> {
	// 	// @ts-ignore trust me
	// 	return this.collection.find(
	// 		// @ts-ignore trust me
	// 		filter,
	// 		options,
	// 	);
	// }

	async findAll<
		const TFilter extends Filter<T>,
		TLiteralsFilterType = LiteralsFilterType<T, TFilter>,
		TFiltered = IfNever<TLiteralsFilterType, T, T & TLiteralsFilterType>,
		const TProjection extends Projection<TFiltered> = Projection<TFiltered> | undefined,
	>(
		filter: TFilter,
		options?: Omit<FindOptions, "projection"> & { projection?: TProjection },
	): Promise<ProjectionType<TFiltered, TProjection>[]> {
		// @ts-expect-error trust me
		return this.collection
			.find(
				// @ts-expect-error trust me
				filter,
				options,
			)
			.toArray();
	}

	findOne<
		const TFilter extends Filter<T>,
		TLiteralsFilterType = LiteralsFilterType<T, TFilter>,
		TFiltered = IfNever<TLiteralsFilterType, T, T & TLiteralsFilterType>,
		const TProjection extends Projection<TFiltered> = Projection<TFiltered> | undefined,
	>(
		filter: TFilter,
		options?: Omit<FindOptions, "projection"> & { projection?: TProjection },
	): Promise<ProjectionType<TFiltered, TProjection> | null> {
		// @ts-ignore trust me
		return this.collection.findOne(
			// @ts-ignore trust me
			filter,
			options,
		);
	}

	findOneAndUpdate<
		const TFilter extends Filter<T>,
		TLiteralsFilterType = LiteralsFilterType<T, TFilter>,
		TFiltered = IfNever<TLiteralsFilterType, T, T & TLiteralsFilterType>,
		const TProjection extends Projection<TFiltered> = Projection<TFiltered> | undefined,
		const TResultMeta extends boolean = false,
	>(
		filter: Filter<T>,
		update: UpdateFilter<T>,
		options?: Omit<
			FindOneAndUpdateOptions,
			"projection" | "includeResultMetadata"
		> & {
			projection?: TProjection;
			includeResultMetadata?: TResultMeta;
		},
	): TResultMeta extends true ? Promise<ModifyResult<T>> : Promise<T | null> {
		// @ts-ignore trust me
		return this.collection.findOneAndUpdate(
			// @ts-ignore trust me
			filter,
			update,
			options,
		);
	}

	findOneAndReplace<
		const TFilter extends Filter<T>,
		TLiteralsFilterType = LiteralsFilterType<T, TFilter>,
		TFiltered = IfNever<TLiteralsFilterType, T, T & TLiteralsFilterType>,
		const TProjection extends Projection<TFiltered> = Projection<TFiltered> | undefined,
		const TResultMeta extends boolean = false,
	>(
		filter: Filter<T>,
		// TODO: use better omit? WithoutId might break union types (uses Omit).
		update: WithoutId<T>,
		options?: Omit<
			FindOneAndReplaceOptions,
			"projection" | "includeResultMetadata"
		> & {
			projection?: TProjection;
			includeResultMetadata?: TResultMeta;
		},
	): TResultMeta extends true ? Promise<ModifyResult<T>> : Promise<T | null> {
		// @ts-ignore trust me
		return this.collection.findOneAndReplace(
			// @ts-ignore trust me
			filter,
			update,
			options,
		);
	}

	findOneAndDelete<
		const TFilter extends Filter<T>,
		TLiteralsFilterType = LiteralsFilterType<T, TFilter>,
		TFiltered = IfNever<TLiteralsFilterType, T, T & TLiteralsFilterType>,
		const TProjection extends Projection<TFiltered> = Projection<TFiltered> | undefined,
		const TResultMeta extends boolean = false,
	>(
		filter: Filter<T>,
		options?: Omit<
			FindOneAndDeleteOptions,
			"projection" | "includeResultMetadata"
		> & {
			projection?: TProjection;
			includeResultMetadata?: TResultMeta;
		},
	): TResultMeta extends true ? Promise<ModifyResult<T>> : Promise<T | null> {
		// @ts-expect-error
		return this.collection.findOneAndDelete(
			// @ts-ignore trust me
			filter,
			options,
		);
	}

	insertOne(doc: T, options?: InsertOneOptions): Promise<InsertOneResult<T>> {
		return this.collection.insertOne(
			// @ts-ignore trust me
			doc,
			options,
		);
	}

	insertMany(
		docs: T[],
		options?: BulkWriteOptions,
	): Promise<InsertManyResult<T>> {
		return this.collection.insertMany(
			// @ts-ignore
			docs,
			options,
		);
	}

	updateOne(
		filter: Filter<T>,
		update: UpdateFilter<T>,
		options?: UpdateOptions,
	): Promise<UpdateResult<T>> {
		return this.collection.updateOne(
			// @ts-expect-error
			filter,
			update,
			options,
		);
	}

	updateMany(
		filter: Filter<T>,
		update: UpdateFilter<T>,
		options?: UpdateOptions,
	): Promise<UpdateResult<T>> {
		return this.collection.updateMany(
			// @ts-expect-error
			filter,
			update,
			options,
		);
	}

	deleteOne(filter: Filter<T>, options?: DeleteOptions): Promise<DeleteResult> {
		return this.collection.deleteOne(
			// @ts-expect-error
			filter,
			options,
		);
	}

	deleteMany(
		filter: Filter<T>,
		options?: DeleteOptions,
	): Promise<DeleteResult> {
		return this.collection.deleteMany(
			// @ts-expect-error
			filter,
			options,
		);
	}
}

/*
TODOs:
- check instead of `Omit<FindOptions, "projection"> & { projection?: TProjection }` use `interface TFindOptions<Projection> extends Omit<FindOptions, "projection"> { projection: Projection }`
*/
