import { CURRENCY_SYMBOLS } from './constants';

// Format currency with proper symbol
export const formatCurrency = (amount: string | number, currency: 'NGN' | 'USD' = 'USD'): string => {
  const symbol = CURRENCY_SYMBOLS[currency];
  const numAmount = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d.-]/g, '')) : amount;
  
  if (isNaN(numAmount)) return `${symbol}0`;
  
  if (currency === 'NGN') {
    return `${symbol}${numAmount.toLocaleString('en-NG')}`;
  } else {
    return `${symbol}${numAmount.toLocaleString('en-US')}`;
  }
};

// Detect if country is African (for pricing)
export const isAfricanCountry = (country: string): boolean => {
  const africanCountries = ['nigeria', 'ghana', 'kenya', 'south africa', 'tanzania', 'uganda'];
  return africanCountries.includes(country.toLowerCase());
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Get deployment fee message based on country
export const getDeploymentFeeMessage = (country: string): string => {
  if (isAfricanCountry(country)) {
    return 'One-time deployment fee: ₦5,000,000 - ₦10,000,000';
  } else {
    return 'One-time deployment fee: $10,000 - $15,000 USD';
  }
};