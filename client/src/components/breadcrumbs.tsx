import React, { useMemo } from 'react';
import { absoluteUrl } from "@/lib/siteMeta";

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items, className = '' }: { items: Crumb[]; className?: string }) {
  const breadcrumbJson = useMemo(() => {
    const itemListElement = items.map((item, idx) => {
      const fallbackHref = typeof window !== 'undefined' ? window.location.pathname : undefined;
      const target = item.href || fallbackHref;
      const url = target ? absoluteUrl(target) : undefined;
      const payload: Record<string, unknown> = {
        "@type": "ListItem",
        position: idx + 1,
        name: item.label,
      };
      if (url) payload.item = url;
      return payload;
    });
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement,
    });
  }, [items]);

  return (
    <>
      <nav aria-label="Breadcrumb" className={`mb-4 text-sm text-white/70 ${className}`}>
        <ol className="mx-auto max-w-3xl flex items-center justify-center gap-2 text-center">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={idx} className="flex items-center gap-2">
                {isLast || !item.href ? (
                  <span className="text-white">{item.label}</span>
                ) : (
                  <a href={item.href} className="hover:text-white">{item.label}</a>
                )}
                {!isLast && <span aria-hidden>›</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJson }} />
    </>
  );
}
