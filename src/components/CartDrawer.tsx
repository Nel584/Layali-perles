import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles, Tag, Check, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    discount,
    couponCode,
    applyCoupon,
    removeCoupon,
    total,
    setIsCheckoutOpen,
    setCheckoutStep
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyCoupon(inputCode);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponError('');
      setInputCode('');
    } else {
      setCouponError(res.message);
      setCouponSuccess('');
    }
  };

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    setCheckoutStep(1);
    setIsCheckoutOpen(true);
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-md bg-[#FAF7F2] dark:bg-[#141210] border-l border-[#EAE3D7] dark:border-[#26221D] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#EAE3D7] dark:border-[#26221D] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg text-amber-600 dark:text-amber-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#221E1A] dark:text-[#F7F3ED]">
                    Mon Panier
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {items.length === 0 ? 'Votre panier est vide' : `${items.length} article${items.length > 1 ? 's' : ''} sélectionné${items.length > 1 ? 's' : ''}`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-[#F3ECE2] dark:hover:bg-[#1C1916] transition-colors"
                aria-label="Fermer le panier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Delivery Bar */}
            {items.length > 0 && (
              <div className="px-6 py-2.5 bg-[#F3ECE2] dark:bg-[#1C1916] border-b border-[#EAE3D7] dark:border-[#26221D] text-xs">
                {subtotal >= 25000 ? (
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                    <Check className="w-4 h-4" />
                    <span>Félicitations ! Livraison offerte à Cotonou & Calavi.</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-stone-600 dark:text-stone-300">
                    <span>
                      Plus que <strong className="text-amber-600 dark:text-amber-400 font-mono">{(25000 - subtotal).toLocaleString('fr-FR')} FCFA</strong> pour la livraison gratuite !
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-stone-800 dark:text-stone-200">
                    Votre panier est vide
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mt-1 mb-6">
                    Découvrez nos bayas sensuels faits main et composez votre parure idéale.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-stone-950 text-xs font-semibold rounded-xl transition-colors"
                  >
                    Découvrir la collection
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-4 p-3.5 rounded-xl border border-[#EAE3D7] dark:border-[#26221D] bg-white dark:bg-[#1A1815] items-center shadow-xs"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F5EFE6] dark:bg-[#23201C] shrink-0 relative">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#221E1A] dark:text-[#F7F3ED] truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                        Taille : <span className="font-medium text-stone-700 dark:text-stone-300">{item.size}</span>
                      </div>
                      <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-1 font-mono">
                        {(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA
                      </div>

                      {/* Quantity stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-[#EAE3D7] dark:border-[#2B2621] rounded-lg bg-[#FAF7F2] dark:bg-[#141210] overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2 text-stone-500 hover:bg-[#F3ECE2] dark:hover:bg-[#23201C] transition-colors"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-[#221E1A] dark:text-[#F7F3ED] font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2 text-stone-500 hover:bg-[#F3ECE2] dark:hover:bg-[#23201C] transition-colors"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-stone-400 hover:text-rose-500 transition-colors ml-auto"
                          title="Supprimer"
                          aria-label="Supprimer cet article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Tunnel CTA */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#EAE3D7] dark:border-[#26221D] bg-[#F3ECE2]/80 dark:bg-[#181613] space-y-4">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Code promo (ex: BAYA10)"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-[#EAE3D7] dark:border-[#2B2621] rounded-lg bg-white dark:bg-[#1A1815] text-[#221E1A] dark:text-[#F7F3ED] focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 text-xs font-medium bg-[#FAF7F2] dark:bg-[#23201C] hover:bg-[#EAE3D7] dark:hover:bg-[#2B2621] text-[#221E1A] dark:text-[#F7F3ED] border border-[#EAE3D7] dark:border-[#2B2621] rounded-lg transition-colors"
                    >
                      Appliquer
                    </button>
                  </div>
                  {couponSuccess && (
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
                      <span>{couponSuccess}</span>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-stone-400 hover:text-rose-500 underline ml-2"
                      >
                        Retirer
                      </button>
                    </p>
                  )}
                  {couponError && <p className="text-[11px] text-rose-500">{couponError}</p>}
                </form>

                {/* Subtotal & Delivery details */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-500 dark:text-stone-400">
                    <span>Sous-total</span>
                    <span className="font-mono text-stone-800 dark:text-stone-200">{subtotal.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                      <span>Remise code ({couponCode})</span>
                      <span className="font-mono">-{discount.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-500 dark:text-stone-400">
                    <span>Livraison estimée</span>
                    <span className="font-mono text-stone-800 dark:text-stone-200">
                      {deliveryFee === 0 ? 'Gratuite' : `${deliveryFee.toLocaleString('fr-FR')} FCFA`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 dark:text-stone-100 pt-2 border-t border-stone-100 dark:border-stone-800">
                    <span>Total Estimé</span>
                    <span className="font-mono text-amber-600 dark:text-amber-400 text-base">
                      {total.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                </div>

                {/* Main Tunnel Trigger */}
                <button
                  onClick={handleGoToCheckout}
                  className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-stone-950 font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 dark:text-stone-900" />
                  <span>Commander &bull; Tunnel Rapide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-3 text-[11px] text-stone-400 dark:text-stone-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Paiement sécurisé ou à la livraison au Bénin</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
