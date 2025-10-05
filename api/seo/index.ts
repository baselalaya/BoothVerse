import type { VercelRequest, VercelResponse } from 'vercel';
import { getSupabaseAdmin, requireAdmin } from '../_supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const supabase = getSupabaseAdmin();
  if (req.method === 'GET') {
    if (!requireAdmin(req, res)) return;
    const { data, error } = await supabase.from('seo_configs').select('*').order('id');
    if (error) return res.status(500).json({ message: error.message });
    return res.json(data || []);
  }
  if (req.method === 'POST') {
    if (!requireAdmin(req, res)) return;
    const body = req.body || {};
    if (!body.id) return res.status(400).json({ message: 'id is required (route path)' });
    body.updated_at = new Date().toISOString();
    const { data, error } = await supabase.from('seo_configs').upsert(body, { onConflict: 'id' }).select().single();
    if (error) return res.status(500).json({ message: error.message });
    return res.json(data);
  }
  res.setHeader('Allow', 'GET,POST');
  return res.status(405).json({ message: 'Method Not Allowed' });
}
