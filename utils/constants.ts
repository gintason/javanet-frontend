// utils/constants.ts

// API endpoints based on your Django backend
export const API_ENDPOINTS = {
  // Authentication - ADDED /api prefix to match your backend
  REGISTER: '/api/auth/register/',      // Changed from '/auth/register/'
  LOGIN: '/api/auth/login/',            // Changed from '/auth/login/'
  LOGOUT: '/api/auth/logout/',          // Changed from '/auth/logout/'
  REFRESH_TOKEN: '/api/auth/token/refresh/', // Changed from '/auth/token/refresh/'
  PROFILE: '/api/auth/profile/',        // Changed from '/auth/profile/'
  CHECK_AUTH: '/api/auth/check-auth/',  // Changed from '/auth/check-auth/'
  
  // Additional user endpoints - ADDED /api prefix
  PASSWORD_CHANGE: '/api/auth/password/change/', // Changed from '/auth/password/change/'
  ACTIVITIES: '/api/auth/activities/',  // Changed from '/auth/activities/'
  
  // JWT token endpoints - KEEP AS IS (they already have /api)
  JWT_TOKEN: '/api/token/',
  JWT_TOKEN_REFRESH: '/api/token/refresh/',
  
  // Features - KEEP AS IS (adjust if needed)
  FEATURES: '/features/',
  CTB_FEATURES: '/features/ctb_features/',
  LIVE_FEATURES: '/features/live_features/',
  
  // Testimonials - KEEP AS IS
  TESTIMONIALS: '/testimonials/',
  RECENT_TESTIMONIALS: '/testimonials/recent/',
  
  // AI Chatbot - KEEP AS IS (they already have /api)
  CHAT_SEND: '/api/chatbot/chat/',
  CHAT_SESSIONS: '/api/chatbot/sessions/',
  CHAT_SESSION_DETAIL: '/api/chatbot/sessions/:session_id/',
  
  // Proposal Generator - KEEP AS IS
  PROPOSAL_GENERATE: '/api/proposals/generate/',
  
  // Demo Simulator - KEEP AS IS
  DEMO_PLATFORM: '/demo/platform/',
  
  // Currency Detection - KEEP AS IS
  CURRENCY_DETECT: '/currency/detect/',
  
  // Health Check - KEEP AS IS
  HEALTH_CHECK: '/health/',
};

// For debugging - absolute URLs
export const ABSOLUTE_API_ENDPOINTS = {
  CHAT_SEND_FULL: 'https://api.javanetict.com/api/chatbot/chat/',
  LOGIN_FULL: 'https://api.javanetict.com/api/auth/login/',      // Updated
  CHECK_AUTH_FULL: 'https://api.javanetict.com/api/auth/check-auth/', // Updated
  REGISTER_FULL: 'https://api.javanetict.com/api/auth/register/', // Updated
};

// The rest of your constants remain exactly the same...
// CURRENCY_SYMBOLS, CURRENCIES, COUNTRIES, etc. - NO CHANGES NEEDED