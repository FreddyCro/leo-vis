declare global {
  interface Window {
    ga: any;
    gtag: any;
  }
}

interface GAEvent {
  category: string;
  action: string;
  label: string;
}

function sendGA({ category, action, label }: GAEvent) {
  console.log('sendGA', category, action, label);
  if (typeof window === 'undefined') {
    return console.error('GA not ready');
  }
  if (!category || !action || !label) {
    return console.error('GA event missing params');
  }

  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      [category]: label,
    });
  }

  if (window.ga) {
    window.ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      eventValue: '', // Provide a default value or pass a value if available
    });
  }
}

export { sendGA };
