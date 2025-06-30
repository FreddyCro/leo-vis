// Google Analytics event tracking interface
interface GAEvent {
  hitType: 'event' | 'pageview' | 'timing' | 'exception' | 'social';
  eventCategory?: string;
  eventAction?: string;
  eventLabel?: string;
  eventValue?: number;
  page?: string;
  title?: string;
  timingCategory?: string;
  timingVar?: string;
  timingValue?: number;
  timingLabel?: string;
  exDescription?: string;
  exFatal?: boolean;
  socialNetwork?: string;
  socialAction?: string;
  socialTarget?: string;
  // 自定義參數
  site?: string;
  term?: string;
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
 * Send Google Analytics event
 * @param event - The GA event object
 */
export function sendGA(event: GAEvent): void {
  try {
    // Check if GA is available (Universal Analytics)
    if (typeof window !== 'undefined' && window.ga) {
      window.ga('send', event);
      return;
    }

    // Check if gtag is available (GA4)
    if (typeof window !== 'undefined' && window.gtag) {
      if (event.hitType === 'event') {
        const customParams: any = {};

        // 添加自定義參數
        if (event.site) customParams.site = event.site;
        if (event.term) customParams.term = event.term;
        if (event.eventLabel) customParams.event_label = event.eventLabel;
        if (event.eventValue) customParams.value = event.eventValue;

        window.gtag('event', event.eventAction || 'unknown_action', {
          event_category: event.eventCategory,
          ...customParams,
        });
      } else if (event.hitType === 'pageview') {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: event.title,
          page_location: event.page,
        });
      }
      return;
    }

    // Fallback: log to console in development or when GA is not available
    if (!window.ga && !window.gtag) {
      console.log('GA Event (no tracking available):', event);
    }
  } catch (error) {
    console.error('Error sending GA event:', error);
  }
}

/**
 * 發送網站互動事件 (site 參數)
 * @param eventName - 事件名稱 (如 vip_logo, share_facebook)
 * @param site - 網站標識 (如 newspaceera)
 * @param category - 事件分類 (可選)
 */
export function sendSiteEvent(
  eventName: string,
  site: string = 'newspaceera',
  category: string = 'site_interaction',
): void {
  sendGA({
    hitType: 'event',
    eventAction: eventName,
    eventCategory: category,
    site,
  });
}

/**
 * 發送區域瀏覽事件 (term 參數)
 * @param term - 區域標識 (如 keyvisual-upper, overview)
 * @param category - 事件分類 (可選)
 */
export function sendSectionView(
  term: string,
  category: string = 'section_view',
): void {
  sendGA({
    hitType: 'event',
    eventAction: 'section_view',
    eventCategory: category,
    term,
  });
}

/**
 * Helper function to send page view event
 * @param page - Page path
 * @param title - Page title
 */
export function sendPageView(page: string, title?: string): void {
  sendGA({
    hitType: 'pageview',
    page,
    title,
  });
}

/**
 * Helper function to send custom event
 * @param category - Event category
 * @param action - Event action
 * @param label - Event label (optional)
 * @param value - Event value (optional)
 */
export function sendEvent(
  category: string,
  action: string,
  label?: string,
  value?: number,
): void {
  sendGA({
    hitType: 'event',
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
    eventValue: value,
  });
}

/**
 * Helper function to send timing event
 * @param category - Timing category
 * @param variable - Timing variable
 * @param value - Timing value in milliseconds
 * @param label - Timing label (optional)
 */
export function sendTiming(
  category: string,
  variable: string,
  value: number,
  label?: string,
): void {
  sendGA({
    hitType: 'timing',
    timingCategory: category,
    timingVar: variable,
    timingValue: value,
    timingLabel: label,
  });
}

/**
 * Helper function to send exception event
 * @param description - Exception description
 * @param fatal - Whether the exception is fatal
 */
export function sendException(
  description: string,
  fatal: boolean = false,
): void {
  sendGA({
    hitType: 'exception',
    exDescription: description,
    exFatal: fatal,
  });
}

// 預定義的網站事件常數
export const SITE_EVENTS = {
  VIP_LOGO: 'vip_logo',
  VIP_ORDER: 'vip_order',
  SHARE_FACEBOOK: 'share_facebook',
  SHARE_LINE: 'share_line',
  SHARE_TWITTER: 'share_twitter',
  SOCIAL_MEDIA_FACEBOOK: 'social_media_facebook',
  SOCIAL_MEDIA_YOUTUBE: 'social_media_youtube',
  SOCIAL_MEDIA_LINE: 'social_media_line',
  SOCIAL_MEDIA_INSTAGRAM: 'social_media_instagram',
  FOOTER_VIP: 'footer_vip',
  FOOTER_PRIVACY: 'footer_privacy',
  FOOTER_SERVICE: 'footer_service',
  GO_TOP: 'go_top',
} as const;

// 預定義的區域標識常數
export const SECTION_TERMS = {
  KEYVISUAL_UPPER: 'keyvisual-upper',
  KEYVISUAL_LOWER: 'keyvisual-lower',
  OVERVIEW: 'overview',
  CONTENTS: 'contents',
  CH1_ECONOMIC: 'ch1_economic',
  CH1_SATELLITE: 'ch1_satellite',
  CH1_SUPPLYCHAINS: 'ch1_supplychains',
  CH2_SECURITY: 'ch2_security',
} as const;

// Example usage (commented out):
// sendSiteEvent(SITE_EVENTS.VIP_LOGO); // vip_logo 點擊
// sendSiteEvent(SITE_EVENTS.SHARE_FACEBOOK); // Facebook 分享
// sendSectionView(SECTION_TERMS.KEYVISUAL_UPPER); // 上方關鍵視覺區域
// sendSectionView(SECTION_TERMS.OVERVIEW); // 概覽區域
