import type { Paths } from "../types/path.ts";
import { attest } from "@ark/attest";
import { describe, it } from "vitest";

describe("paths type", () => {
	it("generates paths for simple object", () => {
		attest({} as Paths<{ a: number; b: string }>)
			.type
			.toString
			.snap("\"a\" | \"b\"");
	});

	it("generates paths for nested object", () => {
		attest({} as Paths<{ a: { b: { c: boolean } } }>)
			.type
			.toString
			.snap("\"a.b\" | \"a\" | \"a.b.c\"");
	});

	it("generates paths for array", () => {
		attest({} as Paths<string[]>)
			.type
			.toString
			.snap(`  | string
  | number
  | (() => string)
  | ((pos: number) => string)
  | ((index: number) => number)
  | ((...strings: string[]) => string)
  | ((
      searchString: string,
      position?: number | undefined
    ) => number)
  | ((
      searchString: string,
      position?: number | undefined
    ) => number)
  | {
      (that: string): number
      (
        that: string,
        locales?: string | string[] | undefined,
        options?: CollatorOptions | undefined
      ): number
      (
        that: string,
        locales?: LocalesArgument,
        options?: CollatorOptions | undefined
      ): number
    }
  | {
      (regexp: string | RegExp): RegExpMatchArray | null
      (matcher: {
        [Symbol.match](
          string: string
        ): RegExpMatchArray | null
      }): RegExpMatchArray | null
    }
  | {
      (
        searchValue: string | RegExp,
        replaceValue: string
      ): string
      (
        searchValue: string | RegExp,
        replacer: (
          substring: string,
          ...args: cyclic[]
        ) => string
      ): string
      (
        searchValue: {
          [Symbol.replace](
            string: string,
            replaceValue: string
          ): string
        },
        replaceValue: string
      ): string
      (
        searchValue: {
          [Symbol.replace](
            string: string,
            replacer: (
              substring: string,
              ...args: cyclic[]
            ) => string
          ): string
        },
        replacer: (
          substring: string,
          ...args: cyclic[]
        ) => string
      ): string
    }
  | {
      (regexp: string | RegExp): number
      (searcher: {
        [Symbol.search](string: string): number
      }): number
    }
  | ((
      start?: number | undefined,
      end?: number | undefined
    ) => string)
  | {
      (
        separator: string | RegExp,
        limit?: number | undefined
      ): string[]
      (
        splitter: {
          [Symbol.split](
            string: string,
            limit?: number | undefined
          ): string[]
        },
        limit?: number | undefined
      ): string[]
    }
  | ((start: number, end?: number | undefined) => string)
  | (() => string)
  | {
      (locales?: string | string[] | undefined): string
      (locales?: LocalesArgument): string
    }
  | (() => string)
  | {
      (locales?: string | string[] | undefined): string
      (locales?: LocalesArgument): string
    }
  | (() => string)
  | ((from: number, length?: number | undefined) => string)
  | (() => string)
  | ((pos: number) => number | undefined)
  | ((
      searchString: string,
      position?: number | undefined
    ) => boolean)
  | ((
      searchString: string,
      endPosition?: number | undefined
    ) => boolean)
  | {
      (form: "NFC" | "NFD" | "NFKC" | "NFKD"): string
      (form?: string | undefined): string
    }
  | ((count: number) => string)
  | ((
      searchString: string,
      position?: number | undefined
    ) => boolean)
  | ((name: string) => string)
  | (() => string)
  | (() => string)
  | (() => string)
  | (() => string)
  | ((color: string) => string)
  | { (size: number): string; (size: string): string }
  | (() => string)
  | ((url: string) => string)
  | (() => string)
  | (() => string)
  | (() => string)
  | (() => string)
  | ((
      maxLength: number,
      fillString?: string | undefined
    ) => string)
  | ((
      maxLength: number,
      fillString?: string | undefined
    ) => string)
  | (() => string)
  | (() => string)
  | (() => string)
  | (() => string)
  | ((
      regexp: RegExp
    ) => RegExpStringIterator<RegExpExecArray>)
  | {
      (
        searchValue: string | RegExp,
        replaceValue: string
      ): string
      (
        searchValue: string | RegExp,
        replacer: (
          substring: string,
          ...args: cyclic[]
        ) => string
      ): string
    }
  | ((index: number) => string | undefined)
  | (() => boolean)
  | (() => string)
  | (() => StringIterator<string>)`);
	});

	it("handles primitive types", () => {
		attest({} as Paths<string>)
			.type
			.toString
			.snap("never");
	});
});
