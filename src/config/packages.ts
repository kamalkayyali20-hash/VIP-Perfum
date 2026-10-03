import { PackageDefinition } from '../types';
import packageImage from '../assets/images/perfume_package_collection_1791037287832.jpg';

export const STORE_PACKAGES: PackageDefinition[] = [
  {
    id: 'bronze',
    nameAr: 'الباقة البرونزية',
    nameEn: 'Bronze Package',
    subtitleAr: 'باقة المبتدئين المختارة',
    subtitleEn: 'Selected Starter Collection',
    assumedBottleCount: 4,
    bottleSize: null, // Unconfirmed bottle size
    isConfirmed: false, // Incomplete package definition
    price: null, // Price requires confirmation
    originalPrice: undefined,
    descriptionAr: 'باقة أنيقة تضم 4 عبوات عطرية فاخرة. جاري اعتماد سعة العبوات والتركيز النهائي لإتاحتها للطلب قريباً.',
    descriptionEn: 'An elegant selection featuring 4 luxury fragrances. Bottle volumes and final specifications are currently pending confirmation before release.',
    image: packageImage,
    featuresAr: [
      '4 عطور منتقاة بعناية',
      'صندوق هدايا فاخر مخملي',
      'سعة العبوات قيد التأكيد النهائي',
    ],
    featuresEn: [
      '4 carefully curated fragrances',
      'Luxury velvet presentation box',
      'Bottle sizing pending final confirmation',
    ],
  },
  {
    id: 'silver',
    nameAr: 'الباقة الفضية',
    nameEn: 'Silver Package',
    subtitleAr: 'باقة التميز الملكية',
    subtitleEn: 'Signature Connoisseur Collection',
    assumedBottleCount: 8,
    bottleSize: null, // Unconfirmed bottle size
    isConfirmed: false, // Incomplete package definition
    price: null, // Price requires confirmation
    originalPrice: undefined,
    descriptionAr: 'مجموعة فاخرة تضم 8 عطور متنوعة بين الشرقي والزهري والخشبي. جاري اعتماد السعة وتسعير الباقة رسمياً.',
    descriptionEn: 'A distinguished assembly of 8 diverse oriental, floral, and woody compositions. Bottle size and pricing are awaiting store confirmation.',
    image: packageImage,
    featuresAr: [
      '8 عطور فاخرة للمناسبات المتنوعة',
      'علبة إهداء جلدية فاخرة',
      'تفاصيل السعة والتسعير قيد التجهيز',
    ],
    featuresEn: [
      '8 premium fragrances for versatile occasions',
      'Deluxe leather-finish gift case',
      'Bottle volume and pricing undergoing final approval',
    ],
  },
  {
    id: 'gold',
    nameAr: 'الباقة الذهبية (VIP Gold)',
    nameEn: 'Gold Package (VIP Gold)',
    subtitleAr: 'المجموعة الملكية المتكاملة',
    subtitleEn: 'The Ultimate Royal Fragrance Wardrobe',
    assumedBottleCount: 12,
    bottleSize: '30ml', // Confirmed 30ml
    isConfirmed: true, // Fully confirmed and ready to purchase
    price: 2950, // Price in EGP
    originalPrice: 3800, // Valid comparison price showing true savings
    descriptionAr: 'أفخم باقات VIP PERFUM المتكاملة: 12 زجاجة عطرية بحجم 30 مل في صندوق هدايا ملكي مبطن بالمخمل الأسود ومزين بلمسات ذهبية عيار 24. يمكنك اختيار التشكيلة الجاهزة أو تخصيص الـ 12 عطراً بنفسك.',
    descriptionEn: 'The pinnacle of VIP PERFUM: 12 exquisite 30 ml bottles housed in a majestic black velvet presentation chest with gold foil detailing. Choose our master-curated selection or build your own bespoke 12-fragrance collection.',
    image: packageImage,
    featuresAr: [
      '12 زجاجة فاخرة سعة 30 مل لكل زجاجة',
      'متاحة كتشكيلة منتقاة جاهزة أو تخصيص بالكامل',
      'صندوق هدايا ملكي فاخر برباط ذهبي وكرت إهداء',
      'توفير استثنائي مقارنة بسعر الشراء الفردي',
    ],
    featuresEn: [
      '12 luxury flacons, 30 ml each',
      'Available as curated master selection or fully custom build-your-own',
      'Royal presentation box with gold ribbon and handwritten gift card',
      'Exceptional value compared to individual bottle purchases',
    ],
    curatedBottleNamesAr: [
      'رويال بلاك عود',
      'سلطان العنبر',
      'إمبريال ليذر',
      'ليالي القاهرة',
      'فيلفيت توباكو',
      'دخان الصحراء',
      'جولدن روز دمشقية',
      'كوين جاسمين',
      'أورينتال فانيلا سيلك',
      'ميدنايت عنبر بلوسوم',
      'وايت باتشولي بيور',
      'روبي مسك',
    ],
    curatedBottleNamesEn: [
      'Royal Black Oud',
      'Sultan Amber',
      'Imperial Leather',
      'Cairo Nights',
      'Velvet Tobacco',
      'Desert Smoke',
      'Golden Rose Damascena',
      'Queen Jasmine',
      'Oriental Vanilla Silk',
      'Midnight Amber Blossom',
      'White Patchouli Pure',
      'Ruby Musk',
    ],
  },
];
