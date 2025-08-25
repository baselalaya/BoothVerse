import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect" data-testid="navigation">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold gradient-text" data-testid="logo">
            iBooth.me
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#products" className="hover:text-neon-purple transition-colors duration-300" data-testid="nav-products">
              Products
            </a>
            <a href="#technology" className="hover:text-neon-purple transition-colors duration-300" data-testid="nav-technology">
              Technology
            </a>
            <a href="#portfolio" className="hover:text-neon-purple transition-colors duration-300" data-testid="nav-portfolio">
              Portfolio
            </a>
            <a href="#contact" className="hover:text-neon-purple transition-colors duration-300" data-testid="nav-contact">
              Contact
            </a>
          </div>
          
          <Button 
            className="hidden md:block bg-gradient-to-r from-neon-purple to-electric hover:scale-105 transition-transform duration-300"
            data-testid="nav-get-started"
          >
            Get Started
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
        
        {isOpen && (
          <div className="md:hidden mt-4 pb-4" data-testid="mobile-menu">
            <div className="flex flex-col space-y-4">
              <a href="#products" className="hover:text-neon-purple transition-colors duration-300">
                Products
              </a>
              <a href="#technology" className="hover:text-neon-purple transition-colors duration-300">
                Technology
              </a>
              <a href="#portfolio" className="hover:text-neon-purple transition-colors duration-300">
                Portfolio
              </a>
              <a href="#contact" className="hover:text-neon-purple transition-colors duration-300">
                Contact
              </a>
              <Button className="bg-gradient-to-r from-neon-purple to-electric w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
