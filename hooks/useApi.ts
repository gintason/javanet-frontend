"use client";

import { useState, useCallback, useEffect, useRef } from 'react';
import api from '@/utils/api';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  autoFetch?: boolean;
  params?: any;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (params?: any) => Promise<T>;
  reset: () => void;
  refetch: () => Promise<void>;
}

export function useApi<T = any>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  options: UseApiOptions<T> = {}
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use refs for options to avoid recreating execute function
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const execute = useCallback(async (execParams?: any): Promise<T> => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      const requestParams = execParams || optionsRef.current.params;
      
      switch (method) {
        case 'GET':
          response = await api.get(endpoint, { params: requestParams });
          break;
        case 'POST':
          response = await api.post(endpoint, requestParams);
          break;
        case 'PUT':
          response = await api.put(endpoint, requestParams);
          break;
        case 'DELETE':
          response = await api.delete(endpoint, { data: requestParams });
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      
      console.log(`API Success: ${method} ${endpoint}`, response.data);
      
      setData(response.data);
      if (optionsRef.current.onSuccess) {
        optionsRef.current.onSuccess(response.data);
      }
      
      return response.data;
    } catch (err: any) {
      console.error(`API Error: ${method} ${endpoint}`, err);
      
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.detail || 
                          err.response?.data?.message ||
                          err.message || 
                          'An error occurred';
      setError(errorMessage);
      
      if (optionsRef.current.onError) {
        optionsRef.current.onError(err);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, method]); // Removed options from dependencies

  const refetch = useCallback(async () => {
    await execute();
  }, [execute]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  // Auto-fetch on component mount for GET requests
  useEffect(() => {
    if ((optionsRef.current.autoFetch === undefined || optionsRef.current.autoFetch) && method === 'GET') {
      execute();
    }
    // We'll use endpoint and method as dependencies instead of execute
    // This ensures autoFetch runs when endpoint or method changes
  }, [endpoint, method]); // Removed execute from dependencies

  return {
    data,
    loading,
    error,
    execute,
    reset,
    refetch,
  };
}