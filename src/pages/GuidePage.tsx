import { useState } from 'react';
import { Ruler, Sparkles, CheckCircle2, HeartHandshake, HelpCircle, ArrowRight } from 'lucide-react';
import { SIZE_GUIDE_DATA } from '../data/products';

interface GuidePageProps {
  onNavigate: (page: string) => void;
}

export function GuidePage({ onNavigate }: GuidePageProps) {
  const [activeTab, setActiveTab] = useState<'baya' | 'bracelet' | 'symbolique'>('baya');

  const faqs = [
    {
      q: 'Comment mesurer mon tour de taille sans mètre ruban ?',
      a: 'Prenez un ruban, une ficelle ou même un câble de chargeur. Faites le tour de votre taille ou de vos hanches à l\'endroit exact où vous souhaitez porter le baya, marquez le point de croisement avec un feutre, puis mesurez cette longueur sur une règle plate.'
    },
    {
      q: 'Puis-je garder mon baya sous la douche ou pour dormir ?',
      a: 'Oui, absolument ! Nos bayas sont confectionnés avec des fils ultra-résistants et des perles de haute qualité prévues pour résister à l\'eau douce, au savon et à la transpiration sans s\'oxyder ni déteindre.'
    },
    {
      q: 'Comment s\'attache un Baya de chez Layali Perles ?',
      a: 'Selon les modèles, nous proposons soit des fermoirs discrets en laiton doré (faciles à enlever et remettre), soit des cordons traditionnels à nouer une fois pour toutes selon la tradition, soit des fils élastiques haute mémoire.'
    },
    {
      q: 'Le sur-mesure entraîne-t-il des frais supplémentaires ?',
      a: 'Non, chez Layali Perles, le sur-mesure est 100% offert ! Lors de la finalisation de votre commande, indiquez votre tour exact en centimètres dans les notes ou sur WhatsApp, nos artisanes ajusteront la pièce sans surcoût.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold font-mono">
          <Ruler className="w-3.5 h-3.5" />
          <span>Guide Pratique &amp; Culturel</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mt-2">
          Guide des Tailles &amp; Symbolique
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2 font-light leading-relaxed">
          Tout ce qu'il faut savoir pour choisir la taille parfaite et comprendre la signification sacrée de chaque perle et couleur.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-[#F3ECE2] dark:bg-[#1C1916] rounded-2xl border border-[#EAE3D7] dark:border-[#2B2621]">
          <button
            onClick={() => setActiveTab('baya')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'baya'
                ? 'bg-white dark:bg-stone-700 text-stone-950 dark:text-stone-100 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Tailles des Bayas
          </button>
          <button
            onClick={() => setActiveTab('bracelet')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'bracelet'
                ? 'bg-white dark:bg-stone-700 text-stone-950 dark:text-stone-100 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Bracelets Homme &amp; Couple
          </button>
          <button
            onClick={() => setActiveTab('symbolique')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'symbolique'
                ? 'bg-white dark:bg-stone-700 text-stone-950 dark:text-stone-100 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Signification des Couleurs
          </button>
        </div>
      </div>

      {/* TAB 1: BAYAS */}
      {activeTab === 'baya' && (
        <div className="space-y-10 animate-fadeIn">
          {/* Method to measure */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#EAE3D7] dark:border-[#2B2621] shadow-sm space-y-2">
              <div className="text-amber-500 font-serif text-2xl font-bold">1</div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Au creux de la taille (Haut)
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Situé 2 à 3 cm au-dessus du nombril. Très flatteur pour marquer la cambrure sous un crop top ou une robe cintrée.
              </p>
              <div className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 pt-2">
                Taille moyenne : 65 - 75 cm
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#EAE3D7] dark:border-[#2B2621] shadow-sm space-y-2">
              <div className="text-amber-500 font-serif text-2xl font-bold">2</div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Au niveau du nombril (Milieu)
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Le positionnement le plus classique et confortable au quotidien. Épouse la respiration sans serrer.
              </p>
              <div className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 pt-2">
                Taille moyenne : 75 - 85 cm
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#EAE3D7] dark:border-[#2B2621] shadow-sm space-y-2">
              <div className="text-amber-500 font-serif text-2xl font-bold">3</div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Sur les hanches basses (Sensuel)
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Posé sur le haut des fessiers et le bas-ventre. Crée un tintement suave à chaque pas et sublime la démarche.
              </p>
              <div className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 pt-2">
                Taille moyenne : 85 - 105+ cm
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-[#1A1815] border border-[#EAE3D7] dark:border-[#2B2621] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-[#F5EFE6] dark:bg-[#23201C] border-b border-[#EAE3D7] dark:border-[#2B2621] font-semibold text-xs uppercase tracking-wider font-mono text-[#221E1A] dark:text-[#F7F3ED]">
              Grille Officielle des Tailles Layali Perles
            </div>
            <div className="divide-y divide-stone-100 dark:divide-stone-800 text-xs">
              {SIZE_GUIDE_DATA.map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 p-4 gap-2 items-center hover:bg-stone-50 dark:hover:bg-stone-850/50 transition-colors">
                  <div className="font-bold text-stone-900 dark:text-stone-100 font-mono">
                    {row.label}
                  </div>
                  <div className="font-semibold text-amber-600 dark:text-amber-400 font-mono text-sm">
                    {row.range}
                  </div>
                  <div className="text-stone-500 dark:text-stone-400 sm:col-span-1">
                    {row.tips}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BRACELETS */}
      {activeTab === 'bracelet' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-2">
              <span className="text-xs font-mono font-semibold text-amber-500">Poignet Fin (Femme / Ado)</span>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">16 - 17 cm</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Convient aux poignets minces. Maintien ajusté sans glisser.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-2">
              <span className="text-xs font-mono font-semibold text-amber-500">Poignet Standard (Homme / Duo)</span>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">18 - 20 cm</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                La taille la plus polyvalente pour hommes et ensembles de couple.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-2">
              <span className="text-xs font-mono font-semibold text-amber-500">Poignet Fort</span>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">21 - 23 cm</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Pour poignets athlétiques ou forts. Disponible sur tous nos modèles hommes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SYMBOLIQUE */}
      {activeTab === 'symbolique' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-stone-900 border border-amber-200/60 dark:border-stone-800 space-y-2">
              <div className="font-serif text-lg font-bold text-amber-600 dark:text-amber-400">Or &bull; Jaune Ambré</div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Incarne le soleil, la royauté, l’abondance matérielle et la fertilité. Apporte un rayonnement chaud qui met en valeur la peau.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-rose-50/50 dark:bg-stone-900 border border-rose-200/60 dark:border-stone-800 space-y-2">
              <div className="font-serif text-lg font-bold text-rose-600 dark:text-rose-400">Rouge &bull; Rubis Carmin</div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Symbole suprême de la passion amoureuse, de la séduction et du magnétisme intime. Réveille le désir et protège le foyer.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-100/70 dark:bg-stone-900 border border-stone-300/70 dark:border-stone-800 space-y-2">
              <div className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">Noir &bull; Obsidienne &bull; Pierre de lave</div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Force intérieure, puissance tranquille et barrière infranchissable contre les regards malveillants.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cyan-50/50 dark:bg-stone-900 border border-cyan-200/60 dark:border-stone-800 space-y-2">
              <div className="font-serif text-lg font-bold text-cyan-600 dark:text-cyan-400">Turquoise &bull; Caoris Sacrés</div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Bénédiction des eaux marines, apaisement de l'esprit, sagesse et prospérité continue des ancêtres.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-stone-900 border border-emerald-200/60 dark:border-stone-800 space-y-2">
              <div className="font-serif text-lg font-bold text-emerald-600 dark:text-emerald-400">Blanc Nacré &bull; Cristal Pur</div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Pureté d’intention, paix spirituelle, fidélité et équilibre des émotions au sein du couple.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-purple-50/50 dark:bg-stone-900 border border-purple-200/60 dark:border-stone-800 space-y-2">
              <div className="font-serif text-lg font-bold text-purple-600 dark:text-purple-400">Violet &bull; Améthyste</div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Intuition féminine éveillée, noblesse d'esprit et confiance inébranlable en son pouvoir personnel.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FAQs */}
      <div className="bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-10 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-6">
        <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          Foire aux questions pratiques
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {faqs.map((faq, i) => (
            <div key={i} className="p-4 rounded-xl bg-white dark:bg-stone-850 border border-stone-200/70 dark:border-stone-750 space-y-1.5">
              <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">{faq.q}</div>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-light">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('collection')}
          className="py-3.5 px-8 bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md inline-flex items-center gap-2"
        >
          <span>Choisir ma parure dans la collection</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
