declare global {
  interface Window {
    dataLayer: any; // 👈️ turn off type checking
    gtag: (...args: any[]) => void;
    ga: (...args: any[]) => void;
  }
}
