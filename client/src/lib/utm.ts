export type UTM = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  ts?: number;
};

const KEY = 'utm_capture_v1';

export function captureUtmFromUrl(url: string) {
  try {
    const u = new URL(url, window.location.origin);
    const p = u.searchParams;
    const utm: UTM = {
      utm_source: p.get('utm_source') || undefined,
      utm_medium: p.get('utm_medium') || undefined,
      utm_campaign: p.get('utm_campaign') || undefined,
      utm_term: p.get('utm_term') || undefined,
      utm_content: p.get('utm_content') || undefined,
      gclid: p.get('gclid') || undefined,
      fbclid: p.get('fbclid') || undefined,
      ts: Date.now(),
    };
    // Only store if any param is present
    if (utm.utm_source || utm.utm_medium || utm.utm_campaign || utm.utm_term || utm.utm_content || utm.gclid || utm.fbclid) {
      localStorage.setItem(KEY, JSON.stringify(utm));
    }
  } catch {}
}

export function getStoredUtm(): UTM | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UTM;
  } catch {
    return null;
  }
}

