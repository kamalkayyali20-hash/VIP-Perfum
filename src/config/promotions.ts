import { PromotionRuleConfig, PromotionSettings } from '../types';

export const PROMOTION_SETTINGS: PromotionSettings = {
  enabled: true,
  repeatForQualifyingQuantities: true,
  applyTwoHundredMlRuleFirst: true,
  unpairedHundredMlGivesThirtyMl: true,
  pairedFiftyMlGivesThirtyMl: true,
  packagesQualify: false, // Packages do not qualify by default
  giftsGenerateGifts: false, // Gifts never generate additional gifts
};

export const PROMOTION_RULES: PromotionRuleConfig[] = [
  {
    id: 'buy_2_100ml_get_1_50ml',
    nameAr: 'اشتري زجاجتين 100 مل واحصل على زجاجة 50 مل مجاناً',
    nameEn: 'Buy two 100 ml bottles → get one 50 ml bottle free',
    descriptionAr: 'كل زجاجتين 100 مل تمنحك زجاجة فاخرة بحجم 50 مل هدية مجانية من اختيارك.',
    descriptionEn: 'Every pair of 100 ml bottles grants one 50 ml gift bottle of your choice.',
    requiredSize: '100ml',
    requiredCount: 2,
    rewardSize: '50ml',
    rewardCount: 1,
    priority: 1, // Applied first
  },
  {
    id: 'buy_1_100ml_get_1_30ml',
    nameAr: 'اشتري زجاجة 100 مل واحصل على زجاجة 30 ml مجاناً',
    nameEn: 'Buy one 100 ml bottle → get one 30 ml bottle free',
    descriptionAr: 'كل زجاجة 100 مل فردية تمنحك زجاجة بحجم 30 مل هدية مجانية من اختيارك.',
    descriptionEn: 'Each remaining unpaired 100 ml bottle grants one 30 ml gift bottle.',
    requiredSize: '100ml',
    requiredCount: 1,
    rewardSize: '30ml',
    rewardCount: 1,
    priority: 2,
  },
  {
    id: 'buy_2_50ml_get_1_30ml',
    nameAr: 'اشتري زجاجتين 50 مل واحصل على زجاجة 30 مل مجاناً',
    nameEn: 'Buy two 50 ml bottles → get one 30 ml bottle free',
    descriptionAr: 'كل زجاجتين بحجم 50 مل تمنحك زجاجة 30 مل مجاناً من اختيارك.',
    descriptionEn: 'Every pair of 50 ml bottles grants one 30 ml gift bottle of your choice.',
    requiredSize: '50ml',
    requiredCount: 2,
    rewardSize: '30ml',
    rewardCount: 1,
    priority: 3,
  },
];
