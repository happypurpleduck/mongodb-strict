import { expectTypeOf } from "vitest";
import type { TItem } from "./item.ts";
import type { TOrder } from "./order.ts";
import type { PathsOfLiteral } from "../types/path-of-literal.ts";

expectTypeOf<PathsOfLiteral<TItem>>().toEqualTypeOf<never>();
expectTypeOf<PathsOfLiteral<TOrder>>().toEqualTypeOf<"type">();
