import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, DeliveryInfo, PaymentMethod, Order } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size?: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode: string;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  total: number;
  
  // Modals & Panels
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  checkoutStep: number;
  setCheckoutStep: (step: number) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  
  // Delivery & Payment
  deliveryInfo: DeliveryInfo;
  setDeliveryInfo: React.Dispatch<React.SetStateAction<DeliveryInfo>>;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (pm: PaymentMethod) => void;
  lastOrder: Order | null;
  confirmOrder: () => Order;
  generateWhatsAppLink: (order?: Order) => string;
}

const DEFAULT_DELIVERY: DeliveryInfo = {
  fullName: '',
  phone: '',
  whatsapp: '',
  city: 'Cotonou',
  district: '',
  addressDetails: '',
  notes: ''
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('baya_cart');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error(e);
        return [];
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>(DEFAULT_DELIVERY);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('momo');
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  useEffect(() => {
    localStorage.setItem('baya_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, size?: string, quantity: number = 1) => {
    const selectedSize = size || product.sizes[0] || 'Standard';
    const itemId = `${product.id}__${selectedSize}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: itemId, product, size: selectedSize, quantity }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setDiscountPercent(0);
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Free delivery above 25,000 FCFA, otherwise 1,500 FCFA in Cotonou/Calavi, 2,500 elsewhere
  const deliveryFee = subtotal >= 25000 || subtotal === 0 ? 0 : 1500;

  const discount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discount + (subtotal > 0 ? deliveryFee : 0));

  const applyCoupon = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'BAYA10') {
      setCouponCode('BAYA10');
      setDiscountPercent(10);
      return { success: true, message: 'Code BAYA10 appliqué : -10% sur votre commande !' };
    }
    if (cleaned === 'BIENVENUE') {
      setCouponCode('BIENVENUE');
      setDiscountPercent(15);
      return { success: true, message: 'Code BIENVENUE appliqué : -15% de bienvenue !' };
    }
    return { success: false, message: 'Code promo invalide ou expiré.' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
  };

  const generateWhatsAppLink = (specificOrder?: Order) => {
    const orderToUse = specificOrder || lastOrder;
    const phone = '22992211895'; // WhatsApp Baya Jewelry sans le 01

    if (orderToUse) {
      const itemsList = orderToUse.items
        .map(
          (i, idx) =>
            `${idx + 1}. *${i.product.name}* (Taille: ${i.size}) x${i.quantity} = ${(i.product.price * i.quantity).toLocaleString('fr-FR')} FCFA`
        )
        .join('\n');

      const message = `Bonjour Layali Perles / Baya Jewelry ! ✨
Je souhaite confirmer ma commande *#${orderToUse.id}* passée sur le site :

🛍️ *Détails de la commande :*
${itemsList}

💰 *Sous-total :* ${orderToUse.subtotal.toLocaleString('fr-FR')} FCFA
🚚 *Livraison :* ${orderToUse.deliveryFee === 0 ? 'Offerte (Gratuit)' : `${orderToUse.deliveryFee.toLocaleString('fr-FR')} FCFA`}
${orderToUse.discount > 0 ? `🎟️ *Remise :* -${orderToUse.discount.toLocaleString('fr-FR')} FCFA\n` : ''}✨ *TOTAL :* *${orderToUse.total.toLocaleString('fr-FR')} FCFA*

📍 *Coordonnées de livraison :*
• Nom : ${orderToUse.deliveryInfo.fullName || 'Non spécifié'}
• Téléphone : ${orderToUse.deliveryInfo.phone || 'Non spécifié'}
• WhatsApp : ${orderToUse.deliveryInfo.whatsapp || orderToUse.deliveryInfo.phone}
• Ville/Quartier : ${orderToUse.deliveryInfo.city} - ${orderToUse.deliveryInfo.district || 'Centre'}
• Adresse : ${orderToUse.deliveryInfo.addressDetails || 'À préciser'}
${orderToUse.deliveryInfo.notes ? `• Note : ${orderToUse.deliveryInfo.notes}\n` : ''}💳 *Mode de paiement choisi :* ${
        orderToUse.paymentMethod === 'momo'
          ? 'MTN Mobile Money'
          : orderToUse.paymentMethod === 'moov'
          ? 'Moov Money'
          : orderToUse.paymentMethod === 'wave'
          ? 'Wave'
          : orderToUse.paymentMethod === 'cod'
          ? 'Paiement à la livraison (Espèces)'
          : 'Carte Bancaire'
      }

Merci de m'indiquer le délai exact pour la réception !`;

      return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    }

    // Fallback if no order yet
    const message = `Bonjour Layali Perles / Baya Jewelry ! ✨\nJe vous contacte depuis la boutique en ligne pour avoir plus de renseignements sur vos bayas et bracelets faits main.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const confirmOrder = (): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `BY-${randomSuffix}`,
      items: [...items],
      subtotal,
      discount,
      deliveryFee,
      total,
      deliveryInfo: { ...deliveryInfo },
      paymentMethod,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    setLastOrder(newOrder);
    setCheckoutStep(4);
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        deliveryFee,
        discount,
        couponCode,
        applyCoupon,
        removeCoupon,
        total,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        checkoutStep,
        setCheckoutStep,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        quickViewProduct,
        setQuickViewProduct,
        deliveryInfo,
        setDeliveryInfo,
        paymentMethod,
        setPaymentMethod,
        lastOrder,
        confirmOrder,
        generateWhatsAppLink
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
