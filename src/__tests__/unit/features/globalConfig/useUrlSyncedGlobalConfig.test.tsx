/**
 * Spec: specs/002-url-params/spec.md — FR-006, FR-007, FR-008, FR-009
 * Also covers T012 (US2 — URL precedence over localStorage-restored state)
 * and T016 (US3 — partial/invalid query strings).
 */

import React from "react";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createTestStore } from "../../../test-utils";
import { useUrlSyncedGlobalConfig } from "@/features/globalConfig/useUrlSyncedGlobalConfig";
import { setScale } from "@/features/globalConfig/globalConfigSlice";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockedUseRouter = useRouter as jest.Mock;
const mockedUsePathname = usePathname as jest.Mock;
const mockedUseSearchParams = useSearchParams as jest.Mock;

function renderHookWithStore(
  store: ReturnType<typeof createTestStore>,
  searchParams: URLSearchParams,
  pathname = "/piano"
) {
  const replace = jest.fn();
  const push = jest.fn();
  mockedUseRouter.mockReturnValue({ replace, push });
  mockedUsePathname.mockReturnValue(pathname);
  mockedUseSearchParams.mockReturnValue(searchParams);

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  const view = renderHook(() => useUrlSyncedGlobalConfig(), { wrapper });
  return { ...view, replace, push, store };
}

describe("useUrlSyncedGlobalConfig", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("applies valid params found in the URL to the store on initial render", () => {
    const store = createTestStore();
    const params = new URLSearchParams({ root: "D", scale: "major", color: "0" });

    renderHookWithStore(store, params);

    const state = store.getState().globalConfig;
    expect(state.scale.root).toBe("D");
    expect(state.scale.type).toBe("major");
    expect(state.highlightRoots).toBe(false);
  });

  it("mirrors a store change back into the URL via router.replace, not push", () => {
    const store = createTestStore();
    const { replace, push } = renderHookWithStore(store, new URLSearchParams());

    act(() => {
      store.dispatch(setScale({ root: "G", type: "minor" }));
    });

    expect(replace).toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
    const [url, options] = replace.mock.calls[replace.mock.calls.length - 1];
    expect(url).toContain("root=G");
    expect(url).toContain("scale=minor");
    expect(options).toEqual({ scroll: false });
  });

  it("US2: URL-provided values take precedence over pre-existing (e.g. localStorage-restored) store values", () => {
    const store = createTestStore();
    // Simulate a prior localStorage restore that already set a different scale.
    store.dispatch(setScale({ root: "F", type: "blues" }));

    const params = new URLSearchParams({ root: "A", scale: "dorian", mode: "dorian" });
    renderHookWithStore(store, params);

    const state = store.getState().globalConfig;
    expect(state.scale).toEqual({ root: "A", type: "dorian", mode: "dorian" });
  });

  it("US3: applies only the valid/present keys from a partial query string", () => {
    const store = createTestStore();
    const params = new URLSearchParams({ root: "A#", flats: "1" });

    renderHookWithStore(store, params);

    const state = store.getState().globalConfig;
    expect(state.scale.root).toBe("A#");
    expect(state.showFlats).toBe(true);
    // Untouched settings keep their existing/default values.
    expect(state.scale.type).toBe(store.getState().globalConfig.scale.type);
    expect(state.highlightRoots).toBe(true); // default
  });

  it("US3: ignores an invalid value in a query string without throwing or affecting other settings", () => {
    const store = createTestStore();
    const params = new URLSearchParams({ root: "F", scale: "not-a-real-scale" });

    expect(() => renderHookWithStore(store, params)).not.toThrow();

    const state = store.getState().globalConfig;
    expect(state.scale.root).toBe("F");
    expect(state.scale.type).toBe("major"); // default, invalid value ignored
  });
});
