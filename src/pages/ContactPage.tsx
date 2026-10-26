import { useState } from 'react';
import { Send, MapPin, Mail, Instagram, Facebook, CheckCircle2, MessageSquare } from 'lucide-react';

export function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const formatted = `Bonjour Layali Perles / Baya Jewelry ! ✨\nJe m'appelle *${name || 'Client'}* (Tél: ${phone || 'Non renseigné'}).\n\n*Mon message / demande de devis :*\n${message}`;
    const url = `https://wa.me/22992211895?text=${encodeURIComponent(formatted)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold font-mono">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Atelier &bull; Layali Perles</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mt-2">
          Contactez Layali Perles
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2 font-light leading-relaxed">
          Une commande spéciale, un devis pour un mariage traditionnel ou une demande particulière ? Nos artisanes sont disponibles en continu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Info Col */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F3ECE2]/70 dark:bg-[#181613] p-6 sm:p-8 rounded-3xl border border-[#EAE3D7] dark:border-[#26221D] space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#221E1A] dark:text-[#F7F3ED]">
              Coordonnées Directes
            </h2>

            <div className="space-y-4 text-xs">
              {/* WhatsApp direct */}
              <a
                href="https://wa.me/22992211895"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#EAE3D7] dark:border-[#2B2621] hover:border-emerald-500 transition-colors group shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-stone-400 dark:text-stone-500 text-[10px] uppercase font-mono">
                    WhatsApp Atelier (Réponse rapide)
                  </div>
                  <div className="font-bold text-[#221E1A] dark:text-[#F7F3ED] font-mono text-sm group-hover:text-emerald-600 transition-colors">
                    +229 92 21 18 95
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:ehouans@gmail.com"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#EAE3D7] dark:border-[#2B2621] hover:border-amber-500 transition-colors group shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-stone-400 dark:text-stone-500 text-[10px] uppercase font-mono">
                    Email Officiel
                  </div>
                  <div className="font-bold text-[#221E1A] dark:text-[#F7F3ED] text-sm group-hover:text-amber-600 transition-colors">
                    ehouans@gmail.com
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-[#1A1815] border border-[#EAE3D7] dark:border-[#2B2621] shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[#F5EFE6] dark:bg-[#26221D] text-stone-600 dark:text-stone-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-stone-400 dark:text-stone-500 text-[10px] uppercase font-mono">
                    Atelier de Confection
                  </div>
                  <div className="font-bold text-[#221E1A] dark:text-[#F7F3ED] text-sm">
                    Cotonou &bull; Abomey-Calavi, Bénin
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-4 border-t border-[#EAE3D7] dark:border-[#26221D]">
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block mb-2 font-mono">
                Réseaux sociaux officiels :
              </span>
              <div className="flex gap-2">
                <a
                  href="https://instagram.com/sylas_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-[#EAE3D7] dark:border-[#2B2621] hover:bg-[#F3ECE2] dark:hover:bg-[#23201C] text-stone-700 dark:text-stone-300 transition-colors flex items-center gap-2 text-xs"
                >
                  <Instagram className="w-4 h-4 text-pink-500" />
                  <span>@sylas_dev</span>
                </a>
                <a
                  href="https://www.facebook.com/sylas.ehn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-[#EAE3D7] dark:border-[#2B2621] hover:bg-[#F3ECE2] dark:hover:bg-[#23201C] text-stone-700 dark:text-stone-300 transition-colors flex items-center gap-2 text-xs"
                >
                  <Facebook className="w-4 h-4 text-blue-600" />
                  <span>Sylas Ehn</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Message Form Col */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-[#F3ECE2]/70 dark:bg-[#181613] p-6 sm:p-10 rounded-3xl border border-[#EAE3D7] dark:border-[#26221D] space-y-5"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold font-mono">
                Formulaire Express
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#221E1A] dark:text-[#F7F3ED] mt-1">
                Envoyer un message à l'atelier
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Remplissez les détails ci-dessous pour ouvrir une conversation WhatsApp pré-remplie.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Votre Nom complet
                </label>
                <input
                  type="text"
                  placeholder="Ex: Sylas E."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#EAE3D7] dark:border-[#2B2621] rounded-xl bg-white dark:bg-[#1A1815] text-[#221E1A] dark:text-[#F7F3ED] focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Téléphone / WhatsApp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+229 92 21 18 95"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#EAE3D7] dark:border-[#2B2621] rounded-xl bg-white dark:bg-[#1A1815] text-[#221E1A] dark:text-[#F7F3ED] focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Votre Message ou Commande <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={5}
                required
                placeholder="Décrivez votre demande : parure souhaitée, tour de taille en centimètres, demande d'emballage cadeau..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-[#EAE3D7] dark:border-[#2B2621] rounded-xl bg-white dark:bg-[#1A1815] text-[#221E1A] dark:text-[#F7F3ED] focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-stone-950 font-bold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Transmettre sur WhatsApp (+229 92 21 18 95)</span>
            </button>

            {submitted && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Votre message est prêt dans WhatsApp. Nos artisanes vous répondent immédiatement !</span>
              </div>
            )}
          </form>
        </div>

      </div>

    </div>
  );
}
