import type { ObjectId } from "mongodb";

export interface Basic {
	_id: ObjectId;
	name: string;
	date_of_brith: Date;
	email: string;
	address: {
		country: string;
		city: string;
		basic: [
			string,
			string,
			string,
		];
	};
	phone: [
		string,
		string,
	];
}

export interface Complex {
	_id: ObjectId;
	name: string;
	date_of_brith: Date;
	email: string;
	address: {
		country: string;
		city: string;
		basic: [
			string,
			string,
			string,
		];
	};
	phone: [
		string,
		string,
	];
	settings: {
		display_name: string;
		type: "user" | "admin";
		permission: {
			management: {
				user: {
					create: boolean;
					read: boolean;
					update: boolean;
					delete: boolean;
				};
				role: {
					create: boolean;
					read: boolean;
					update: boolean;
					delete: boolean;
				};
			};
			order: {
				create: boolean;
				read: boolean;
				update: boolean;
				delete: boolean;
			};
			item: {
				create: boolean;
				read: boolean;
				update: boolean;
				delete: boolean;
			};
			category: {
				create: boolean;
				read: boolean;
				update: boolean;
				delete: boolean;
			};
		};
	};
}
