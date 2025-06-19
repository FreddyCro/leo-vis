interface GAEvent {
  type: 'event';
  category: string;
  action: string;
  label: string;
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
function sendGA({ type, category, action, label }: GAEvent) {
  window.ga('send', {
    hitType: type,
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
  });
}

export { sendGA };
