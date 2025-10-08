import fs from 'fs/promises';
import path from 'path';
import { PRERENDER_ROUTES } from '../shared/seoRoutes';
import { products as allProducts } from '../client/src/data/products';

const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://www.iboothme.com').replace(/\/$/, '');
const distPublic = path.resolve('dist', 'public');
const templatePath = path.join(distPublic, 'index.html');
const outputDir = path.join(distPublic, 'prerender');

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalisePath(routePath: string) {
  if (!routePath || routePath === '/') return '';
  return routePath.replace(/^[\/]+/, '').replace(/\/+$/, '');
}

function toAbsolute(urlOrPath?: string | null) {
  if (!urlOrPath) return undefined;
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath;
  const normalised = urlOrPath.startsWith('/') ? urlOrPath : `/${urlOrPath}`;
  return `${siteUrl}${normalised}`;
}

type Product = (typeof allProducts)[number];

const desiredProductOrder = [
  'iboothme-x',
  'glamdroid',
  'claw-machine',
  'gumball-x',
  'locker-x',
  'vending-x',
  'arcade-x',
  'mega-vending',
  'retro-x',
  'slider-180',
  'scribble-booth',
  'slider-12',
  'catch-baton',
  'gift-box',
  'booth-360',
  'gobooth',
];

const serviceRoutes: Record<string, { name: string; serviceType: string; image?: string; description: string }> = {
  '/experiential-marketing': {
    name: 'Experiential Marketing',
    serviceType: 'Experiential Marketing',
    image: '/images/Brand Activation.jpg',
    description: 'Immersive brand activations and interactive experiences.',
  },
  '/ai-technology': {
    name: 'AI Technology',
    serviceType: 'AI Event Technology',
    image: '/images/studio-ai-example.jpg',
    description: 'AI-driven interactive experiences for events.',
  },
  '/analytics': {
    name: 'Event Analytics',
    serviceType: 'Event Analytics & Reporting',
    image: '/images/studio-ai-example.jpg',
    description: 'Dashboards and insights for event performance.',
  },
  '/robotics': {
    name: 'Robotics',
    serviceType: 'Robotic Event Activations',
    image: '/images/robotics-talia.png',
    description: 'Robotic experiences for events.',
  },
  '/personalised-merch': {
    name: 'Personalised Merchandise',
    serviceType: 'Personalised Merchandise',
    image: '/images/gift-box-purple.png',
    description: 'On-demand branded merchandise for events.',
  },
  '/tailored-software-solutions': {
    name: 'Tailored Software Solutions',
    serviceType: 'Custom Event Software',
    image: '/images/tech.png',
    description: 'Custom software for events and brand activations.',
  },
  '/gamifications': {
    name: 'Gamifications',
    serviceType: 'Brand Gamification',
    image: '/images/gumball-x-purple.png',
    description: 'Interactive games for events.',
  },
};

function buildServiceSchema(routePath: string) {
  const cfg = serviceRoutes[routePath];
  if (!cfg) return [] as Record<string, any>[];
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: cfg.name,
      description: cfg.description,
      serviceType: cfg.serviceType,
      provider: {
        '@type': 'Organization',
        name: 'iboothme',
        url: siteUrl,
        logo: toAbsolute('/images/icon.svg'),
      },
      areaServed: ['United Arab Emirates', 'GCC'],
      audience: {
        '@type': 'Audience',
        audienceType: 'Brands & Agencies',
      },
      url: toAbsolute(routePath),
      image: cfg.image ? toAbsolute(cfg.image) : undefined,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: toAbsolute(`/contact-us?service=${encodeURIComponent(routePath.replace(/^\//, ''))}`),
      },
    },
  ];
}

function buildProductsSchemas() {
  const indexMap = new Map<string, number>(desiredProductOrder.map((id, idx) => [id, idx]));
  const sortedProducts = [...allProducts].sort((a: Product, b: Product) => {
    const ia = indexMap.get(a.id) ?? Number.MAX_SAFE_INTEGER;
    const ib = indexMap.get(b.id) ?? Number.MAX_SAFE_INTEGER;
    return ia - ib;
  });

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'iboothme Experiential Products',
    itemListElement: sortedProducts.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: toAbsolute(`/products/${product.id}`),
      item: {
        '@type': 'Product',
        name: product.name,
        image: product.image ? toAbsolute(product.image) : undefined,
        description: product.description,
        brand: { '@type': 'Brand', name: 'iboothme' },
        category: product.tier,
      },
    })),
  };

  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Products',
    description: 'Interactive booths and experiential products for events.',
    url: toAbsolute('/products'),
    mainEntity: itemList,
  };

  return [collection, itemList];
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

(async () => {
  try {
    const template = await fs.readFile(templatePath, 'utf8');
    await ensureDir(outputDir);

    const globalJsonLd = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'iboothme',
        url: siteUrl,
        logo: toAbsolute('/images/icon.svg'),
        sameAs: [
          'https://www.linkedin.com/company/iboothme/',
          'https://www.instagram.com/iboothme/',
          'https://www.facebook.com/iboothme/'
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+971-4-333-7700',
            contactType: 'customer service',
            areaServed: 'AE'
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'iboothme',
        url: siteUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      }
    ];

    const googleVerification = process.env.VITE_GOOGLE_SITE_VERIFICATION || process.env.GOOGLE_SITE_VERIFICATION || '';
    const bingVerification = process.env.VITE_BING_SITE_VERIFICATION || process.env.BING_SITE_VERIFICATION || '';

    for (const route of PRERENDER_ROUTES) {
      const canonical = toAbsolute(route.path) || siteUrl;
      const headTags: string[] = [];
      headTags.push(`<title>${escapeHtml(route.title)}</title>`);
      headTags.push(`<meta name="description" content="${escapeHtml(route.description)}" />`);
      headTags.push(`<link rel="canonical" href="${canonical}" />`);
      headTags.push(`<meta name="robots" content="${route.robots || 'index,follow'}" />`);
      headTags.push(`<meta property="og:type" content="website" />`);
      headTags.push(`<meta property="og:title" content="${escapeHtml(route.title)}" />`);
      headTags.push(`<meta property="og:description" content="${escapeHtml(route.description)}" />`);
      headTags.push(`<meta property="og:url" content="${canonical}" />`);
      headTags.push(`<meta property="og:site_name" content="iboothme" />`);
      const ogImage = toAbsolute(route.ogImage || '/images/icon.svg');
      if (ogImage) {
        headTags.push(`<meta property="og:image" content="${ogImage}" />`);
        headTags.push(`<meta property="og:image:secure_url" content="${ogImage}" />`);
      }
      headTags.push(`<meta name="twitter:card" content="summary_large_image" />`);
      headTags.push(`<meta name="twitter:title" content="${escapeHtml(route.title)}" />`);
      headTags.push(`<meta name="twitter:description" content="${escapeHtml(route.description)}" />`);
      if (ogImage) headTags.push(`<meta name="twitter:image" content="${ogImage}" />`);
      if (googleVerification) {
        headTags.push(`<meta name="google-site-verification" content="${escapeHtml(googleVerification)}" />`);
      }
      if (bingVerification) {
        headTags.push(`<meta name="msvalidate.01" content="${escapeHtml(bingVerification)}" />`);
      }

      const jsonLdEntries = Array.isArray(route.jsonLd)
        ? route.jsonLd
        : route.jsonLd
          ? [route.jsonLd]
          : [];
      const serviceSchemas = buildServiceSchema(route.path);
      const productSchemas = route.path === '/products' ? buildProductsSchemas() : [];
      const scripts = [...globalJsonLd, ...jsonLdEntries, ...serviceSchemas, ...productSchemas];
      for (const schema of scripts) {
        headTags.push(`<script type="application/ld+json">${JSON.stringify(schema)}</script>`);
      }

      let html = template;
      // Remove existing title tags if present
      html = html.replace(/<title>.*?<\/title>/is, '');
      const injection = `    ${headTags.join('\n    ')}\n  </head>`;
      html = html.replace(/<\/head>/i, injection);

      const relative = normalisePath(route.path);
      const fileDir = relative ? path.join(outputDir, relative) : outputDir;
      await ensureDir(fileDir);
      const filePath = path.join(fileDir, 'index.html');
      await fs.writeFile(filePath, html, 'utf8');
      console.log(`Pre-rendered ${route.path} -> ${path.relative(process.cwd(), filePath)}`);
    }
  } catch (err) {
    console.error('[prerender] Failed:', err);
    process.exitCode = 1;
  }
})();
