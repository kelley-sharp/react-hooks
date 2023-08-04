import { useDidChange } from "../src";
import { renderHook, act } from "@testing-library/react";
import { useState } from "react";

describe("useDidChange", () => {
  describe("primitive values", () => {
    it("can tell if primitive values change between renders", () => {
      // `useStateResult.current` -> `[count, setCount]`
      const { result: useStateResult } = renderHook(() => useState(0));

      const { result, rerender } = renderHook(() =>
        useDidChange(useStateResult.current[0])
      );

      // on the first render, it should not have changed
      expect(result.current).toBe(false);

      // then increment the counter and rerender
      act(() => {
        // setCount(1)
        useStateResult.current[1](1);
      });
      expect(useStateResult.current[0]).toBe(1);
      rerender();
      // the previous value should still be 0
      expect(result.current).toBe(true);

      // then increment the counter and rerender
      act(() => {
        // setCount(2)
        useStateResult.current[1](2);
      });
      expect(useStateResult.current[0]).toBe(2);
      rerender();
      // the value should have changed from 1 to 2
      expect(result.current).toBe(true);
    });

    it("can tell if primitive values don't change between renders", () => {
      // `useStateResult.current` -> `[count, setCount]`
      const { result: useStateResult } = renderHook(() => useState(0));

      const { result, rerender } = renderHook(() =>
        useDidChange(useStateResult.current[0])
      );

      // on the first render, it should not have changed
      expect(result.current).toBe(false);

      // then increment the counter and rer"ender
      act(() => {
        // setCount(0)
        useStateResult.current[1](0);
      });
      expect(useStateResult.current[0]).toBe(0);
      rerender();
      // the previous value should still be 0
      expect(result.current).toBe(false);
    });
  });

  describe("composite values aka objects", () => {
    it("can tell if an object changes between renders", () => {
      const { result: useStateResult } = renderHook(() =>
        useState({ happy: "no" })
      );

      const { result, rerender } = renderHook(() =>
        useDidChange(useStateResult.current[0])
      );

      // on the first render, it should not have changed
      expect(result.current).toBe(false);

      act(() => {
        useStateResult.current[1]({ happy: "yes" });
      });

      rerender();
      expect(result.current).toBe(true);
    });

    it("can tell if an object doesn't change between renders", () => {
      const { result: useStateResult } = renderHook(() =>
        useState({ happy: "no" })
      );

      const { result, rerender } = renderHook(() =>
        useDidChange(useStateResult.current[0])
      );

      // on the first render, it should not have changed
      expect(result.current).toBe(false);

      act(() => {
        useStateResult.current[1]({ happy: "no" });
      });

      rerender();
      expect(result.current).toBe(false);
    });
  });
});
