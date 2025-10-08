import type { VercelRequest, VercelResponse } from 'vercel';
import { getSupabaseAdmin, requireAdmin } from '../_supabase.js';
import { createClient } from '@supabase/supabase-js';

function getCdnBase() {
  const base = process.env.CDN_BASE_URL || '';
  return base.replace(/\/$/, '');
}

function qualifyUrl(keyOrUrl?: string | null) {
  if (!keyOrUrl) return keyOrUrl || undefined;
  if (/^https?:\/\//i.test(keyOrUrl)) return keyOrUrl;
  const base = getCdnBase();
  return base ? `${base}/${keyOrUrl.replace(/^\//, '')}` : keyOrUrl;
}

function parseBody(req: VercelRequest) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return req.body as Record<string, any>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'GET,POST,PUT,DELETE,OPTIONS');
    return res.status(204).end();
  }
  const supabase = getSupabaseAdmin();

  const slugParam = req.query.slug;
  const slug = Array.isArray(slugParam)
    ? slugParam
    : typeof slugParam === 'string'
      ? [slugParam]
      : [];

  const pathSegments = (req.url || '')
    .split('?')[0]
    .replace(/^\/api\//, '')
    .split('/')
    .filter(Boolean);

  const sub = slug[0] ?? pathSegments[1];

  if (!sub) {
    if (req.method === 'GET') {
      try {
        const { page = '1', pageSize = '24', q, tag, type, includeAll } = req.query as any;
        const p = Math.max(1, parseInt(String(page)) || 1);
        const ps = Math.min(100, Math.max(1, parseInt(String(pageSize)) || 24));

        let query = supabase
          .from('media_items')
          .select('id,title,slug,type,url,thumbnail_url,tags,published,created_at', { count: 'exact' })
          .order('created_at', { ascending: false })
          .range((p - 1) * ps, p * ps - 1);

        const isAdmin = req.headers['x-admin-key'] && req.headers['x-admin-key'] === process.env.ADMIN_PASSWORD;
        const wantAll = String(includeAll || '').toLowerCase() === 'true';
        if (!(isAdmin && wantAll)) {
          query = query.eq('published', true);
        }

        if (q) {
          const s = String(q);
          query = query.or(`title.ilike.%${s}%,slug.ilike.%${s}%`);
        }
        if (tag) query = query.contains('tags', [String(tag)] as any);
        if (type) query = query.eq('type', String(type));

        const { data, error, count } = await query;
        if (error) return res.status(500).json({ message: error.message });
        const cdnData = (data || []).map((it) => ({
          ...it,
          url: qualifyUrl((it as any).url),
          thumbnail_url: qualifyUrl((it as any).thumbnail_url),
        }));
        return res.json({ data: cdnData, count: count || 0, page: p, pageSize: ps });
      } catch (e: any) {
        return res.status(500).json({ message: e?.message || 'Server error' });
      }
    }

    if (req.method === 'POST') {
      if (!requireAdmin(req, res)) return;
      try {
        const body = parseBody(req);
        body.created_at = new Date().toISOString();
        body.updated_at = body.created_at;
        const { data, error } = await supabase
          .from('media_items')
          .insert(body)
          .select()
          .single();
        if (error) return res.status(500).json({ message: error.message });
        return res.status(201).json(data);
      } catch (e: any) {
        return res.status(500).json({ message: e?.message || 'Server error' });
      }
    }

    res.setHeader('Allow', 'GET,POST,OPTIONS');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (sub === 'upload-url') {
    if (!requireAdmin(req, res)) return;
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
      const SUPABASE_URL = process.env.SUPABASE_URL as string;
      const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE as string;
      if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE');
      const bucket = process.env.SUPABASE_MEDIA_BUCKET || 'media';
      const body = parseBody(req);
      const rawFileName = typeof body.fileName === 'string' && body.fileName ? body.fileName : 'upload';
      const safeName = rawFileName.replace(/[^a-zA-Z0-9._-]+/g, '-');
      const contentType = typeof body.contentType === 'string' && body.contentType ? body.contentType : 'application/octet-stream';
      const rawSubDir = typeof body.subDir === 'string' ? body.subDir : '';
      const subDir = rawSubDir ? rawSubDir.replace(/^\/+|\/+$/g, '') : '';
      const now = new Date();
      const parts = [
        subDir,
        String(now.getFullYear()),
        String(now.getMonth() + 1).padStart(2, '0'),
        `${(globalThis as any).crypto?.randomUUID?.() || Date.now()}-${safeName}`,
      ].filter(Boolean);
      const key = parts.join('/');
      const client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, { auth: { persistSession: false } });
      const { data, error } = await (client as any).storage.from(bucket).createSignedUploadUrl(key, { upsert: true, contentType });
      if (error) return res.status(500).json({ message: `Supabase error: ${error.message}` });
      const { data: pub } = (client as any).storage.from(bucket).getPublicUrl(key);
      return res.json({ uploadUrl: data?.signedUrl, key, url: pub?.publicUrl || null, bucket, access: body.access || 'public' });
    } catch (e: any) {
      return res.status(500).json({ message: e?.message || 'Server error' });
    }
  }

  const id = sub;
  if (!requireAdmin(req, res)) return;

  if (req.method === 'PUT') {
    try {
      const patch = { ...parseBody(req), updated_at: new Date().toISOString() };
      const { data, error } = await supabase
        .from('media_items')
        .update(patch)
        .eq('id', id)
        .select()
        .single();
      if (error) return res.status(500).json({ message: error.message });
      return res.json(data);
    } catch (e: any) {
      return res.status(500).json({ message: e?.message || 'Server error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { error } = await supabase.from('media_items').delete().eq('id', id);
      if (error) return res.status(500).json({ message: error.message });
      return res.status(204).end();
    } catch (e: any) {
      return res.status(500).json({ message: e?.message || 'Server error' });
    }
  }

  res.setHeader('Allow', 'PUT,DELETE,OPTIONS');
  return res.status(405).json({ message: 'Method Not Allowed' });
}
