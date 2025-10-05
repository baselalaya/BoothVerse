import type { VercelRequest, VercelResponse } from 'vercel';
import { getSupabaseAdmin } from '../_supabase.js';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const supabase = getSupabaseAdmin();
    const allowed = ['google_site_verification', 'bing_site_verification'];
    const { data, error } = await supabase.from('settings').select('key,value').in('key', allowed);
    if (error) return res.status(200).json({});
    const out: Record<string, string> = {};
    (data || []).forEach((row: any) => { out[row.key] = row.value; });
    return res.json(out);
  } catch {
    return res.json({});
  }
}
