import fs from 'fs';
import path from 'path';

const API_BASE = process.env.VITE_API_BASE_URL || process.env.VITE_API_BASE || '';
const DIST_DIR = path.resolve('dist');

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

function writeHtml(filePath: string, html: string) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, html, 'utf8');
}

function shellHtml({ title, description, canonical, content }: { title: string; description: string; canonical: string; content: string; }) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${title}</title><meta name="description" content="${description}"/><link rel="canonical" href="${canonical}"/></head><body><div id="root">${content}</div></body></html>`;
}

async function prerender() {
  if (!API_BASE) {
    console.warn('Skipping prerender: VITE_API_BASE_URL not set');
    return;
  }
  const host = process.env.CANONICAL_HOST || '';
  const baseUrl = host ? `https://${host}` : '';

  // Home
  writeHtml(path.join(DIST_DIR, 'index.html'), shellHtml({
    title: 'BoothVerse',
    description: 'Experiential photo booths and activations.',
    canonical: `${baseUrl}/`,
    content: ''
  }));

  // Insights index
  writeHtml(path.join(DIST_DIR, 'insights', 'index.html'), shellHtml({
    title: 'Insights',
    description: 'Articles and insights from BoothVerse.',
    canonical: `${baseUrl}/insights`,
    content: ''
  }));

  // Articles detail
  const list = await fetchJson<{ data: { slug: string; title?: string; excerpt?: string }[] }>(`${API_BASE.replace(/\/$/, '')}/api/articles?pageSize=100`);
  for (const a of list.data || []) {
    const title = a.title || 'Article';
    const desc = a.excerpt || '';
    const slug = a.slug;
    const out = path.join(DIST_DIR, 'insights', slug, 'index.html');
    writeHtml(out, shellHtml({
      title: `${title} | BoothVerse`,
      description: desc,
      canonical: `${baseUrl}/insights/${slug}`,
      content: ''
    }));
  }
  console.log('Prerender complete');
}

prerender().catch((e) => {
  console.error('Prerender failed', e);
  process.exit(1);
});

