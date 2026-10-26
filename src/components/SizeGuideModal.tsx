import { motion, AnimatePresence } from 'motion/react';
import { X, Ruler, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SIZE_GUIDE_DATA } from '../data/products';

export function SizeGuideModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useCart();

  if (!isSizeGuideOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSizeGuideOpen(false)}
          className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-stone-100 dark:border-stone-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-700/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Ruler className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Guide des Tailles & Tradition
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Comment mesurer et choisir la taille parfaite pour votre Baya
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Guide Step-by-Step */}
          <div className="space-y-6">
            <div className="bg-amber-50/60 dark:bg-stone-800/60 p-4 rounded-xl border border-amber-200/60 dark:border-stone-700/60">
              <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Comment mesurer votre tour de taille / hanche
              </h4>
              <ol className="text-xs text-stone-600 dark:text-stone-300 space-y-2 list-decimal list-inside leading-relaxed">
                <li>
                  <strong className="text-stone-900 dark:text-stone-100">Définissez l'emplacement désiré :</strong> Choisissez où vous souhaitez porter votre baya (au creux de la taille, au niveau du nombril, ou bas sur les hanches).
                </li>
                <li>
                  <strong className="text-stone-900 dark:text-stone-100">Munissez-vous d'un mètre ruban :</strong> Tenez-vous droite, respirez normalement sans rentrer le ventre.
                </li>
                <li>
                  <strong className="text-stone-900 dark:text-stone-100">Relevez la mesure en cm :</strong> Laissez un léger jeu d'un doigt pour assurer un confort absolu lorsque vous vous asseyez.
                </li>
              </ol>
            </div>

            {/* Table of sizes */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-3 font-mono">
                Grille des Tailles Référence
              </h4>
              <div className="overflow-hidden border border-stone-200 dark:border-stone-800 rounded-xl divide-y divide-stone-100 dark:divide-stone-800 text-xs">
                {SIZE_GUIDE_DATA.map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-3 p-3 items-center gap-2 hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors"
                  >
                    <div className="font-semibold text-stone-900 dark:text-stone-100 font-mono">
                      {row.label}
                    </div>
                    <div className="font-medium text-amber-600 dark:text-amber-400 font-mono">
                      {row.range}
                    </div>
                    <div className="text-stone-500 dark:text-stone-400 text-[11px] sm:col-span-1">
                      {row.tips}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cultural Meaning Section */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-3 font-mono flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-amber-500" />
                Signification des Couleurs & Énergies
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850">
                  <div className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Or & Jaune</div>
                  <div className="text-stone-500 dark:text-stone-400 text-[11px]">Prospérité, éclat royal, fertilité et confiance.</div>
                </div>
                <div className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850">
                  <div className="font-semibold text-rose-500 dark:text-rose-400 mb-1">Rouge & Rubis</div>
                  <div className="text-stone-500 dark:text-stone-400 text-[11px]">Passion vive, sensualité, désir et protection.</div>
                </div>
                <div className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850">
                  <div className="font-semibold text-stone-800 dark:text-stone-200 mb-1">Noir Obsidienne</div>
                  <div className="text-stone-500 dark:text-stone-400 text-[11px]">Pouvoir intérieur, bouclier protecteur et mystère.</div>
                </div>
                <div className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850">
                  <div className="font-semibold text-cyan-600 dark:text-cyan-400 mb-1">Turquoise & Caoris</div>
                  <div className="text-stone-500 dark:text-stone-400 text-[11px]">Paix de l'esprit, sagesse aquatique et abondance.</div>
                </div>
                <div className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850">
                  <div className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Blanc Nacré</div>
                  <div className="text-stone-500 dark:text-stone-400 text-[11px]">Pureté de l'âme, lumière et harmonie spirituelle.</div>
                </div>
                <div className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850">
                  <div className="font-semibold text-purple-600 dark:text-purple-400 mb-1">Violet Améthyste</div>
                  <div className="text-stone-500 dark:text-stone-400 text-[11px]">Intuition féminine, noblesse et sérénité.</div>
                </div>
              </div>
            </div>

            {/* Custom fit guarantee */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>
                <strong>Ajustement sur-mesure sans frais :</strong> Toutes nos pièces peuvent être ajustées à votre convenance. Indiquez vos mesures précises lors de la validation.
              </span>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-stone-950 font-medium text-xs rounded-xl transition-colors"
            >
              Compris, voir les créations
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
