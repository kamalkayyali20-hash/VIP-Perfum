import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  ShoppingBag,
  Heart,
  Check,
  Sparkles,
  Gift,
  ExternalLink,
  ShieldCheck,
  Flame,
  Clock,
  Layers,
} from 'lucide-react';
import { Product, Concentration } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { ImageWithFallback } from './ImageWithFallback';
import {
  CONCENTRATION_DETAILS,
  ALL_CONCENTRATIONS,
  getPriceWithConcentration,
} from '../../config/concentrations';

export const QuickViewModal: React.FC = () => {
  const { language, t } = useLanguage();
  const { quickViewProduct, closeQuickView, addToCart, isInWishlist, toggleWishlist } = useStore();

  const product = quickViewProduct;

  const [selectedConcentration, setSelectedConcentration] = useState<Concentration>('Eau de Parfum');
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('100ml');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Sync state whenever active product changes
  useEffect(() => {
    if (product) {
      setSelectedConcentration(product.concentration || 'Eau de Parfum');
      setSelectedSize(product.variants[0]?.size || '100ml');
      setQuantity(1);
      setActiveImage(product.image);
      setAddedSuccess(false);
    }
  }, [product]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && quickViewProduct) {
        closeQuickView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct, closeQuickView]);

  if (!product) return null;

  const currentVariant = product.variants.find((v) => v.size === selectedSize) || product.variants[0];
  const isOutOfStock = !currentVariant || currentVariant.stock < 1;
  const isWishlisted = isInWishlist(product.id);

  // Dynamic price calculating concentration delta
  const unitPrice = currentVariant
    ? getPriceWithConcentration(currentVariant.price, selectedConcentration)
    : 0;
  const totalPrice = unitPrice * quantity;

  const activeConcentrationDetail = CONCENTRATION_DETAILS[selectedConcentration];

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedSize, quantity, selectedConcentration);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      closeQuickView();
    }, 1200);
  };

  const title = language === 'ar' ? product.nameAr : product.nameEn;
  const description = language === 'ar' ? product.descriptionAr : product.descriptionEn;
  const family = language === 'ar' ? product.fragranceFamily.ar : product.fragranceFamily.en;

  // Applicable Free Gift Preview
  const offerPreviewText =
    selectedSize === '100ml'
      ? language === 'ar'
        ? 'شراء 1 × 100 مل يمنحك زجاجة 30 مل هدية مجانية في السلة!'
        : 'Buy 1 × 100 ml to get a free 30 ml bottle in cart!'
      : language === 'ar'
      ? 'شراء زجاجتين 50 مل يمنحك زجاجة 30 مل هدية مجانية في السلة!'
      : 'Buy two 50 ml bottles to get a free 30 ml bottle in cart!';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-[#080808]/85 backdrop-blur-md overflow-y-auto"
      onClick={closeQuickView}
    >
      <div
        className="relative w-full max-w-4xl bg-[#121212] border border-[#D4AF37]/35 rounded-2xl shadow-2xl text-[#F5F1E8] my-3 sm:my-8 max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#D4AF37]/20 bg-[#151515]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{language === 'ar' ? 'نظرة سريعة على العطر' : 'Quick View & Customizer'}</span>
          </div>

          <button
            onClick={closeQuickView}
            className="p-1.5 text-[#B6B0A4] hover:text-[#F5F1E8] hover:bg-[#202020] rounded-lg transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column: Visual Gallery (Col 5) */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[#0a0a0a] border border-[#D4AF37]/25 shadow-lg group">
                <ImageWithFallback
                  src={activeImage}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {product.isLuxuryCollection && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#080808]/90 border border-[#D4AF37]/50 rounded text-[10px] font-semibold text-[#D4AF37] uppercase tracking-wider">
                    VIP Luxury
                  </div>
                )}

                <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-[#080808]/85 border border-[#222] rounded text-[11px] text-[#B6B0A4]">
                  {product.gender === 'men' ? t('navMen') : t('navWomen')}
                </div>
              </div>

              {/* Thumbnails if secondary image exists */}
              {product.secondaryImage && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveImage(product.image)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border transition-all ${
                      activeImage === product.image
                        ? 'border-[#D4AF37] scale-105'
                        : 'border-[#333] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <ImageWithFallback src={product.image} alt={title} className="w-full h-full object-cover" />
                  </button>
                  <button
                    onClick={() => setActiveImage(product.secondaryImage!)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border transition-all ${
                      activeImage === product.secondaryImage
                        ? 'border-[#D4AF37] scale-105'
                        : 'border-[#333] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <ImageWithFallback src={product.secondaryImage} alt={title} className="w-full h-full object-cover" />
                  </button>
                </div>
              )}

              {/* Fragrance Notes Pills */}
              <div className="p-3 bg-[#0d0d0d] rounded-xl border border-[#222] space-y-2 text-xs">
                <span className="font-semibold text-[#D4AF37] block">
                  {language === 'ar' ? 'الهرم العطري:' : 'Fragrance Notes:'}
                </span>
                <div className="space-y-1.5 text-[11px] text-[#B6B0A4]">
                  <div>
                    <span className="text-[#F5F1E8] font-medium">{language === 'ar' ? 'القمة: ' : 'Top: '}</span>
                    <span>{(language === 'ar' ? product.notes.top.ar : product.notes.top.en).join(' · ')}</span>
                  </div>
                  <div>
                    <span className="text-[#F5F1E8] font-medium">{language === 'ar' ? 'القلب: ' : 'Heart: '}</span>
                    <span>{(language === 'ar' ? product.notes.heart.ar : product.notes.heart.en).join(' · ')}</span>
                  </div>
                  <div>
                    <span className="text-[#F5F1E8] font-medium">{language === 'ar' ? 'القاعدة: ' : 'Base: '}</span>
                    <span>{(language === 'ar' ? product.notes.base.ar : product.notes.base.en).join(' · ')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Customizer & Purchase Module (Col 7) */}
            <div className="md:col-span-7 space-y-5">
              {/* Title & Metadata */}
              <div>
                <div className="flex items-center gap-2 text-xs text-[#B6B0A4] mb-1">
                  <span>{family}</span>
                  <span>·</span>
                  <span className="text-[#D4AF37] font-semibold">{selectedConcentration}</span>
                </div>

                <h2 id="quick-view-title" className="text-xl sm:text-2xl font-bold font-display text-[#F5F1E8]">
                  {title}
                </h2>

                <p className="text-xs text-[#B6B0A4] leading-relaxed mt-2 line-clamp-3">
                  {description}
                </p>
              </div>

              {/* Dynamic Price Display */}
              <div className="p-3 bg-[#161616] rounded-xl border border-[#D4AF37]/20 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#B6B0A4] block">
                    {language === 'ar' ? 'السعر المحسوب:' : 'Calculated Price:'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-[#D4AF37] tabular-nums">
                      {formatCurrency(unitPrice, language)}
                    </span>
                    <span className="text-xs text-[#888]">
                      / {selectedSize}
                    </span>
                  </div>
                </div>

                <div className="text-end">
                  <span className="text-[10px] text-[#888] block">
                    {language === 'ar' ? 'حالة التوفر:' : 'Stock Status:'}
                  </span>
                  {isOutOfStock ? (
                    <span className="text-xs font-semibold text-red-400">{t('outOfStock')}</span>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 justify-end">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {t('inStock')} ({currentVariant?.stock} {language === 'ar' ? 'قطعة' : 'left'})
                    </span>
                  )}
                </div>
              </div>

              {/* 1. CHOOSE BETWEEN THE 4 CONCENTRATION TYPES */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#F5F1E8] flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-[#D4AF37]" />
                    <span>{language === 'ar' ? 'اختر نوع وتركيز العطر (4 خيارات):' : 'Select Perfume Type (4 Options):'}</span>
                  </label>
                  <span className="text-[11px] font-mono text-[#D4AF37]">
                    {activeConcentrationDetail.oilPercentage}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ALL_CONCENTRATIONS.map((concKey) => {
                    const detail = CONCENTRATION_DETAILS[concKey];
                    const isSelected = selectedConcentration === concKey;
                    const diff = detail.priceDelta;

                    return (
                      <button
                        key={concKey}
                        type="button"
                        onClick={() => setSelectedConcentration(concKey)}
                        className={`p-2.5 rounded-xl border text-start transition-all relative flex flex-col justify-between min-h-[58px] ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#1c1810] to-[#141414] border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]/50'
                            : 'bg-[#151515] border-[#292929] hover:border-[#D4AF37]/40 text-[#B6B0A4]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span
                            className={`text-xs font-bold block ${
                              isSelected ? 'text-[#F5F1E8]' : 'text-[#F5F1E8]/90'
                            }`}
                          >
                            {language === 'ar' ? detail.nameAr : detail.nameEn}
                          </span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-1 text-[10px]">
                          <span className={isSelected ? 'text-[#D4AF37] font-medium' : 'text-[#777]'}>
                            {language === 'ar' ? detail.badgeAr : detail.badgeEn}
                          </span>
                          <span className="font-mono text-[#F5F1E8] tabular-nums">
                            {diff > 0 ? `+${diff} EGP` : diff < 0 ? `${diff} EGP` : language === 'ar' ? 'الأساسي' : 'Base'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Concentration Explanation */}
                <div className="p-2.5 rounded-lg bg-[#0e0e0e] border border-[#D4AF37]/15 text-[11px] text-[#B6B0A4] flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <span className="text-[#F5F1E8] font-semibold">
                      {language === 'ar' ? activeConcentrationDetail.longevityAr : activeConcentrationDetail.longevityEn}
                    </span>
                    {' · '}
                    {language === 'ar' ? activeConcentrationDetail.sillageAr : activeConcentrationDetail.sillageEn}
                  </p>
                </div>
              </div>

              {/* 2. CHOOSE BOTTLE SIZE (50ml / 100ml) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#F5F1E8] flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#D4AF37]" />
                  <span>{t('sizeSelect')}:</span>
                </label>

                <div className="grid grid-cols-2 gap-2.5">
                  {product.variants.map((v) => {
                    const isSelected = selectedSize === v.size;
                    const vPrice = getPriceWithConcentration(v.price, selectedConcentration);

                    return (
                      <button
                        key={v.size}
                        type="button"
                        onClick={() => setSelectedSize(v.size)}
                        className={`p-3 rounded-xl border text-start transition-all min-h-[46px] ${
                          isSelected
                            ? 'bg-[#1b1914] border-[#D4AF37] ring-1 ring-[#D4AF37]/50'
                            : 'bg-[#151515] border-[#292929] hover:border-[#D4AF37]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[#F5F1E8]">{v.size}</span>
                          <span className="text-xs font-mono font-semibold text-[#D4AF37] tabular-nums">
                            {formatCurrency(vPrice, language)}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#888] block mt-0.5">
                          {v.size === '100ml'
                            ? language === 'ar' ? 'مؤهل لهدية 30 مل مجاناً' : 'Qualifies for 30 ml gift'
                            : language === 'ar' ? 'الحجم الأنسب للتنقل' : 'Pocket & travel size'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Free Bottle Promotion Callout */}
              <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#1c1810] to-[#121212] border border-[#D4AF37]/35 flex items-center gap-2.5 text-xs text-[#D4AF37]">
                <Gift className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{offerPreviewText}</span>
              </div>

              {/* Quantity Stepper & Add to Cart */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center justify-between w-full sm:w-auto bg-[#151515] border border-[#D4AF37]/30 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="w-10 h-10 flex items-center justify-center text-lg text-[#F5F1E8] hover:text-[#D4AF37] disabled:opacity-30 min-h-[44px]"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-sm text-[#D4AF37] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(currentVariant?.stock || 99, q + 1))}
                    disabled={isOutOfStock || quantity >= (currentVariant?.stock || 1)}
                    className="w-10 h-10 flex items-center justify-center text-lg text-[#F5F1E8] hover:text-[#D4AF37] disabled:opacity-30 min-h-[44px]"
                  >
                    +
                  </button>
                </div>

                {/* Add To Cart Primary Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl min-h-[44px] ${
                    isOutOfStock
                      ? 'bg-[#222] text-[#666] cursor-not-allowed border border-[#333]'
                      : addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{language === 'ar' ? 'تمت الإضافة للسلة بنجاح!' : 'Added to Cart!'}</span>
                    </>
                  ) : isOutOfStock ? (
                    <span>{t('outOfStock')}</span>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        {t('addToCart')} · {formatCurrency(totalPrice, language)}
                      </span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist"
                  className="w-11 h-11 rounded-xl bg-[#151515] border border-[#D4AF37]/30 flex items-center justify-center text-[#B6B0A4] hover:text-[#D4AF37] transition-colors shrink-0 min-h-[44px]"
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`}
                  />
                </button>
              </div>

              {/* Footer info: COD Notice & Full Details Link */}
              <div className="pt-3 border-t border-[#222] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                <span className="text-emerald-400 font-medium text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'متاح الدفع كاش عند الاستلام' : 'Cash on Delivery Available'}</span>
                </span>

                <Link
                  to={`/product/${product.slug}`}
                  onClick={closeQuickView}
                  className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1 min-h-[36px]"
                >
                  <span>{language === 'ar' ? 'عرض صفحة العطر بالكامل' : 'View Full Details'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
