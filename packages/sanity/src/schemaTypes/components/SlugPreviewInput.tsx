import { useEffect, useState } from "react";

import { Card, Stack, Text } from "@sanity/ui";
import { SlugInputProps, useClient, useFormValue } from "sanity";

const SITE_URL = "https://larotonde.cafe";

type PageStatus = "public" | "home" | "archived";

export function SlugPreviewInput(props: SlugInputProps) {
  const { renderDefault } = props;

  const client = useClient({ apiVersion: "2026-09-01" });

  const slugValue = useFormValue(["slug", "current"]) as string | undefined;

  const parentRef = useFormValue(["parent", "_ref"]) as string | undefined;

  const pageStatus = useFormValue(["pageStatus"]) as PageStatus | undefined;

  const documentId = useFormValue(["_id"]) as string | undefined;

  const [parentSlug, setParentSlug] = useState<string | null>(null);

  const [isSelectedHomePage, setIsSelectedHomePage] = useState<boolean | null>(
    null,
  );

  /**
   * Sanity uses the `drafts.` prefix for documents currently being edited
   * as drafts. A published document has the normal document ID.
   */
  const isDraft = documentId?.startsWith("drafts.") ?? false;

  const isPublic = pageStatus === "public";
  const isHome = pageStatus === "home";
  const isArchived = pageStatus === "archived";

  /**
   * Resolve the parent page's slug.
   *
   * When no parent is selected, `parentSlug` is ignored and the route
   * is derived directly from the current page's slug.
   */
  useEffect(() => {
    if (!parentRef) return;

    let cancelled = false;

    client
      .fetch<string | null>(`*[_id == $id][0].slug.current`, { id: parentRef })
      .then((slug) => {
        if (!cancelled) {
          setParentSlug(slug);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setParentSlug(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [parentRef, client]);

  /**
   * Determine whether this page is currently selected as the site's
   * homepage in Site Settings.
   *
   * Check both the published and draft versions of Site Settings so
   * the editor gets immediate feedback while editing Site Settings.
   */
  useEffect(() => {
    if (!documentId || !isHome) return;

    const pageId = documentId.replace(/^drafts\./, "");

    let cancelled = false;

    client
      .fetch<boolean>(
        `count(
          *[
            _id in ["siteSettings", "drafts.siteSettings"] &&
            homePage._ref in [$pageId, $draftPageId]
          ]
        ) > 0`,
        {
          pageId,
          draftPageId: `drafts.${pageId}`,
        },
      )
      .then((selected) => {
        if (!cancelled) {
          setIsSelectedHomePage(selected);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsSelectedHomePage(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [client, documentId, isHome]);

  /**
   * A parent is only relevant when one is currently selected.
   * This prevents stale parent state from affecting a page after
   * its parent has been removed.
   */
  const effectiveParentSlug = parentRef ? parentSlug : null;

  const path = slugValue
    ? effectiveParentSlug
      ? `/${effectiveParentSlug}/${slugValue}`
      : `/${slugValue}`
    : null;

  /**
   * A production URL should only be shown when the page is:
   *
   * 1. marked Public
   * 2. published
   */
  const showLiveLink = isPublic && !isDraft;

  if (!path) {
    return <Stack gap={3}>{renderDefault(props)}</Stack>;
  }

  return (
    <Stack gap={3}>
      {renderDefault(props)}

      <Card padding={3} radius={2} tone="primary" border>
        <Text size={1} muted>
          {showLiveLink && (
            <>
              Page is live at <code>{`"${path}"`}</code>
              <br />
              <span style={{ opacity: 0.7 }}>
                {SITE_URL}
                {path}{" "}
                <a
                  href={`${SITE_URL}${path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "underline",
                    color: "inherit",
                    opacity: 0.7,
                  }}
                >
                  [link]
                </a>
              </span>
            </>
          )}

          {isPublic && isDraft && (
            <>
              When published, this page will be accessible at{" "}
              <code>{`"${path}"`}</code>
            </>
          )}

          {isHome && isSelectedHomePage === true && (
            <>
              This page is the current <strong>Home Page</strong> and is
              displayed at <code>"/"</code>.
              <br />
              <span style={{ opacity: 0.7 }}>
                {SITE_URL}/{" "}
                <a
                  href={`${SITE_URL}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "underline",
                    color: "inherit",
                    opacity: 0.7,
                  }}
                >
                  [link]
                </a>
              </span>
            </>
          )}

          {isHome && isSelectedHomePage === false && (
            <>
              This page is marked as a <strong>Home Page</strong>, but it is not
              currently assigned as the site's landing page.
              Select it as the default Home Page in Site Settings to display it
              at <code>"/"</code> and make it the first page visitors see when they visit the website.
              <br />
              <br />
              <strong>Note:</strong> This page will not be accessible at{" "}
              <code>{`"${path}"`}</code>.
            </>
          )}

          {isArchived && (
            <>
              This page is <strong>archived</strong> and is not publicly
              accessible at <code>{`"${path}"`}</code>.
            </>
          )}
        </Text>
      </Card>
    </Stack>
  );
}
