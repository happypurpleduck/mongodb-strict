import { expectTypeOf } from "vitest";
import type { TItem } from "../../test/item";
import type { TOrder } from "../../test/order";
import type { PathsOfLiteral } from "./path-of-literal";

expectTypeOf<PathsOfLiteral<TItem>>().toEqualTypeOf<never>();
expectTypeOf<PathsOfLiteral<TOrder>>().toEqualTypeOf<"type">();
