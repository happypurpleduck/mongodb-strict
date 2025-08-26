# Agent Guidelines for typed-mongo

## Build/Lint/Test Commands
- **Type check**: `npm run check` (tsc --noEmit)
- **Run all tests**: `npm run test` (vitest --typecheck)
- **Run single test**: `vitest --typecheck path/to/test.ts`
- **Lint and fix**: `npm run lint` (eslint src --fix)

## Code Style Guidelines

### Imports
- Use `import type` for type-only imports
- Include `.ts` extension in relative imports
- Group external library imports first, then internal imports

### Formatting
- **Indentation**: Tab characters (not spaces)
- **Quotes**: Double quotes for strings
- **Semicolons**: Required at end of statements
- **Line endings**: LF (Unix style)
- **Trailing whitespace**: Trim automatically

### Types & Naming
- **TypeScript**: Strict mode enabled with comprehensive type checking
- **Classes**: PascalCase (e.g., `TypedCollection`)
- **Variables/Functions**: camelCase
- **Type parameters**: UPPER_CASE (e.g., `T`, `TFilter`)
- **Generics**: Heavily used for type-safe MongoDB operations

### Error Handling
- Use TODO comments for incomplete features
- `@ts-ignore` acceptable for complex type workarounds
- Avoid `any` types (Biome rule disabled but prefer strict typing)

### Architecture
- Focus on type-safe MongoDB operations
- Extensive use of conditional types and mapped types
- Separate concerns: core logic in `src/`, types in `src/types/`