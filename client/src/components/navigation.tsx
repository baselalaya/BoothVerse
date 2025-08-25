import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.8)"]
  );
  const blur = useTransform(scrollY, [0, 100], [20, 60]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const navItems = [
    { name: "Products", href: "#products" },
    { name: "Technology", href: "#technology" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'glass-premium border-b border-white/10' : 'glass-ultra'
      }`}
      style={{ 
        backgroundColor,
        backdropFilter: `blur(${blur.get()}px)`,
      }}
      data-testid="navigation"
    >
      <div className="max-w-8xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            data-testid="logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-electric flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black holographic-text tracking-tight">
              iBooth.me
            </span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative text-white/80 hover:text-white font-semibold transition-colors duration-300 py-2"
                data-testid={`nav-${item.name.toLowerCase()}`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="relative z-10">{item.name}</span>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              className="group glass-heavy px-8 py-3 font-bold interactive-glow bg-gradient-to-r from-neon-purple/30 to-electric/30 border-2 border-neon-purple/50 rounded-xl hover:scale-105 transition-all duration-300"
              data-testid="nav-get-started"
            >
              <span className="holographic-text group-hover:animate-pulse-neon">
                Get Started
              </span>
              <Zap className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="lg:hidden glass-ultra rounded-xl"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="mobile-menu-toggle"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </Button>
        </div>
        
        {/* Mobile Menu */}
        <motion.div
          className="lg:hidden overflow-hidden"
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          data-testid="mobile-menu"
        >
          <div className="pt-6 pb-4 space-y-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="block text-xl font-semibold text-white/80 hover:text-white transition-colors duration-300"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Button className="w-full glass-heavy bg-gradient-to-r from-neon-purple/30 to-electric/30 border-2 border-neon-purple/50 rounded-xl font-bold text-lg py-3">
                <span className="holographic-text">Get Started</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
