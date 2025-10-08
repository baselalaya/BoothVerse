export type PrerenderRoute = {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  robots?: string;
  jsonLd?: Array<Record<string, any>> | Record<string, any> | null;
};

export const PRERENDER_ROUTES: PrerenderRoute[] = [
  {
    path: '/',
    title: 'Experiential Marketing Tech & Photo Booths | iboothme',
    description:
      'iboothme delivers cutting-edge experiential marketing: AI tech, gamifications, analytics, and immersive photo/video booths for brand activations.',
    ogImage: '/images/icon.svg',
  },
  {
    path: '/products',
    title: 'Experiential Products & Booths | iboothme',
    description: 'Explore interactive booths and experiential products designed to drive engagement at events and brand activations.',
    ogImage: '/images/booth_unit_1.webp',
  },
  {
    path: '/experiential-marketing',
    title: 'Experiential Marketing Solutions | iboothme',
    description: 'Immersive brand activations, interactive experiences, and measurable engagement across physical and digital touchpoints.',
    ogImage: '/images/Brand Activation.jpg',
  },
  {
    path: '/ai-technology',
    title: 'AI Technology for Experiential Marketing | iboothme',
    description: 'AI-driven photo/video, avatars, and effects to create immersive brand experiences with measurable impact.',
    ogImage: '/images/studio-ai-example.jpg',
  },
  {
    path: '/analytics',
    title: 'Event Analytics & Insights | iboothme',
    description: 'Real-time dashboards and post-event insights to measure engagement, ROI, and content performance across activations.',
    ogImage: '/images/studio-ai-example.jpg',
  },
  {
    path: '/robotics',
    title: 'Robotics for Events | iboothme',
    description: 'Robotic experiences and interactive activations that attract, engage, and delight audiences.',
    ogImage: '/images/robotics-talia.png',
  },
  {
    path: '/personalised-merch',
    title: 'Personalised Merchandise for Events | iboothme',
    description: 'On-demand custom merchandise for events and activations with branding, QR flows, and instant fulfillment.',
    ogImage: '/images/gift-box-purple.png',
  },
  {
    path: '/tailored-software-solutions',
    title: 'Tailored Software Solutions for Brand Activations | iboothme',
    description: 'Custom event software: web apps, AR/AI, games, registration, integrations, and analytics to power activations.',
    ogImage: '/images/tech.png',
  },
  {
    path: '/gamifications',
    title: 'Gamifications for Events | iboothme',
    description: 'Interactive games and challenges that boost engagement and create shareable brand moments.',
    ogImage: '/images/gumball-x-purple.png',
  },
  {
    path: '/insights',
    title: 'Insights & Inspiration | iboothme',
    description: 'Articles, guides, and case studies for experiential marketing and brand activations.',
    ogImage: '/images/icon.svg',
  },
  {
    path: '/video-hub',
    title: 'Video Hub | iboothme',
    description: 'Watch iboothme AI activations and technology in action.',
    ogImage: '/images/robotics-talia.png',
  },
  {
    path: '/creative-results',
    title: 'Creative Results | iboothme',
    description: 'Real project outcomes and successful brand activations delivered by iboothme.',
    ogImage: '/images/icon.svg',
  },
  {
    path: '/contact-us',
    title: 'Contact iboothme | Experiential Marketing Experts',
    description: 'Talk to iboothme about AI-driven booths, experiential marketing solutions, and tailored brand technology.',
    ogImage: '/images/icon.svg',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | iboothme',
    description: 'How iboothme collects, uses, and protects personal information across events and platforms.',
    ogImage: '/images/icon.svg',
    robots: 'noindex,follow',
  },
  {
    path: '/terms',
    title: 'Terms & Conditions | iboothme',
    description: 'Understand the terms and conditions for using iboothme products and experiential services.',
    ogImage: '/images/icon.svg',
    robots: 'noindex,follow',
  },
  {
    path: '/404',
    title: '404 — Page Not Found | iboothme',
    description: 'The page you’re looking for doesn’t exist or was moved.',
    ogImage: '/images/not-found.gif',
    robots: 'noindex, nofollow',
  },
];
