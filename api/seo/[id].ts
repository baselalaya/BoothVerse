import type { VercelRequest, VercelResponse } from 'vercel';
import { getSupabaseAdmin, requireAdmin } from '../_supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const supabase = getSupabaseAdmin();
  const id = req.query.id as string;
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('seo_configs').select('*').eq('id', id).single();
    if (error) return res.status(404).json({ message: 'Not found' });
    return res.json(data);
  }
  if (req.method === 'PUT') {
    if (!requireAdmin(req, res)) return;
    const patch = req.body || {};
    patch.updated_at = new Date().toISOString();
    const { data, error } = await supabase.from('seo_configs').update(patch).eq('id', id).select().single();
    if (error) return res.status(500).json({ message: error.message });
    return res.json(data);
  }
  res.setHeader('Allow', 'GET,PUT');
  return res.status(405).json({ message: 'Method Not Allowed' });
}
