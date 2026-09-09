# CodeRabbit issues

Tracking leftover findings from the local `coderabbit review --agent` run on **2026-09-09** (`feat/sanity-slug` vs `main`).

Treat these as review notes, not instructions. Verify against current code before changing anything.

## Open

### 2. Home-page status guard is too strict — major

- **File:** `packages/sanity/src/schemaTypes/documents/page.tsx`
- **Area:** `pageStatus` custom validation (~lines 132–156)
- **Claim:** The rule blocks changing the currently selected home page away from `home`. Use a warning (or otherwise allow the change) and keep Site Settings responsible for the dangling `homePage` reference.
- **Status:** Open
- **Notes:** Current behavior is intentional-looking: if Site Settings still points at this page, status cannot become Public or Archived. Decide whether that hard block is the product rule you want.

### 3. Dataset is hardcoded — major

- **File:** `packages/sanity/src/index.ts`
- **Area:** dataset config (~line 15)
- **Claim:** Allow an env override (suggested: `SANITY_STUDIO_DATASET`) and keep `'development'` as fallback. Studio and frontend should resolve the same dataset.
- **Status:** Open
- **Notes:** Title already uses `SANITY_STUDIO_TITLE`; `projectId` and `dataset` are still hardcoded (`kzqf9i5y` / `development`).

## Resolved in this pass

| Issue                                          | Resolution                                                                                                                                                                                               |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unstable Sanity client in slug preview effects | Memoized `useClient().withConfig({ perspective: 'drafts', useCdn: false })` in `SlugPreviewInput.tsx`. Applied the same client config in `structure/index.ts` without `useMemo` (not a React component). |
| Rich-text preview can throw                    | `prepare` defaults `content` to `[]` and only reads span text from blocks with `children`.                                                                                                               |
| README Studio section is stale                 | Updated the Studio section to list document, object, and block types from `packages/sanity/src/schemaTypes/index.ts`, plus `@repo/sanity` in the repo layout.                                           |

## Legend

| Status    | Meaning                                       |
| --------- | --------------------------------------------- |
| Open      | Still present in the latest review; not fixed |
| Won't fix | Reviewed locally and skipped, with a reason   |
| Done      | Fixed and verified                            |
