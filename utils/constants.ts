// utils/constants.ts

// API endpoints based on your Django backend
export const API_ENDPOINTS = {
  // Authentication - FIXED to match Django users app URLs (under /api/auth/)
  REGISTER: 'api/auth/register/',      // Changed from /api/users/register/
  LOGIN: 'api/auth/login/',            // Changed from /api/users/login/
  LOGOUT: 'api/auth/logout/',          // Changed from /api/users/logout/
  REFRESH_TOKEN: 'api/auth/token/refresh/', // Changed from /api/users/token/refresh/
  PROFILE: 'api/auth/profile/',        // Changed from /api/users/profile/
  CHECK_AUTH: 'api/auth/check-auth/',  // Changed from /api/users/check-auth/
  
  // Additional user endpoints - FIXED to match Django users app URLs
  PASSWORD_CHANGE: 'api/auth/password/change/', // Changed from /api/users/password/change/
  ACTIVITIES: 'api/auth/activities/',  // Changed from /api/users/activities/
  
  // JWT token endpoints (alternative endpoints from main urls.py)
  JWT_TOKEN: '/api/token/',             // ADDED - Simple JWT default endpoint
  JWT_TOKEN_REFRESH: '/api/token/refresh/', // ADDED - Simple JWT refresh endpoint
  
  // Features - KEPT AS IS
  FEATURES: '/features/',
  CTB_FEATURES: '/features/ctb_features/',
  LIVE_FEATURES: '/features/live_features/',
  
  // Testimonials - KEPT AS IS
  TESTIMONIALS: '/testimonials/',
  RECENT_TESTIMONIALS: '/testimonials/recent/',
  
  // AI Chatbot - UPDATED with /api/ prefix to match your Django URLs
  CHAT_SEND: '/api/chatbot/chat/',           // Changed from /chatbot/chat/
  CHAT_SESSIONS: '/api/chatbot/sessions/',   // Changed from /chatbot/sessions/
  CHAT_SESSION_DETAIL: '/api/chatbot/sessions/:session_id/', // Changed
  
  // Proposal Generator - UPDATED with /api/ prefix
  PROPOSAL_GENERATE: '/api/proposals/generate/', // Changed from /proposals/generate/
  
  // Demo Simulator - KEPT AS IS (adjust if needed)
  DEMO_PLATFORM: '/demo/platform/',
  
  // Currency Detection - KEPT AS IS (adjust if needed)
  CURRENCY_DETECT: '/currency/detect/',
  
  // Health Check - KEPT AS IS (adjust if needed)
  HEALTH_CHECK: '/health/',
};

// For debugging - absolute URLs (UPDATED to use port 8080)
export const ABSOLUTE_API_ENDPOINTS = {
  // Using absolute URLs for debugging
  CHAT_SEND_FULL: 'https://api.javanetict.com/api/chatbot/chat/',
  // ADDED - more absolute URLs for debugging
  LOGIN_FULL: 'https://api.javanetict.com/api/auth/login/',
  CHECK_AUTH_FULL: 'https://api.javanetict.com/api/auth/check-auth/',
  REGISTER_FULL: 'https://api.javanetict.com/api/auth/register/',
};

// ----------------------------------------------------------------------------
// ALL CONSTANTS BELOW THIS LINE REMAIN EXACTLY THE SAME - NO CHANGES NEEDED
// ----------------------------------------------------------------------------

// Currency symbols
export const CURRENCY_SYMBOLS = {
  NGN: '₦',
  USD: '$',
  GBP: '£',
  EUR: '€',
  KES: 'KSh',
  GHS: '₵',
  ZAR: 'R',
};

// Currency options with full details
export const CURRENCIES = [
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
];

// Country options for forms
export const COUNTRIES = [
  'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Tanzania', 'Uganda',
  'Rwanda', 'Ethiopia', 'Egypt', 'Morocco',
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Other'
];

// Platform modules
export const PLATFORM_MODULES = {
  CTB: 'Computer-Based Testing (CBT)',
  LIVE: 'Live Interactive Classroom',
  BOTH: 'Both CBT & Live Classroom',
};

// Feature types
export const FEATURE_TYPES = {
  CTB: 'ctb',
  LIVE: 'LIVE',
  GEN: 'GEN',
};

// User account types
export const USER_TYPES = {
  CLIENT: 'Client',
  ADMIN: 'Administrator',
  USER: 'User',
};

// Chatbot configuration
export const CHATBOT_CONFIG = {
  MAX_MESSAGES: 50,
  TYPING_DELAY: 500,
  AUTO_SCROLL: true,
};

// Quick questions for chatbot
export const CHATBOT_QUICK_QUESTIONS = [
  'What is the deployment fee?',
  'Do you offer CBT system?',
  'Can I customize the platform?',
  'How long does setup take?',
  'Can I see a demo?',
  'What countries do you support?',
];

// Password validation rules
export const PASSWORD_RULES = {
  MIN_LENGTH: 6,
  REQUIRE_UPPERCASE: false,
  REQUIRE_LOWERCASE: false,
  REQUIRE_NUMBER: false,
  REQUIRE_SPECIAL: false,
};

// Activity types for user tracking
export const ACTIVITY_TYPES = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
  PROFILE_UPDATE: 'PROFILE_UPDATE',
  PASSWORD_CHANGE: 'PASSWORD_CHANGE',
  PROPOSAL_GENERATE: 'PROPOSAL_GENERATE',
  CHAT_MESSAGE: 'CHAT_MESSAGE',
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_MISMATCH: 'Passwords do not match',
  PASSWORD_MIN_LENGTH: `Password must be at least ${PASSWORD_RULES.MIN_LENGTH} characters`,
  PHONE_INVALID: 'Please enter a valid phone number',
};