const ENV = (typeof import.meta !== 'undefined' ? (import.meta as any).env : {}) as Record<string, string>;
const FALLBACK_SITE_URL = 'https://www.iboothme.com';

export function getSiteUrl(): string {
  const envUrl = ENV?.VITE_SITE_URL || '';
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/$/, '');
  }
  return (envUrl || FALLBACK_SITE_URL).replace(/\/$/, '');
}

export function absoluteUrl(pathOrUrl?: string | null): string | undefined {
  if (!pathOrUrl) return undefined;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const normalised = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${getSiteUrl()}${normalised}`;
}

export function getLogoUrl(): string {
  return absoluteUrl('/images/icon.svg')!;
}

export const SOCIAL_LINKS = [
  'https://www.linkedin.com/company/iboothme/',
  'https://www.instagram.com/iboothme/',
  'https://www.facebook.com/iboothme/',
];

export function getVerificationCodes() {
  return {
    google: ENV?.VITE_GOOGLE_SITE_VERIFICATION || '',
    bing: ENV?.VITE_BING_SITE_VERIFICATION || '',
  };
}

type ServiceSchemaInput = {
  name: string;
  description: string;
  slug: string;
  image?: string;
  serviceType?: string;
  areaServed?: string[];
  audience?: string;
};

export function buildServiceSchema({
  name,
  description,
  slug,
  image,
  serviceType,
  areaServed = ['United Arab Emirates'],
  audience = 'Brands & Agencies',
}: ServiceSchemaInput) {
  const url = absoluteUrl(slug);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: serviceType || name,
    provider: {
      "@type": "Organization",
      name: "iboothme",
      url: getSiteUrl(),
      logo: getLogoUrl(),
    },
    areaServed,
    audience: {
      "@type": "Audience",
      audienceType: audience,
    },
    url,
    image: image ? absoluteUrl(image) : undefined,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/contact-us?service=${encodeURIComponent(slug.replace(/^\//, ''))}`),
    },
  };
}
