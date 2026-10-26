import { motion } from 'motion/react';
import { Sparkles, Award, ShieldCheck, Heart, ArrowRight, CheckCircle2, Ruler } from 'lucide-react';

interface StoryPageProps {
  onNavigate: (page: string) => void;
}

export function StoryPage({ onNavigate }: StoryPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Héritage &amp; Savoir-Faire Ancestral</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mt-2">
          L'Histoire de Layali Perles
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-3 font-light leading-relaxed">
          Bien plus qu'un simple ornement corporel, le baya est un langage secret, un chant intime et un symbole séculaire de sensualité et de royauté.
        </p>
      </div>

      {/* Main Story Hero Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-6 relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-850">
            <img
              src="/catalog/story-tradition.webp"
              alt="Tradition artisanale des perles au Bénin"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300">
                Fait main à Cotonou
              </span>
              <p className="font-serif text-lg font-medium mt-1">
                Perles enfilées avec amour et patience, perle après perle.
              </p>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-xl rounded-2xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100">
                100%
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400">
                Artisanat béninois authentique
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
            Origines &amp; Rituels
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
            Le Baya, poésie intime de la femme africaine
          </h2>
          <div className="space-y-4 text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
            <p>
              Depuis des temps immémoriaux au Bénin, au Sénégal, au Mali et à travers tout le golfe de Guinée, les perles de taille (appelées <em>Bayas</em>, <em>Djal-Djal</em> ou <em>Bin-Bin</em>) accompagnent les femmes dès leur adolescence.
            </p>
            <p>
              Ces bijoux sculptent la silhouette, soulignent le galbe des hanches et émettent un son discret lors de la marche — une musique intime réservée à la personne aimée. Porter un baya, c'est renouer avec une féminité libre, assumée et magnifiée.
            </p>
            <p>
              Chez <strong className="font-semibold text-stone-900 dark:text-stone-100">Layali Perles</strong>, nous perpétuons cette tradition en la réinventant avec un design épuré, des cristaux lumineux et des fermetures contemporaines adaptées aux modes de vie actuels.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('collection')}
              className="py-3 px-6 bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-stone-950 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <span>Découvrir la collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('guide')}
              className="py-3 px-5 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-semibold text-stone-700 dark:text-stone-300 hover:border-amber-500 transition-colors flex items-center gap-2"
            >
              <Ruler className="w-4 h-4 text-amber-500" />
              <span>Consulter le guide des tailles</span>
            </button>
          </div>
        </div>
      </div>

      {/* Workshop & Craftsmanship Gallery */}
      <section className="bg-[#F3ECE2]/70 dark:bg-[#181613] p-8 sm:p-12 rounded-3xl border border-[#EAE3D7] dark:border-[#26221D] space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-mono font-semibold">
            Secrets d'Atelier
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mt-1">
            Comment naissent nos créations à Cotonou
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2 font-light">
            De la sélection des matières premières aux finitions impeccables :
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#EAE3D7] dark:border-[#2B2621] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-serif text-lg font-bold">
              01
            </div>
            <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
              Sélection rigoureuse des perles
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Nous sélectionnons des perles de rocaille de haute précision, des cristaux étincelants et des pierres naturelles (pierre de lave, hématite, howlite, œil de tigre).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#EAE3D7] dark:border-[#2B2621] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-serif text-lg font-bold">
              02
            </div>
            <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
              Fils renforcés &amp; fermetures durables
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Nous utilisons des fils marins cirés ou élastiques japonais ultra-résistants, conçus pour supporter la douche, la transpiration et le port quotidien sans s'altérer.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#EAE3D7] dark:border-[#2B2621] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-serif text-lg font-bold">
              03
            </div>
            <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
              Confection sur-mesure gratuite
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Chaque silhouette mérite un tombé idéal. Vous pouvez préciser vos centimètres exacts lors de la commande : nos artisanes adaptent la longueur sans supplément.
            </p>
          </div>
        </div>
      </section>

      {/* Commitments strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span className="text-xs text-stone-700 dark:text-stone-300 font-medium">100% Fait main au Bénin</span>
        </div>
        <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
          <span className="text-xs text-stone-700 dark:text-stone-300 font-medium">Résistant à l'eau &amp; à la douche</span>
        </div>
        <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3">
          <Heart className="w-5 h-5 text-rose-500 shrink-0" />
          <span className="text-xs text-stone-700 dark:text-stone-300 font-medium">Créations éthiques &amp; locales</span>
        </div>
        <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3">
          <Award className="w-5 h-5 text-amber-500 shrink-0" />
          <span className="text-xs text-stone-700 dark:text-stone-300 font-medium">Livraison express 24h</span>
        </div>
      </div>

    </div>
  );
}
