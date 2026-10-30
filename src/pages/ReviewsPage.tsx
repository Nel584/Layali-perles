import { useState, useEffect } from 'react';
import { 
  Star, 
  Package, 
  MessageSquare, 
  Camera, 
  Send, 
  CheckCircle2, 
  ThumbsUp, 
  Sparkles,
  MapPin,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { PageId } from '../components/Navbar';

export interface CustomerReview {
  id: string;
  name: string;
  city: string;
  productName: string;
  rating: number;
  date: string;
  packageCondition: string;
  deliverySpeed: string;
  pearlQuality: string;
  comment: string;
  verifiedDelivery: boolean;
  photoUrl?: string;
  likes: number;
}

function isCustomerReview(value: unknown): value is CustomerReview {
  if (typeof value !== 'object' || value === null) return false;
  const review = value as Record<string, unknown>;
  return (
    typeof review.id === 'string' &&
    typeof review.name === 'string' &&
    typeof review.city === 'string' &&
    typeof review.productName === 'string' &&
    typeof review.rating === 'number' &&
    typeof review.date === 'string' &&
    typeof review.packageCondition === 'string' &&
    typeof review.deliverySpeed === 'string' &&
    typeof review.pearlQuality === 'string' &&
    typeof review.comment === 'string' &&
    typeof review.verifiedDelivery === 'boolean' &&
    typeof review.likes === 'number' &&
    (review.photoUrl === undefined || typeof review.photoUrl === 'string')
  );
}

interface ReviewsPageProps {
  onNavigate?: (page: PageId) => void;
}

export function ReviewsPage({ onNavigate }: ReviewsPageProps) {
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('layali_customer_reviews');
      if (!saved) return [];
      const parsed: unknown = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed.filter(isCustomerReview) : [];
    } catch (error) {
      console.error('Impossible de charger les avis enregistrés.', error);
      return [];
    }
  });
  const [storageError, setStorageError] = useState(false);
  const [whatsappError, setWhatsappError] = useState(false);

  const [activeFilter, setActiveFilter] = useState<'all' | '5stars' | 'withPhoto' | 'cotonou'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('Cotonou');
  const [formProduct, setFormProduct] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formPackageCondition, setFormPackageCondition] = useState('');
  const [formDeliverySpeed, setFormDeliverySpeed] = useState('');
  const [formPearlQuality, setFormPearlQuality] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formPhoto, setFormPhoto] = useState<string | null>(null);
  const [sendToWhatsApp, setSendToWhatsApp] = useState(true);

  // Save to localStorage when reviews change
  useEffect(() => {
    try {
      localStorage.setItem('layali_customer_reviews', JSON.stringify(reviews));
      setStorageError(false);
    } catch (error) {
      console.error('Impossible d’enregistrer les avis sur cet appareil.', error);
      setStorageError(true);
    }
  }, [reviews]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image un peu lourde. Veuillez choisir une photo de moins de 2 Mo.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) {
      alert('Veuillez renseigner votre prénom et votre commentaire sur le colis.');
      return;
    }

    const newReview: CustomerReview = {
      id: `rev-${Date.now()}`,
      name: formName.trim(),
      city: formCity.trim(),
      productName: formProduct.trim() || 'Création Layali Perles',
      rating: formRating,
      date: 'À l\'instant',
      packageCondition: formPackageCondition,
      deliverySpeed: formDeliverySpeed,
      pearlQuality: formPearlQuality,
      comment: formComment.trim(),
      verifiedDelivery: false,
      photoUrl: formPhoto || undefined,
      likes: 0
    };

    setReviews((previousReviews) => [newReview, ...previousReviews]);
    setSubmittedSuccess(true);

    if (sendToWhatsApp) {
      const waText = encodeURIComponent(
        `📦 *NOUVEL AVIS POST-LIVRAISON LAYALI PERLES*\n\n` +
        `👤 *Client(e) :* ${formName.trim()}\n` +
        `📍 *Lieu de livraison :* ${formCity.trim()}\n` +
        `💎 *Bijou reçu :* ${newReview.productName}\n` +
        `⭐ *Note :* ${'★'.repeat(formRating)} (${formRating}/5)\n` +
        `📦 *État colis :* ${formPackageCondition}\n` +
        `⚡ *Délai :* ${formDeliverySpeed}\n` +
        `💬 *Commentaire :* "${formComment.trim()}"`
      );
      const whatsappWindow = window.open(`https://wa.me/22992211895?text=${waText}`, '_blank');
      if (whatsappWindow) {
        whatsappWindow.opener = null;
        setWhatsappError(false);
      } else {
        setWhatsappError(true);
      }
    }

    // Reset Form
    setTimeout(() => {
      setFormName('');
      setFormProduct('');
      setFormComment('');
      setFormPhoto(null);
      setSubmittedSuccess(false);
      setIsFormOpen(false);
    }, 2500);
  };

  const handleLike = (id: string) => {
    setReviews(prev =>
      prev.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r)
    );
  };

  const filteredReviews = reviews.filter(r => {
    if (activeFilter === '5stars') return r.rating === 5;
    if (activeFilter === 'withPhoto') return Boolean(r.photoUrl);
    if (activeFilter === 'cotonou') return r.city.toLowerCase().includes('cotonou') || r.city.toLowerCase().includes('calavi');
    return true;
  });

  return (
    <div className="py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold tracking-wide uppercase font-mono mb-4 border border-amber-300/40">
            <Package className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Retours Après Réception du Colis</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mb-4">
            Avis &amp; Colis Livrés
          </h1>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Vous avez reçu votre commande ? Partagez votre expérience : état de l’emballage, qualité des perles et rapidité de la livraison, à Cotonou et partout au Bénin.
          </p>
        </div>

        {/* Action Bar: Give Review Button + WhatsApp Direct Contact */}
        <div className="bg-[#F5EFE6] dark:bg-[#1E1B17] rounded-3xl p-6 sm:p-8 border border-amber-200/60 dark:border-amber-900/40 mb-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
              Vous avez reçu votre colis Layali Perles ?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl">
              Votre retour d’expérience aide l’atelier à améliorer ses services. Déposez votre avis en une minute.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="px-6 py-3 text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl shadow-md transition-all flex items-center gap-2 transform active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isFormOpen ? 'Fermer le formulaire' : 'Donner mon avis sur mon colis'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isFormOpen ? 'rotate-180' : ''}`} />
            </button>

            <a
              href="https://wa.me/22992211895?text=Bonjour%20Layali%20Perles%2C%20je%20viens%20de%20recevoir%20mon%20colis%20et%20je%20souhaite%20donner%20mon%20avis%20%3A"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Avis direct WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Expandable Form: Submit Review */}
        {isFormOpen && (
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 border border-amber-300/40 dark:border-amber-800/40 shadow-xl mb-12 animate-fadeIn">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-xs uppercase font-mono tracking-widest text-amber-600 dark:text-amber-400 font-bold">
                  Formulaire Post-Livraison
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">
                  Évaluez la réception de votre commande
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Votre avis sera affiché ici sur cet appareil. Pour le transmettre à l’atelier, choisissez également l’envoi sur WhatsApp.
                </p>
              </div>

              {submittedSuccess ? (
                <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-2xl space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="font-serif text-xl font-bold text-emerald-900 dark:text-emerald-200">
                    Merci infiniment pour votre retour !
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
                    Votre avis a été ajouté à cette page.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  
                  {/* Row 1: Name and City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="review-name" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                        Votre prénom et nom *
                      </label>
                      <input
                        id="review-name"
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Ex: Fatouma S."
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 text-stone-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="review-city" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                        Ville et quartier de livraison *
                      </label>
                      <input
                        id="review-city"
                        type="text"
                        required
                        value={formCity}
                        onChange={(e) => setFormCity(e.target.value)}
                        placeholder="Ex: Cotonou (Cadjèhoun)"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 text-stone-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Row 2: Product Name & Star Rating */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="review-product" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                        Bijou ou baya reçu
                      </label>
                      <input
                        id="review-product"
                        type="text"
                        value={formProduct}
                        onChange={(e) => setFormProduct(e.target.value)}
                        placeholder="Ex: Baya Royal Ébène / Parure Or"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 text-stone-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <p id="review-rating-label" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                        Note globale du colis ({formRating} / 5 étoiles)
                      </p>
                      <div role="group" aria-labelledby="review-rating-label" className="flex items-center gap-2 py-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setFormRating(star)}
                            className="p-1 text-amber-500 hover:scale-110 transition-transform focus:outline-none"
                            aria-label={`${star} étoiles`}
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= formRating ? 'fill-amber-500 text-amber-500' : 'text-stone-300 dark:text-stone-700'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Specific Delivery Quality Criteria */}
                  <div className="p-4 bg-stone-50 dark:bg-stone-850 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4">
                    <p className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider font-mono">
                      Critères de réception du colis :
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label htmlFor="review-package" className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                          📦 État de l’emballage :
                        </label>
                        <select
                          id="review-package"
                          required
                          value={formPackageCondition}
                          onChange={(e) => setFormPackageCondition(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200"
                        >
                          <option value="">Choisir l'état du colis</option>
                          <option>Pochon satin impeccable &amp; discret</option>
                          <option>Coffret rigide très bien protégé</option>
                          <option>Double emballage soigné</option>
                          <option>Colis correct</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="review-delivery" className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                          ⚡ Délai de livraison :
                        </label>
                        <select
                          id="review-delivery"
                          required
                          value={formDeliverySpeed}
                          onChange={(e) => setFormDeliverySpeed(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200"
                        >
                          <option value="">Choisir le délai constaté</option>
                          <option>Livré en moins de 24 h</option>
                          <option>Livré entre 24 et 48 h à domicile</option>
                          <option>Respect du créneau convenu</option>
                          <option>Livreur ponctuel et courtois</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="review-pearl-quality" className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                          💎 Finition des perles :
                        </label>
                        <select
                          id="review-pearl-quality"
                          required
                          value={formPearlQuality}
                          onChange={(e) => setFormPearlQuality(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200"
                        >
                          <option value="">Choisir la finition reçue</option>
                          <option>Finitions conformes et très soignées</option>
                          <option>Encore plus beau qu'en photo</option>
                          <option>Ajustement parfait au tour de hanches</option>
                          <option>Qualité des perles irréprochable</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Customer Comment */}
                  <div>
                    <label htmlFor="review-comment" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      Votre avis détaillé sur le colis et votre expérience *
                    </label>
                    <textarea
                      id="review-comment"
                      required
                      rows={3}
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      placeholder="Comment s'est passée la réception ? L'emballage était-il discret ? Le bijou correspond-il à vos attentes ?"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 text-stone-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Row 5: Optional Photo Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      Photo du colis ou du bijou porté (Optionnel)
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-850 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors">
                        <Camera className="w-4 h-4 text-amber-500" />
                        <span>Sélectionner une photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                      {formPhoto && (
                        <div className="flex items-center gap-2">
                          <img
                            src={formPhoto}
                            alt="Aperçu"
                            className="w-10 h-10 rounded-lg object-cover border border-amber-300"
                          />
                          <button
                            type="button"
                            onClick={() => setFormPhoto(null)}
                            className="text-[11px] text-red-500 hover:underline"
                          >
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Send to WhatsApp Checkbox */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="waSync"
                      checked={sendToWhatsApp}
                      onChange={(e) => setSendToWhatsApp(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded-sm focus:ring-amber-500 border-stone-300"
                    />
                    <label htmlFor="waSync" className="text-xs text-stone-600 dark:text-stone-400 cursor-pointer">
                      Partager également mon avis sur WhatsApp au <strong className="text-stone-900 dark:text-stone-100">+229 92 21 18 95</strong>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Ajouter mon avis à cette page</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>
        )}

        {storageError && (
          <p role="alert" className="mb-6 text-center text-sm text-rose-600 dark:text-rose-400">
            Les avis sont visibles pendant cette session, mais n’ont pas pu être enregistrés sur cet appareil.
          </p>
        )}
        {whatsappError && (
          <p role="alert" className="mb-6 text-center text-sm text-rose-600 dark:text-rose-400">
            WhatsApp ne s’est pas ouvert. Autorisez les fenêtres contextuelles ou contactez-nous directement.
          </p>
        )}

        {reviews.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === 'all'
                  ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950'
                  : 'bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              Tous les retours ({reviews.length})
            </button>

            <button
              onClick={() => setActiveFilter('5stars')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                activeFilter === '5stars'
                  ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950'
                  : 'bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>5 étoiles</span>
            </button>

            <button
              onClick={() => setActiveFilter('withPhoto')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                activeFilter === 'withPhoto'
                  ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950'
                  : 'bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Avec photo colis</span>
            </button>

            <button
              onClick={() => setActiveFilter('cotonou')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                activeFilter === 'cotonou'
                  ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950'
                  : 'bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Cotonou &amp; Calavi</span>
            </button>
          </div>

          <div className="text-xs text-stone-500 dark:text-stone-400 font-mono">
            Affichage de {filteredReviews.length} avis
          </div>
          </div>
        )}

        {/* Reviews Grid */}
        {filteredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Header: Name, Verified Badge & Rating */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                        {review.name}
                      </h4>
                      {review.verifiedDelivery && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-semibold border border-emerald-300/40" title="Commande livrée et vérifiée">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span>Colis vérifié</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        {review.city}
                      </span>
                      <span>&bull;</span>
                      <span>{review.date}</span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 shrink-0">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= review.rating ? 'fill-amber-500 text-amber-500' : 'text-stone-300 dark:text-stone-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Ordered Product tag */}
                <div className="inline-block px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-850 text-stone-700 dark:text-stone-300 text-[11px] font-mono">
                  📦 Reçu : <strong className="text-stone-900 dark:text-stone-100">{review.productName}</strong>
                </div>

                {/* Delivery Badges */}
                <div className="space-y-1.5 pt-1 text-xs text-stone-600 dark:text-stone-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>Emballage : <strong>{review.packageCondition}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span>Délai : <strong>{review.deliverySpeed}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                    <span>Perles : <strong>{review.pearlQuality}</strong></span>
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed italic bg-stone-50 dark:bg-stone-850/60 p-3.5 rounded-xl border border-stone-100 dark:border-stone-800/80">
                  "{review.comment}"
                </p>

                {/* Parcel / Unboxing Photo if provided */}
                {review.photoUrl && (
                  <div className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 max-h-44">
                    <img
                      src={review.photoUrl}
                      alt="Photo du colis ou bijou"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

              </div>

              {/* Card Footer: Helpful button & Share */}
              <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <button
                  onClick={() => handleLike(review.id)}
                  className="flex items-center gap-1.5 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-1 px-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Utile ({review.likes})</span>
                </button>

                <a
                  href={`https://wa.me/22992211895?text=Bonjour%20Layali%20Perles%2C%20j%27ai%20vu%20l%27avis%20de%20${encodeURIComponent(review.name)}%20sur%20le%20colis%20${encodeURIComponent(review.productName)}%20et%20je%20souhaite%20commander.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Commander le même</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-stone-500 dark:text-stone-400">
            <Package className="w-8 h-8 mx-auto mb-3 text-amber-500" />
            <p className="font-medium">Aucun avis pour le moment.</p>
            <p className="mt-1 text-sm">Les avis ajoutés ici sont enregistrés uniquement sur cet appareil.</p>
          </div>
        )}

        {/* Bottom Banner: Call to Action for Browsing or Assistance */}
        <div className="mt-16 text-center bg-stone-100 dark:bg-stone-900 rounded-3xl p-8 border border-stone-200 dark:border-stone-800">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Prête à vivre l'expérience Layali Perles ?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-lg mx-auto mb-6">
            Découvrez nos collections de bayas traditionnels, bracelets et parures confectionnés sur-mesure dans notre atelier à Cotonou.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {onNavigate && (
              <button
                onClick={() => onNavigate('collection')}
                className="px-6 py-3 bg-stone-900 dark:bg-amber-400 hover:bg-stone-800 dark:hover:bg-amber-300 text-white dark:text-stone-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all"
              >
                Explorer la Collection
              </button>
            )}
            <a
              href="https://wa.me/22992211895?text=Bonjour%20Layali%20Perles%2C%20je%20souhaite%20poser%20une%20question%20sur%20la%20livraison%20de%20mes%20bijoux."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Assistance Livraison WhatsApp (92 21 18 95)</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
