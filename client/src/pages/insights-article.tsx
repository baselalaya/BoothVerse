import Navigation from "@/components/navigation";
import FooterSection from "@/components/footer-section";
import Seo from "@/components/seo";
import Breadcrumbs from "@/components/breadcrumbs";
import { useEffect, useMemo, useState } from "react";
import { useRoute } from "wouter";
import { absoluteUrl, getLogoUrl } from "@/lib/siteMeta";
import { products } from "@/data/products";

type Article = {
  id: string; title: string; slug: string; excerpt?: string; cover_image?: string; content: string; tags?: string[]; author?: string; published_at?: string;
};

function mdToHtml(md: string){
  // minimal markdown -> HTML (headings, bold/italic, links, paragraphs)
  let html = md
    .replace(/^###\s(.+)$/gm, '<h3>$1</h3>')
    .replace(/^##\s(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#\s(.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1<\/a>')
    .split(/\n\n+/).map(p=>`<p>${p}</p>`).join('\n');
  return html;
}

export default function InsightArticlePage(){
  const [, params] = useRoute('/insights/:slug');
  const slug = params?.slug || '';
  const [article, setArticle] = useState<Article|undefined>();
  const [error, setError] = useState<string|undefined>();
  const relatedProducts = useMemo(() => {
    if (!article) return [] as typeof products;
    const tags = new Set((article.tags || []).map(t => t.toLowerCase()));
    return products.filter(product =>
      product.tags?.some(tag => tags.has(tag.toLowerCase()))
    ).slice(0, 4);
  }, [article]);

  useEffect(()=>{ (async()=>{
    const tryFetch = async (url: string) => {
      const res = await fetch(url);
      const ct = res.headers.get('content-type') || '';
      // If JSON, parse normally
      if (ct.includes('application/json')) {
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || res.statusText || 'Request failed');
        return json;
      }
      // Otherwise read as text and detect HTML fallbacks
      const txt = await res.text();
      if (/<!DOCTYPE html>|<html[\s>]/i.test(txt)) {
        throw new Error('Received HTML from API (routing fallback)');
      }
      try { return JSON.parse(txt); } catch {}
      throw new Error('Unexpected non-JSON response');
    };

    setError(undefined);
    try {
      const candidates = [
        `/api/articles?slug=${encodeURIComponent(slug)}`,
        `/api/articles/${encodeURIComponent(slug)}`,
      ];

      let data: any;
      let lastError: any;
      for (const url of candidates) {
        try {
          data = await tryFetch(url);
          break;
        } catch (err) {
          lastError = err;
        }
      }

      if (!data) throw lastError || new Error('Failed to load article');
      let normalized = data;
      if (normalized && typeof normalized === 'object' && !Array.isArray(normalized) && !('slug' in normalized) && 'data' in normalized) {
        normalized = (normalized as any).data;
      }
      if (Array.isArray(normalized)) {
        normalized = normalized[0];
      }
      if (!normalized || typeof normalized !== 'object' || !('slug' in normalized)) {
        throw new Error('Unexpected article payload');
      }
      setArticle(normalized as Article);
    } catch (e:any) {
      const msg = typeof e?.message === 'string' ? e.message : 'Failed to load article';
      setError(msg);
    }
  })(); }, [slug]);

  const jsonLd = useMemo(()=>{
    if (!article) return null;
    const authorName = article.author || 'iboothme Editorial Team';
    const cover = article.cover_image ? absoluteUrl(article.cover_image) : undefined;
    return {
      "@context":"https://schema.org",
      "@type":"Article",
      headline: article.title,
      description: article.excerpt,
      datePublished: article.published_at || undefined,
      author: {
        "@type":"Person",
        name: authorName,
      },
      publisher: {
        "@type": "Organization",
        name: "iboothme",
        logo: {
          "@type": "ImageObject",
          url: getLogoUrl(),
        },
      },
      image: cover ? [cover] : undefined,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": absoluteUrl(`/insights/${article.slug}`),
      },
      keywords: (article.tags||[]).join(', ')
    } as any;
  }, [article]);

  const html = useMemo(()=> article ? mdToHtml(article.content||'') : '', [article]);

  return (
    <div className="relative min-h-screen text-white">
      <Seo title={article?.title || 'Article'} description={article?.excerpt} canonical={`/insights/${slug}`} jsonLd={jsonLd || undefined} />
      <Navigation />
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10 md:py-14">
        <Breadcrumbs items={[{ label:'Insights & Inspiration', href:'/insights' }, { label: article?.title || 'Article' }]} />
        {error && <div className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-200">{error}</div>}
        {!article ? (
          <div className="min-h-[40vh] w-full flex items-center justify-center">
            <div className="flex items-center gap-3 text-white/80 bg-white/5 border border-white/10 rounded-xl px-4 py-3 animate-fade-in">
              <svg className="animate-spin h-4 w-4 text-white/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span className="text-sm">Loading article…</span>
            </div>
          </div>
        ) : (
          <article>
            <header className="mb-6">
              <h1 className="text-3xl md:text-4xl font-black">{article.title}</h1>
              <div className="text-white/70 text-sm mt-2">
                {article.published_at && new Date(article.published_at).toLocaleDateString()}
              </div>
            </header>
            {article.cover_image && (
              <img src={article.cover_image} alt={article.title} className="w-full rounded-2xl border border-white/10 mb-6" />
            )}
            <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
            <footer className="mt-8 flex flex-wrap gap-2">
              {(article.tags||[]).map(t=> (<span key={t} className="text-xs px-2 py-1 rounded-full border border-white/20 bg-white/10">{t}</span>))}
            </footer>
            {relatedProducts.length > 0 && (
              <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold text-white mb-3">Experiential Solutions Mentioned</h2>
                <p className="text-white/70 text-sm mb-5">
                  Elevate your next activation with the technologies highlighted in this article.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {relatedProducts.map(product => (
                    <a key={product.id} href={`/products/${product.id}`} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-white/20">
                      <div className="text-xs uppercase tracking-wide text-purple-200/90">{product.meta}</div>
                      <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                      <p className="text-sm text-white/75 line-clamp-3">
                        {product.description}
                      </p>
                      <span className="text-sm text-purple-200/90">Discover the {product.name} experiential solution →</span>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </article>
        )}
      </main>
      <FooterSection />
    </div>
  );
}
