// User types based on your Django CustomUser model
export interface User {
  id: string;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  country: string;
  currency: 'NGN' | 'USD';
  phone?: string;
  is_client: boolean;
  date_joined: string;
  is_staff?: boolean;
  is_admin_user?: boolean;
}

// Authentication
export interface AuthResponse {
  user: User;
  refresh: string;
  access: string;
}

// Features
export interface Feature {
  id: number;
  name: string;
  description: string;
  icon: string;
  feature_type: 'ctb' | 'LIVE' | 'GEN';
  order: number;
}

// Testimonials
export interface Testimonial {
  id: number;
  content: string;
  rating: number;
  client_name: string;
  client_country: string;
  created_at: string;
}

// Chatbot
export interface ChatRequest {
  session_id?: string;
  message: string;
}

export interface ChatResponse {
  response: string;
  session_id: string;
  currency: string;
  country: string;
  timestamp: string;
  message_id?: string;
  message?: string; // Add this line to fix the error
  context?: ChatContext;
  suggestions?: string[];
  intent: string;
}

export interface ChatContext {
  last_topic: string | null;
  follow_up_suggestions: string[];
  message_id: string;
  conversation_state: Record<string, any>;
}

// Proposal Generator
export interface ProposalRequestData {
  name: string;
  email: string;
  institution: string;
  phone?: string;
  country: string;
  needs_ctb: boolean;
  needs_live_classes: boolean;
  estimated_students: number;
  estimated_teachers: number;
  preferred_colors?: string;
  has_logo: boolean;
}

// Define supported currency codes
export type CurrencyCode = 'USD' | 'NGN' | 'GHS' | 'KES' | 'ZAR' | 'EUR' | 'GBP';

export interface DeploymentFee {
  amount: string;
  currency: CurrencyCode;  // Updated from 'NGN' | 'USD' to CurrencyCode
  currency_symbol: string;
  range: string;
  note: string;
}

// Updated ProposalResponse with all required fields
export interface ProposalResponse {
  status: string;
  message: string;
  proposal_id: number;
  deployment_fee: DeploymentFee;
  data: {
    id: number;
    name: string;
    email: string;
    institution: string;
    phone?: string;
    country: string;
    currency: string;
    deployment_fee: string;
    created_at: string;
    // Added the missing properties for PDF generation
    needs_ctb: boolean;
    needs_live_classes: boolean;
    estimated_students: number;
    estimated_teachers: number;
    preferred_colors?: string;
    has_logo: boolean;
  };
}

// Demo Simulator
export interface DemoRequest {
  institution_name: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  ctb_enabled: boolean;
  live_classes_enabled: boolean;
}

export interface DemoResponse {
  status: string;
  demo_session: {
    session_id: string;
    institution_name: string;
    branding: {
      primary_color: string;
      secondary_color: string;
      accent_color: string;
    };
    modules: {
      ctb: boolean;
      live_classes: boolean;
    };
    created_at: string;
    expires_at: string;
  };
  message: string;
}

// Currency Detection - Updated to use CurrencyCode type
export interface CurrencyInfo {
  currency: CurrencyCode;  // Updated from string to CurrencyCode
  country: string;
  deployment_fee: DeploymentFee;
  pricing_model: string;
}

// User Activity
export interface UserActivity {
  id: number;
  user_email: string;
  action: string;
  details: any;
  ip_address: string;
  timestamp: string;
}

// API Health Check
export interface HealthCheck {
  status: string;
  timestamp: string;
  services: {
    chatbot: string;
    proposal_generator: string;
    demo_simulator: string;
  };
  pricing_model: string;
}