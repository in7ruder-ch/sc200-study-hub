# Content localization

English source files remain the canonical content and structural definition. Locale overlays contain only translated text and are joined to the source through stable IDs.

## Fallback behavior

Every translated field is optional. When a Spanish entry or field is missing, the resolver in `content.ts` returns the original English value. IDs, ordering, ratings, URLs, product names, progress keys, and references always come from the canonical source.

## Spanish overlays

- `es/learning-paths.ts` keys paths, modules, and units by their existing IDs.
- `es/exam-blueprint.ts` keys domains, groups, and objectives by their existing IDs.
- `es/practice-labs.ts` keys labs, stages, evidence, and options by their existing IDs.
- `es/remediation-packs.ts` keys packs by blueprint objective ID and resources by URL.

Do not copy structural fields into an overlay. Translate only human-readable text. Keep commands, KQL, hashes, URLs, identifiers, event names, and official Microsoft product names unchanged unless the official localized product name differs.

## Translation workflow

1. Add a complete, reviewable content slice such as one lab or one module.
2. Keep every source ID unchanged.
3. Verify both `/en` and `/es`.
4. Confirm that progress and deep links still resolve to the same IDs.
5. Run `npm run lint` and `npm run build` before committing.

