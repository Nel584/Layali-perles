export type CategoryType = 'all' | 'femme' | 'homme' | 'couple' | 'motifs';

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: 'femme' | 'homme' | 'couple' | 'motifs';
  categoryLabel: string;
  price: number; // in FCFA
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  description: string;
  materials: string;
  sizes: string[];
  isTopSeller?: boolean;
  isNew?: boolean;
  stock: number;
  meaning?: string;
}

export interface CartItem {
  id: string; // product id + size
  product: Product;
  size: string;
  quantity: number;
}

export interface DeliveryInfo {
  fullName: string;
  phone: string;
  whatsapp: string;
  city: string;
  district: string;
  addressDetails: string;
  notes?: string;
}

export type PaymentMethod = 'momo' | 'moov' | 'wave' | 'cod' | 'card';

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  deliveryInfo: DeliveryInfo;
  paymentMethod: PaymentMethod;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'delivered';
}
