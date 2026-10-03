export interface StoreSettings {
  storeName: string;
  brandTaglineAr: string;
  brandTaglineEn: string;
  currency: {
    code: string;
    symbolAr: string;
    symbolEn: string;
  };
  contact: {
    phone: string; // Configurable placeholder
    whatsapp: string; // Configurable placeholder
    email: string; // Configurable placeholder
    boutiqueAddressAr: string; // Configurable placeholder
    boutiqueAddressEn: string; // Configurable placeholder
    workingHoursAr: string;
    workingHoursEn: string;
  };
  paymentRecipients: {
    instapay: {
      accountHandle: string; // Configurable placeholder
      accountHolderNameAr: string;
      accountHolderNameEn: string;
      isConfigured: boolean;
      instructionsAr: string;
      instructionsEn: string;
    };
    mobileWallet: {
      walletNumber: string; // Configurable placeholder
      walletProviderAr: string;
      walletProviderEn: string;
      isConfigured: boolean;
      instructionsAr: string;
      instructionsEn: string;
    };
    cashOnDelivery: {
      isAvailable: boolean;
      fee: number;
      instructionsAr: string;
      instructionsEn: string;
    };
  };
  shipping: {
    freeShippingThreshold: number | null; // null = not free unless configured
    defaultFee: number;
    ratesByGovernorate: Record<string, number>;
  };
  policies: {
    shippingDaysCairo: string;
    shippingDaysAlexDelta: string;
    shippingDaysOther: string;
    returnsNoticeAr: string;
    returnsNoticeEn: string;
    privacyNoticeAr: string;
    privacyNoticeEn: string;
    demoNoticeAr: string;
    demoNoticeEn: string;
  };
}

export const EGYPT_GOVERNORATES = [
  { id: 'cairo', nameAr: 'القاهرة', nameEn: 'Cairo', region: 'capital', shippingFee: 50 },
  { id: 'giza', nameAr: 'الجيزة', nameEn: 'Giza', region: 'capital', shippingFee: 50 },
  { id: 'alexandria', nameAr: 'الإسكندرية', nameEn: 'Alexandria', region: 'alex_delta', shippingFee: 65 },
  { id: 'dakahlia', nameAr: 'الدقهلية', nameEn: 'Dakahlia', region: 'alex_delta', shippingFee: 65 },
  { id: 'gharbia', nameAr: 'الغربية', nameEn: 'Gharbia', region: 'alex_delta', shippingFee: 65 },
  { id: 'sharqia', nameAr: 'الشرقية', nameEn: 'Sharqia', region: 'alex_delta', shippingFee: 65 },
  { id: 'monufia', nameAr: 'المنوفية', nameEn: 'Monufia', region: 'alex_delta', shippingFee: 65 },
  { id: 'qalyubia', nameAr: 'القليوبية', nameEn: 'Qalyubia', region: 'capital', shippingFee: 50 },
  { id: 'beheira', nameAr: 'البحيرة', nameEn: 'Beheira', region: 'alex_delta', shippingFee: 65 },
  { id: 'kafr_el_sheikh', nameAr: 'كفر الشيخ', nameEn: 'Kafr El Sheikh', region: 'alex_delta', shippingFee: 65 },
  { id: 'damietta', nameAr: 'دمياط', nameEn: 'Damietta', region: 'canal', shippingFee: 75 },
  { id: 'port_said', nameAr: 'بورسعيد', nameEn: 'Port Said', region: 'canal', shippingFee: 75 },
  { id: 'ismailia', nameAr: 'الإسماعيلية', nameEn: 'Ismailia', region: 'canal', shippingFee: 75 },
  { id: 'suez', nameAr: 'السويس', nameEn: 'Suez', region: 'canal', shippingFee: 75 },
  { id: 'fayoum', nameAr: 'الفيوم', nameEn: 'Fayoum', region: 'upper_egypt', shippingFee: 85 },
  { id: 'beni_suef', nameAr: 'بني سويف', nameEn: 'Beni Suef', region: 'upper_egypt', shippingFee: 85 },
  { id: 'minya', nameAr: 'المنيا', nameEn: 'Minya', region: 'upper_egypt', shippingFee: 85 },
  { id: 'assiut', nameAr: 'أسيوط', nameEn: 'Assiut', region: 'upper_egypt', shippingFee: 90 },
  { id: 'sohag', nameAr: 'سوهاج', nameEn: 'Sohag', region: 'upper_egypt', shippingFee: 90 },
  { id: 'qena', nameAr: 'قنا', nameEn: 'Qena', region: 'upper_egypt', shippingFee: 95 },
  { id: 'luxor', nameAr: 'الأقصر', nameEn: 'Luxor', region: 'upper_egypt', shippingFee: 95 },
  { id: 'aswan', nameAr: 'أسوان', nameEn: 'Aswan', region: 'upper_egypt', shippingFee: 95 },
  { id: 'red_sea', nameAr: 'البحر الأحمر', nameEn: 'Red Sea', region: 'coastal', shippingFee: 110 },
  { id: 'matrouh', nameAr: 'مطروح', nameEn: 'Matrouh', region: 'coastal', shippingFee: 110 },
];

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  storeName: 'VIP PERFUM',
  brandTaglineAr: 'عطرك… بصمتك',
  brandTaglineEn: 'Your scent… Your signature',
  currency: {
    code: 'EGP',
    symbolAr: 'ج.م',
    symbolEn: 'EGP',
  },
  contact: {
    // Configurable placeholders clearly distinguished from live production values
    phone: '+20 100 000 0000 (تكوين تجريبي)',
    whatsapp: '+20 100 000 0000',
    email: 'support@vipperfum.eg.demo',
    boutiqueAddressAr: 'شارع التسعين الشمالي، التجمع الخامس، القاهرة الجديدة (مقر تجريبي)',
    boutiqueAddressEn: 'North 90th Street, 5th Settlement, New Cairo (Demo Location)',
    workingHoursAr: 'يومياً من 11:00 صباحاً حتى 11:00 مساءً',
    workingHoursEn: 'Daily from 11:00 AM to 11:00 PM',
  },
  paymentRecipients: {
    instapay: {
      accountHandle: 'vipperfum@instapay',
      accountHolderNameAr: 'متجر في آي بي بيرفيوم (VIP PERFUM)',
      accountHolderNameEn: 'VIP PERFUM Store',
      isConfigured: true,
      instructionsAr: 'قم بفتح تطبيق إنستاباي، اختر إرسال نقود عبر IPA، أدخل العنوان، ثم انسخ كود المرجع أو أرفق الإشعار.',
      instructionsEn: 'Open InstaPay app, choose send via IPA handle, enter the address, and submit reference ID or screenshot.',
    },
    mobileWallet: {
      walletNumber: '01099998888',
      walletProviderAr: 'فودافون كاش / أورنج كاش / اتصالات كاش / وي باي',
      walletProviderEn: 'Vodafone Cash / Orange Cash / Etisalat Cash / WE Pay',
      isConfigured: true,
      instructionsAr: 'قم بالتحويل إلى رقم المحفظة الموضح أدناه، ثم احتفظ برقم العملية لإدخاله في حقل المرجع.',
      instructionsEn: 'Transfer to the wallet number shown below, then keep the transaction reference ID for verification.',
    },
    cashOnDelivery: {
      isAvailable: true,
      fee: 0,
      instructionsAr: 'الدفع نقداً لمندوب الشحن عند الاستلام. سيتم التواصل معك هاتفياً لتأكيد العنوان وموعد التسليم قبل خروج الشحنة.',
      instructionsEn: 'Pay cash to the courier upon delivery. Our team will contact you by phone to confirm order details before dispatch.',
    },
  },
  shipping: {
    freeShippingThreshold: null, // Shipping is NEVER free by default unless explicitly configured
    defaultFee: 65,
    ratesByGovernorate: {
      cairo: 50,
      giza: 50,
      qalyubia: 50,
      alexandria: 65,
      dakahlia: 65,
      gharbia: 65,
      sharqia: 65,
      monufia: 65,
      beheira: 65,
      kafr_el_sheikh: 65,
      damietta: 75,
      port_said: 75,
      ismailia: 75,
      suez: 75,
      fayoum: 85,
      beni_suef: 85,
      minya: 85,
      assiut: 90,
      sohag: 90,
      qena: 95,
      luxor: 95,
      aswan: 95,
      red_sea: 110,
      matrouh: 110,
    },
  },
  policies: {
    shippingDaysCairo: '1 - 2 أيام عمل',
    shippingDaysAlexDelta: '2 - 3 أيام عمل',
    shippingDaysOther: '3 - 5 أيام عمل',
    returnsNoticeAr: 'نظراً لطبيعة مستحضرات العطور الفاخرة، تقبل الإرجاعات خلال 14 يوماً فقط للعبوات المغلقة بغلاف السلوفان الأصلي غير المفتوح. العبوات المجانية المرفقة يجب إعادتها مع الطلب بحالتها الأصلية.',
    returnsNoticeEn: 'Due to luxury fragrance hygiene standards, returns are accepted within 14 days solely for unopened items with original unbroken cellophane seals. Any complimentary gift bottles must be returned with the original package.',
    privacyNoticeAr: 'بيانات العملاء وعناوين التوصيل تستخدم حصراً لتنفيذ الطلبات والتنسيق مع شركة الشحن المعتمدة داخل جمهورية مصر العربية دون مشاركة مع أي أطراف إعلانية خارجية.',
    privacyNoticeEn: 'Customer shipping details are strictly used to fulfill your fragrance delivery across Egypt and coordinate with designated couriers. Data is never shared with third-party advertisers.',
    demoNoticeAr: 'تنبيه: هذا التطبيق نموذج تجريبي (Demo). لا يتم خصم أموال حقيقية أو استدعاء بوابات دفع بنكية تلقائية.',
    demoNoticeEn: 'Notice: This application is a client-side demo. No live financial charges or automatic bank debits are executed.',
  },
};
