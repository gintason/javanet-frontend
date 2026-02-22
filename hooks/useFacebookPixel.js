import { useEffect } from 'react';
import { usePathname } from 'next/navigation';  // Changed from useRouter

const FB_PIXEL_ID = '1984681502451286';

export const useFacebookPixel = () => {
  const pathname = usePathname();  // Use usePathname instead of useRouter

  useEffect(() => {
    // Initialize Facebook Pixel with the provided script
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    // Initialize with your Pixel ID
    window.fbq('init', FB_PIXEL_ID);
    
    // Track initial page view
    window.fbq('track', 'PageView');

    // Add noscript image
    const noscript = document.createElement('noscript');
    const img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = `https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    document.body.appendChild(noscript);

  }, []); // Empty dependency array since we don't need pathname for initialization

  // Track page views when pathname changes
  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname]); // Re-run when pathname changes

  // Helper functions for tracking custom events
  const trackEvent = (eventName, parameters) => {
    if (window.fbq) {
      window.fbq('track', eventName, parameters);
    }
  };

  return {
    trackEvent,
  };
};