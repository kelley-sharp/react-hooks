import { useMemo } from "react";
import { usePrevious } from "./use-previous";

/**
 * This hook will take any value and determine whether it has changed
 * since the last render. It returns `true` if the value is different.
 * For objects, it uses the `JSON.stringify` method for simple comparisons.
 */
export function useDidChange(val: unknown): boolean {
  const isObj = useMemo(() => isObjectLike(val), [val]);

  // https://www.samanthaming.com/tidbits/33-how-to-compare-2-objects/
  const memoizedVal = useMemo(
    () => (isObj ? JSON.stringify(val) : val),
    [isObj, val]
  );
  const prevMemoizedVal = usePrevious(memoizedVal);

  const didChange = memoizedVal !== prevMemoizedVal;

  return didChange;
}

/**
 * This will check if the thing we're comparing is an object or array
 * it's similar to lodash's method of the same name
 * source: https://stackoverflow.com/a/8511350/5920970
 */
function isObjectLike(it: any) {
  return typeof it === "object" && it !== null;
}
