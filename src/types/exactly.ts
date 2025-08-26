export type Exactly<T, X> = T & Record<Exclude<keyof X, keyof T>, never>;
