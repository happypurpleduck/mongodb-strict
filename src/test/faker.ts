import { ar as ar_locale, base, en as en_locale, Faker } from "@faker-js/faker";

const seed = Math.random();

export const en: Faker = new Faker({
	locale: [en_locale, base],
	seed,
});

export const ar: Faker = new Faker({
	locale: [ar_locale, en_locale, base],
	seed,
});
