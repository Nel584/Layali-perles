import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  X,
  Check,
  ChevronLeft,
  ArrowRight,
  ShoppingBag,
  MapPin,
  CreditCard,
  CheckCircle2,
  Smartphone,
  Banknote,
  Send,
  Printer,
  ShieldCheck,
  Truck,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PaymentMethod } from '../types';

export function CheckoutModal() {
  const {
    items,
    isCheckoutOpen,
    setIsCheckoutOpen,
    checkoutStep,
    setCheckoutStep,
    subtotal,
    deliveryFee,
    discount,
    couponCode,
    total,
    deliveryInfo,
    setDeliveryInfo,
    paymentMethod,
    setPaymentMethod,
    lastOrder,
    confirmOrder,
    generateWhatsAppLink,
    clearCart
  } = useCart();

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Trigger confetti when reaching confirmation step
  useEffect(() => {
    if (checkoutStep === 4) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c5a059', '#e5c07b', '#f59e0b', '#1c1917', '#ffffff']
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [checkoutStep]);

  if (!isCheckoutOpen) return null;

  const validateStep2 = () => {
    const errors: { [key: string]: string } = {};
    if (!deliveryInfo.fullName.trim()) errors.fullName = 'Veuillez saisir votre nom complet';
    if (!deliveryInfo.phone.trim()) errors.phone = 'Le numéro de téléphone est requis';
    if (!deliveryInfo.district.trim()) errors.district = 'Veuillez préciser votre quartier ou commune';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (checkoutStep === 1) {
      if (items.length === 0) return;
      setCheckoutStep(2);
    } else if (checkoutStep === 2) {
      if (validateStep2()) {
        setCheckoutStep(3);
      }
    } else if (checkoutStep === 3) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        confirmOrder();
        clearCart();
      }, 700);
    }
  };

  const steps = [
    { num: 1, label: 'Panier', icon: ShoppingBag },
    { num: 2, label: 'Livraison', icon: MapPin },
    { num: 3, label: 'Paiement', icon: CreditCard },
    { num: 4, label: 'Confirmation', icon: CheckCircle2 }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (checkoutStep === 4) {
              setIsCheckoutOpen(false);
              setCheckoutStep(1);
            } else {
              setIsCheckoutOpen(false);
            }
          }}
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 290 }}
          className="relative w-full max-w-2xl bg-[#FAF7F2] dark:bg-[#141210] border border-[#EAE3D7] dark:border-[#26221D] rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header with Title and Close Button */}
          <div className="px-6 py-4 border-b border-[#EAE3D7] dark:border-[#26221D] flex items-center justify-between bg-[#F3ECE2]/70 dark:bg-[#181613]">
            <div>
              <span className="text-[11px] font-mono tracking-wider text-amber-600 dark:text-amber-400 uppercase font-semibold">
                Tunnel de Commande Layali Perles
              </span>
              <h3 className="font-serif text-xl font-bold text-[#221E1A] dark:text-[#F7F3ED]">
                {checkoutStep === 1 && 'Vérification de votre sélection'}
                {checkoutStep === 2 && 'Adresse & Coordonnées de Livraison'}
                {checkoutStep === 3 && 'Sélection du Mode de Paiement'}
                {checkoutStep === 4 && 'Commande Validée avec Succès !'}
              </h3>
            </div>
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                if (checkoutStep === 4) setCheckoutStep(1);
              }}
              className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-[#EAE3D7] dark:hover:bg-[#23201C] transition-colors"
              aria-label="Fermer le tunnel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="px-6 py-3.5 bg-[#F3ECE2]/40 dark:bg-[#161412] border-b border-[#EAE3D7] dark:border-[#26221D]">
            <div className="flex items-center justify-between relative max-w-lg mx-auto">
              {/* Connecting background line */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-[#EAE3D7] dark:bg-[#2B2621] z-0" />
              
              {/* Connecting active filled line */}
              <motion.div
                className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-amber-500 z-0"
                initial={false}
                animate={{
                  width: `${((checkoutStep - 1) / (steps.length - 1)) * 88}%`
                }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              />

              {steps.map((st) => {
                const isPassed = checkoutStep > st.num;
                const isCurrent = checkoutStep === st.num;
                const Icon = st.icon;

                return (
                  <div key={st.num} className="relative z-10 flex flex-col items-center">
                    <motion.div
                      animate={{
                        scale: isCurrent ? 1.12 : 1,
                        backgroundColor: isPassed
                          ? '#10b981'
                          : isCurrent
                          ? '#c5a059'
                          : '#e7e5e4'
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-shadow ${
                        isPassed || isCurrent
                          ? 'text-white shadow-md'
                          : 'text-stone-600 dark:text-stone-400 dark:!bg-stone-700'
                      }`}
                    >
                      {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-4 h-4" />}
                    </motion.div>
                    <span
                      className={`text-[11px] mt-1 font-medium transition-colors hidden sm:block ${
                        isCurrent
                          ? 'text-amber-600 dark:text-amber-400 font-semibold'
                          : isPassed
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-stone-400 dark:text-stone-500'
                      }`}
                    >
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content Container */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* STEP 1: REVIEW ITEMS */}
            {checkoutStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                  <span>Vérifiez vos parures et tailles avant de continuer :</span>
                  <span>{items.length} produit{items.length > 1 ? 's' : ''}</span>
                </div>

                <div className="divide-y divide-stone-100 dark:divide-stone-800 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
                  {items.map((item) => (
                    <div key={item.id} className="p-3.5 flex items-center gap-4 bg-white dark:bg-stone-850">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-lg object-cover bg-stone-100 dark:bg-stone-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                          {item.product.name}
                        </div>
                        <div className="text-xs text-stone-500 dark:text-stone-400">
                          Taille : <span className="text-stone-700 dark:text-stone-300 font-medium">{item.size}</span> &bull; Qté : <span className="font-mono">{item.quantity}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-amber-600 dark:text-amber-400 font-mono">
                          {(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA
                        </div>
                        <div className="text-[11px] text-stone-400 font-mono">
                          {item.product.price.toLocaleString('fr-FR')} / u
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recap Box */}
                <div className="bg-stone-50 dark:bg-stone-800/40 p-4 rounded-xl border border-stone-200/80 dark:border-stone-700/60 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600 dark:text-stone-400">
                    <span>Sous-total articles</span>
                    <span className="font-mono text-stone-900 dark:text-stone-200 font-medium">
                      {subtotal.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                      <span>Code promo ({couponCode})</span>
                      <span className="font-mono">-{discount.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600 dark:text-stone-400">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-amber-500" />
                      <span>Frais d'expédition Bénin</span>
                    </span>
                    <span className="font-mono text-stone-900 dark:text-stone-200">
                      {deliveryFee === 0 ? 'Gratuit (Offert)' : `${deliveryFee.toLocaleString('fr-FR')} FCFA`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-stone-900 dark:text-stone-100 pt-2 border-t border-stone-200 dark:border-stone-700">
                    <span>Montant Total</span>
                    <span className="text-amber-600 dark:text-amber-400 font-mono">
                      {total.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: DELIVERY DETAILS */}
            {checkoutStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Nom & Prénom <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Mireille Houndégbé"
                      value={deliveryInfo.fullName}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-stone-300 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-rose-500 mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Numéro de Téléphone (Appels) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+229 01 XX XX XX XX"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-stone-300 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* WhatsApp Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Numéro WhatsApp (Pour suivi & photo)
                    </label>
                    <input
                      type="tel"
                      placeholder="+229 92 21 18 95"
                      value={deliveryInfo.whatsapp}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, whatsapp: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-stone-300 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Ville / Région <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={deliveryInfo.city}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-stone-300 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Cotonou">Cotonou (Livraison 24h)</option>
                      <option value="Abomey-Calavi">Abomey-Calavi (Livraison 24h)</option>
                      <option value="Porto-Novo">Porto-Novo (Livraison 24-48h)</option>
                      <option value="Ouidah">Ouidah (Livraison 48h)</option>
                      <option value="Parakou">Parakou / Nord Bénin</option>
                      <option value="Bohicon / Abomey">Bohicon / Abomey</option>
                      <option value="International / Diaspora">International (Expédition Express DHL/Poste)</option>
                    </select>
                  </div>

                  {/* District / Quartier */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Quartier / Repère précis <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Haie Vive, Akpakpa, Vedoko..."
                      value={deliveryInfo.district}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, district: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-stone-300 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    {formErrors.district && (
                      <p className="text-[11px] text-rose-500 mt-1">{formErrors.district}</p>
                    )}
                  </div>

                  {/* Address Details */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Précisions sur l'adresse (Maison, Carrefour, Étage)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 2ème ruelle après la pharmacie, portail noir"
                      value={deliveryInfo.addressDetails}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, addressDetails: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-stone-300 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Notes / Special Instructions */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Instruction spéciale pour la commande (Sur-mesure, emballage cadeau, etc.)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ex: Tour de taille exact 78 cm, merci d'emballer dans une pochette velours cadeau discrète."
                      value={deliveryInfo.notes}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-stone-300 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: PAYMENT METHOD */}
            {checkoutStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Choisissez votre modalité de règlement préférée. Tout est pensé pour votre sérénité :
                </p>

                <div className="space-y-3">
                  {/* MTN Mobile Money */}
                  <label
                    onClick={() => setPaymentMethod('momo')}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'momo'
                        ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'momo'}
                      onChange={() => setPaymentMethod('momo')}
                      className="mt-1 text-amber-500 focus:ring-amber-400"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                          <Smartphone className="w-4 h-4 text-amber-500" />
                          MTN Mobile Money Bénin (MoMo)
                        </span>
                        <span className="text-[10px] bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded font-mono">
                          Recommandé
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                        Paiement direct et sécurisé au <strong>+229 92 21 18 95</strong>. Validation instantanée.
                      </p>
                      {paymentMethod === 'momo' && (
                        <div className="mt-3 p-2.5 bg-white dark:bg-stone-800 rounded-lg border border-amber-200 dark:border-amber-800 text-[11px] text-stone-700 dark:text-stone-300 space-y-1">
                          <div>Numéro MoMo Layali Perles : <strong className="font-mono text-amber-600 dark:text-amber-400">+229 92 21 18 95</strong></div>
                          <input
                            type="tel"
                            placeholder="Votre numéro MoMo de débit (optionnel)"
                            value={mobileMoneyNumber}
                            onChange={(e) => setMobileMoneyNumber(e.target.value)}
                            className="w-full mt-1 px-2.5 py-1.5 text-[11px] border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Moov Money Bénin */}
                  <label
                    onClick={() => setPaymentMethod('moov')}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'moov'
                        ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'moov'}
                      onChange={() => setPaymentMethod('moov')}
                      className="mt-1 text-amber-500 focus:ring-amber-400"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-blue-500" />
                        Moov Money Bénin
                      </span>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                        Règlement par compte Moov Money sécurisé.
                      </p>
                    </div>
                  </label>

                  {/* Cash on Delivery / Paiement à la livraison */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 text-amber-500 focus:ring-amber-400"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                          <Banknote className="w-4 h-4 text-emerald-500" />
                          Paiement en Espèces à la Livraison
                        </span>
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-mono">
                          0 FCFA d'avance
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                        Inspectez votre colis et réglez en toute confiance au livreur à réception.
                      </p>
                    </div>
                  </label>

                  {/* Wave */}
                  <label
                    onClick={() => setPaymentMethod('wave')}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'wave'
                        ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'wave'}
                      onChange={() => setPaymentMethod('wave')}
                      className="mt-1 text-amber-500 focus:ring-amber-400"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-cyan-500" />
                        Wave (Transfert sans frais)
                      </span>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                        Disponible pour le Bénin, la Côte d'Ivoire et le Sénégal via scan QR ou numéro.
                      </p>
                    </div>
                  </label>

                  {/* Carte Bancaire */}
                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1 text-amber-500 focus:ring-amber-400"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-indigo-500" />
                        Carte Bancaire (Visa / Mastercard)
                      </span>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                        Protocole 3D-Secure avec passerelle internationale cryptée.
                      </p>
                    </div>
                  </label>
                </div>
              </motion.div>
            )}

            {/* STEP 4: CONFIRMATION & RECEIPT */}
            {checkoutStep === 4 && lastOrder && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center"
              >
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-mono font-semibold rounded-full mb-2">
                    Commande N° {lastOrder.id}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                    Merci pour votre confiance !
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto mt-1">
                    Votre commande a bien été enregistrée dans notre atelier. Nos artisanes préparent vos perles avec le plus grand soin.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="bg-stone-50 dark:bg-stone-850 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 text-left space-y-3 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-stone-200 dark:border-stone-700">
                    <span className="font-semibold text-stone-800 dark:text-stone-200">Destinataire :</span>
                    <span className="text-stone-600 dark:text-stone-400">{lastOrder.deliveryInfo.fullName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500 dark:text-stone-400">Destination :</span>
                    <span className="text-stone-800 dark:text-stone-200">
                      {lastOrder.deliveryInfo.city} - {lastOrder.deliveryInfo.district}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500 dark:text-stone-400">Mode de règlement :</span>
                    <span className="text-stone-800 dark:text-stone-200 font-medium">
                      {lastOrder.paymentMethod === 'momo'
                        ? 'MTN Mobile Money'
                        : lastOrder.paymentMethod === 'moov'
                        ? 'Moov Money'
                        : lastOrder.paymentMethod === 'wave'
                        ? 'Wave'
                        : lastOrder.paymentMethod === 'cod'
                        ? 'Espèces à la livraison'
                        : 'Carte Bancaire'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-stone-200 dark:border-stone-700 text-sm font-bold">
                    <span className="text-stone-900 dark:text-stone-100">Montant Total :</span>
                    <span className="text-amber-600 dark:text-amber-400 font-mono">
                      {lastOrder.total.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                </div>

                {/* Direct WhatsApp Confirmation Button */}
                <div className="space-y-2">
                  <a
                    href={generateWhatsAppLink(lastOrder)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Finaliser / Suivre sur WhatsApp (+229 92 21 18 95)</span>
                  </a>
                  <p className="text-[11px] text-stone-400 dark:text-stone-500">
                    Un message avec le récapitulatif complet de vos articles sera instantanément prêt à l'envoi.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="p-4 px-6 border-t border-[#EAE3D7] dark:border-[#26221D] bg-[#F3ECE2]/70 dark:bg-[#181613] flex items-center justify-between">
            {checkoutStep > 1 && checkoutStep < 4 ? (
              <button
                onClick={() => setCheckoutStep(checkoutStep - 1)}
                className="inline-flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 py-2 px-3 rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Retour</span>
              </button>
            ) : (
              <div />
            )}

            {checkoutStep < 3 && (
              <button
                onClick={handleNextStep}
                className="py-2.5 px-5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-stone-950 font-semibold text-xs rounded-xl transition-colors flex items-center gap-2 shadow-sm ml-auto"
              >
                <span>
                  {checkoutStep === 1 ? 'Coordonnées & Livraison' : 'Choisir le Paiement'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {checkoutStep === 3 && (
              <button
                onClick={handleNextStep}
                disabled={isSubmitting}
                className="py-3 px-6 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 shadow-md ml-auto disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>{isSubmitting ? 'Validation en cours...' : 'Confirmer & Valider la Commande'}</span>
              </button>
            )}

            {checkoutStep === 4 && (
              <div className="flex items-center gap-2 w-full justify-between">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 py-2 px-3 rounded-lg border border-stone-200 dark:border-stone-700 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimer le Reçu</span>
                </button>
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setCheckoutStep(1);
                  }}
                  className="py-2.5 px-5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-stone-950 font-semibold text-xs rounded-xl transition-colors"
                >
                  Continuer mes achats
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
