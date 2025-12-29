import type { PathsOfLiteral } from "../types/path-of-literal.ts";
import type { TItem } from "./item.ts";
import type { TOrder } from "./order.ts";
import { expectTypeOf } from "vitest";

expectTypeOf<PathsOfLiteral<TItem>>().toEqualTypeOf<"x" | "y" | "location.type">();
expectTypeOf<PathsOfLiteral<TOrder>>().toEqualTypeOf<"type">();
