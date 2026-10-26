import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, Ruler, Sparkles, Check, Heart, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function ProductQuickView() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    setIsCartOpen,
    setIsSizeGuideOpen,
    setIsCheckoutOpen,
    setCheckoutStep
  } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [addedEffect, setAddedEffect] = useState(false);

  if (!quickViewProduct) return null;

  const currentSize = selectedSize || quickViewProduct.sizes[0];
  const currentImage = activeImage || quickViewProduct.image;

  const handleAdd = () => {
    addToCart(quickViewProduct, currentSize, quantity);
    setAddedEffect(true);
    setTimeout(() => setAddedEffect(false), 1600);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, currentSize, quantity);
    setQuickViewProduct(null);
    setCheckoutStep(1);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 290 }}
          className="relative w-full max-w-3xl bg-[#FAF7F2] dark:bg-[#141210] border border-[#EAE3D7] dark:border-[#26221D] rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 bg-white/80 dark:bg-stone-800/80 backdrop-blur rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Gallery */}
          <div className="w-full md:w-1/2 bg-[#F3ECE2]/60 dark:bg-[#181613] p-6 flex flex-col justify-center items-center">
            <div className="w-full aspect-square rounded-2xl overflow-hidden relative shadow-md bg-[#F5EFE6] dark:bg-[#23201C]">
              <img
                src={currentImage}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {quickViewProduct.isTopSeller && (
                <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                  Coup de cœur
                </span>
              )}
            </div>

            {/* Thumbnail switcher if secondary image exists */}
            {quickViewProduct.secondaryImage && (
              <div className="flex gap-2.5 mt-4">
                <button
                  onClick={() => setActiveImage(quickViewProduct.image)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    currentImage === quickViewProduct.image
                      ? 'border-amber-500 scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={quickViewProduct.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
                <button
                  onClick={() => setActiveImage(quickViewProduct.secondaryImage!)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    currentImage === quickViewProduct.secondaryImage
                      ? 'border-amber-500 scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={quickViewProduct.secondaryImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            )}
          </div>

          {/* Right Product Details & Actions */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              {/* Category & Title */}
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold font-mono">
                  {quickViewProduct.categoryLabel}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mt-1 leading-snug">
                  {quickViewProduct.name}
                </h2>
                {quickViewProduct.subtitle && (
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {quickViewProduct.subtitle}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">
                  {quickViewProduct.price.toLocaleString('fr-FR')} FCFA
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm font-mono text-stone-400 line-through">
                    {quickViewProduct.originalPrice.toLocaleString('fr-FR')} FCFA
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Cultural meaning callout */}
              {quickViewProduct.meaning && (
                <div className="p-3 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 rounded-xl text-xs text-stone-700 dark:text-stone-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 dark:text-stone-100">Signification ancestrale : </strong>
                    {quickViewProduct.meaning}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                    Sélectionnez votre taille :
                  </label>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Guide des tailles</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-xs rounded-lg border font-mono transition-all ${
                        currentSize === sz
                          ? 'border-amber-500 bg-amber-500 text-stone-950 font-bold shadow-sm'
                          : 'border-stone-200 dark:border-stone-700 hover:border-stone-400 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                  Quantité :
                </span>
                <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 px-3 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 text-xs font-bold font-mono text-stone-900 dark:text-stone-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 px-3 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 space-y-2 mt-4 border-t border-stone-100 dark:border-stone-800">
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    addedEffect
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-800 dark:hover:bg-stone-700'
                  }`}
                >
                  {addedEffect ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Ajouté au panier !</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-amber-400" />
                      <span>Ajouter au panier</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Commander direct</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-400 dark:text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-amber-500" />
                  Fait main à Cotonou
                </span>
                <span>&bull;</span>
                <span>Livraison Bénin 24-48h</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
