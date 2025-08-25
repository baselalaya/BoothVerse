import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Twitter, Linkedin, Send } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const navigationLinks = ["Home", "Products", "Technology", "Portfolio", "About"];
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
      className="relative py-32 overflow-hidden" 
      data-testid="footer-section"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/20 to-transparent" />
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6"
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Navigation */}
          <motion.div variants={fadeUpVariants}>
            <h3 className="text-2xl font-bold gradient-text mb-6" data-testid="footer-navigation-title">
              Navigation
            </h3>
            <ul className="space-y-4">
              {navigationLinks.map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                    data-testid={`footer-nav-${link.toLowerCase().replace(' ', '-')}`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Social */}
          <motion.div variants={fadeUpVariants}>
            <h3 className="text-2xl font-bold gradient-text mb-6" data-testid="footer-social-title">
              Social
            </h3>
            <div className="flex space-x-4 mb-6">
              <Button
                size="icon"
                variant="outline"
                className="glass-effect rounded-full hover:scale-110 transition-all duration-300 animate-bounce-gentle"
                data-testid="social-instagram"
              >
                <Instagram size={20} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="glass-effect rounded-full hover:scale-110 transition-all duration-300 animate-bounce-gentle"
                data-testid="social-twitter"
              >
                <Twitter size={20} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="glass-effect rounded-full hover:scale-110 transition-all duration-300 animate-bounce-gentle"
                data-testid="social-linkedin"
              >
                <Linkedin size={20} />
              </Button>
            </div>
            <p className="text-gray-400 text-sm">Follow our journey</p>
          </motion.div>
          
          {/* Legal */}
          <motion.div variants={fadeUpVariants}>
            <h3 className="text-2xl font-bold gradient-text mb-6" data-testid="footer-legal-title">
              Legal
            </h3>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                    data-testid={`footer-legal-${link.toLowerCase().replace(' ', '-')}`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact */}
          <motion.div variants={fadeUpVariants}>
            <h3 className="text-2xl font-bold gradient-text mb-6" data-testid="footer-contact-title">
              Contact
            </h3>
            <p className="text-gray-300 mb-4" data-testid="footer-email">hello@ibooth.me</p>
            <p className="text-gray-300 mb-6" data-testid="footer-phone">+1 (555) 123-4567</p>
            
            <div className="glass-effect rounded-2xl p-6" data-testid="newsletter-signup">
              <h4 className="font-semibold mb-4">Stay Connected</h4>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="flex-1 bg-white/10 border-white/20 rounded-l-full focus:ring-neon-purple focus:bg-white/20"
                  data-testid="newsletter-email-input"
                />
                <Button 
                  size="icon"
                  className="bg-gradient-to-r from-neon-purple to-electric rounded-r-full hover:scale-105 transition-all duration-300"
                  data-testid="newsletter-submit"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-white/10 pt-8 text-center"
          variants={fadeUpVariants}
        >
          <div className="text-3xl font-bold gradient-text mb-4" data-testid="footer-brand">
            iBooth.me
          </div>
          <p className="text-gray-400" data-testid="footer-copyright">
            © 2024 iBooth.me. Revolutionizing brand experiences worldwide.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
