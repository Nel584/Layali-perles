import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Ruler, Award } from 'lucide-react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { CategoryType } from '../types';

interface HomePageProps {
  onNavigate: (page: string, category?: CategoryType) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const topSellers = PRODUCTS.filter((p) => p.isTopSeller).slice(0, 4);

  const categories = [
    {
      id: 'femme' as CategoryType,
      title: 'Parures Féminines',
      subtitle: 'Bayas de taille sensuelles et perles de séduction',
      image: '/catalog/femme-1.jpg',
      count: `${PRODUCTS.filter((product) => product.category === 'femme').length} modèles`
    },
    {
      id: 'homme' as CategoryType,
      title: 'Prestige Masculin',
      subtitle: 'Bracelets onyx, pierres volcaniques & hématite',
      image: '/catalog/homme-1.jpg',
      count: `${PRODUCTS.filter((product) => product.category === 'homme').length} modèles`
    },
    {
      id: 'couple' as CategoryType,
      title: 'Alliances & Harmonie',
      subtitle: 'Bracelets assortis pour couples & âmes sœurs',
      image: '/catalog/couple-1.jpg',
      count: `${PRODUCTS.filter((product) => product.category === 'couple').length} modèles`
    },
    {
      id: 'motifs' as CategoryType,
      title: 'Créations & Motifs',
      subtitle: 'Perles traditionnelles béninoises & chaînes de ventre',
      image: '/catalog/motif-4.webp',
      count: `${PRODUCTS.filter((product) => product.category === 'motifs').length} modèles`
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Carousel Banner */}
      <Hero onExploreClick={() => onNavigate('collection')} />

      {/* Featured Univers / Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nos Rayons Phares</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mt-1">
              Explorez nos univers de perles
            </h2>
          </div>
          <button
            onClick={() => onNavigate('collection', 'all')}
            className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Voir toute la collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => onNavigate('collection', cat.id)}
              aria-label={`Découvrir la collection ${cat.title}`}
              className="group cursor-pointer rounded-2xl overflow-hidden relative aspect-[3/4] bg-stone-200 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl text-left"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
              
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-mono uppercase bg-stone-900/80 text-amber-300 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-500/30">
                  {cat.count}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-amber-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-stone-300 mt-1 font-light line-clamp-2">
                  {cat.subtitle}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                  <span>Découvrir le rayon</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Top Sellers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold font-mono">
              <Award className="w-3.5 h-3.5" />
              <span>Sélection Signatures</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mt-1">
              Les Coups de Cœur chez Layali Perles
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
              Les créations les plus appréciées par notre communauté à Cotonou et dans la sous-région.
            </p>
          </div>
          <button
            onClick={() => onNavigate('collection')}
            className="py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-stone-950 text-xs font-semibold rounded-xl transition-colors self-start sm:self-auto"
          >
            Tous les modèles
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Story & Heritage Teaser */}
      <section className="bg-[#F3ECE2]/70 dark:bg-[#181613] py-16 border-y border-[#EAE3D7] dark:border-[#26221D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 relative">
              <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-stone-200 dark:border-stone-800">
                <img
                  src="/catalog/story-tradition.webp"
                  alt="Histoire Layali Perles"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
                Savoir-Faire Béninois
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
                L'Art ancestral des perles de hanches
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                Le Baya n'est pas qu'un ornement : c'est une parure rituelle d'amour, de féminité et de confiance. Chaque perle est choisie et montée à la main avec du fil résistant à l'eau pour vous accompagner dans tous vos mouvements.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => onNavigate('histoire')}
                  className="py-3 px-5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-stone-950 font-semibold text-xs rounded-xl transition-colors flex items-center gap-2"
                >
                  <span>Découvrir notre histoire</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('guide')}
                  className="text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Ruler className="w-4 h-4 text-amber-500" />
                  <span>Guide des tailles</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Post-Delivery Customer Reviews Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                Vous avez reçu votre colis ?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                Partagez votre avis sur l'emballage, le délai de livraison et la finition de vos perles Layali.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('avis')}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-all whitespace-nowrap"
          >
            Donner mon avis sur mon colis
          </button>
        </div>
      </section>

    </div>
  );
}
