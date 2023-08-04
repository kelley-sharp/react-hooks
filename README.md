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
