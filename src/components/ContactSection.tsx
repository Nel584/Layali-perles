import { useState } from 'react';
import { Send, MapPin, Phone, Mail, Instagram, Facebook, CheckCircle2, MessageSquare } from 'lucide-react';

export function ContactSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Build direct WhatsApp message
    const formatted = `Bonjour Layali Perles / Baya Jewelry ! ✨\nJe m'appelle *${name || 'Client'}* (Tél: ${phone || 'Non renseigné'}).\n\n*Mon message / demande de devis :*\n${message}`;
    const url = `https://wa.me/22992211895?text=${encodeURIComponent(formatted)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-850 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold font-mono">
            À Votre Écoute
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mt-1">
            Contactez notre atelier artisanal
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 font-light">
            Une question sur un modèle, une demande de création sur-mesure ou une parure spéciale ? Nous vous répondons rapidement via WhatsApp ou téléphone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Information & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-50 dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-5">
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                Nos Coordonnées
              </h3>

              <div className="space-y-4 text-xs">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/22992211895"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/70 dark:border-stone-750 hover:border-emerald-500 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-stone-400 dark:text-stone-500 text-[10px] uppercase font-mono">
                      WhatsApp Direct (Recommandé)
                    </div>
                    <div className="font-semibold text-stone-900 dark:text-stone-100 font-mono text-sm group-hover:text-emerald-600 transition-colors">
                      +229 92 21 18 95
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:ehouans@gmail.com"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/70 dark:border-stone-750 hover:border-amber-500 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-stone-400 dark:text-stone-500 text-[10px] uppercase font-mono">
                      Email Atelier
                    </div>
                    <div className="font-semibold text-stone-900 dark:text-stone-100 text-sm group-hover:text-amber-600 transition-colors">
                      ehouans@gmail.com
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/70 dark:border-stone-750">
                  <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-stone-400 dark:text-stone-500 text-[10px] uppercase font-mono">
                      Localisation & Expédition
                    </div>
                    <div className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                      Cotonou & Abomey-Calavi, Bénin
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                <span className="text-[11px] text-stone-500 dark:text-stone-400 block mb-2 font-mono">
                  Suivez nos créations au quotidien :
                </span>
                <div className="flex gap-2">
                  <a
                    href="https://instagram.com/sylas_dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors"
                    title="Instagram @sylas_dev"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/sylas.ehn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors"
                    title="Facebook Sylas Ehn"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Direct WhatsApp Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-stone-50 dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Votre Nom ou Prénom
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Sylas E."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Téléphone / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+229 01 XX XX XX XX"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Votre message ou commande spécifique <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Décrivez votre projet : modèle souhaité, mesure exacte en cm, couleur, quantité ou question sur la livraison..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-stone-300 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-stone-950 font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Transmettre sur WhatsApp (+229 92 21 18 95)</span>
              </button>

              {submitted && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Votre message a été transféré vers WhatsApp. À tout de suite !</span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
