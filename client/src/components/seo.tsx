import React from "react";
import { absoluteUrl, getSiteUrl } from "@/lib/siteMeta";

type SeoProps = {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  ogImage?: string;
  keywords?: string[];
  jsonLd?: object | string;
};

const SITE_NAME = "iboothme";
const DEFAULT_OG = "/images/icon.svg";
const SITE_URL = getSiteUrl();

export function Seo({
  title,
  description,
  canonical,
  robots = "index,follow",
  ogImage,
  keywords,
  jsonLd,
}: SeoProps) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = canonical ? absoluteUrl(canonical) : undefined;
  const og = absoluteUrl(ogImage || DEFAULT_OG);
  const kw = keywords?.join(", ");
  const json = typeof jsonLd === "string" ? jsonLd : jsonLd ? JSON.stringify(jsonLd) : undefined;

  return (
    <>
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}
      {kw && <meta name="keywords" content={kw} />} 
      <meta name="robots" content={robots} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content={SITE_NAME} />
      {og && (
        <>
          <meta property="og:image" content={og} />
          <meta property="og:image:secure_url" content={og} />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {og && <meta name="twitter:image" content={og} />}

      {/* JSON-LD */}
      {json && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      )}
    </>
  );
}

export default Seo;
