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

export class TypedCollection<T extends TDocument> {
	collection: Collection<T>;

	constructor(collection: Collection<T>) {
		this.collection = collection;
	}

	find(filter: Filter<T>, options?: FindOptions) {
		return this.collection.find(filter, options);
	}
	findOne(filter: Filter<T>, options?: FindOptions) {
		return this.collection.findOne(filter, options);
	}

	findOneAndUpdate(
		filter: Filter<T>,
		update: UpdateFilter<T>,
		options?: FindOneAndUpdateOptions,
	) {
		// @ts-expect-error mongodb type definition only has 'omitted' for options.
		return this.collection.findOneAndUpdate(filter, update, options);
	}
	findOneAndReplace(
		filter: Filter<T>,
		update: WithoutId<T>,
		options?: FindOneAndReplaceOptions,
	) {
		// @ts-expect-error mongodb type definition only has 'omitted' for options.
		return this.collection.findOneAndReplace(filter, update, options);
	}
	findOneAndDelete(filter: Filter<T>, options?: FindOneAndDeleteOptions) {
		// @ts-expect-error mongodb type definition only has 'omitted' for options.
		return this.collection.findOneAndDelete(filter, options);
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
