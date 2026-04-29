import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, User, Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Layout({ children, currentPage, setCurrentPage }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'CADEAU' },
    { id: 'design', label: 'DESIGN' },
    { id: 'gallery', label: 'GALLERY' },
  ];

  return (
    <div className="min-h-screen bg-[#dbe9e7] text-[#2C2C2C] font-sans selection:bg-[#E8DCC4] selection:text-[#5A4B3A]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#dbe9e7]/80 backdrop-blur-md border-b border-[#E8DCC4]/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="md:hidden">
            <button id="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="hidden md:flex gap-8 items-center text-xs tracking-[0.2em] font-medium">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setCurrentPage(item.id)}
                style={{ fontFamily: 'Georgia, serif' }}
                className={`hover:opacity-60 transition-opacity uppercase ${
                  currentPage === item.id ? 'border-b border-[#2C2C2C]' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button 
            id="nav-logo"
            onClick={() => setCurrentPage('home')}
            className="text-2xl md:text-3xl font-serif italic tracking-tight pointer-events-auto absolute left-1/2 -translate-x-1/2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Cadeau
          </button>

          <div className="flex gap-6 items-center">
            <button id="nav-search" className="hover:opacity-60 transition-opacity">
              <Sparkles size={20} strokeWidth={1.5} />
            </button>
            <button id="nav-cart" className="hover:opacity-60 transition-opacity">
              <ShoppingBag size={20} strokeWidth={1.5} />
            </button>
            <button 
                id="nav-profile" 
                onClick={() => setCurrentPage('profile')}
                className={`hover:opacity-60 transition-opacity ${currentPage === 'profile' ? 'opacity-100' : 'opacity-60'}`}
            >
              <User size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#FDFBF7] border-b border-[#E8DCC4] p-6 flex flex-col gap-6 text-center tracking-widest uppercase text-sm font-medium"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 min-h-[calc(100vh-200px)] bg-[#dbe9e7]">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8DCC4] px-6 py-12 bg-[#dbe9e7]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <h3 className="text-xl font-serif italic mb-6" style={{ fontFamily: 'Georgia, serif' }}>Cadeau</h3>
            <p className="text-xs leading-relaxed text-[#7D7D7D] font-light">
              Transforming transient memories into tangible beauty. 
              Personalized design for the modern romantic.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-[10px] tracking-[0.1em] uppercase font-medium">
            <div className="flex flex-col gap-4">
              <span className="opacity-40">Shop</span>
              <button className="hover:opacity-60 text-left">Bags</button>
              <button className="hover:opacity-60 text-left">Accessories</button>
              <button className="hover:opacity-60 text-left">Gifting</button>
            </div>
            <div className="flex flex-col gap-4">
              <span className="opacity-40">Support</span>
              <button className="hover:opacity-60 text-left">Shipping</button>
              <button className="hover:opacity-60 text-left">Returns</button>
              <button className="hover:opacity-60 text-left">FAQ</button>
            </div>
            <div className="flex flex-col gap-4">
              <span className="opacity-40">Follow</span>
              <button className="hover:opacity-60 text-left">Instagram</button>
              <button className="hover:opacity-60 text-left">Journal</button>
              <button className="hover:opacity-60 text-left">Newsletter</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#E8DCC4]/50 flex justify-between items-center text-[10px] opacity-40 uppercase tracking-widest">
          <span>&copy; 2026 Cadeau Atelier</span>
          <span>Privacy & Terms</span>
        </div>
      </footer>
    </div>
  );
}
