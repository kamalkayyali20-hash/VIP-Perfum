import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';

export interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

export const DICTIONARY = {
  // Navigation
  navHome: { ar: 'الرئيسية', en: 'Home' },
  navShop: { ar: 'المتجر', en: 'Shop' },
  navMen: { ar: 'رجالي', en: 'Men' },
  navWomen: { ar: 'حريمي', en: 'Women' },
  navPackages: { ar: 'الباقات', en: 'Packages' },
  navOffers: { ar: 'العروض', en: 'Offers' },
  navWishlist: { ar: 'المفضلة', en: 'Wishlist' },
  navCart: { ar: 'السلة', en: 'Cart' },
  navTrackOrder: { ar: 'تتبع الطلب', en: 'Track Order' },
  navContact: { ar: 'تواصل معنا', en: 'Contact' },
  navInfo: { ar: 'الشحن والسياسات', en: 'Shipping & Policies' },

  // Announcement Bar
  announcementOffer: {
    ar: 'عروض حصرية: اشتري زجاجة 100 مل واحصل على 30 مل هدية | اشتري زجاجتين 100 مل واحصل على 50 مل هدية مجاناً!',
    en: 'Special Offer: Buy 100 ml get 30 ml free | Buy two 100 ml get 50 ml free bottle!',
  },

  // Hero Section
  heroTitle: { ar: 'عطرك… بصمتك', en: 'Your Scent… Your Signature' },
  heroSubtitle: {
    ar: 'اختار العطر اللي يعبّر عنك مع VIP PERFUM. عطور فاخرة بتركيزات عالية وثبات استثنائي تناسب ذوقك الرفيع.',
    en: 'Choose the fragrance that defines your presence with VIP PERFUM. Masterful concentrations and enduring sillage.',
  },
  shopMenBtn: { ar: 'تسوق العطور الرجالية', en: 'Shop Men' },
  shopWomenBtn: { ar: 'تسوق العطور الحريمية', en: 'Shop Women' },
  explorePackagesBtn: { ar: 'اكتشف باقات الهدايا', en: 'Explore Gift Packages' },

  // Sections
  featuredFragrances: { ar: 'العطور الأكثر تميزاً', en: 'Featured Fragrances' },
  featuredSubtitle: {
    ar: 'مجموعة مختارة بعناية من أرقى تركيباتنا الشرقية والعالمية',
    en: 'A handpicked curation of our most prestigious compositions',
  },
  concentrationsTitle: { ar: 'اختر التركيز المناسب', en: 'Choose Your Concentration' },
  offersSectionTitle: { ar: 'عروض الزجاجات المجانية', en: 'Complimentary Bottle Offers' },
  offersSectionSubtitle: {
    ar: 'كل ما تطلب أكتر، هديتك تكبر! اختر عطورك المفضلة كهدية مجانية مع طلبك.',
    en: 'Every qualifying purchase entitles you to complimentary luxury gift bottles.',
  },
  packagesSectionTitle: { ar: 'باقات VIP PERFUM الملكية', en: 'VIP PERFUM Royal Packages' },
  packagesSectionSubtitle: {
    ar: 'باقات متكاملة في صناديق هدايا فاخرة توفر لك تجربة عطرية لا مثيل لها',
    en: 'Complete collections presented in velvet gift caskets offering unparalleled value',
  },
  howToOrderTitle: { ar: 'كيف تطلب من VIP PERFUM؟', en: 'How to Order' },
  step1Title: { ar: '1. اختر عطرك وحجم الزجاجة', en: '1. Pick Fragrance & Size' },
  step1Desc: { ar: 'تصفح تشكيلة العطور واختر بين 50 مل أو 100 مل.', en: 'Browse collections and select 50 ml or 100 ml.' },
  step2Title: { ar: '2. حدد هديتك المجانية', en: '2. Select Your Free Gift' },
  step2Desc: { ar: 'عند تأهل طلبك، اختر عطر الهدية بحجم 30 مل أو 50 مل مباشرة في السلة.', en: 'Choose your eligible gift fragrance directly in your cart.' },
  step3Title: { ar: '3. الدفع والاستلام', en: '3. Pay & Fast Delivery' },
  step3Desc: {
    ar: 'اختر الدفع عند الاستلام (كاش للمندوب)، إنستاباي، أو المحفظة الذكية، واستلم شحنتك خلال 24-48 ساعة داخل مصر.',
    en: 'Choose Cash on Delivery (COD), InstaPay, or Mobile Wallet, and receive your doorstep delivery within 24-48 hours across Egypt.',
  },

  // Filters & Sorting
  filterAll: { ar: 'الكل', en: 'All' },
  filterGender: { ar: 'النوع', en: 'Gender' },
  filterConcentration: { ar: 'التركيز أو المجموعة', en: 'Concentration / Collection' },
  filterSize: { ar: 'الحجم', en: 'Size' },
  filterPrice: { ar: 'نطاق السعر', en: 'Price Range' },
  filterStockOnly: { ar: 'المتوفر في المخزن فقط', en: 'In-stock only' },
  sortBy: { ar: 'ترتيب حسب', en: 'Sort By' },
  sortFeatured: { ar: 'المميز أولاً', en: 'Featured' },
  sortPriceAsc: { ar: 'السعر: من الأقل للأعلى', en: 'Price: Low to High' },
  sortPriceDesc: { ar: 'السعر: من الأعلى للأقل', en: 'Price: High to Low' },
  sortName: { ar: 'الاسم', en: 'Name' },
  clearFilters: { ar: 'مسح التصفية', en: 'Clear Filters' },
  resultsCount: { ar: 'النتائج ({count} عطر)', en: 'Results ({count} perfumes)' },
  noProductsFound: { ar: 'لا توجد عطور تطابق اختياراتك الحالية', en: 'No fragrances match your selected criteria' },
  searchPlaceholder: { ar: 'ابحث عن اسم العطر أو العائلة العطرية...', en: 'Search fragrance name or olfactory family...' },

  // Product Detail
  sizeSelect: { ar: 'سعة العبوة', en: 'Bottle Size' },
  quantity: { ar: 'الكمية', en: 'Quantity' },
  addToCart: { ar: 'أضف إلى السلة', en: 'Add to Cart' },
  outOfStock: { ar: 'نفد من المخزن حالياً', en: 'Currently Out of Stock' },
  inStock: { ar: 'متوفر للطلب الفوري', en: 'In Stock' },
  topNotes: { ar: 'القمة العطرية (الافتتاحية)', en: 'Top Notes' },
  heartNotes: { ar: 'قلب العطر (الوسط)', en: 'Heart Notes' },
  baseNotes: { ar: 'القاعدة العطرية (الخاتمة)', en: 'Base Notes' },
  fragranceFamilyLabel: { ar: 'العائلة العطرية', en: 'Fragrance Family' },
  applicableOffer: { ar: 'العرض الساري على هذا المنتج', en: 'Applicable Promotion' },
  relatedFragrances: { ar: 'عطور قد تنال إعجابك', en: 'You May Also Like' },
  freeGiftBadge: { ar: 'هدية مجانية', en: 'Free Gift' },
  luxuryLabel: { ar: 'مجموعة النيش الفاخرة', en: 'Luxury Collection' },

  // Cart
  cartTitle: { ar: 'سلة المشتريات', en: 'Shopping Cart' },
  cartEmpty: { ar: 'سلتك فارغة حالياً', en: 'Your cart is currently empty' },
  continueShopping: { ar: 'متابعة التسوق', en: 'Continue Shopping' },
  proceedToCheckout: { ar: 'إتمام الطلب', en: 'Proceed to Checkout' },
  subtotal: { ar: 'المجموع الفرعي', en: 'Subtotal' },
  shipping: { ar: 'الشحن والتوصيل', en: 'Shipping' },
  shippingCalculatedAtCheckout: { ar: 'يحسب عند اختيار المحافظة', en: 'Calculated upon selecting governorate' },
  total: { ar: 'الإجمالي النهائي', en: 'Total' },
  removeItem: { ar: 'حذف', en: 'Remove' },
  packagesLabel: { ar: 'الباقات المختارة', en: 'Selected Packages' },
  paidBottlesLabel: { ar: 'الزجاجات المشتراة', en: 'Purchased Fragrances' },
  giftsEarnedHeader: { ar: 'الهدايا المجانية المستحقة', en: 'Earned Complimentary Gifts' },
  selectGiftFragranceBtn: { ar: 'اختر عطر الهدية', en: 'Select Gift Fragrance' },
  changeGiftSelection: { ar: 'تغيير اختيار الهدية', en: 'Change Gift Fragrance' },
  declineGiftsBtn: { ar: 'متابعة بدون هدايا مجانية', en: 'Proceed Without Gifts' },
  giftsPendingAlert: {
    ar: 'لديك هدايا مجانية مستحقة! يُرجى اختيار عطور الهدايا أو تأكيد المتابعة بدونها لإتمام الشراء.',
    en: 'You have earned free gifts! Please choose your gift fragrances or confirm proceeding without them.',
  },

  // Checkout
  checkoutTitle: { ar: 'بيانات الطلب والشحن', en: 'Checkout & Delivery' },
  contactInfo: { ar: 'بيانات المستلم', en: 'Recipient Details' },
  fullName: { ar: 'الاسم بالكامل', en: 'Full Name' },
  phoneNumber: { ar: 'رقم الموبايل المصري', en: 'Egyptian Mobile Number' },
  governorate: { ar: 'المحافظة', en: 'Governorate' },
  selectGovernorate: { ar: 'اختر المحافظة', en: 'Select Governorate' },
  cityArea: { ar: 'المدينة / المنطقة / الحي', en: 'City / District / Area' },
  streetAndBuilding: { ar: 'اسم الشارع، رقم العمارة، علامة مميزة', en: 'Street Name, Building No., Landmark' },
  apartmentFloor: { ar: 'رقم الشقة والطابق (اختياري)', en: 'Apartment & Floor (Optional)' },
  orderNotes: { ar: 'ملاحظات خاصة بمندوب الشحن (اختياري)', en: 'Courier Delivery Notes (Optional)' },
  paymentMethodTitle: { ar: 'طريقة الدفع والتسديد', en: 'Payment Method' },
  payInstaPay: { ar: 'تحويل عبر إنستاباي (InstaPay)', en: 'InstaPay Transfer' },
  payMobileWallet: { ar: 'المحافظ الإلكترونية (فودافون كاش، أورنج، اتصالات، وي)', en: 'Mobile Wallet (Vodafone / Orange / Etisalat / WE)' },
  payCashOnDelivery: { ar: 'الدفع عند الاستلام (كاش للمندوب)', en: 'Cash on Delivery (COD)' },
  codDescription: {
    ar: 'ادفع نقداً بالجنيه المصري لمندوب شركة الشحن عند استلام عطورك وباقاتك ومعاينتها أمام منزلك.',
    en: 'Pay in cash directly to the courier upon delivery and inspection of your perfumes at your doorstep.',
  },
  codVerificationNotice: {
    ar: 'سيقوم ممثل خدمة عملاء VIP PERFUM بالتواصل معك هاتفياً أو عبر واتساب لتأكيد العنوان وموعد التسليم قبل خروج الشحنة مباشرة.',
    en: 'A VIP PERFUM representative will contact you via phone or WhatsApp to confirm your delivery address and schedule prior to dispatch.',
  },
  codBadge: { ar: 'الأكثر طلباً في مصر · بدون رسوم إضافية', en: 'Most Popular in Egypt · 0 EGP Fee' },
  codFeeLabel: { ar: 'رسوم الدفع عند الاستلام:', en: 'COD Fee:' },
  codFreeText: { ar: 'مجاناً (0 ج.م)', en: 'Free (0 EGP)' },
  recipientDetailsTitle: { ar: 'بيانات تحويل المبلغ للمتجر', en: 'Store Transfer Recipient' },
  accountHandle: { ar: 'عنوان إنستاباي (IPA)', en: 'InstaPay IPA Handle' },
  walletNumberLabel: { ar: 'رقم المحفظة للتحويل', en: 'Wallet Number to Transfer' },
  copyBtn: { ar: 'نسخ', en: 'Copy' },
  copiedText: { ar: 'تم النسخ!', en: 'Copied!' },
  amountToTransfer: { ar: 'المبلغ المطلوب تحويله بالكامل', en: 'Exact Amount to Transfer' },
  transferRefLabel: { ar: 'الرقم المرجعي للتحويل / كود العملية', en: 'Transfer Reference ID' },
  transferRefPlaceholder: { ar: 'مثال: IP-298374 أو كود العملية من رسالة التأكيد', en: 'e.g. IP-298374 or transaction code' },
  uploadProofLabel: { ar: 'إرفاق إشعار التحويل (اختياري - صورة شاشة)', en: 'Upload Transfer Screenshot (Optional)' },
  chooseFile: { ar: 'اختيار صورة', en: 'Choose Image' },
  paymentNoticeText: {
    ar: 'هام: بعد إتمام الطلب، سيتم مراجعة وتدقيق إشعار التحويل يدوياً من قِبل إدارة المتجر قبل شحن الطلب. رفع الصورة أو إدخال الكود لا يعني تأكيد الدفع فوراً.',
    en: 'Important: Following submission, payment details are manually audited by store management prior to dispatch. Submitting a reference or screenshot does not automatically mark payment as verified.',
  },
  confirmOrderBtn: { ar: 'تأكيد وإرسال الطلب', en: 'Confirm & Place Order' },
  confirmOrderCodBtn: { ar: 'تأكيد الطلب والدفع عند الاستلام (كاش للمندوب)', en: 'Confirm Order (Pay Cash on Delivery)' },
  paymentConfigMissingError: {
    ar: 'تعذر إتمام الطلب: لم يتم ضبط إعدادات حساب الدفع في المتجر حالياً. يرجى التواصل مع الدعم الفني.',
    en: 'Order blocked: Store recipient payment settings are currently not configured. Please contact support.',
  },

  // Order Confirmation & Tracking
  orderConfirmationTitle: { ar: 'تم تسجيل طلبك بنجاح!', en: 'Order Placed Successfully!' },
  orderNumberLabel: { ar: 'رقم الطلب', en: 'Order Number' },
  trackingTokenLabel: { ar: 'رمز التتبع السري', en: 'Private Tracking Token' },
  paymentStatusLabel: { ar: 'حالة الدفع', en: 'Payment Status' },
  fulfilmentStatusLabel: { ar: 'حالة الشحن', en: 'Fulfilment Status' },
  trackYourOrderBtn: { ar: 'تتبع حالة طلبك', en: 'Track Your Order' },
  trackOrderPageTitle: { ar: 'تتبع شحنة عطورك', en: 'Track Fragrance Shipment' },
  enterOrderNumber: { ar: 'أدخل رقم الطلب (مثال: VIP-EG-2026-XXXX)', en: 'Enter Order Number (e.g. VIP-EG-2026-XXXX)' },
  enterPhoneOrToken: { ar: 'رقم الموبايل أو رمز التتبع السري', en: 'Mobile Number or Tracking Token' },
  lookupBtn: { ar: 'استعلام', en: 'Lookup' },

  // Statuses
  status_awaiting_transfer: { ar: 'بانتظار التحويل المالي', en: 'Awaiting Transfer' },
  status_awaiting_cod: { ar: 'الدفع عند الاستلام (كاش للمندوب)', en: 'Cash on Delivery (Pending)' },
  status_submitted_for_verification: { ar: 'تم تقديم الإشعار (قيد التدقيق اليدوي)', en: 'Submitted for Verification' },
  status_verified: { ar: 'تم التحقق من الدفع بنجاح', en: 'Payment Verified' },
  status_rejected: { ar: 'تم رفض إشعار الدفع', en: 'Payment Rejected' },
  status_pending: { ar: 'طلب جديد قيد الانتظار', en: 'Pending' },
  status_processing: { ar: 'جاري تجهيز وتغليف العطور', en: 'Processing' },
  status_shipped: { ar: 'تم تسليم الشحنة لشركة التوصيل', en: 'Shipped' },
  status_delivered: { ar: 'تم التوصيل بنجاح', en: 'Delivered' },
  status_cancelled: { ar: 'تم إلغاء الطلب', en: 'Cancelled' },

  // Packages details
  detailsComingSoon: { ar: 'التفاصيل والأسعار قيد التأكيد قريباً', en: 'Details & Pricing Coming Soon' },
  packageUnavailableBtn: { ar: 'غير متاح للطلب حالياً', en: 'Currently Unavailable' },
  buildYourOwnTitle: { ar: 'خصص باقتك الذهبية (12 زجاجة)', en: 'Customize Your Gold Package (12 Bottles)' },
  selectBottlesRemaining: { ar: 'المتبقي لاكتمال الباقة: {count} زجاجة', en: 'Remaining to complete casket: {count} bottles' },
  packageBottlesComplete: { ar: 'اكتملت 12 زجاجة! جاهزة للإضافة للسلة', en: '12 bottles selected! Ready to add to cart' },
  curatedOption: { ar: 'التشكيلة الجاهزة المختارة من خبراء VIP', en: 'Pre-curated Master Selection' },
  customOption: { ar: 'تخصيص الـ 12 عطراً بنفسي', en: 'Build-your-own 12 Fragrances' },
  addCuratedToCart: { ar: 'أضف الباقة الجاهزة للسلة', en: 'Add Curated Package to Cart' },
  addCustomToCart: { ar: 'أضف الباقة المخصصة للسلة', en: 'Add Custom Package to Cart' },

  // Wishlist
  wishlistTitle: { ar: 'قائمة الرغبات والمفضلة', en: 'My Fragrance Wishlist' },
  wishlistEmpty: { ar: 'لا توجد عطور مضافة للمفضلة بعد', en: 'Your wishlist is currently empty' },

  // Disclaimer
  demoNoticeHeading: { ar: 'تنويه النموذج التجريبي', en: 'Demo Store Disclaimer' },
  demoNoticeBody: {
    ar: 'هذا المتجر نموذج تقني تجريبي (React Client Demo) لعلامة VIP PERFUM داخل مصر. الطلبات والبيانات تحفظ محلياً على جهازك. للدفع الحقيقي والربط الإنتاجي يلزم خادم مركزي وقاعدة بيانات آمنة.',
    en: 'This application is a frontend prototype demo for VIP PERFUM Egypt. Orders are stored locally on your device. Live production deployment requires a secure backend, database, and certified gateway.',
  },
};

interface LanguageContextType {
  language: Language;
  direction: 'rtl' | 'ltr';
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof DICTIONARY, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('vip_perfum_lang_v1');
      if (saved === 'en' || saved === 'ar') return saved;
    } catch {}
    return 'ar'; // Default Arabic
  });

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    try {
      localStorage.setItem('vip_perfum_lang_v1', language);
    } catch {}
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (key: keyof typeof DICTIONARY, params?: Record<string, string | number>): string => {
    const item = DICTIONARY[key];
    if (!item) return key as string;
    let text = item[language] || item['ar'] || (key as string);
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
    }
    return text;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
