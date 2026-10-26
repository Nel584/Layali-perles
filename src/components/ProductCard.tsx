import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Check, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setQuickViewProduct } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      onClick={() => setQuickViewProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer rounded-2xl bg-white dark:bg-[#1A1815] border border-[#EAE3D7] dark:border-[#2B2621] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-[#F5EFE6] dark:bg-[#23201C]">
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Subtle gradient overlay at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Subtle Tag if Top Seller or New */}
        {product.isTopSeller && (
          <span className="absolute top-3 left-3 bg-stone-900/90 dark:bg-amber-400 text-white dark:text-stone-950 text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded shadow-sm">
            Coup de cœur
          </span>
        )}
        {product.isNew && !product.isTopSeller && (
          <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded shadow-sm">
            Nouveau
          </span>
        )}

        {/* Quick View Floating Hint */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm text-stone-800 dark:text-stone-200 text-xs py-1.5 px-3 rounded-lg shadow-sm flex items-center gap-1.5 font-medium">
            <Eye className="w-3.5 h-3.5 text-amber-500" />
            <span>Voir les détails</span>
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category */}
          <div className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 font-mono font-medium">
            {product.categoryLabel}
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100 mt-1 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {product.name}
          </h3>

          {/* Subtitle / materials */}
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-1">
            {product.subtitle || product.materials}
          </p>
        </div>

        {/* Bottom Action Row (Prices removed as requested) */}
        <div className="mt-4 pt-3 border-t border-[#EAE3D7] dark:border-[#2B2621] flex items-center justify-between gap-2">
          <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
            Fait main &bull; Sur-mesure
          </span>

          <button
            onClick={handleQuickAdd}
            className={`py-2 px-3 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 shadow-sm ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-100 hover:bg-stone-900 hover:text-white dark:bg-stone-800 dark:hover:bg-amber-400 dark:hover:text-stone-950 text-stone-800 dark:text-stone-200'
            }`}
            title="Ajouter au panier"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ajouté</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Panier</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
