import { Faker, ar as ar_locale, en as en_locale, base } from "@faker-js/faker";

const seed = Math.random();

export const en = new Faker({
	locale: [en_locale, base],
	seed,
});

export const ar = new Faker({
	locale: [ar_locale, en_locale, base],
	seed,
});
