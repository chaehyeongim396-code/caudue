import { ReactNode, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, User, Sparkles, Menu, X } from 'lucide-react';
import logo from '../assets/images/regenerated_image_1778585349920.png';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Layout({ children, currentPage, setCurrentPage }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount, isCartOpen, setIsCartOpen } = useCart();

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'gallery', label: 'SHOP' },
    { id: 'archive', label: 'GALLERY' },
    { id: 'about', label: 'ABOUT' },
    { id: 'design', label: 'CREATE' },
  ];

  return (
    <div className="min-h-screen bg-[#dbe9e7] text-[#2C2C2C] font-sans selection:bg-[#E8DCC4] selection:text-[#5A4B3A]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#dbe9e7] border-b border-[#E8DCC4]/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative h-10">
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
            className="absolute left-1/2 -translate-x-1/2 h-12 md:h-16 flex items-center justify-center group"
          >
            <img 
              src={logo} 
              alt="Cadeau" 
              className="h-full w-auto object-contain transition-opacity group-hover:opacity-70" 
              referrerPolicy="no-referrer"
            />
          </button>

          <div className="flex gap-6 items-center">
            <button id="nav-search" className="hover:opacity-60 transition-opacity">
              <Sparkles size={20} strokeWidth={1.5} />
            </button>
            <button 
              id="nav-cart" 
              onClick={() => setIsCartOpen(!isCartOpen)} 
              className="hover:opacity-60 transition-opacity relative"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#2C2C2C] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-mono">
                  {itemCount}
                </span>
              )}
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
            className="md:hidden absolute top-full left-0 right-0 bg-[#dbe9e7] border-b border-[#E8DCC4] p-6 flex flex-col gap-6 text-center tracking-widest uppercase text-sm font-medium"
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
      <main className="pt-24 pb-12 min-h-screen bg-[#dbe9e7]">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8DCC4] px-6 py-12 bg-[#dbe9e7]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <div className="h-12 mb-6 flex items-start">
              <img 
                src={logo} 
                alt="Cadeau" 
                className="h-full w-auto object-contain" 
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs leading-relaxed text-[#7D7D7D] font-light">
              Transforming transient memories into tangible beauty. 
              Personalized design for the modern romantic.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#E8DCC4]/50 flex justify-between items-center text-[10px] opacity-40 uppercase tracking-widest">
          <span>&copy; 2026 Cadeau Personal Design Brand. All Rights Reserved.</span>
          <span>Privacy & Terms</span>
        </div>
      </footer>
      <CartDrawer onClose={() => setIsCartOpen(false)} setCurrentPage={setCurrentPage} />
    </div>
  );
}
