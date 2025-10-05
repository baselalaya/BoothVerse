import type { VercelRequest, VercelResponse } from 'vercel';
import { getSupabaseAdmin } from '../_supabase.js';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from('settings').select('value').eq('key', 'ga_measurement_id').single();
    if (error && (error as any).code !== 'PGRST116') return res.status(500).json({ id: null });
    return res.json({ id: data?.value || null });
  } catch {
    return res.json({ id: null });
  }
}
