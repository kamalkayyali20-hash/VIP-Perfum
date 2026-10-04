import { Concentration } from '../types';

export interface ConcentrationDetail {
  id: Concentration;
  nameAr: string;
  nameEn: string;
  badgeAr: string;
  badgeEn: string;
  oilPercentage: string;
  longevityAr: string;
  longevityEn: string;
  sillageAr: string;
  sillageEn: string;
  priceDelta: number; // Adjustment relative to base Eau de Parfum variant price
  descriptionAr: string;
  descriptionEn: string;
}

export const CONCENTRATION_DETAILS: Record<Concentration, ConcentrationDetail> = {
  'Eau de Toilette': {
    id: 'Eau de Toilette',
    nameAr: 'أو دو تواليت (Eau de Toilette)',
    nameEn: 'Eau de Toilette',
    badgeAr: 'انتعاش يومي · 12-15%',
    badgeEn: 'Fresh & Daytime · 12-15%',
    oilPercentage: '12% - 15%',
    longevityAr: 'ثبات 6 - 8 ساعات',
    longevityEn: '6 - 8 Hours Longevity',
    sillageAr: 'فوحان هادئ منعش للصباح وأوقات العمل',
    sillageEn: 'Subtle fresh projection ideal for mornings & office',
    priceDelta: -150,
    descriptionAr: 'تركيبة خفيفة منعشة تبرز النفحات العليا المنشطة، مثالية للاستخدام اليومي المستمر والأجواء الصيفية والعمل.',
    descriptionEn: 'A light, crisp formulation highlighting vibrant top accords, perfect for daily morning wear and workplace freshness.',
  },
  'Eau de Parfum': {
    id: 'Eau de Parfum',
    nameAr: 'أو دو بارفيوم (Eau de Parfum)',
    nameEn: 'Eau de Parfum',
    badgeAr: 'التوازن المثالي · 18-20%',
    badgeEn: 'Classic Signature · 18-20%',
    oilPercentage: '18% - 20%',
    longevityAr: 'ثبات 12 - 16 ساعة',
    longevityEn: '12 - 16 Hours Longevity',
    sillageAr: 'فوحان متوازن وجذاب لمختلف المناسبات',
    sillageEn: 'Harmonious captivating projection for all day & night',
    priceDelta: 0,
    descriptionAr: 'التركيز الكلاسيكي الأكثر طلباً وتوازناً؛ يجمع بين الفوحان الفوري والعمق العطري الذي يدوم طوال اليوم والأمسيات.',
    descriptionEn: 'Our most popular balanced concentration; radiant immediate projection paired with deep enduring base notes.',
  },
  'Parfum': {
    id: 'Parfum',
    nameAr: 'بارفيوم نقي (Parfum)',
    nameEn: 'Pure Parfum',
    badgeAr: 'تركيز ملكي عميق · 25-30%',
    badgeEn: 'Royal Essence · 25-30%',
    oilPercentage: '25% - 30%',
    longevityAr: 'ثبات فائق 24+ ساعة',
    longevityEn: '24+ Hours Extreme Sillage',
    sillageAr: 'فوحان قوي وحضور طاغٍ لا يُنسى',
    sillageEn: 'Powerful, memorable aura that leaves a lasting sillage',
    priceDelta: 180,
    descriptionAr: 'نسبة زيوت عطرية مكثفة بنقاء ملكي استثنائي، تمنحك هيبة وثباتاً يمتد لأكثر من 24 ساعة على الملابس والجلد.',
    descriptionEn: 'Intense formulation with royal oil purity, creating an authoritative commanding presence exceeding 24 hours.',
  },
  'Luxury Perfume': {
    id: 'Luxury Perfume',
    nameAr: 'مجموعة النيش الفاخرة (Luxury Perfume)',
    nameEn: 'Luxury Niche Private Blend',
    badgeAr: 'إصدار استثنائي نيش · 35%+',
    badgeEn: 'Master Artisan Niche · 35%+',
    oilPercentage: '35%+',
    longevityAr: 'ثبات أسطوري يدوم لأيام',
    longevityEn: 'Legendary Multi-Day Endurance',
    sillageAr: 'فوحان فخم واستثنائي لأصحاب الذوق النادر',
    sillageEn: 'Unrivaled sillage crafted with the rarest absolutes',
    priceDelta: 380,
    descriptionAr: 'إصدار حصري فائق الندرة مستخلص من أندر الزيوت الطبيعية والمستخلصات النقية لعشاق التميز المطلق والعطور الثقيلة الفخمة.',
    descriptionEn: 'Our ultra-exclusive artisanal collection crafted from rare natural extractions and resinous woods for pure distinction.',
  },
};

export const ALL_CONCENTRATIONS: Concentration[] = [
  'Eau de Toilette',
  'Eau de Parfum',
  'Parfum',
  'Luxury Perfume',
];

/**
 * Calculates variant price taking chosen concentration into account.
 */
export function getPriceWithConcentration(
  basePrice: number,
  concentration: Concentration = 'Eau de Parfum'
): number {
  const detail = CONCENTRATION_DETAILS[concentration];
  const delta = detail ? detail.priceDelta : 0;
  return Math.max(350, basePrice + delta);
}
