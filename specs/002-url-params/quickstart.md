# Quickstart: Validating Shareable URL Parameters

Prerequisites: repo dependencies installed (`npm install`).

## 1. Start the app

```bash
npm run dev
```

Open http://localhost:3000 in a browser; it should redirect to an instrument page (e.g. `/piano`).

## 2. Verify the URL updates as you change settings (FR-006, SC-002)

1. On any instrument page, change the scale, root, color mode toggle, flat/sharp toggle, and number-display toggle one at a time using the existing UI controls.
2. After each change, check the browser's address bar — it should update immediately to include the corresponding query parameter from the [contract](contracts/url-query-params.md), without a page reload and without adding a new back-button history entry (test with the browser back button — it should not step through every toggle).

## 3. Verify a full link reproduces the exact configuration (FR-007, SC-001, SC-003)

1. Configure a distinctive combination (e.g. non-default scale/root, monochrome, flats on, numbers on) and copy the resulting URL.
2. Open that URL in a new private/incognito window (so no `localStorage` state carries over).
3. Confirm the page loads with the exact same scale, root, color mode, flat display, and number display as the source tab — see example URLs in the [contract](contracts/url-query-params.md#example-urls).

## 4. Verify partial links fall back correctly (FR-009)

1. Manually edit the URL to include only `root` and `flats` (remove `scale`, `mode`, `color`, `numbers`).
2. Reload the page. Confirm root and flat display match the URL, while scale, color mode, and number display fall back to the current/default values.

## 5. Verify invalid values are ignored gracefully (FR-008, SC-005)

1. Manually edit the URL to set `scale=not-a-real-scale` while leaving `root=F` valid.
2. Reload the page. Confirm the page loads without errors, `root` is applied as `F`, and `scale` falls back to the default/current value.

## 6. Verify behavior is consistent across instruments (FR-011)

1. With a distinctive configuration active and reflected in the URL, switch to a different instrument page.
2. Confirm the five settings remain the same and the URL continues to reflect them on the new route.
