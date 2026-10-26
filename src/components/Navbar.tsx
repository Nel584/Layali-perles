import { useState } from 'react';
import { ShoppingBag, Moon, Sun, Menu, X, Ruler, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export type PageId = 'accueil' | 'collection' | 'histoire' | 'guide' | 'avis' | 'contact';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

export function Navbar({ activePage, onNavigate }: NavbarProps) {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'collection', label: 'Collection' },
    { id: 'histoire', label: 'Notre Histoire' },
    { id: 'guide', label: 'Guide des Tailles' },
    { id: 'avis', label: 'Avis' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (pageId: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 dark:bg-[#141210]/95 backdrop-blur-md border-b border-[#EAE3D7] dark:border-[#26221D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Logo & Brand Name */}
        <button
          onClick={() => handleLinkClick('accueil')}
          className="text-left group flex items-center gap-3 whitespace-nowrap shrink-0 focus:outline-none"
        >
          <img
            src="/assets/aistudio/Logo_minimaliste_avec_main_et_perles_c4f96bc6.png"
            alt="Logo Layali Perles"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-amber-300/40 shadow-sm transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            Layali <span className="italic font-normal text-amber-600 dark:text-amber-400">Perles</span>
          </span>
        </button>

        {/* Zone 2: 4–5 Clean Single-Line Text Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 pb-0.5 relative ${
                activePage === link.id
                  ? 'text-amber-600 dark:text-amber-400 font-bold'
                  : ''
              }`}
            >
              {link.label}
              {activePage === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions (Theme Toggle & Cart trigger with "Panier") */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={toggleTheme}
            className="p-2 text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-850 transition-colors border border-stone-200 dark:border-stone-800"
            title={theme === 'dark' ? 'Passer en mode jour' : 'Passer en mode sombre'}
            aria-label="Changer le thème"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-stone-700" />
            )}
          </button>

          {/* Cart Trigger Button (With "Panier" instead of "Écrin") */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-4 py-2 text-xs font-semibold text-white bg-stone-900 dark:bg-amber-400 dark:text-stone-950 rounded-xl hover:bg-stone-800 dark:hover:bg-amber-300 transition-all flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0 group"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Panier</span>
            {totalItemsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 dark:bg-stone-950 dark:text-amber-300 text-[11px] font-bold flex items-center justify-center font-mono">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-850"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EAE3D7] dark:border-[#26221D] bg-[#FAF7F2] dark:bg-[#1A1714] p-4 space-y-2 animate-fadeIn shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                activePage === link.id
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold'
                  : 'text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <span>{link.label}</span>
              {link.id === 'guide' && <Ruler className="w-4 h-4 text-amber-500" />}
              {link.id === 'avis' && <MessageSquare className="w-4 h-4 text-amber-500" />}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
