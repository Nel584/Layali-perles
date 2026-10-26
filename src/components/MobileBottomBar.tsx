import { ShoppingBag, Sparkles, Ruler, MessageSquare, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PageId } from './Navbar';

interface MobileBottomBarProps {
  activePage: PageId;
  onPageSelect: (page: PageId) => void;
}

export function MobileBottomBar({ activePage, onPageSelect }: MobileBottomBarProps) {
  const { totalItemsCount, setIsCartOpen } = useCart();

  const handleNav = (p: PageId) => {
    onPageSelect(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 dark:bg-[#141210]/95 backdrop-blur-lg border-t border-[#EAE3D7] dark:border-[#26221D] px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around">
        
        {/* Accueil */}
        <button
          onClick={() => handleNav('accueil')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            activePage === 'accueil'
              ? 'text-amber-600 dark:text-amber-400 font-semibold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Accueil</span>
        </button>

        {/* Collection */}
        <button
          onClick={() => handleNav('collection')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            activePage === 'collection'
              ? 'text-amber-600 dark:text-amber-400 font-semibold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Collection</span>
        </button>

        {/* Cart Button (Highlighted in center) */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center py-1 px-3 rounded-lg text-stone-900 dark:text-stone-100 group"
          aria-label="Ouvrir le panier"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-stone-900 dark:bg-amber-400 text-white dark:text-stone-950 flex items-center justify-center shadow-md">
              <ShoppingBag className="w-4 h-4" />
            </div>
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold font-mono flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-semibold text-stone-700 dark:text-stone-300">Panier</span>
        </button>

        {/* Guide Tailles */}
        <button
          onClick={() => handleNav('guide')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            activePage === 'guide'
              ? 'text-amber-600 dark:text-amber-400 font-semibold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Ruler className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Tailles</span>
        </button>

        {/* Contact Page */}
        <button
          onClick={() => handleNav('contact')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            activePage === 'contact'
              ? 'text-amber-600 dark:text-amber-400 font-semibold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Contact</span>
        </button>

      </div>
    </div>
  );
}
