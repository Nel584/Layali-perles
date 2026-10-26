import { Sparkles, ShieldCheck, Heart, Award, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function StorySection() {
  const { setIsSizeGuideOpen } = useCart();

  return (
    <section id="histoire" className="py-16 sm:py-24 bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual with Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 bg-stone-200 dark:bg-stone-850">
              <img
                src="/catalog/story-tradition.webp"
                alt="Artisanat traditionnel des perles à Cotonou"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300">
                  Origine Bénin
                </span>
                <p className="font-serif text-lg font-medium mt-1">
                  Atelier artisanal de Cotonou &bull; Héritage du Danxomè
                </p>
              </div>
            </div>

            {/* Floating Quality Seal */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-xl rounded-2xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100">
                  100%
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400">
                  Fait main avec passion
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Notre Histoire &bull; Layali Perles</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
              Plus qu'un bijou,<br />
              <span className="italic font-normal text-amber-600 dark:text-amber-400">un héritage qui vous sublime</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light leading-relaxed">
              <p>
                Chez <strong className="font-semibold text-stone-900 dark:text-stone-100">Baya Jewelry (Layali Perles)</strong>, nous croyons que chaque perle raconte une histoire intime. Portés depuis des générations en Afrique de l'Ouest, les bayas célèbrent la féminité sacrée, la sensualité subtile et la confiance en son propre corps.
              </p>
              <p>
                Chaque création est assemblée à la main avec des matériaux de premier choix : perles de rocaille calibrées, cristaux taillés réfractant la lumière, coquillages caoris protecteurs et fil renforcé indéchirable.
              </p>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-850">
                <div className="flex items-center gap-2.5 font-semibold text-sm text-stone-900 dark:text-stone-100">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span>Sur-mesure offert</span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Chaque morphologie est unique. Nous adaptons la longueur au centimètre près sans supplément.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-850">
                <div className="flex items-center gap-2.5 font-semibold text-sm text-stone-900 dark:text-stone-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Durabilité garantie</span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Fils résistants à l'eau, à la douche et à la transpiration pour un éclat qui perdure dans le temps.
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-2"
              >
                <span>Consulter la symbolique et le guide des tailles</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
