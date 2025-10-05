export function getAdminKey() {
  try {
    return localStorage.getItem('adminKey') || '';
  } catch {
    return '';
  }
}

export async function adminApi<T = any>(method: string, path: string, body?: any): Promise<T> {
  const base = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE) || '';
  const headers: Record<string,string> = { 'Content-Type': 'application/json' };
  const key = getAdminKey();
  if (key) headers['x-admin-key'] = key;
  const url = base ? base.replace(/\/$/, '') + (path.startsWith('/') ? path : `/${path}`) : path;
  const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    return res.json();
  }
  // Fallback: try to parse text as JSON or return raw text
  const txt = await res.text();
  try { return JSON.parse(txt); } catch {}
  if (!txt) throw new Error('Empty response');
  // Detect if we accidentally got HTML (SPA fallback)
  if (/<!DOCTYPE html>|<html[\s>]/i.test(txt)) {
    throw new Error('Received HTML from API (routing fallback). Check vercel routing.');
  }
  throw new Error('Unexpected non-JSON response');
}
