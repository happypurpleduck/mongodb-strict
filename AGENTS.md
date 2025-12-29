# Agent Guidelines for typed-mongo

## Build/Lint/Test Commands
- **Type check**: `bun run check` (tsc --noEmit)
- **Run all tests**: `bun run test` (vitest --typecheck)
- **Run single test**: `vitest --typecheck path/to/test.ts`
- **Lint and fix**: `bun run lint` (eslint src --fix)
- **Run all benchmarks**: `bun run bench` (node bench.ts)
- **Run individual benchmark**: `node src/benchmark/filename.bench.ts`
- **Always test changes**: Run tests after modifications to verify validity

## Code Style Guidelines

### Imports & Formatting
- Use `import type` for type-only imports, include `.ts` extensions
- Group external imports first, then internal imports
- **Indentation**: Tabs, **Quotes**: Double, **Semicolons**: Required
- **Line endings**: LF, **Trim trailing whitespace**: Yes

### Types & Naming
- **TypeScript**: Strict mode with comprehensive type checking
- **Classes**: PascalCase, **Variables/Functions**: camelCase
- **Type parameters**: UPPER_CASE (e.g., `T`, `TFilter`)
- Heavily use generics for type-safe MongoDB operations

### Error Handling & Architecture
- Use TODO comments for incomplete features
- `@ts-ignore` allowed for complex type workarounds, avoid `any` types
- Focus on type-safe MongoDB operations with conditional/mapped types
- Separate concerns: core logic in `src/`, types in `src/types/`

## Development Workflow
- **Benchmarks**: Run benchmarks separately to measure performance impact
- **Testing**: Always run tests after changes to ensure code validity
- **No npm usage**: Use `bun run` for all script execution
