import { describe, it, expect } from 'vitest';
import { calculatePromotions, reconcileGifts } from '../utils/promotionCalculator';
import { CartItem, CartPackageItem, CartGiftItem } from '../types';

const createMockCartItem = (id: string, size: '50ml' | '100ml', quantity: number): CartItem => ({
  id,
  productId: `prod_${id}`,
  slug: `slug_${id}`,
  nameAr: `عطر ${id}`,
  nameEn: `Perfume ${id}`,
  image: '',
  size,
  price: size === '100ml' ? 1500 : 1000,
  quantity,
});

describe('VIP PERFUM - Automated Promotion Calculation Engine', () => {
  it('Example 1: 1 × 100 ml → 1 × 30 ml gift', () => {
    const cart = [createMockCartItem('1', '100ml', 1)];
    const result = calculatePromotions(cart);

    expect(result.earned50ml).toBe(0);
    expect(result.earned30ml).toBe(1);
    expect(result.hasUnclaimedGifts).toBe(true);
  });

  it('Example 2: 2 × 100 ml → 1 × 50 ml gift (prioritized over 30 ml)', () => {
    const cart = [createMockCartItem('1', '100ml', 2)];
    const result = calculatePromotions(cart);

    expect(result.earned50ml).toBe(1);
    expect(result.earned30ml).toBe(0);
  });

  it('Example 3: 3 × 100 ml → 1 × 50 ml + 1 × 30 ml gifts', () => {
    const cart = [createMockCartItem('1', '100ml', 3)];
    const result = calculatePromotions(cart);

    expect(result.earned50ml).toBe(1);
    expect(result.earned30ml).toBe(1);
  });

  it('Example 4: 4 × 100 ml → 2 × 50 ml gifts', () => {
    const cart = [createMockCartItem('1', '100ml', 4)];
    const result = calculatePromotions(cart);

    expect(result.earned50ml).toBe(2);
    expect(result.earned30ml).toBe(0);
  });

  it('Example 5: 2 × 50 ml → 1 × 30 ml gift', () => {
    const cart = [createMockCartItem('1', '50ml', 2)];
    const result = calculatePromotions(cart);

    expect(result.earned50ml).toBe(0);
    expect(result.earned30ml).toBe(1);
  });

  it('Example 6: 4 × 50 ml → 2 × 30 ml gifts', () => {
    const cart = [createMockCartItem('1', '50ml', 4)];
    const result = calculatePromotions(cart);

    expect(result.earned50ml).toBe(0);
    expect(result.earned30ml).toBe(2);
  });

  it('Example 7: 1 × 100 ml + 2 × 50 ml → 2 × 30 ml gifts', () => {
    const cart = [
      createMockCartItem('1', '100ml', 1),
      createMockCartItem('2', '50ml', 2),
    ];
    const result = calculatePromotions(cart);

    expect(result.earned50ml).toBe(0);
    expect(result.earned30ml).toBe(2);
  });

  it('Packages exclusion rule: Packages do not qualify for free bottles', () => {
    const cart: CartItem[] = [];
    const packages: CartPackageItem[] = [
      {
        id: 'pkg_gold_1',
        packageId: 'gold',
        nameAr: 'الباقة الذهبية',
        nameEn: 'Gold Package',
        image: '',
        bottleCount: 12,
        bottleSize: '30ml',
        price: 2950,
        quantity: 1,
        selectedFragranceNames: { ar: [], en: [] },
        isCustom: false,
      },
    ];

    const result = calculatePromotions(cart, packages);
    expect(result.earned50ml).toBe(0);
    expect(result.earned30ml).toBe(0);
  });

  it('Gifts exclusion rule: Gifts never qualify for additional gifts', () => {
    const cart = [createMockCartItem('1', '100ml', 1)];
    const existingGifts: CartGiftItem[] = [
      {
        id: 'gift_1',
        productId: 'prod_1',
        nameAr: 'هدية مجانية',
        nameEn: 'Gift Bottle',
        image: '',
        size: '30ml',
        price: 0,
        quantity: 1,
        entitlementRule: 'rule',
      },
    ];

    const result = calculatePromotions(cart, [], existingGifts);
    // 1x 100ml earns 1x 30ml; because 1x 30ml is already selected, remaining is 0
    expect(result.earned30ml).toBe(1);
    expect(result.selected30ml).toBe(1);
    expect(result.remaining30ml).toBe(0);
    expect(result.isSelectionComplete).toBe(true);
  });

  it('Cart quantity decrease & gift reconciliation: surplus gifts trimmed', () => {
    // User originally had 2x 100ml (earned 1x 50ml), and selected a 50ml gift
    const selectedGifts: CartGiftItem[] = [
      {
        id: 'gift_50_1',
        productId: 'prod_1',
        nameAr: 'هدية 50 مل',
        nameEn: '50ml Gift',
        image: '',
        size: '50ml',
        price: 0,
        quantity: 1,
        entitlementRule: 'rule',
      },
    ];

    // User decreases quantity to 0x 100ml -> now earned 50ml is 0
    const reconciled = reconcileGifts(selectedGifts, { earned30ml: 0, earned50ml: 0 });
    expect(reconciled.length).toBe(0);
  });
});
