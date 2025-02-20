import type {
	BulkWriteOptions,
	Collection,
	DeleteOptions,
	Filter,
	FindOneAndDeleteOptions,
	FindOneAndReplaceOptions,
	FindOneAndUpdateOptions,
	FindOptions,
	InsertOneOptions,
	OptionalUnlessRequiredId,
	UpdateFilter,
	UpdateOptions,
	WithoutId,
} from "mongodb";
import type { TDocument } from "./document";
import type { Projection, ProjectionType } from "./types/project";

export class TypedCollection<T extends TDocument> {
	collection: Collection<T>;

	constructor(collection: Collection<T>) {
		this.collection = collection;
	}

	find<const TProjection extends Projection<T>>(
		filter: Filter<T>,
		options?: Omit<FindOptions, "projection"> & { projection?: TProjection },
	) {
		return this.collection.find<ProjectionType<T, TProjection>>(
			filter,
			options,
		);
	}
	findOne<const TProjection extends Projection<T>>(
		filter: Filter<T>,
		options?: Omit<FindOptions, "projection"> & { projection?: TProjection },
	) {
		return this.collection.findOne<ProjectionType<T, TProjection>>(
			filter,
			options,
		);
	}

	findOneAndUpdate<const TProjection extends Projection<T>>(
		filter: Filter<T>,
		update: UpdateFilter<T>,
		options?: FindOneAndUpdateOptions & { projection?: TProjection },
	) {
		return (
			this.collection as unknown as Collection<ProjectionType<T, TProjection>>
		).findOneAndUpdate(
			// @ts-expect-error
			filter,
			update,
			options,
		);
	}
	findOneAndReplace<const TProjection extends Projection<T>>(
		filter: Filter<T>,
		update: WithoutId<T>,
		options?: FindOneAndReplaceOptions & { projection?: TProjection },
	) {
		return (
			this.collection as unknown as Collection<ProjectionType<T, TProjection>>
		).findOneAndReplace(
			// @ts-expect-error
			filter,
			update,
			options,
		);
	}
	findOneAndDelete<const TProjection extends Projection<T>>(
		filter: Filter<T>,
		options?: FindOneAndDeleteOptions & { projection: TProjection },
	) {
		return (
			this.collection as unknown as Collection<ProjectionType<T, TProjection>>
		).findOneAndDelete(
			// @ts-expect-error mongodb type definition only has 'omitted' for options.
			filter,
			options,
		);
	}

	insertOne(doc: OptionalUnlessRequiredId<T>, options?: InsertOneOptions) {
		return this.collection.insertOne(doc, options);
	}
	insertMany(docs: OptionalUnlessRequiredId<T>[], options?: BulkWriteOptions) {
		return this.collection.insertMany(docs, options);
	}

	updateOne(
		filter: Filter<T>,
		update: UpdateFilter<T>,
		options?: UpdateOptions,
	) {
		return this.collection.updateOne(filter, update, options);
	}
	updateMany(
		filter: Filter<T>,
		update: UpdateFilter<T>,
		options?: UpdateOptions,
	) {
		return this.collection.updateMany(filter, update, options);
	}

	deleteOne(filter: Filter<T>, options?: DeleteOptions) {
		return this.collection.deleteOne(filter, options);
	}
	deleteMany(filter: Filter<T>, options?: DeleteOptions) {
		return this.collection.deleteMany(filter, options);
	}
}
