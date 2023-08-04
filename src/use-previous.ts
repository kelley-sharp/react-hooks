import { useRef, useEffect } from "react";

/**
 * Cache and return previous state value. This is typically useful if you want
 *  to trigger an effect based on comparing a previous state value.
 * @param value the value to cache
 * @returns the previous state of `value`
 */
export function usePrevious<T>(value: T): T {
  const ref = useRef<T>(value);
  useEffect(() => {
    // after each render (note the lack of dependency array), update the ref
    ref.current = value;
  });
  return ref.current;
}
