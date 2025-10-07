import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL as string;
  const key = process.env.SUPABASE_SERVICE_ROLE as string;
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE env");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

function requireAdmin(req: any, res: any, next: any) {
  const header = req.headers["x-admin-key"]; 
  if (!process.env.ADMIN_PASSWORD) return res.status(500).json({ message: "ADMIN_PASSWORD not set" });
  if (header !== process.env.ADMIN_PASSWORD) return res.status(401).json({ message: "Unauthorized" });
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // simple endpoint to accept product activation requests
  app.post('/api/activate', (req, res) => {
    const { name, email, company, eventDate, guests, notes, productId } = req.body || {}
    if (!name || !email || !productId) {
      return res.status(400).json({ message: 'Missing required fields' })
    }
    // In a real implementation, persist or forward to CRM/email.
    // For now, just echo success.
    return res.status(200).json({ ok: true })
  })

  // leads: public creation
  app.post('/api/leads', async (req, res) => {
    try {
      const supabase = getSupabaseAdmin();
      const { name, email, phone, company, product, message, source_path, utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid } = req.body || {};
      if (!name || !email) return res.status(400).json({ message: 'Missing required fields' });
      const inferredSource = source_path || (req.headers['referer'] as string | undefined) || null;
      const { data, error } = await supabase.from('leads').insert({ name, email, phone, company, product, message, source_path: inferredSource, utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid }).select().single();
      if (error) return res.status(500).json({ message: error.message });
      return res.status(201).json(data);
    } catch (e:any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  // Articles: Public list (published only)
  app.get('/api/articles', async (req, res) => {
    try {
      const supabase = getSupabaseAdmin();
      const { page = '1', pageSize = '12', q, tag } = req.query as any;
      const p = Math.max(1, parseInt(page));
      const ps = Math.min(50, Math.max(1, parseInt(pageSize)));
      let query = supabase
        .from('articles')
        .select('id,title,slug,excerpt,cover_image,tags,author,published_at', { count: 'exact' })
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .range((p - 1) * ps, p * ps - 1);
      if (q) query = query.or(`title.ilike.%${q}%,slug.ilike.%${q}%`);
      if (tag) query = query.contains('tags', [tag]);
      const { data, error, count } = await query;
      if (error) return res.status(500).json({ message: error.message });
      res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
      return res.json({ data, count, page: p, pageSize: ps });
    } catch (e: any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  // Articles: Public single by slug
  app.get('/api/articles/:slug', async (req, res) => {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', req.params.slug)
        .eq('status', 'published')
        .single();
      if (error) return res.status(404).json({ message: 'Not found' });
      res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=1200');
      return res.json(data);
    } catch (e: any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  // Admin: Articles list
  app.get('/api/admin/articles', requireAdmin, async (req, res) => {
    try {
      const supabase = getSupabaseAdmin();
      const { page = '1', pageSize = '20', q, status, tag } = req.query as any;
      const p = Math.max(1, parseInt(page));
      const ps = Math.min(100, Math.max(1, parseInt(pageSize)));
      let query = supabase
        .from('articles')
        .select('*', { count: 'exact' })
        .order('updated_at', { ascending: false })
        .range((p - 1) * ps, p * ps - 1);
      if (status) query = query.eq('status', status);
      if (q) query = query.or(`title.ilike.%${q}%,slug.ilike.%${q}%`);
      if (tag) query = query.contains('tags', [tag]);
      const { data, error, count } = await query;
      if (error) return res.status(500).json({ message: error.message });
      return res.json({ data, count, page: p, pageSize: ps });
    } catch (e: any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  // Admin: Article by id
  app.get('/api/admin/articles/:id', requireAdmin, async (req, res) => {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase.from('articles').select('*').eq('id', req.params.id).single();
      if (error) return res.status(404).json({ message: 'Not found' });
      return res.json(data);
    } catch (e: any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  // Admin: Create/Upsert article
  app.post('/api/admin/articles', requireAdmin, async (req, res) => {
    try {
      const body = req.body || {};
      const supabase = getSupabaseAdmin();
      body.updated_at = new Date().toISOString();
      const isUpdate = !!body.id;
      let rpc;
      if (isUpdate) {
        const { data, error } = await supabase.from('articles').update(body).eq('id', body.id).select().single();
        if (error) return res.status(400).json({ message: error.message });
        rpc = data;
      } else {
        const { data, error } = await supabase.from('articles').insert(body).select().single();
        if (error) return res.status(400).json({ message: error.message });
        rpc = data;
      }
      return res.status(200).json(rpc);
    } catch (e: any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  // Admin: Patch article
  app.patch('/api/admin/articles/:id', requireAdmin, async (req, res) => {
    try {
      const patch = { ...(req.body || {}), updated_at: new Date().toISOString() };
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase.from('articles').update(patch).eq('id', req.params.id).select().single();
      if (error) return res.status(400).json({ message: error.message });
      return res.json(data);
    } catch (e: any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  // Admin: Delete article
  app.delete('/api/admin/articles/:id', requireAdmin, async (req, res) => {
    try {
      const supabase = getSupabaseAdmin();
      const { error } = await supabase.from('articles').delete().eq('id', req.params.id);
      if (error) return res.status(400).json({ message: error.message });
      return res.json({ ok: true });
    } catch (e: any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  // GA4 summary (admin) via Google Analytics Data API
  app.get('/api/ga/summary', requireAdmin, async (_req, res) => {
    try {
      const propertyId = process.env.GA_PROPERTY_ID;
      const clientEmail = process.env.GA_CLIENT_EMAIL;
      let privateKey = process.env.GA_PRIVATE_KEY;
      if (!propertyId || !clientEmail || !privateKey) {
        return res.status(200).json({ available: false, message: 'GA credentials not set' });
      }
      privateKey = privateKey.replace(/\\n/g, '\n');
      const { BetaAnalyticsDataClient } = await import('@google-analytics/data');
      const analyticsDataClient = new BetaAnalyticsDataClient({
        credentials: { client_email: clientEmail, private_key: privateKey },
      });
      const [report] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [
          { name: 'totalUsers' },
          { name: 'activeUsers' },
          { name: 'newUsers' },
          { name: 'screenPageViews' },
          { name: 'eventCount' },
          { name: 'sessions' },
          { name: 'conversions' }
        ],
      });
      const metricHeaders = report.metricHeaders?.map(h => h.name) || [];
      const row = report.rows?.[0]?.metricValues?.map(v => Number(v.value || 0)) || [];
      const summary: Record<string, number> = {};
      metricHeaders.forEach((name, i) => { summary[name] = row[i] || 0; });
      return res.json({ available: true, summary });
    } catch (e:any) {
      return res.status(200).json({ available: false, message: e?.message || 'GA error' });
    }
  });

  // leads: list (admin)
  app.get('/api/leads', requireAdmin, async (req, res) => {
    try {
      const supabase = getSupabaseAdmin();
      const { page = '1', pageSize = '20', status, q } = req.query as any;
      const p = Math.max(1, parseInt(page));
      const ps = Math.min(100, Math.max(1, parseInt(pageSize)));
      let query = supabase.from('leads').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range((p-1)*ps, p*ps - 1);
      if (status) query = query.eq('status', status as string);
      if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%`);
      const { data, error, count } = await query;
      if (error) return res.status(500).json({ message: error.message });
      return res.json({ data, count, page: p, pageSize: ps });
    } catch (e:any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  app.get('/api/leads/:id', requireAdmin, async (req, res) => {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase.from('leads').select('*').eq('id', req.params.id).single();
      if (error) return res.status(404).json({ message: 'Not found' });
      return res.json(data);
    } catch (e:any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  app.patch('/api/leads/:id', requireAdmin, async (req, res) => {
    try {
      const supabase = getSupabaseAdmin();
      const patch = req.body || {};
      const { data, error } = await supabase.from('leads').update(patch).eq('id', req.params.id).select().single();
      if (error) return res.status(500).json({ message: error.message });
      return res.json(data);
    } catch (e:any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  // SEO config endpoints
  app.get('/api/seo', requireAdmin, async (_req, res) => {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase.from('seo_configs').select('*').order('id');
      if (error) return res.status(500).json({ message: error.message });
      return res.json(data);
    } catch (e:any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  // Public-read SEO config for runtime overrides
  app.get('/api/seo/:id', async (req, res) => {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase.from('seo_configs').select('*').eq('id', req.params.id).single();
      if (error) return res.status(404).json({ message: 'Not found' });
      res.setHeader('Cache-Control', 'public, max-age=600, stale-while-revalidate=3600');
      return res.json(data);
    } catch (e:any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  app.post('/api/seo', requireAdmin, async (req, res) => {
    try {
      const supabase = getSupabaseAdmin();
      const body = req.body || {};
      if (!body.id) return res.status(400).json({ message: 'id is required (route path)' });
      body.updated_at = new Date().toISOString();
      const { data, error } = await supabase.from('seo_configs').upsert(body, { onConflict: 'id' }).select().single();
      if (error) return res.status(500).json({ message: error.message });
      return res.status(200).json(data);
    } catch (e:any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  app.put('/api/seo/:id', requireAdmin, async (req, res) => {
    try {
      const supabase = getSupabaseAdmin();
      const patch = req.body || {};
      patch.updated_at = new Date().toISOString();
      const { data, error } = await supabase.from('seo_configs').update(patch).eq('id', req.params.id).select().single();
      if (error) return res.status(500).json({ message: error.message });
      return res.json(data);
    } catch (e:any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  // Settings endpoints
  // Public read of GA measurement id
  app.get('/api/settings/ga', async (_req, res) => {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase.from('settings').select('value').eq('key', 'ga_measurement_id').single();
      if (error && error.code !== 'PGRST116') return res.status(500).json({ message: error.message });
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.json({ id: data?.value || null });
    } catch (e:any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  // Public read of selected settings (safe keys only, e.g., search console tokens)
  app.get('/api/settings/public', async (_req, res) => {
    try {
      const supabase = getSupabaseAdmin();
      const allowed = ['google_site_verification', 'bing_site_verification'];
      const { data, error } = await supabase.from('settings').select('key,value').in('key', allowed);
      if (error) return res.status(500).json({ message: error.message });
      const out: Record<string, string> = {};
      (data || []).forEach((row: any) => { out[row.key] = row.value; });
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.json(out);
    } catch (e:any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  // Admin: list all settings
  app.get('/api/settings', requireAdmin, async (_req, res) => {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase.from('settings').select('*').order('key');
      if (error) return res.status(500).json({ message: error.message });
      return res.json(data || []);
    } catch (e:any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  // Admin: upsert a setting
  app.post('/api/settings', requireAdmin, async (req, res) => {
    try {
      const supabase = getSupabaseAdmin();
      const { key, value } = req.body || {};
      if (!key) return res.status(400).json({ message: 'key is required' });
      const { data, error } = await supabase.from('settings').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' }).select().single();
      if (error) return res.status(500).json({ message: error.message });
      return res.json(data);
    } catch (e:any) {
      return res.status(500).json({ message: e.message || 'Server error' });
    }
  });

  // SEO: robots.txt
  app.get('/robots.txt', (_req, res) => {
    const host = process.env.CANONICAL_HOST || '';
    const lines = [
      'User-agent: *',
      'Disallow: /admin',
      `Sitemap: ${host ? `https://${host}` : ''}/sitemap.xml`
    ].join('\n');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.send(lines);
  });

  // SEO: sitemap.xml from published articles
  app.get('/sitemap.xml', async (_req, res) => {
    try {
      const host = process.env.CANONICAL_HOST || '';
      const base = host ? `https://${host}` : '';
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase
        .from('articles')
        .select('slug,published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      if (error) return res.status(500).send('');
      const urls = (data || []).map((row: any) => ({
        loc: `${base}/insights/${row.slug}`,
        lastmod: row.published_at ? new Date(row.published_at).toISOString() : undefined,
        changefreq: 'weekly',
        priority: '0.8'
      }));
      const staticUrls = [
        { loc: `${base}/`, changefreq: 'weekly', priority: '1.0' },
        { loc: `${base}/insights`, changefreq: 'daily', priority: '0.9' },
      ];
      const all = [...staticUrls, ...urls];
      const xml = ['<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...all.map(u => {
          return [
            '<url>',
            `<loc>${u.loc}</loc>`,
            u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : '',
            `<changefreq>${u.changefreq}</changefreq>`,
            `<priority>${u.priority}</priority>`,
            '</url>'
          ].filter(Boolean).join('');
        }),
        '</urlset>'
      ].join('');
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
      return res.send(xml);
    } catch {
      return res.status(500).send('');
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
