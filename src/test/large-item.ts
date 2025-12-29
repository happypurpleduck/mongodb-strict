import type { Decimal128, ObjectId } from "mongodb";
import type { TDocument } from "../document.ts";

// Large complex type for stress testing type performance
export interface TLargeItem extends TDocument {
	// Basic fields
	name: {
		en: string;
		ar: string;
		fr: string;
		de: string;
		es: string;
	};
	description: {
		short: string;
		long: string;
		meta: {
			keywords: string[];
			seoTitle: string;
			seoDescription: string;
		};
	};
	price: Decimal128;
	originalPrice: Decimal128 | null;
	currency: "USD" | "EUR" | "GBP";
	status: "active" | "inactive" | "draft" | "archived";

	// Nested object
	inventory: {
		quantity: number;
		reserved: number;
		available: number;
		warehouse: {
			id: ObjectId;
			name: string;
			location: {
				country: string;
				city: string;
				address: string;
				coordinates: {
					lat: number;
					lng: number;
				};
			};
		};
	};

	// Array of complex objects
	variants: Array<{
		sku: string;
		name: {
			en: string;
			ar: string;
		};
		price: Decimal128;
		attributes: {
			color: string;
			size: string;
			weight: number;
		};
		images: Array<{
			url: string;
			alt: string;
			width: number;
			height: number;
		}>;
	}>;

	// Categories with nested structure
	categories: Array<{
		id: ObjectId;
		name: string;
		parent: ObjectId | null;
		level: number;
		path: string[];
	}>;

	// Timestamps and metadata
	timestamps: {
		created: Date;
		updated: Date;
		published: Date | null;
		deleted: Date | null;
	};

	// Reviews array
	reviews: Array<{
		userId: ObjectId;
		rating: 1 | 2 | 3 | 4 | 5;
		title: string;
		content: string;
		helpful: number;
		verified: boolean;
		images: string[];
		createdAt: Date;
	}>;

	// Shipping info
	shipping: {
		weight: number;
		dimensions: {
			length: number;
			width: number;
			height: number;
		};
		restrictions: string[];
		freeShipping: boolean;
		estimatedDays: number;
	};

	// Tags tuple
	tags: [string, string, string];

	// Optional complex field
	promotion?: {
		type: "percentage" | "fixed" | "bogo";
		value: number;
		startDate: Date;
		endDate: Date;
		conditions: {
			minQuantity: number;
			maxDiscount: Decimal128;
		};
	};
}
