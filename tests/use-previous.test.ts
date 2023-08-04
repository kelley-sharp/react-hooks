import { usePrevious } from "../src";
import { renderHook, act } from "@testing-library/react";
import { useState } from "react";

describe("usePrevious", () => {
  it("stores the previous value", () => {
    // `useStateResult.current` -> `[count, setCount]`
    const { result: useStateResult } = renderHook(() => useState(0));

    const { result, rerender } = renderHook(() =>
      usePrevious(useStateResult.current[0])
    );

    // on the first render, the return value of `usePrevious` should be the same as the `useState` value
    expect(result.current).toBe(0);

    // then increment the counter and rerender; `usePrevious` return value should be previous value of `useState`
    act(() => {
      // setCount(1)
      useStateResult.current[1](1);
    });
    expect(useStateResult.current[0]).toBe(1);
    rerender();
    expect(result.current).toBe(0);

    // increment the counter to 2; previous value should be 1
    act(() => {
      // setCount(2)
      useStateResult.current[1](2);
    });
    expect(useStateResult.current[0]).toBe(2);
    rerender();
    expect(result.current).toBe(1);
  });
});
