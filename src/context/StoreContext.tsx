import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Product,
  CartItem,
  CartPackageItem,
  CartGiftItem,
  Order,
  PaymentSubmission,
  ShippingAddress,
  PaymentMethod,
  PaymentStatus,
  Concentration,
} from '../types';
import { DEMO_PRODUCTS } from '../config/products';
import { STORE_PACKAGES } from '../config/packages';
import { INITIAL_STORE_SETTINGS, StoreSettings } from '../config/storeSettings';
import { getPriceWithConcentration } from '../config/concentrations';
import { calculatePromotions, reconcileGifts, PromotionCalculationResult } from '../utils/promotionCalculator';
import { orderService } from '../services';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  cartPackages: CartPackageItem[];
  cartGifts: CartGiftItem[];
  wishlist: string[];
  storeSettings: StoreSettings;
  promotionResult: PromotionCalculationResult;
  giftsDeclined: boolean;
  isGiftSelectionSatisfied: boolean;
  selectedGovernorateId: string;
  setSelectedGovernorateId: (id: string) => void;
  subtotal: number;
  packagesTotal: number;
  shippingFee: number;
  finalTotal: number;
  totalCartItemCount: number;

  // Quick View Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Actions
  addToCart: (
    product: Product,
    size: '50ml' | '100ml',
    quantity?: number,
    concentration?: Concentration
  ) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  removeCartItem: (id: string) => void;
  addPackageToCart: (
    pkgId: 'gold',
    isCustom: boolean,
    selectedFragranceNames?: { ar: string[]; en: string[] }
  ) => boolean;
  removePackageFromCart: (id: string) => void;
  selectGiftFragrance: (productId: string, size: '30ml' | '50ml') => boolean;
  removeGiftItem: (id: string) => void;
  declineGifts: () => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Order actions
  createOrder: (customer: ShippingAddress, paymentMethod: PaymentMethod) => Promise<Order>;
  submitPaymentVerification: (orderId: string, submission: PaymentSubmission) => Promise<Order>;
  getOrderById: (orderId: string, tokenOrPhone?: string) => Promise<Order | null>;

  // Store settings management for testing missing payment config
  updatePaymentConfiguration: (method: 'instapay' | 'mobileWallet', isConfigured: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART_ITEMS: 'vip_perfum_cart_items_v1',
  CART_PACKAGES: 'vip_perfum_cart_packages_v1',
  CART_GIFTS: 'vip_perfum_cart_gifts_v1',
  WISHLIST: 'vip_perfum_wishlist_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(DEMO_PRODUCTS);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(INITIAL_STORE_SETTINGS);

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART_ITEMS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartPackages, setCartPackages] = useState<CartPackageItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART_PACKAGES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartGifts, setCartGifts] = useState<CartGiftItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART_GIFTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [giftsDeclined, setGiftsDeclined] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);
  const [selectedGovernorateId, setSelectedGovernorateId] = useState<string>('cairo');

  // Promotion calculation
  const promotionResult = useMemo(() => {
    return calculatePromotions(cart, cartPackages, cartGifts);
  }, [cart, cartPackages, cartGifts]);

  // Sync gifts when entitlements decrease
  useEffect(() => {
    const reconciled = reconcileGifts(cartGifts, {
      earned30ml: promotionResult.earned30ml,
      earned50ml: promotionResult.earned50ml,
    });
    // Check if reconciled is different
    const totalOld = cartGifts.reduce((s, g) => s + g.quantity, 0);
    const totalNew = reconciled.reduce((s, g) => s + g.quantity, 0);
    if (totalOld !== totalNew) {
      setCartGifts(reconciled);
    }
  }, [promotionResult.earned30ml, promotionResult.earned50ml]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART_ITEMS, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART_PACKAGES, JSON.stringify(cartPackages));
    } catch {}
  }, [cartPackages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART_GIFTS, JSON.stringify(cartGifts));
    } catch {}
  }, [cartGifts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  // Financial calculations
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const packagesTotal = useMemo(() => {
    return cartPackages.reduce((sum, pkg) => sum + pkg.price * pkg.quantity, 0);
  }, [cartPackages]);

  const shippingFee = useMemo(() => {
    if (cart.length === 0 && cartPackages.length === 0) return 0;
    const rate = storeSettings.shipping.ratesByGovernorate[selectedGovernorateId];
    if (rate !== undefined) {
      // Check if threshold applies
      const combinedTotal = subtotal + packagesTotal;
      if (
        storeSettings.shipping.freeShippingThreshold !== null &&
        combinedTotal >= storeSettings.shipping.freeShippingThreshold
      ) {
        return 0;
      }
      return rate;
    }
    return storeSettings.shipping.defaultFee;
  }, [cart.length, cartPackages.length, selectedGovernorateId, storeSettings.shipping, subtotal, packagesTotal]);

  const finalTotal = subtotal + packagesTotal + shippingFee;

  const totalCartItemCount = useMemo(() => {
    const paidCount = cart.reduce((s, i) => s + i.quantity, 0);
    const pkgCount = cartPackages.reduce((s, p) => s + p.quantity, 0);
    const giftCount = cartGifts.reduce((s, g) => s + g.quantity, 0);
    return paidCount + pkgCount + giftCount;
  }, [cart, cartPackages, cartGifts]);

  const isGiftSelectionSatisfied = useMemo(() => {
    // Satisfied if: no gifts earned, or all earned gifts are selected, or explicitly declined
    if (!promotionResult.hasUnclaimedGifts) return true;
    if (giftsDeclined) return true;
    return promotionResult.isSelectionComplete;
  }, [promotionResult, giftsDeclined]);

  // Actions
  const addToCart = (
    product: Product,
    size: '50ml' | '100ml',
    quantity = 1,
    concentration?: Concentration
  ) => {
    const variant = product.variants.find((v) => v.size === size);
    if (!variant || variant.stock < 1) return;

    const chosenConcentration = concentration || product.concentration || 'Eau de Parfum';
    const unitPrice = getPriceWithConcentration(variant.price, chosenConcentration);

    setGiftsDeclined(false); // Reset decline when cart changes so customer gets chance to choose

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.productId === product.id &&
          item.size === size &&
          (item.concentration || product.concentration) === chosenConcentration
      );
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, variant.stock) }
            : item
        );
      }
      const newItem: CartItem = {
        id: `${product.id}_${size}_${chosenConcentration.replace(/\s+/g, '_')}_${Date.now()}`,
        productId: product.id,
        slug: product.slug,
        nameAr: product.nameAr,
        nameEn: product.nameEn,
        image: product.image,
        size,
        concentration: chosenConcentration,
        price: unitPrice,
        quantity: Math.min(quantity, variant.stock),
      };
      return [...prev, newItem];
    });
  };

  const updateCartItemQuantity = (id: string, quantity: number) => {
    setGiftsDeclined(false);
    if (quantity <= 0) {
      removeCartItem(id);
      return;
    }
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id !== id) return item;
        const prod = products.find((p) => p.id === item.productId);
        const variant = prod?.variants.find((v) => v.size === item.size);
        const maxStock = variant?.stock || 99;
        return { ...item, quantity: Math.min(quantity, maxStock) };
      });
    });
  };

  const removeCartItem = (id: string) => {
    setGiftsDeclined(false);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const addPackageToCart = (
    pkgId: 'gold',
    isCustom: boolean,
    selectedFragranceNames?: { ar: string[]; en: string[] }
  ): boolean => {
    const pkgDef = STORE_PACKAGES.find((p) => p.id === pkgId);
    if (!pkgDef || !pkgDef.isConfirmed || pkgDef.price === null || !pkgDef.bottleSize) {
      return false; // Incomplete package cannot be purchased
    }

    if (isCustom) {
      if (
        !selectedFragranceNames ||
        selectedFragranceNames.ar.length !== pkgDef.assumedBottleCount
      ) {
        return false;
      }
    }

    const newPkgItem: CartPackageItem = {
      id: `pkg_${pkgId}_${Date.now()}`,
      packageId: pkgDef.id,
      nameAr: pkgDef.nameAr,
      nameEn: pkgDef.nameEn,
      image: pkgDef.image,
      bottleCount: pkgDef.assumedBottleCount,
      bottleSize: pkgDef.bottleSize,
      price: pkgDef.price,
      quantity: 1,
      selectedFragranceNames: isCustom && selectedFragranceNames ? selectedFragranceNames : {
        ar: pkgDef.curatedBottleNamesAr || [],
        en: pkgDef.curatedBottleNamesEn || [],
      },
      isCustom,
    };

    setCartPackages((prev) => [...prev, newPkgItem]);
    return true;
  };

  const removePackageFromCart = (id: string) => {
    setCartPackages((prev) => prev.filter((item) => item.id !== id));
  };

  const selectGiftFragrance = (productId: string, size: '30ml' | '50ml'): boolean => {
    const product = products.find((p) => p.id === productId);
    if (!product) return false;

    const giftVariant = product.giftVariants.find((g) => g.size === size);
    if (!giftVariant || giftVariant.stock < 1) return false;

    // Check if remaining entitlement allows selecting this size
    if (size === '30ml' && promotionResult.remaining30ml <= 0) return false;
    if (size === '50ml' && promotionResult.remaining50ml <= 0) return false;

    setCartGifts((prev) => {
      const existing = prev.find((g) => g.productId === productId && g.size === size);
      if (existing) {
        return prev.map((g) => (g.id === existing.id ? { ...g, quantity: g.quantity + 1 } : g));
      }
      const newGift: CartGiftItem = {
        id: `gift_${productId}_${size}_${Date.now()}`,
        productId: product.id,
        nameAr: product.nameAr,
        nameEn: product.nameEn,
        image: product.image,
        size,
        price: 0,
        quantity: 1,
        entitlementRule: size === '50ml' ? 'buy_2_100ml' : 'buy_1_100ml_or_2_50ml',
      };
      return [...prev, newGift];
    });

    return true;
  };

  const removeGiftItem = (id: string) => {
    setCartGifts((prev) => prev.filter((g) => g.id !== id));
  };

  const declineGifts = () => {
    setGiftsDeclined(true);
    setCartGifts([]);
  };

  const clearCart = () => {
    setCart([]);
    setCartPackages([]);
    setCartGifts([]);
    setGiftsDeclined(false);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const createOrder = async (customer: ShippingAddress, paymentMethod: PaymentMethod): Promise<Order> => {
    // Validate missing payment config
    if (paymentMethod === 'instapay' && !storeSettings.paymentRecipients.instapay.isConfigured) {
      throw new Error('InstaPay payment configuration is not set up by store.');
    }
    if (paymentMethod === 'mobile_wallet' && !storeSettings.paymentRecipients.mobileWallet.isConfigured) {
      throw new Error('Mobile wallet payment configuration is not set up by store.');
    }
    if (paymentMethod === 'cash_on_delivery' && !storeSettings.paymentRecipients.cashOnDelivery.isAvailable) {
      throw new Error('Cash on delivery is currently unavailable.');
    }

    const initialPaymentStatus: PaymentStatus =
      paymentMethod === 'cash_on_delivery' ? 'awaiting_cod' : 'awaiting_transfer';

    const orderData = {
      items: [...cart],
      packages: [...cartPackages],
      gifts: [...cartGifts],
      subtotal,
      shippingFee,
      total: finalTotal,
      customer,
      paymentMethod,
      paymentStatus: initialPaymentStatus,
      fulfilmentStatus: 'pending' as const,
    };

    const newOrder = await orderService.createOrder(orderData);
    clearCart();
    return newOrder;
  };

  const submitPaymentVerification = async (
    orderId: string,
    submission: PaymentSubmission
  ): Promise<Order> => {
    return orderService.submitPaymentVerification(orderId, submission);
  };

  const getOrderById = async (orderId: string, tokenOrPhone?: string): Promise<Order | null> => {
    return orderService.getOrderById(orderId, tokenOrPhone);
  };

  const updatePaymentConfiguration = (method: 'instapay' | 'mobileWallet', isConfigured: boolean) => {
    setStoreSettings((prev) => ({
      ...prev,
      paymentRecipients: {
        ...prev.paymentRecipients,
        [method]: {
          ...prev.paymentRecipients[method],
          isConfigured,
        },
      },
    }));
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        cartPackages,
        cartGifts,
        wishlist,
        storeSettings,
        promotionResult,
        giftsDeclined,
        isGiftSelectionSatisfied,
        selectedGovernorateId,
        setSelectedGovernorateId,
        subtotal,
        packagesTotal,
        shippingFee,
        finalTotal,
        totalCartItemCount,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        addToCart,
        updateCartItemQuantity,
        removeCartItem,
        addPackageToCart,
        removePackageFromCart,
        selectGiftFragrance,
        removeGiftItem,
        declineGifts,
        clearCart,
        toggleWishlist,
        isInWishlist,
        createOrder,
        submitPaymentVerification,
        getOrderById,
        updatePaymentConfiguration,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};
