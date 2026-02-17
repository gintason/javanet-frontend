// hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import api from '@/utils/api';
import { API_ENDPOINTS } from '@/utils/constants';
import { User, AuthResponse } from '@/types';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  isServerConnected: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isServerConnected, setIsServerConnected] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    
    const checkLoggedIn = async () => {
      if (typeof window === 'undefined') {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          if (isMounted) setLoading(false);
          return;
        }
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        try {
          // FIXED: Use the correct endpoint from constants
          const response = await api.get(API_ENDPOINTS.CHECK_AUTH, {
            signal: controller.signal
          });
          
          if (isMounted) {
            if (response.data?.authenticated) {
              setUser(response.data.user);
              setIsServerConnected(true);
              setError(null);
            } else {
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              localStorage.removeItem('user');
              setUser(null);
              setIsServerConnected(true);
            }
          }
        } catch (err: any) {
          if (!isMounted) return;
          
          if (err.response?.status === 404) {
            console.error('Endpoint not found. Check your API_URL configuration.');
            setIsServerConnected(false);
            setError('API endpoint not found. Please check backend configuration.');
          } else if (!err.response) {
            console.warn('⚠️ Backend server is not responding at https://www.javanetict.com');
            setIsServerConnected(false);
            setError('Backend server is offline. Running in local mode.');
            
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
              try {
                setUser(JSON.parse(storedUser));
              } catch (e) {
                console.error('Failed to parse stored user');
              }
            }
          } else if (err.response?.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            setUser(null);
            setIsServerConnected(true);
          }
        } finally {
          clearTimeout(timeoutId);
          if (isMounted) setLoading(false);
        }
      } catch (outerError) {
        if (isMounted) {
          console.error('Unexpected error in auth check:', outerError);
          setLoading(false);
        }
      }
    };

    checkLoggedIn();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    if (typeof window === 'undefined') return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post<AuthResponse>(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setUser(response.data.user);
      setIsServerConnected(true);
      setError(null);
    } catch (err: any) {
      let errorMessage = 'Login failed. Please check your credentials.';
      
      if (err.response?.status === 404) {
        errorMessage = 'Login endpoint not found. Please check backend configuration.';
      } else if (!err.response) {
        errorMessage = 'Cannot connect to server. Please ensure backend is running at https://www.javanetict.com';
        setIsServerConnected(false);
      } else {
        errorMessage = err.response?.data?.error || 
                      err.response?.data?.detail || 
                      err.response?.data?.message || 
                      errorMessage;
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: any) => {
    if (typeof window === 'undefined') return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post<AuthResponse>(API_ENDPOINTS.REGISTER, userData);

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setUser(response.data.user);
      setIsServerConnected(true);
      setError(null);
    } catch (err: any) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.response?.status === 404) {
        errorMessage = 'Registration endpoint not found. Please check backend configuration.';
      } else if (!err.response) {
        errorMessage = 'Cannot connect to server. Please ensure backend is running at https://www.javanetict.com';
        setIsServerConnected(false);
      } else {
        errorMessage = err.response?.data?.error || 
                      err.response?.data?.detail || 
                      err.response?.data?.message || 
                      errorMessage;
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    if (typeof window === 'undefined') return;
    
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          await api.post(API_ENDPOINTS.LOGOUT, { refresh: refreshToken });
        } catch (err: any) {
          if (err.response?.status === 404) {
            console.log('Logout endpoint not found - performing local cleanup only');
          } else if (!err.response) {
            console.log('Server unreachable during logout - performing local cleanup');
          } else {
            console.log('Logout API call failed:', err?.message);
          }
        }
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      setUser(null);
      setError(null);
    }
  }, []);

  const checkAuth = useCallback(async (): Promise<boolean> => {
    if (typeof window === 'undefined') return false;
    
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return false;
      
      const response = await api.get(API_ENDPOINTS.CHECK_AUTH);
      
      if (response.data?.authenticated) {
        setUser(response.data.user);
        setIsServerConnected(true);
        setError(null);
        return true;
      }
      
      return false;
    } catch (err: any) {
      if (err.response?.status === 404) {
        console.error('Check-auth endpoint not found. Make sure the backend has this endpoint.');
        setIsServerConnected(false);
      } else if (!err.response) {
        setIsServerConnected(false);
      }
      
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          return true;
        } catch (e) {
          return false;
        }
      }
      return false;
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth,
    isServerConnected,
  };
};