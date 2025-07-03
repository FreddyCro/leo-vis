interface GAEvent {
  hitType: 'event';
  eventCategory: string;
  eventAction: string;
  eventLabel: string;
  eventValue: string;
}

// Declare global ga function
declare global {
  interface Window {
    ga?: (
      command: string,
      fields: GAEvent | string,
      fieldsObject?: any,
    ) => void;
    gtag?: (...args: any[]) => void;
  }
}

/**
 *
 * @example
 *
 * window.ga('send', {
 *   hitType: 'event',
 *   eventCategory: 'first_screen',
 *   eventAction: 'click_anchor',
 *   eventLabel: title,
 * });
 */
function sendGA({
  eventCategory,
  eventAction,
  eventLabel,
  eventValue,
}: GAEvent) {
  window.ga('send', {
    hitType: 'event',
    eventCategory,
    eventAction,
    eventLabel,
    eventValue,
  });
}

export { sendGA };
