import type { VercelRequest, VercelResponse } from 'vercel';
import { getSupabaseAdmin, requireAdmin } from '../_supabase.js';

function parseBody(req: VercelRequest) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return req.body as Record<string, any>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'GET,POST,PATCH,DELETE,OPTIONS');
    return res.status(204).end();
  }
  if (!requireAdmin(req, res)) return;
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

  const resource = slug[0] ?? pathSegments[1] ?? pathSegments[0];
  const id = slug[1] ?? pathSegments[2];

  if (resource === 'articles') {
    if (!id) {
      if (req.method === 'GET') {
        try {
          const { page = '1', pageSize = '20', q, status, tag } = req.query as Record<string, string | undefined>;
          const p = Math.max(1, parseInt(String(page), 10) || 1);
          const ps = Math.min(100, Math.max(1, parseInt(String(pageSize), 10) || 20));

          let query = supabase
            .from('articles')
            .select('*', { count: 'exact' })
            .order('updated_at', { ascending: false })
            .range((p - 1) * ps, p * ps - 1);

          if (status) query = query.eq('status', status);
          if (q) query = query.or(`title.ilike.%${q}%,slug.ilike.%${q}%`);
          if (tag) query = query.contains('tags', [tag] as any);

          const { data, error, count } = await query;
          if (error) return res.status(500).json({ message: error.message });
          return res.json({ data: data || [], count: count || 0, page: p, pageSize: ps });
        } catch (e: any) {
          return res.status(500).json({ message: e?.message || 'Server error' });
        }
      }

      if (req.method === 'POST') {
        try {
          const body = { ...parseBody(req), updated_at: new Date().toISOString() };
          if (body.id) {
            const { data, error } = await supabase
              .from('articles')
              .update(body)
              .eq('id', body.id)
              .select()
              .single();
            if (error) return res.status(400).json({ message: error.message });
            return res.status(200).json(data);
          }

          const { data, error } = await supabase
            .from('articles')
            .insert(body)
            .select()
            .single();
          if (error) return res.status(400).json({ message: error.message });
          return res.status(201).json(data);
        } catch (e: any) {
          return res.status(500).json({ message: e?.message || 'Server error' });
        }
      }

      res.setHeader('Allow', 'GET,POST,OPTIONS');
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

    if (req.method === 'GET') {
      try {
        const { data, error } = await supabase.from('articles').select('*').eq('id', id).single();
        if (error) return res.status(404).json({ message: 'Not found' });
        return res.json(data);
      } catch (e: any) {
        return res.status(500).json({ message: e?.message || 'Server error' });
      }
    }

    if (req.method === 'PATCH') {
      try {
        const patch = { ...parseBody(req), updated_at: new Date().toISOString() };
        const { data, error } = await supabase
          .from('articles')
          .update(patch)
          .eq('id', id)
          .select()
          .single();
        if (error) return res.status(400).json({ message: error.message });
        return res.json(data);
      } catch (e: any) {
        return res.status(500).json({ message: e?.message || 'Server error' });
      }
    }

    if (req.method === 'DELETE') {
      try {
        const { error } = await supabase.from('articles').delete().eq('id', id);
        if (error) return res.status(400).json({ message: error.message });
        return res.status(204).end();
      } catch (e: any) {
        return res.status(500).json({ message: e?.message || 'Server error' });
      }
    }

    res.setHeader('Allow', 'GET,PATCH,DELETE,OPTIONS');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  return res.status(404).json({ message: 'Not Found' });
}
