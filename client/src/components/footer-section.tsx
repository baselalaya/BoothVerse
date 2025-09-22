import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Twitter, Linkedin, Send } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Link } from "wouter";

const productsLinks = [
  { name: "Photo Booths", href: "/products" },
  { name: "AI Technology", href: "/ai-technology" },
  { name: "Analytics", href: "/analytics" },
  { name: "Custom Merch", href: "#merch" },
] as const;
const companyLinks = [
  { name: "About", href: "#about" },
  { name: "Our Story", href: "#story" },
  { name: "Careers", href: "#careers" },
  { name: "Contact", href: "#contact" },
] as const;
const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

export default function FooterSection() {
  const prefersReducedMotion = useReducedMotion();
  const [ref, isIntersecting] = useIntersectionObserver();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  };

  return (
    <footer
      ref={ref}
      className="relative py-20 md:py-24 overflow-hidden"
      data-testid="footer-section"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/20 to-transparent" />
      <div className="pointer-events-none absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-neon-purple/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[520px] h-[520px] rounded-full bg-neon-blue/15 blur-[120px]" />
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6"
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Two-row layout: Row 1 = links (+social/newsletter shifted up), Row 2 = reserved */}
        <div className="grid grid-cols-1 gap-8 md:gap-10 mb-12 md:mb-16">
          {/* Row 1: Brand + Links + Legal + Stay in Touch */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
            {/* Brand */}
            <motion.div variants={fadeUpVariants}>
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/icon.svg" width={40} height={40} alt="iBoothme" className="opacity-90" />
              <div className="text-2xl font-bold gradient-text">iBoothme</div>
            </div>
            <p className="text-gray-300/90 mb-6 max-w-sm">Premium AI0powered brand experiences for the world0s best campaigns.</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300/90" aria-label="badges">
              <span className="inline-flex items-center gap-2"><span aria-hidden className="w-2 h-2 rounded-full bg-emerald-400" /> Available</span>
              <span className="inline-flex items-center gap-2"><span aria-hidden className="w-2 h-2 rounded-full bg-fuchsia-400" /> Made in GCC</span>
              <span className="inline-flex items-center gap-2"><span aria-hidden className="w-2 h-2 rounded-full bg-sky-400" /> GDPR</span>
            </div>
            </motion.div>

            {/* Products */}
            <motion.div variants={fadeUpVariants}>
            <h2 className="text-lg font-bold tracking-wide text-white/90 mb-5">Products</h2>
            <ul className="space-y-3 text-[15px]">
              {productsLinks.map(({ name, href }) => (
                <li key={name}>
                  {href.startsWith("/") ? (
                    <Link href={href} key={name}>
                      <a className="text-gray-300 hover:text-white transition-colors duration-300 underline-offset-4 hover:underline">{name}</a>
                    </Link>
                  ) : (
                    <a href={href} className="text-gray-300 hover:text-white transition-colors duration-300 underline-offset-4 hover:underline" key={name}>{name}</a>
                  )}
                </li>
              ))}
            </ul>
            </motion.div>
          
            {/* Company */}
            <motion.div variants={fadeUpVariants}>
            <h2 className="text-lg font-bold tracking-wide text-white/90 mb-5">Company</h2>
            <ul className="space-y-3 text-[15px]">
              {companyLinks.map(({ name, href }) => (
                <li key={name}>
                  {href.startsWith("/") ? (
                    <Link href={href} key={name}>
                      <a className="text-gray-300 hover:text-white transition-colors duration-300 underline-offset-4 hover:underline">{name}</a>
                    </Link>
                  ) : (
                    <a href={href} className="text-gray-300 hover:text-white transition-colors duration-300 underline-offset-4 hover:underline" key={name}>{name}</a>
                  )}
                </li>
              ))}
            </ul>
            </motion.div>

            {/* Legal */}
            <motion.div variants={fadeUpVariants}>
              <h2 className="text-lg font-bold tracking-wide text-white/90 mb-5" data-testid="footer-legal-title">Legal</h2>
              <ul className="space-y-3 text-[15px]">
                {legalLinks.map((link) => (
                  <li key={link}>
                    <a 
                      href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                      className="text-gray-300 hover:text-white transition-colors duration-300 underline-offset-4 hover:underline"
                      data-testid={`footer-legal-${link.toLowerCase().replace(/ /g, '-')}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
            {/* Stay in Touch column removed */}
          </div>
          {/* Row 2: (intentionally left empty for future use) */}
          </div>
        
        <motion.div
          className="pt-6 md:pt-8 border-t border-white/10"
          variants={fadeUpVariants}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <div className="text-gray-400 text-center md:text-left text-xs md:text-sm" data-testid="footer-copyright">
              2025 iBoothme. Revolutionizing brand experiences worldwide.
            </div>
            {/* Social icons moved to bottom-right */}
            <div className="flex items-center gap-4" aria-label="footer social links">
              <a href="https://instagram.com/iboothme" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Button size="icon" variant="outline" className="glass-effect rounded-full hover:scale-110 transition-all duration-300" data-testid="footer-social-instagram">
                  <Instagram size={18} />
                </Button>
              </a>
              <a href="https://twitter.com/iboothme" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Button size="icon" variant="outline" className="glass-effect rounded-full hover:scale-110 transition-all duration-300" data-testid="footer-social-twitter">
                  <Twitter size={18} />
                </Button>
              </a>
              <a href="https://linkedin.com/company/iboothme" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Button size="icon" variant="outline" className="glass-effect rounded-full hover:scale-110 transition-all duration-300" data-testid="footer-social-linkedin">
                  <Linkedin size={18} />
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
