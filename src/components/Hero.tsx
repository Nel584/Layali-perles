import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Ruler, ChevronLeft, ChevronRight, ShieldCheck, Heart, Award } from 'lucide-react';
import { HERO_SLIDES } from '../data/products';
import { useCart } from '../context/CartContext';

interface HeroProps {
  onExploreClick: () => void;
}

export function Hero({ onExploreClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setIsSizeGuideOpen } = useCart();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative overflow-hidden bg-[#F5EFE6]/60 dark:bg-[#161412] border-b border-[#EAE3D7] dark:border-[#26221D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Hero Content & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{slide.tagline} &bull; Fait main au Bénin</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-[1.12] text-balance">
              Affirmez votre <span className="italic font-normal text-amber-600 dark:text-amber-400">essence</span> à votre taille
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light leading-relaxed max-w-xl">
              Des parures de taille sensuelles, bracelets de prestige et duos complices conçus pour célébrer votre beauté naturelle et votre confiance intime.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="py-3.5 px-6 bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-stone-950 font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center gap-2 group"
              >
                <span>Découvrir la collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="py-3.5 px-5 bg-white dark:bg-stone-850 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-2"
              >
                <Ruler className="w-4 h-4 text-amber-500" />
                <span>Guide des tailles</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800 grid grid-cols-2 gap-4 text-left">
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-mono">
                  100%
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                  Fait main à Cotonou
                </div>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-mono">
                  sous 24-48h
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                  Livraison à domicile
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Carousel */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:h-full min-h-[340px] rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-200 dark:bg-stone-850">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                  
                  {/* Bottom overlay title */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[11px] uppercase tracking-wider font-mono text-amber-300">
                      Collection Signature
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold mt-1">
                      {slide.title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 z-20 bg-stone-950/40 backdrop-blur-md p-1 rounded-full border border-white/10">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                  className="p-1.5 text-white/80 hover:text-white rounded-full transition-colors"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] text-white/90 font-mono px-1">
                  {currentSlide + 1}/{HERO_SLIDES.length}
                </span>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                  className="p-1.5 text-white/80 hover:text-white rounded-full transition-colors"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slide dots */}
              <div className="absolute bottom-4 right-6 flex gap-1.5 z-20">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/40'
                    }`}
                    aria-label={`Aller au slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
