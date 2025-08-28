# Gallery Plus

## Performance Notes

### Debounced Search Implementation

The search functionality uses an optimized debouncing pattern for optimal performance:

#### Performance Benefits
- **Function Creation Eliminated**: `debounce()` is called only once when module loads, not on every render
- **Stable Function Reference**: Same function reference reused across all renders
- **React Optimization**: React can properly memoize and optimize rendering
- **Memory Efficiency**: Only one debounced function instance exists
- **Consistent Timeout Management**: Reliable debounce behavior

#### Why This Pattern Works
- **Outside Component**: Prevents function recreation on each render
- **useCallback**: Allows future dependency additions while maintaining performance
- **Closure Preservation**: Debounced function captures and uses whatever logic you provide

#### Future API Integration
This structure is perfect for API calls - simply replace the console.log with your API logic. The debounced function will handle the timing while your API logic handles the data fetching.

## Getting started

Run the install command

```
pnpm install
```

Then in a terminal run the backend server

```
pnpm dev-server
```

In another terminal run the frontend server

```
pnpm dev
```
