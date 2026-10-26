import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, X, Filter, Tag, Check, Truck } from 'lucide-react';
import { CategoryType, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface CollectionPageProps {
  initialCategory?: CategoryType;
}

export function CollectionPage({ initialCategory = 'all' }: CollectionPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories: { id: CategoryType; label: string; count: number }[] = [
    { id: 'all', label: 'Toutes les créations', count: PRODUCTS.length },
    { id: 'femme', label: 'Parures Féminines (Bayas)', count: PRODUCTS.filter((p) => p.category === 'femme').length },
    { id: 'homme', label: 'Prestige Masculin', count: PRODUCTS.filter((p) => p.category === 'homme').length },
    { id: 'couple', label: 'Alliances & Harmonie', count: PRODUCTS.filter((p) => p.category === 'couple').length },
    { id: 'motifs', label: 'Créations & Motifs', count: PRODUCTS.filter((p) => p.category === 'motifs').length }
  ];

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Page Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atelier Layali Perles &bull; Cotonou</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mt-2">
          Le Catalogue des Créations
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2 font-light leading-relaxed">
          Découvrez notre collection artisanale de bayas de hanches, bracelets en pierres semi-précieuses et sets de couple. Toutes nos parures sont ajustables sur-mesure gratuitement.
        </p>

        {/* Free delivery badge */}
        <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 rounded-full text-xs text-amber-800 dark:text-amber-300">
          <Truck className="w-3.5 h-3.5 text-amber-500" />
          <span>Livraison offerte à partir de <strong>25 000 FCFA</strong> à Cotonou &amp; Calavi</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#EAE3D7] dark:border-[#26221D]">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par nom, pierre, couleur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 text-xs bg-white dark:bg-[#1A1815] border border-[#EAE3D7] dark:border-[#2B2621] rounded-xl text-[#221E1A] dark:text-[#F7F3ED] focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Controls & Counter */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
          <span className="text-[#6B6359] dark:text-[#A8A096] font-mono">
            {filteredProducts.length} modèle{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3.5 py-2.5 text-xs bg-white dark:bg-[#1A1815] border border-[#EAE3D7] dark:border-[#2B2621] rounded-xl text-[#221E1A] dark:text-[#F7F3ED] focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
          >
            <option value="featured">Tri : Vedettes</option>
            <option value="price-asc">Prix : Moins cher au plus cher</option>
            <option value="price-desc">Prix : Plus cher au moins cher</option>
          </select>
        </div>

      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 shadow-md'
                  : 'bg-white dark:bg-[#1A1815] text-[#6B6359] dark:text-[#A8A096] border border-[#EAE3D7] dark:border-[#2B2621] hover:border-amber-400'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-stone-800 text-amber-300 dark:bg-stone-900 dark:text-stone-100'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-white dark:bg-stone-850 rounded-3xl border border-stone-200 dark:border-stone-800 p-8">
          <h3 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-200">
            Aucun modèle ne correspond à vos critères
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
            Réinitialisez vos filtres ou contactez notre atelier pour créer une parure unique sur-mesure.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 text-xs font-semibold rounded-xl"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

    </div>
  );
}
