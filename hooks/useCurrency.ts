"use client";

import { useState, useEffect, useCallback } from 'react';
import api from '@/utils/api';
import { API_ENDPOINTS } from '@/utils/constants';
import { CurrencyInfo, CurrencyCode } from '@/types'; // Import CurrencyCode

interface UseCurrencyReturn {
  currencyInfo: CurrencyInfo | null;
  loading: boolean;
  error: string | null;
  detectCurrency: () => Promise<void>;
  formatAmount: (amount: number | string) => string;
  isAfricanPricing: boolean;
}

export const useCurrency = (): UseCurrencyReturn => {
  const [currencyInfo, setCurrencyInfo] = useState<CurrencyInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if we have a saved currency from proposal form
  const getCurrencyFromProposal = useCallback((): CurrencyInfo | null => {
    try {
      const savedProposal = localStorage.getItem('last_proposal');
      if (savedProposal) {
        const proposal = JSON.parse(savedProposal);
        const currency: CurrencyCode = (proposal.data?.currency || proposal.deployment_fee?.currency || 'USD') as CurrencyCode;
        const country = proposal.data?.country || 'International';
        
        // Validate currency is one of allowed types
        const allowedCurrencies: CurrencyCode[] = ['USD', 'NGN', 'GHS', 'KES', 'ZAR', 'EUR', 'GBP'];
        const validCurrency: CurrencyCode = allowedCurrencies.includes(currency) ? currency : 'USD';
        
        return {
          currency: validCurrency,
          country,
          deployment_fee: {
            amount: proposal.deployment_fee?.amount || (validCurrency === 'NGN' ? '₦5,000,000' : 
                   validCurrency === 'GHS' ? 'GH₵40,000' :
                   validCurrency === 'KES' ? 'KSh 1,200,000' :
                   validCurrency === 'ZAR' ? 'R 180,000' :
                   validCurrency === 'EUR' ? '€9,000' :
                   validCurrency === 'GBP' ? '£8,000' : '$10,000'),
            currency: validCurrency,
            currency_symbol: validCurrency === 'NGN' ? '₦' :
                           validCurrency === 'GHS' ? 'GH₵' :
                           validCurrency === 'KES' ? 'KSh' :
                           validCurrency === 'ZAR' ? 'R' :
                           validCurrency === 'EUR' ? '€' :
                           validCurrency === 'GBP' ? '£' : '$',
            range: validCurrency === 'NGN' ? '₦5,000,000 - ₦7,000,000' :
                  validCurrency === 'GHS' ? 'GH₵40,000 - GH₵50,000' :
                  validCurrency === 'KES' ? 'KSh 1,200,000 - KSh 1,500,000' :
                  validCurrency === 'ZAR' ? 'R 180,000 - R 220,000' :
                  validCurrency === 'EUR' ? '€9,000 - €12,000' :
                  validCurrency === 'GBP' ? '£8,000 - £10,000' : '$10,000 - $15,000',
            note: 'One-time deployment fee'
          },
          pricing_model: 'One-time deployment fee (no monthly subscriptions)'
        };
      }
    } catch (err) {
      console.error('Error reading saved proposal:', err);
    }
    return null;
  }, []);

  // Detect currency on component mount
  useEffect(() => {
    if (!currencyInfo) {
      detectCurrency();
    }
  }, []);

  const detectCurrency = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simple browser-based detection
      const userLanguage = navigator.language || 'en-US';
      let detectedCountry = 'International';
      let detectedCurrency: CurrencyCode = 'USD';
      
      // Detect based on browser language
      if (userLanguage.includes('NG') || userLanguage.includes('en-NG')) {
        detectedCountry = 'Nigeria';
        detectedCurrency = 'NGN';
      } else if (userLanguage.includes('GH')) {
        detectedCountry = 'Ghana';
        detectedCurrency = 'GHS';
      } else if (userLanguage.includes('KE')) {
        detectedCountry = 'Kenya';
        detectedCurrency = 'KES';
      } else if (userLanguage.includes('ZA')) {
        detectedCountry = 'South Africa';
        detectedCurrency = 'ZAR';
      } else if (userLanguage.includes('GB') || userLanguage.includes('en-GB')) {
        detectedCountry = 'United Kingdom';
        detectedCurrency = 'GBP';
      } else if (userLanguage.includes('EU') || userLanguage.includes('fr') || userLanguage.includes('de')) {
        detectedCountry = 'Europe';
        detectedCurrency = 'EUR';
      }
      
      // Validate currency is one of allowed types
      const allowedCurrencies: CurrencyCode[] = ['USD', 'NGN', 'GHS', 'KES', 'ZAR', 'EUR', 'GBP'];
      const finalCurrency: CurrencyCode = allowedCurrencies.includes(detectedCurrency) 
        ? detectedCurrency 
        : 'USD';
      
      // Use browser-detected currency
      const currencyData: CurrencyInfo = {
        currency: finalCurrency,
        country: detectedCountry,
        deployment_fee: {
          amount: finalCurrency === 'NGN' ? '₦5,000,000' : 
                 finalCurrency === 'GHS' ? 'GH₵40,000' :
                 finalCurrency === 'KES' ? 'KSh 1,200,000' :
                 finalCurrency === 'ZAR' ? 'R 180,000' :
                 finalCurrency === 'EUR' ? '€9,000' :
                 finalCurrency === 'GBP' ? '£8,000' : '$10,000',
          currency: finalCurrency,
          currency_symbol: finalCurrency === 'NGN' ? '₦' :
                         finalCurrency === 'GHS' ? 'GH₵' :
                         finalCurrency === 'KES' ? 'KSh' :
                         finalCurrency === 'ZAR' ? 'R' :
                         finalCurrency === 'EUR' ? '€' :
                         finalCurrency === 'GBP' ? '£' : '$',
          range: finalCurrency === 'NGN' ? '₦5,000,000 - ₦7,000,000' :
                finalCurrency === 'GHS' ? 'GH₵40,000 - GH₵50,000' :
                finalCurrency === 'KES' ? 'KSh 1,200,000 - KSh 1,500,000' :
                finalCurrency === 'ZAR' ? 'R 180,000 - R 220,000' :
                finalCurrency === 'EUR' ? '€9,000 - €12,000' :
                finalCurrency === 'GBP' ? '£8,000 - £10,000' : '$10,000 - $15,000',
          note: 'One-time deployment fee'
        },
        pricing_model: 'One-time deployment fee (no monthly subscriptions)'
      };
      
      setCurrencyInfo(currencyData);
      localStorage.setItem('currency_info', JSON.stringify(currencyData));
      
    } catch (err: any) {
      console.warn('Currency detection failed, using fallback:', err);
      
      // Fallback to USD
      const fallbackCurrency: CurrencyInfo = {
        currency: 'USD',
        country: 'International',
        deployment_fee: {
          amount: '$10,000',
          currency: 'USD',
          currency_symbol: '$',
          range: '$10,000 - $15,000',
          note: 'One-time deployment fee'
        },
        pricing_model: 'One-time deployment fee (no monthly subscriptions)'
      };
      
      setCurrencyInfo(fallbackCurrency);
      localStorage.setItem('currency_info', JSON.stringify(fallbackCurrency));
      
      setError('Using default currency settings (USD)');
    } finally {
      setLoading(false);
    }
  }, []);

  const formatAmount = useCallback((amount: number | string): string => {
    if (!currencyInfo) return typeof amount === 'number' ? `$${amount}` : amount.toString();
    
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    const symbol = currencyInfo.deployment_fee.currency_symbol;
    
    if (currencyInfo.currency === 'NGN') {
      return `${symbol}${numAmount.toLocaleString('en-NG')}`;
    } else if (currencyInfo.currency === 'GHS') {
      return `${symbol}${numAmount.toLocaleString('en-GH')}`;
    } else if (currencyInfo.currency === 'KES') {
      return `${symbol}${numAmount.toLocaleString('en-KE')}`;
    } else if (currencyInfo.currency === 'ZAR') {
      return `${symbol}${numAmount.toLocaleString('en-ZA')}`;
    } else if (currencyInfo.currency === 'EUR') {
      return `${symbol}${numAmount.toLocaleString('de-DE')}`; // German format for EUR
    } else if (currencyInfo.currency === 'GBP') {
      return `${symbol}${numAmount.toLocaleString('en-GB')}`;
    } else {
      return `${symbol}${numAmount.toLocaleString('en-US')}`;
    }
  }, [currencyInfo]);

  const isAfricanPricing = !!(
    currencyInfo?.currency === 'NGN' || 
    currencyInfo?.currency === 'GHS' ||
    currencyInfo?.currency === 'KES' ||
    currencyInfo?.currency === 'ZAR' ||
    currencyInfo?.country?.toLowerCase().includes('nigeria') ||
    currencyInfo?.country?.toLowerCase().includes('ghana') ||
    currencyInfo?.country?.toLowerCase().includes('kenya') ||
    currencyInfo?.country?.toLowerCase().includes('south africa') ||
    currencyInfo?.country?.toLowerCase().includes('africa')
  );

  return {
    currencyInfo,
    loading,
    error,
    detectCurrency,
    formatAmount,
    isAfricanPricing,
  };
};