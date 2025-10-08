export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  location?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Lina Haddad',
    role: 'Head of Brand Experience',
    company: 'PepsiCo MENA',
    quote:
      'iboothme delivered a frictionless activation that blended robotics with live analytics. Engagement jumped 160% versus our previous tours.',
    rating: 5,
    location: 'Dubai, UAE'
  },
  {
    name: 'Marco Ruiz',
    role: 'Experiential Marketing Director',
    company: 'Red Bull GCC',
    quote:
      'The AI effects and custom gamification kept queues excited and sharing. The iboothme team handled creative, hardware, and data flawlessly.',
    rating: 5,
    location: 'Riyadh, KSA'
  },
  {
    name: 'Sara Khan',
    role: 'Events & Partnerships Lead',
    company: 'Adidas Middle East',
    quote:
      'From concept to analytics dashboard, iboothme acted like an embedded partner. We captured more qualified leads than any previous launch.',
    rating: 4.8,
    location: 'Doha, Qatar'
  }
];
