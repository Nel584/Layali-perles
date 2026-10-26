import { Sparkles, Heart } from 'lucide-react';
import { PageId } from './Navbar';

interface FooterProps {
  onNavigate?: (id: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (p: PageId) => {
    if (onNavigate) {
      onNavigate(p);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-stone-100 dark:bg-stone-950 text-stone-600 dark:text-stone-400 border-t border-stone-200 dark:border-stone-850 pt-12 pb-24 md:pb-12 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-200 dark:border-stone-850">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/Logo_minimaliste_avec_main_et_perles_c4f96bc6.png"
                alt="Logo Layali Perles"
                className="w-12 h-12 rounded-full object-cover border border-amber-300/40 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                  Layali <span className="italic font-normal text-amber-600 dark:text-amber-400">Perles</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 dark:text-stone-500">
                  Bijoux &amp; Bayas Traditionnels
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
              L'Art ancestral des bayas et bijoux traditionnels africains faits main à Cotonou, Bénin.
            </p>
            <div className="text-[11px] text-stone-400 dark:text-stone-500 font-mono">
              Atelier Layali Perles &bull; Cotonou
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider font-mono text-[11px] mb-3">
              Pages du Site
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('accueil')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Accueil &amp; Nouveautés
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('collection')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Catalogue Complet
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('histoire')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Notre Histoire &amp; Savoir-faire
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('guide')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Guide des Tailles &amp; Symbolique
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('avis')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Avis &amp; Colis Livrés
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Contact &amp; Atelier
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Services */}
          <div>
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider font-mono text-[11px] mb-3">
              Services &amp; Garanties
            </h4>
            <ul className="space-y-2 text-stone-500 dark:text-stone-400">
              <li>Livraison rapide 24h à Cotonou &amp; Calavi</li>
              <li>Expédition sécurisée dans tout le Bénin</li>
              <li>Paiement MTN MoMo (+229 92 21 18 95)</li>
              <li>Paiement en espèces à la livraison</li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider font-mono text-[11px] mb-3">
              WhatsApp Atelier
            </h4>
            <p className="text-stone-500 dark:text-stone-400 leading-relaxed mb-3">
              Une commande urgente ou un modèle spécifique ? Contactez l'atelier :
            </p>
            <a
              href="https://wa.me/22992211895"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-semibold hover:bg-emerald-100 transition-colors border border-emerald-200/60 dark:border-emerald-800/40"
            >
              <span>WhatsApp : +229 92 21 18 95</span>
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400 dark:text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} Layali Perles. Tous droits réservés.
          </div>
          <div className="flex items-center gap-4">
            <span>Fait main à Cotonou, Bénin</span>
            <span>&bull;</span>
            <span>Artisanat d'Afrique</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
