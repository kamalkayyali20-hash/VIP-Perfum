export type Gender = 'men' | 'women';
export type Concentration = 'Eau de Toilette' | 'Eau de Parfum' | 'Parfum' | 'Luxury Perfume';
export type BottleSize = '30ml' | '50ml' | '100ml';

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ProductVariant {
  sku: string;
  size: '50ml' | '100ml';
  price: number;
  stock: number;
}

export interface GiftVariant {
  sku: string;
  size: '30ml' | '50ml';
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  gender: Gender;
  concentration: Concentration;
  isLuxuryCollection?: boolean;
  fragranceFamily: {
    ar: string;
    en: string;
  };
  notes: {
    top: { ar: string[]; en: string[] };
    heart: { ar: string[]; en: string[] };
    base: { ar: string[]; en: string[] };
  };
  image: string;
  secondaryImage?: string;
  variants: ProductVariant[];
  giftVariants: GiftVariant[];
  featured: boolean;
}

export interface PromotionRuleConfig {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  requiredSize: '50ml' | '100ml';
  requiredCount: number;
  rewardSize: '30ml' | '50ml';
  rewardCount: number;
  priority: number;
}

export interface PromotionSettings {
  enabled: boolean;
  repeatForQualifyingQuantities: boolean;
  applyTwoHundredMlRuleFirst: boolean;
  unpairedHundredMlGivesThirtyMl: boolean;
  pairedFiftyMlGivesThirtyMl: boolean;
  packagesQualify: boolean;
  giftsGenerateGifts: boolean;
}

export interface EarnedGiftEntitlement {
  size: '30ml' | '50ml';
  totalEarned: number;
}

export interface SelectedGift {
  productId: string;
  productNameAr: string;
  productNameEn: string;
  size: '30ml' | '50ml';
  image: string;
}

export interface CartItem {
  id: string; // unique item id in cart
  productId: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  image: string;
  size: '50ml' | '100ml';
  price: number;
  quantity: number;
}

export interface CartPackageItem {
  id: string;
  packageId: string;
  nameAr: string;
  nameEn: string;
  image: string;
  bottleCount: number;
  bottleSize: '30ml' | '50ml';
  price: number;
  quantity: number;
  selectedFragranceNames: {
    ar: string[];
    en: string[];
  };
  isCustom: boolean;
}

export interface CartGiftItem {
  id: string;
  productId: string;
  nameAr: string;
  nameEn: string;
  image: string;
  size: '30ml' | '50ml';
  price: 0;
  quantity: number;
  entitlementRule: string;
}

export interface PackageDefinition {
  id: 'bronze' | 'silver' | 'gold';
  nameAr: string;
  nameEn: string;
  subtitleAr: string;
  subtitleEn: string;
  assumedBottleCount: number;
  bottleSize: '30ml' | '50ml' | null; // null if unconfirmed
  isConfirmed: boolean;
  price: number | null; // null if unconfirmed
  originalPrice?: number;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  featuresAr: string[];
  featuresEn: string[];
  curatedBottleNamesAr?: string[];
  curatedBottleNamesEn?: string[];
}

export type PaymentMethod = 'instapay' | 'mobile_wallet' | 'cash_on_delivery';

export type PaymentStatus = 
  | 'awaiting_transfer'
  | 'awaiting_cod'
  | 'submitted_for_verification' 
  | 'verified' 
  | 'rejected';

export type FulfilmentStatus = 
  | 'pending' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled';

export interface ShippingAddress {
  fullName: string;
  phoneNumber: string;
  governorate: string;
  cityArea: string;
  streetAndBuilding: string;
  apartmentFloor?: string;
  orderNotes?: string;
}

export interface PaymentSubmission {
  method: PaymentMethod;
  transferReference: string;
  screenshotUrl?: string;
  screenshotName?: string;
  submittedAt: string;
}

export interface Order {
  id: string; // e.g. VIP-EG-2026-8841
  trackingToken: string;
  createdAt: string;
  items: CartItem[];
  packages: CartPackageItem[];
  gifts: CartGiftItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  customer: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  fulfilmentStatus: FulfilmentStatus;
  paymentDetails?: PaymentSubmission;
  statusHistory: {
    status: string;
    timestamp: string;
    noteAr: string;
    noteEn: string;
  }[];
}
