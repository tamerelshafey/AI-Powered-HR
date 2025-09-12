
import { useState, useMemo, useEffect } from 'react';

// Debounce hook to delay processing of the search term
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * A custom hook to filter an array of items based on a search term.
 * Includes debouncing to improve performance.
 * @param items The array of items to search through.
 * @param searchKeys The keys of the object to search against.
 * @param debounceDelay The delay in milliseconds for debouncing.
 * @returns An object containing the search term, a setter for it, and the filtered items.
 */
export function useSearch<T>(
  items: T[],
  searchKeys: (keyof T)[],
  debounceDelay: number = 300
) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

  const filteredItems = useMemo(() => {
    if (!debouncedSearchTerm) {
      return items;
    }

    const lowercasedFilter = debouncedSearchTerm.toLowerCase();

    return items.filter(item => {
      return searchKeys.some(key => {
        const value = item[key];
        // Ensure value is a string before calling toLowerCase
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowercasedFilter);
        }
        return false;
      });
    });
  }, [items, debouncedSearchTerm, searchKeys]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
}
