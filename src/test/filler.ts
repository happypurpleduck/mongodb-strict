// import type { TItem } from "./item.ts";
// import { Decimal128, ObjectId } from "mongodb";
// import { client } from "./client.ts";
// import { ar, en } from "./faker.ts";
// import { Item } from "./item.ts";

// function create_item(): TItem {
// 	const options: TItem["options"] = [];

// 	for (let i = 0; i < en.number.int(5); i++) {
// 		options.push({
// 			name: {
// 				en: en.food.ingredient(),
// 				/* this currently is just english */
// 				ar: ar.food.ingredient(),
// 			},
// 			price: new Decimal128(
// 				en.number
// 					.float({
// 						max: 100,
// 						fractionDigits: 2,
// 					})
// 					.toString(),
// 			),
// 		});
// 	}

// 	return {
// 		_id: new ObjectId(),
// 		name: {
// 			en: en.food.dish(),
// 			/* this currently is just english */
// 			ar: ar.food.dish(),
// 		},
// 		x: 5,
// 		y: 10,
// 		tag: ["string", 5],
// 		price: new Decimal128(
// 			en.number
// 				.float({
// 					max: 100,
// 					fractionDigits: 2,
// 				})
// 				.toString(),
// 		),
// 		options,
// 	};
// }

// console.time("reset");
// await Item.deleteMany({});
// console.timeEnd("reset");

// console.time("fake");
// const items = Array.from({ length: 100_000 })
// 	.fill(0)
// 	.map(() => create_item());
// console.timeEnd("fake");

// console.time("insert");
// await Item.insertMany(items);
// console.timeEnd("insert");

// console.log(await client.close());
