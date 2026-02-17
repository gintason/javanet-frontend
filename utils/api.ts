// utils/api.ts
import axios from 'axios';

const api = axios.create({
  // Use environment variable in production, fallback to custom domain for production
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.javanetict.com',
  headers: { 
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, {
        headers: config.headers,
        data: config.data,
        hasToken: !!config.headers.Authorization
      });
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`, response.data);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (process.env.NODE_ENV === 'development') {
      const status = error.response?.status ?? 'NO_RESPONSE';
      const url = error.config?.url ?? 'UNKNOWN_URL';
      const method = error.config?.method?.toUpperCase() ?? 'UNKNOWN';
      
      console.error(`❌ API Error: [${status}] ${method} ${url}`, {
        data: error.response?.data ?? null,
        message: error.message ?? 'Unknown error',
        isNetworkError: !error.response && error.message === 'Network Error',
        isTimeout: error.code === 'ECONNABORTED',
        isCorsError: error.message?.includes('CORS'),
        fullError: error
      });
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        ...error,
        isNetworkError: true,
        message: 'Unable to connect to the server. Please ensure the backend is running.'
      });
    }

    // Handle 401 Unauthorized errors - token might be expired
    if (error.response?.status === 401 && 
        originalRequest && 
        !originalRequest._retry && 
        typeof window !== 'undefined') {
      
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(
            `${api.defaults.baseURL}/api/auth/token/refresh/`,
            { refresh: refreshToken },
            { 
              headers: { 'Content-Type': 'application/json' },
              timeout: 10000
            }
          );

          const { access } = response.data;
          localStorage.setItem('access_token', access);
          
          api.defaults.headers.common.Authorization = `Bearer ${access}`;
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${access}`;
          }
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Chat API
export const chatApi = {
  sendMessage: async (data: { message: string }) => {
    try {
      const response = await api.post('/api/chatbot/chat/', data);
      return response;
    } catch (error: any) {
      console.error('Chat API error:', error.message || error);
      
      let errorMessage = 'Failed to send message';
      
      if (error.response?.data) {
        const data = error.response.data;
        if (data.detail) errorMessage = data.detail;
        else if (data.error) errorMessage = data.error;
        else if (data.message) errorMessage = data.message;
        else if (typeof data === 'string') errorMessage = data;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  },
  
  getSessions: async () => {
    try {
      const response = await api.get('/api/chatbot/sessions/');
      return response;
    } catch (error: any) {
      console.error('Failed to fetch sessions:', error);
      throw error;
    }
  },
  
  getSession: async (sessionId: string) => {
    try {
      const response = await api.get(`/api/chatbot/sessions/${sessionId}/`);
      return response;
    } catch (error: any) {
      console.error('Failed to fetch session:', error);
      throw error;
    }
  }
};

// User API methods
export const userApi = {
  getProfile: async () => {
    try {
      const response = await api.get('/api/auth/profile/');
      return response;
    } catch (error: any) {
      console.error('Failed to fetch profile:', error);
      throw error;
    }
  },
  
  updateProfile: async (data: any) => {
    try {
      const response = await api.patch('/api/auth/profile/', data);
      return response;
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  },
  
  changePassword: async (data: { old_password: string; new_password: string }) => {
    try {
      const response = await api.post('/auth/password/change/', data);
      return response;
    } catch (error: any) {
      console.error('Failed to change password:', error);
      
      let errorMessage = 'Failed to change password';
      
      if (error.response?.data) {
        const data = error.response.data;
        if (data.old_password) {
          errorMessage = Array.isArray(data.old_password) 
            ? data.old_password[0] 
            : data.old_password;
        } else if (data.new_password) {
          errorMessage = Array.isArray(data.new_password) 
            ? data.new_password[0] 
            : data.new_password;
        } else if (data.non_field_errors) {
          errorMessage = Array.isArray(data.non_field_errors) 
            ? data.non_field_errors[0] 
            : data.non_field_errors;
        } else if (data.detail) {
          errorMessage = data.detail;
        } else if (data.error) {
          errorMessage = data.error;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (typeof data === 'string') {
          errorMessage = data;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  },
  
  getActivities: async () => {
    try {
      const response = await api.get('/api/auth/activities/');
      return response;
    } catch (error: any) {
      console.error('Failed to fetch activities:', error);
      throw error;
    }
  }
};

// Auth API methods
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/api/auth/login/', { email, password });
    return response;
  },
  
  register: async (userData: any) => {
    const response = await api.post('/api/auth/register/', userData);
    return response;
  },
  
  logout: async (refreshToken: string) => {
    const response = await api.post('/api/auth/logout/', { refresh: refreshToken });
    return response;
  },
  
  checkAuth: async () => {
    const response = await api.get('/api/auth/check-auth/');
    return response;
  },
  
  // Forgot password - request reset link
  forgotPassword: async (email: string) => {
    try {
      const response = await api.post('/auth/password/reset/', { email });
      return response;
    } catch (error: any) {
      console.error('Failed to send reset link:', error);
      
      let errorMessage = 'Failed to send reset link. Please try again.';
      
      if (error.response?.data) {
        const data = error.response.data;
        if (data.detail) errorMessage = data.detail;
        else if (data.error) errorMessage = data.error;
        else if (data.message) errorMessage = data.message;
        else if (data.email) {
          errorMessage = Array.isArray(data.email) 
            ? data.email[0] 
            : data.email;
        } else if (typeof data === 'string') {
          errorMessage = data;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  },
  
  // Verify reset token - uses uid AND token
  verifyResetToken: async (uid: string, token: string) => {
    try {
      const response = await api.post('/auth/password/reset/verify/', { uid, token });
      return response;
    } catch (error: any) {
      console.error('Failed to verify reset token:', error);
      
      let errorMessage = 'Invalid or expired reset token';
      
      if (error.response?.data) {
        const data = error.response.data;
        if (data.error) errorMessage = data.error;
        else if (data.detail) errorMessage = data.detail;
        else if (data.message) errorMessage = data.message;
      }
      
      throw new Error(errorMessage);
    }
  },
  
  // Reset password - uses uid, token, and new_password
  resetPassword: async (uid: string, token: string, newPassword: string) => {
    try {
      const response = await api.post('/auth/password/reset/confirm/', {
        uid,
        token,
        new_password: newPassword,
      });
      return response;
    } catch (error: any) {
      console.error('Failed to reset password:', error);
      
      let errorMessage = 'Failed to reset password. Please try again.';
      
      if (error.response?.data) {
        const data = error.response.data;
        if (data.error) errorMessage = data.error;
        else if (data.detail) errorMessage = data.detail;
        else if (data.message) errorMessage = data.message;
        else if (data.new_password) {
          errorMessage = Array.isArray(data.new_password) 
            ? data.new_password[0] 
            : data.new_password;
        } else if (data.token) {
          errorMessage = Array.isArray(data.token) 
            ? data.token[0] 
            : 'Invalid or expired reset token';
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  }
};

export default api;