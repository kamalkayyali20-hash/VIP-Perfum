import { CartItem, CartPackageItem, CartGiftItem } from '../types';
import { PROMOTION_SETTINGS } from '../config/promotions';

export interface PromotionCalculationResult {
  paidCount50ml: number;
  paidCount100ml: number;
  earned30ml: number;
  earned50ml: number;
  selected30ml: number;
  selected50ml: number;
  remaining30ml: number;
  remaining50ml: number;
  hasUnclaimedGifts: boolean;
  isSelectionComplete: boolean;
  breakdown: {
    ruleId: string;
    descriptionAr: string;
    descriptionEn: string;
    rewardSize: '30ml' | '50ml';
    rewardCount: number;
  }[];
}

/**
 * Calculates promotion entitlements based on cart items.
 * Packages are excluded from qualification by default.
 * Gifts never qualify for promotions.
 */
export function calculatePromotions(
  cartItems: CartItem[],
  _packages: CartPackageItem[] = [],
  currentGifts: CartGiftItem[] = [],
  settings = PROMOTION_SETTINGS
): PromotionCalculationResult {
  if (!settings.enabled) {
    return {
      paidCount50ml: 0,
      paidCount100ml: 0,
      earned30ml: 0,
      earned50ml: 0,
      selected30ml: 0,
      selected50ml: 0,
      remaining30ml: 0,
      remaining50ml: 0,
      hasUnclaimedGifts: false,
      isSelectionComplete: true,
      breakdown: [],
    };
  }

  // Count qualifying sizes across eligible products
  let paidCount50ml = 0;
  let paidCount100ml = 0;

  for (const item of cartItems) {
    if (item.size === '50ml') {
      paidCount50ml += item.quantity;
    } else if (item.size === '100ml') {
      paidCount100ml += item.quantity;
    }
  }

  let earned50ml = 0;
  let earned30ml = 0;
  const breakdown: PromotionCalculationResult['breakdown'] = [];

  if (settings.applyTwoHundredMlRuleFirst) {
    // 2 x 100ml -> 1 x 50ml
    const pairs100 = Math.floor(paidCount100ml / 2);
    if (pairs100 > 0) {
      earned50ml += pairs100;
      breakdown.push({
        ruleId: 'buy_2_100ml_get_1_50ml',
        descriptionAr: `عرض ${pairs100} × (زجاجتين 100 مل = زجاجة 50 مل هدية)`,
        descriptionEn: `Offer: ${pairs100} × (two 100 ml = one 50 ml free)`,
        rewardSize: '50ml',
        rewardCount: pairs100,
      });
    }

    // Unpaired 100ml -> 1 x 30ml
    const unpaired100 = paidCount100ml % 2;
    if (unpaired100 > 0 && settings.unpairedHundredMlGivesThirtyMl) {
      earned30ml += unpaired100;
      breakdown.push({
        ruleId: 'buy_1_100ml_get_1_30ml',
        descriptionAr: `عرض ${unpaired100} × (زجاجة 100 مل = زجاجة 30 مل هدية)`,
        descriptionEn: `Offer: ${unpaired100} × (one 100 ml = one 30 ml free)`,
        rewardSize: '30ml',
        rewardCount: unpaired100,
      });
    }
  } else {
    // Fallback if priority not set
    earned30ml += paidCount100ml;
  }

  // Pairs of 50ml -> 1 x 30ml
  if (settings.pairedFiftyMlGivesThirtyMl) {
    const pairs50 = Math.floor(paidCount50ml / 2);
    if (pairs50 > 0) {
      earned30ml += pairs50;
      breakdown.push({
        ruleId: 'buy_2_50ml_get_1_30ml',
        descriptionAr: `عرض ${pairs50} × (زجاجتين 50 مل = زجاجة 30 مل هدية)`,
        descriptionEn: `Offer: ${pairs50} × (two 50 ml = one 30 ml free)`,
        rewardSize: '30ml',
        rewardCount: pairs50,
      });
    }
  }

  // Calculate selected gifts
  let selected30ml = 0;
  let selected50ml = 0;

  for (const gift of currentGifts) {
    if (gift.size === '30ml') {
      selected30ml += gift.quantity;
    } else if (gift.size === '50ml') {
      selected50ml += gift.quantity;
    }
  }

  const remaining30ml = Math.max(0, earned30ml - selected30ml);
  const remaining50ml = Math.max(0, earned50ml - selected50ml);
  const hasUnclaimedGifts = remaining30ml > 0 || remaining50ml > 0;
  const isSelectionComplete = remaining30ml === 0 && remaining50ml === 0;

  return {
    paidCount50ml,
    paidCount100ml,
    earned30ml,
    earned50ml,
    selected30ml,
    selected50ml,
    remaining30ml,
    remaining50ml,
    hasUnclaimedGifts,
    isSelectionComplete,
    breakdown,
  };
}

/**
 * Reconciles current cart gift selections with newly calculated entitlements.
 * If user had selected gifts but reduced paid items, excessive gifts are trimmed.
 */
export function reconcileGifts(
  currentGifts: CartGiftItem[],
  entitlements: { earned30ml: number; earned50ml: number }
): CartGiftItem[] {
  let allowed30ml = entitlements.earned30ml;
  let allowed50ml = entitlements.earned50ml;

  const validGifts: CartGiftItem[] = [];

  for (const gift of currentGifts) {
    if (gift.size === '30ml') {
      if (allowed30ml > 0) {
        const take = Math.min(gift.quantity, allowed30ml);
        validGifts.push({ ...gift, quantity: take });
        allowed30ml -= take;
      }
    } else if (gift.size === '50ml') {
      if (allowed50ml > 0) {
        const take = Math.min(gift.quantity, allowed50ml);
        validGifts.push({ ...gift, quantity: take });
        allowed50ml -= take;
      }
    }
  }

  return validGifts;
}
