import { useState, useEffect, useCallback, useRef } from 'react';

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  debounceMs: number = 300
): [T, (value: T | ((prev: T) => T)) => void] {
  // Initialize state with default value to prevent hydration mismatch
  const [storedValue, setStoredValue] = useState<T>(defaultValue);
  const [isHydrated, setIsHydrated] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  // Load from localStorage after component mounts (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsHydrated(true);
      return;
    }

    try {
      const item = localStorage.getItem(key);
      if (item !== null && item !== 'undefined') {
        const parsed = JSON.parse(item);
        // Validate that parsed value is of expected type
        if (parsed !== null && parsed !== undefined) {
          setStoredValue(parsed);
        }
      }
    } catch (error) {
      console.warn(`Failed to load ${key} from localStorage:`, error);
      // Attempt to clear corrupted data
      try {
        localStorage.removeItem(key);
      } catch (clearError) {
        console.warn(`Failed to clear corrupted localStorage key ${key}:`, clearError);
      }
    } finally {
      setIsHydrated(true);
    }
  }, [key]);

  // Debounced save to localStorage
  const debouncedSave = useCallback((value: T) => {
    if (typeof window === 'undefined' || !isHydrated) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.warn(`Failed to save ${key} to localStorage:`, error);
      }
    }, debounceMs);
  }, [key, debounceMs, isHydrated]);

  // Update state and trigger debounced save
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const newValue = value instanceof Function ? value(prev) : value;
      debouncedSave(newValue);
      return newValue;
    });
  }, [debouncedSave]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [storedValue, setValue];
}

// Specialized hook for boolean values with string storage
export function useLocalStorageBoolean(
  key: string,
  defaultValue: boolean,
  debounceMs: number = 300
): [boolean, (value: boolean | ((prev: boolean) => boolean)) => void] {
  const [storedValue, setStoredValue] = useState<boolean>(defaultValue);
  const [isHydrated, setIsHydrated] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(item === 'true');
      }
    } catch (error) {
      console.warn(`Failed to load ${key} from localStorage:`, error);
    } finally {
      setIsHydrated(true);
    }
  }, [key]);

  const debouncedSave = useCallback((value: boolean) => {
    if (typeof window === 'undefined' || !isHydrated) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, value.toString());
      } catch (error) {
        console.warn(`Failed to save ${key} to localStorage:`, error);
      }
    }, debounceMs);
  }, [key, debounceMs, isHydrated]);

  const setValue = useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    setStoredValue(prev => {
      const newValue = value instanceof Function ? value(prev) : value;
      debouncedSave(newValue);
      return newValue;
    });
  }, [debouncedSave]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [storedValue, setValue];
}

// Specialized hook for numeric values with validation
export function useLocalStorageNumber(
  key: string,
  defaultValue: number,
  min?: number,
  max?: number,
  debounceMs: number = 300
): [number, (value: number | ((prev: number) => number)) => void] {
  const [storedValue, setStoredValue] = useState<number>(defaultValue);
  const [isHydrated, setIsHydrated] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        const parsed = parseInt(item, 10);
        if (!isNaN(parsed)) {
          // Apply validation if min/max provided
          let validatedValue = parsed;
          if (min !== undefined && parsed < min) validatedValue = defaultValue;
          if (max !== undefined && parsed > max) validatedValue = defaultValue;
          setStoredValue(validatedValue);
        }
      }
    } catch (error) {
      console.warn(`Failed to load ${key} from localStorage:`, error);
    } finally {
      setIsHydrated(true);
    }
  }, [key, defaultValue, min, max]);

  const debouncedSave = useCallback((value: number) => {
    if (typeof window === 'undefined' || !isHydrated) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, value.toString());
      } catch (error) {
        console.warn(`Failed to save ${key} to localStorage:`, error);
      }
    }, debounceMs);
  }, [key, debounceMs, isHydrated]);

  const setValue = useCallback((value: number | ((prev: number) => number)) => {
    setStoredValue(prev => {
      const newValue = value instanceof Function ? value(prev) : value;
      // Apply validation
      let validatedValue = newValue;
      if (min !== undefined && newValue < min) validatedValue = prev;
      if (max !== undefined && newValue > max) validatedValue = prev;
      
      debouncedSave(validatedValue);
      return validatedValue;
    });
  }, [debouncedSave, min, max]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [storedValue, setValue];
}