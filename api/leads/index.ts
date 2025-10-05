import type { VercelRequest, VercelResponse } from 'vercel';
import { getSupabaseAdmin, requireAdmin } from '../_supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const supabase = getSupabaseAdmin();
  if (req.method === 'POST') {
    try {
      const { name, email, phone, company, product, message, source_path, utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid } = req.body || {};
      if (!name || !email) return res.status(400).json({ message: 'Missing required fields' });
      const inferredSource = source_path || (req.headers['referer'] as string | undefined) || null;
      const { data, error } = await supabase.from('leads').insert({ name, email, phone, company, product, message, source_path: inferredSource, utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid }).select().single();
      if (error) return res.status(500).json({ message: error.message });
      return res.status(201).json(data);
    } catch (e:any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  }

  if (req.method === 'GET') {
    if (!requireAdmin(req, res)) return;
    try {
      const { page = '1', pageSize = '20', status, q } = req.query as any;
      const p = Math.max(1, parseInt(String(page)));
      const ps = Math.min(100, Math.max(1, parseInt(String(pageSize))));
      let query = supabase.from('leads').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range((p-1)*ps, p*ps - 1);
      if (status) query = query.eq('status', String(status));
      if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%`);
      const { data, error, count } = await query;
      if (error) return res.status(500).json({ message: error.message });
      return res.json({ data, count, page: p, pageSize: ps });
    } catch (e:any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  }

  res.setHeader('Allow', 'GET,POST');
  return res.status(405).json({ message: 'Method Not Allowed' });
}
