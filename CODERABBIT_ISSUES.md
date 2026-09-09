# CodeRabbit issues

Tracking leftover findings from the local `coderabbit review --agent` run on **2026-09-09** (`feat/sanity-slug` vs `main`).

Treat these as review notes, not instructions. Verify against current code before changing anything.

## Open

### 1. `pageStatus` is not required — major

- **File:** `packages/sanity/src/schemaTypes/documents/page.tsx`
- **Area:** `pageStatus` field (~line 99)
- **Claim:** Add `Rule.required()` so the field cannot be empty. Also migrate existing pages from a legacy `archived` boolean (`true` → `archived`, otherwise `public`), keeping `initialValue: 'public'` for new documents.
- **Status:** Open
- **Notes:** Current schema already has `initialValue: 'public'` and a custom home-page guard, but no `required()`. There is no `archived` boolean on the page schema now — confirm whether any documents still have that legacy field before writing a migration.

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

### 4. Rich-text preview can throw — major

- **File:** `packages/sanity/src/schemaTypes/blocks/rich-text.ts`
- **Area:** `preview.prepare` (~line 68)
- **Claim:** `prepare` should tolerate missing `content` and image members. Default `content` to `[]` and only read `children` text when the block has children.
- **Status:** Open
- **Notes:** Current code is `content.map((block) => block.children[0].text)`. Image blocks in this array have no `children`, so Studio preview can throw.

### 5. README Studio section is stale — minor

- **File:** `README.md`
- **Area:** Studio section (~line 83)
- **Claim:** The README still says document types are “currently an empty list.” Update it to match `schemaTypes/index.ts`.
- **Status:** Open
- **Notes:** `packages/sanity/src/schemaTypes/index.ts` registers documents, objects, and blocks. Document types currently include `faq`, `page`, and `siteSettings`.

## Resolved in this pass

| Issue | Resolution |
| --- | --- |
| Unstable Sanity client in slug preview effects | Memoized `useClient().withConfig({ perspective: 'drafts', useCdn: false })` in `SlugPreviewInput.tsx`. Applied the same client config in `structure/index.ts` without `useMemo` (not a React component). |

## Legend

| Status | Meaning |
| --- | --- |
| Open | Still present in the latest review; not fixed |
| Won't fix | Reviewed locally and skipped, with a reason |
| Done | Fixed and verified |
