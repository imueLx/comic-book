export type MobileOS = "android" | "ios" | "other";

export interface BrowserSupportInfo {
  os: MobileOS;
  isInAppBrowser: boolean;
  inAppName: string | null;
  isStandalone: boolean;
  speechSupported: boolean;
  offlineReady: boolean;
}

function getUA(): string {
  if (typeof navigator === "undefined") return "";
  return navigator.userAgent || "";
}

function detectOS(ua: string): MobileOS {
  if (/Android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  return "other";
}

function detectInAppBrowser(ua: string): {
  inApp: boolean;
  name: string | null;
} {
  const rules: Array<{ re: RegExp; name: string }> = [
    { re: /FBAN|FBAV|FBIOS|Messenger/i, name: "Facebook/Messenger" },
    { re: /Instagram/i, name: "Instagram" },
    { re: /Line\//i, name: "LINE" },
    { re: /MicroMessenger/i, name: "WeChat" },
    { re: /TikTok/i, name: "TikTok" },
    { re: /Snapchat/i, name: "Snapchat" },
    { re: /Twitter|\bX\b/i, name: "X" },
  ];

  for (const rule of rules) {
    if (rule.re.test(ua)) {
      return { inApp: true, name: rule.name };
    }
  }

  return { inApp: false, name: null };
}

function detectStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function detectSpeechSupport(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "speechSynthesis" in window &&
    typeof SpeechSynthesisUtterance !== "undefined"
  );
}

function detectOfflineReadiness(): boolean {
  if (typeof window === "undefined") return false;
  return "serviceWorker" in navigator && "caches" in window;
}

export function getBrowserSupportInfo(): BrowserSupportInfo {
  const ua = getUA();
  const inApp = detectInAppBrowser(ua);

  return {
    os: detectOS(ua),
    isInAppBrowser: inApp.inApp,
    inAppName: inApp.name,
    isStandalone: detectStandalone(),
    speechSupported: detectSpeechSupport(),
    offlineReady: detectOfflineReadiness(),
  };
}

export function getPreferredBrowserName(os: MobileOS): string {
  if (os === "android") return "Chrome";
  if (os === "ios") return "Safari";
  return "a modern browser";
}

export function buildRedirectUrl(
  currentUrl: string,
  os: MobileOS,
): string | null {
  if (!currentUrl) return null;

  if (os === "android") {
    try {
      const parsed = new URL(currentUrl);
      const fallback = encodeURIComponent(currentUrl);
      const path = `${parsed.pathname}${parsed.search}${parsed.hash}`;
      return `intent://${parsed.host}${path}#Intent;scheme=${parsed.protocol.replace(":", "")};package=com.android.chrome;S.browser_fallback_url=${fallback};end`;
    } catch {
      return null;
    }
  }

  if (os === "ios") {
    if (currentUrl.startsWith("https://")) {
      return `x-safari-https://${currentUrl.replace(/^https:\/\//, "")}`;
    }
    if (currentUrl.startsWith("http://")) {
      return `x-safari-http://${currentUrl.replace(/^http:\/\//, "")}`;
    }
  }

  return null;
}
