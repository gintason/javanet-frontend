export const FB_PIXEL_ID = '1984681502451286';

// Track pageview
export const pageview = () => {
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Track specific events
export const trackEvent = (eventName, options = {}) => {
  if (window.fbq) {
    window.fbq('track', eventName, options);
  }
};