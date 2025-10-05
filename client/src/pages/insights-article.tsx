import Navigation from "@/components/navigation";
import FooterSection from "@/components/footer-section";
import Seo from "@/components/seo";
import Breadcrumbs from "@/components/breadcrumbs";
import { useEffect, useMemo, useState } from "react";
import { useRoute } from "wouter";

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

  useEffect(()=>{ (async()=>{
    try{
      const res = await fetch(`/api/articles/${slug}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message||'Not found');
      setArticle(json);
    }catch(e:any){ setError(e?.message||'Failed'); }
  })(); }, [slug]);

  const jsonLd = useMemo(()=>{
    if (!article) return null;
    return {
      "@context":"https://schema.org",
      "@type":"Article",
      headline: article.title,
      datePublished: article.published_at || undefined,
      author: article.author ? { "@type":"Person", name: article.author } : undefined,
      image: article.cover_image || undefined,
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
          <div className="opacity-70">Loading…</div>
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
          </article>
        )}
      </main>
      <FooterSection />
    </div>
  );
}

