import type {
	BulkWriteOptions,
	Collection,
	DeleteOptions,
	FindOneAndDeleteOptions,
	FindOneAndReplaceOptions,
	FindOneAndUpdateOptions,
	FindOptions,
	InsertOneOptions,
	UpdateFilter,
	UpdateOptions,
	WithoutId,
} from "mongodb";
import type { TDocument } from "./document.ts";
import type { Filter } from "./types/filter.ts";
import type { Projection, ProjectionType } from "./types/project.ts";

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
			// @ts-expect-error
			filter,
			options,
		);
	}
	findOne<const TProjection extends Projection<T>>(
		filter: Filter<T>,
		options?: Omit<FindOptions, "projection"> & { projection?: TProjection },
	) {
		return this.collection.findOne<ProjectionType<T, TProjection>>(
			// @ts-expect-error
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
			// @ts-expect-error
			filter,
			options,
		);
	}

	insertOne(doc: T, options?: InsertOneOptions) {
		return this.collection.insertOne(
			// @ts-expect-error
			doc,
			options,
		);
	}
	insertMany(docs: T[], options?: BulkWriteOptions) {
		return this.collection.insertMany(
			// @ts-expect-error
			docs,
			options,
		);
	}

	updateOne(
		filter: Filter<T>,
		update: UpdateFilter<T>,
		options?: UpdateOptions,
	) {
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
	) {
		return this.collection.updateMany(
			// @ts-expect-error
			filter,
			update,
			options,
		);
	}

	deleteOne(filter: Filter<T>, options?: DeleteOptions) {
		return this.collection.deleteOne(
			// @ts-expect-error
			filter,
			options,
		);
	}
	deleteMany(filter: Filter<T>, options?: DeleteOptions) {
		return this.collection.deleteMany(
			// @ts-expect-error
			filter,
			options,
		);
	}
}
