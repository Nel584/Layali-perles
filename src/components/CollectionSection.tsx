import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { CategoryType, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

interface CollectionSectionProps {
  initialCategory?: CategoryType;
}

export function CollectionSection({ initialCategory = 'all' }: CollectionSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'Toutes les créations' },
    { id: 'femme', label: 'Parures Féminines (Bayas)' },
    { id: 'homme', label: 'Prestige Masculin' },
    { id: 'couple', label: 'Alliances & Harmonie' },
    { id: 'motifs', label: 'Créations & Motifs Rares' }
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
    <section id="collection" className="py-16 sm:py-24 bg-stone-50/50 dark:bg-stone-900/40 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Catalogue Artisanal Exclusif</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mt-1">
              Les Créations Baya Jewelry
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2 font-light max-w-xl">
              Choisissez vos perles, ajustez votre taille et finalisez votre commande en toute simplicité.
            </p>
          </div>

          {/* Search bar & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher une parure..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-8 py-2.5 text-xs bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full sm:w-56"
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

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'featured' || value === 'price-asc' || value === 'price-desc') {
                  setSortBy(value);
                }
              }}
              className="px-3.5 py-2.5 text-xs bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
            >
              <option value="featured">Tri : Vedettes</option>
              <option value="price-asc">Prix : Croissant</option>
              <option value="price-desc">Prix : Décroissant</option>
            </select>
          </div>
        </div>

        {/* Category Tabs (Interactive Segmented Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 shadow-md'
                    : 'bg-white dark:bg-stone-850 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-stone-400'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-stone-850 rounded-3xl border border-stone-200 dark:border-stone-800 p-8">
            <h3 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-200">
              Aucun modèle ne correspond à votre recherche
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
              Essayez de réinitialiser vos filtres ou contactez-nous pour une confection sur-mesure.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 text-xs font-semibold rounded-xl"
            >
              Voir tout le catalogue
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
    </section>
  );
}
