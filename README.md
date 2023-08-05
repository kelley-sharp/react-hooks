# React Hooks

This package contains a set of my favorite custom React hooks that I use on nearly every project. The only dependency is React.

## Hooks

### usePrevious

This is a hook that caches the value of _anything_ you want on the previous render. It is helpful to determine when something changed what the exact value was on the most recent render.

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  useEffect(() => {
    if (count - prevCount > 1) {
      console.log("You just jumped the count by more than 1 at a time!");
    }
  }, [count, prevCount]);
}
```

### useDidChange

This hook will take any value and determine whether it has changed since the last render. It returns `true` if the value is different.
For objects, it uses the `JSON.stringify` method for simple comparisons.

```tsx
function ToggleSwitch() {
  const [toggled, setToggled] = useState(false);
  const wasToggled = useDidChange(toggled);

  useEffect(() => {
    if (wasToggled){
      console.log("the switch was toggled between the previous and current render");
    }
  }, [toggled, wasToggled]);
}
```
