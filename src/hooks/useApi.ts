import { useCallback, useState } from 'react';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const execute = useCallback(async <T>(
  apiCall: () => Promise<T>,
  onSuccess?: (result: T) => void,
  onError?: (error: string) => void
): Promise<T | null> => {
  setLoading(true);
  setError(null);

  const startTime = Date.now();

  try {
    const result = await apiCall();
    onSuccess?.(result);
    return result;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An error occurred';
    setError(errorMessage);
    onError?.(errorMessage);
    return null;
  } finally {
    const elapsed = Date.now() - startTime;
    const remaining = 200 - elapsed;
    if (remaining > 0) {
      await new Promise((resolve) => setTimeout(resolve, remaining));
    }
    setLoading(false);
  }
}, []);


  return {
    loading,
    error,
    execute,
  };
};
