import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Gift,
  Check,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  AlertCircle,
  Flame,
  Clock,
} from 'lucide-react';
import { Concentration } from '../types';
import {
  CONCENTRATION_DETAILS,
  ALL_CONCENTRATIONS,
  getPriceWithConcentration,
} from '../config/concentrations';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/currency';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { ProductCard } from '../components/common/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { products, addToCart, isInWishlist, toggleWishlist } = useStore();

  const product = products.find((p) => p.slug === slug);

  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('100ml');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product, slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold font-display text-[#F5F1E8] mb-4">
          {language === 'ar' ? 'العطر غير موجود' : 'Fragrance Not Found'}
        </h2>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#080808] font-bold text-xs rounded-xl"
        >
          {t('continueShopping')}
        </Link>
      </div>
    );
  }

  const [selectedConcentration, setSelectedConcentration] = useState<Concentration>(
    product?.concentration || 'Eau de Parfum'
  );

  useEffect(() => {
    if (product) {
      setSelectedConcentration(product.concentration || 'Eau de Parfum');
    }
  }, [product]);

  const currentVariant = product.variants.find((v) => v.size === selectedSize) || product.variants[0];
  const isOutOfStock = !currentVariant || currentVariant.stock < 1;
  const isWishlisted = isInWishlist(product.id);

  const unitPrice = currentVariant
    ? getPriceWithConcentration(currentVariant.price, selectedConcentration)
    : 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedSize, quantity, selectedConcentration);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.gender === product.gender || p.concentration === product.concentration))
    .slice(0, 4);

  const title = language === 'ar' ? product.nameAr : product.nameEn;
  const description = language === 'ar' ? product.descriptionAr : product.descriptionEn;
  const family = language === 'ar' ? product.fragranceFamily.ar : product.fragranceFamily.en;

  // Applicable Offer Text based on selected size
  const offerPreview =
    selectedSize === '100ml'
      ? {
          titleAr: 'عرض الزجاجة المجانية (100 مل)',
          titleEn: '100 ml Free Bottle Promotion',
          descAr: 'شراء هذه الزجاجة (100 مل) يمنحك زجاجة ثانية بحجم 30 مل هدية مجانية في السلة!',
          descEn: 'Purchasing this 100 ml bottle grants a complimentary 30 ml fragrance in your cart!',
        }
      : {
          titleAr: 'عرض الزجاجة المجانية (50 مل)',
          titleEn: '50 ml Free Bottle Promotion',
          descAr: 'شراء زجاجتين بحجم 50 مل يمنحك زجاجة 30 مل هدية مجانية في السلة!',
          descEn: 'Purchasing two 50 ml bottles qualifies you for a free 30 ml fragrance!',
        };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-8 sm:space-y-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#B6B0A4] overflow-x-auto whitespace-nowrap pb-1">
        <Link to="/" className="hover:text-[#D4AF37]">
          {t('navHome')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link to="/shop" className="hover:text-[#D4AF37]">
          {t('navShop')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link
          to={product.gender === 'men' ? '/shop/men' : '/shop/women'}
          className="hover:text-[#D4AF37]"
        >
          {product.gender === 'men' ? t('navMen') : t('navWomen')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-[#F5F1E8] font-medium truncate max-w-[150px] sm:max-w-[200px]">{title}</span>
      </nav>

      {/* Main PDP Grid: Gallery Left, Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* Gallery (Col 1-7) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-[#0c0c0c] border border-[#D4AF37]/25 shadow-2xl">
            <ImageWithFallback
              src={activeImage || product.image}
              alt={title}
              className="w-full h-full object-cover"
            />
            {product.isLuxuryCollection && (
              <div className="absolute top-4 right-4 px-3 py-1 bg-[#080808]/85 border border-[#D4AF37]/50 rounded-lg text-xs font-semibold text-[#D4AF37] uppercase tracking-widest">
                VIP Luxury Edition
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.secondaryImage && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveImage(product.image)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all min-h-[44px] ${
                  activeImage === product.image ? 'border-[#D4AF37]' : 'border-[#222]'
                }`}
              >
                <ImageWithFallback
                  src={product.image}
                  alt="Front View"
                  className="w-full h-full object-cover"
                />
              </button>
              <button
                onClick={() => setActiveImage(product.secondaryImage!)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all min-h-[44px] ${
                  activeImage === product.secondaryImage ? 'border-[#D4AF37]' : 'border-[#222]'
                }`}
              >
                <ImageWithFallback
                  src={product.secondaryImage}
                  alt="Alt Angle"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          )}
        </div>

        {/* Purchase Module (Col 8-12) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Metadata */}
          <div>
            <div className="flex items-center gap-2 text-xs text-[#B6B0A4] mb-2">
              <span>{product.gender === 'men' ? t('navMen') : t('navWomen')}</span>
              <span>·</span>
              <span>{family}</span>
              <span>·</span>
              <span className="text-[#D4AF37] font-semibold">{selectedConcentration}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#F5F1E8] mb-3">
              {title}
            </h1>

            {/* Calculated Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#D4AF37] tabular-nums font-mono">
                {formatCurrency(unitPrice, language)}
              </span>
              <span className="text-xs text-[#B6B0A4]">
                {language === 'ar' ? 'شامل ضريبة القيمة المضافة' : 'VAT inclusive'}
              </span>
            </div>
          </div>

          {/* 1. CHOOSE BETWEEN THE 4 CONCENTRATION TYPES */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#F5F1E8] flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#D4AF37]" />
                <span>{language === 'ar' ? 'اختر نوع وتركيز العطر (4 أنواع متاحة):' : 'Select Perfume Type (4 Options):'}</span>
              </label>
              <span className="text-xs font-mono text-[#D4AF37]">
                {CONCENTRATION_DETAILS[selectedConcentration].oilPercentage}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ALL_CONCENTRATIONS.map((concKey) => {
                const detail = CONCENTRATION_DETAILS[concKey];
                const isSelected = selectedConcentration === concKey;
                const diff = detail.priceDelta;

                return (
                  <button
                    key={concKey}
                    type="button"
                    onClick={() => setSelectedConcentration(concKey)}
                    className={`p-3 rounded-xl border text-start transition-all relative flex flex-col justify-between min-h-[64px] ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#1c1810] to-[#141414] border-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-md'
                        : 'bg-[#151515] border-[#252525] hover:border-[#D4AF37]/40 text-[#B6B0A4]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-xs font-bold ${isSelected ? 'text-[#F5F1E8]' : 'text-[#F5F1E8]/90'}`}>
                        {language === 'ar' ? detail.nameAr : detail.nameEn}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />}
                    </div>

                    <div className="flex items-center justify-between mt-1 text-[11px]">
                      <span className={isSelected ? 'text-[#D4AF37] font-medium' : 'text-[#888]'}>
                        {language === 'ar' ? detail.badgeAr : detail.badgeEn}
                      </span>
                      <span className="font-mono text-[#F5F1E8] tabular-nums font-semibold">
                        {diff > 0 ? `+${diff} EGP` : diff < 0 ? `${diff} EGP` : language === 'ar' ? 'الأساسي' : 'Base'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Concentration Characteristics Card */}
            <div className="p-3 rounded-xl bg-[#0f0f0f] border border-[#D4AF37]/20 text-xs text-[#B6B0A4] flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[#F5F1E8] font-semibold block">
                  {language === 'ar'
                    ? CONCENTRATION_DETAILS[selectedConcentration].longevityAr
                    : CONCENTRATION_DETAILS[selectedConcentration].longevityEn}
                </span>
                <p className="text-[11px] leading-relaxed">
                  {language === 'ar'
                    ? CONCENTRATION_DETAILS[selectedConcentration].descriptionAr
                    : CONCENTRATION_DETAILS[selectedConcentration].descriptionEn}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Size Selector */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-[#F5F1E8] block">
              {t('sizeSelect')}:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {product.variants.map((v) => {
                const isSelected = selectedSize === v.size;
                const isVariantInStock = v.stock > 0;
                const vPrice = getPriceWithConcentration(v.price, selectedConcentration);

                return (
                  <button
                    key={v.size}
                    type="button"
                    onClick={() => setSelectedSize(v.size)}
                    className={`p-3.5 rounded-xl border text-start transition-all min-h-[44px] ${
                      isSelected
                        ? 'bg-[#1a1813] border-[#D4AF37]'
                        : 'bg-[#151515] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#F5F1E8]">{v.size}</span>
                      <span className="text-xs font-mono font-semibold text-[#D4AF37] tabular-nums">
                        {formatCurrency(vPrice, language)}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#B6B0A4] mt-1">
                      {isVariantInStock ? (
                        <span className="text-emerald-400 font-medium">{t('inStock')}</span>
                      ) : (
                        <span className="text-red-400 font-medium">{t('outOfStock')}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Add to Cart Module */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center bg-[#151515] border border-[#D4AF37]/30 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="w-10 h-10 flex items-center justify-center text-lg text-[#F5F1E8] hover:text-[#D4AF37] disabled:opacity-30 min-h-[44px]"
                >
                  -
                </button>
                <span className="w-12 text-center font-mono font-bold text-sm text-[#D4AF37]">
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

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg min-h-[44px] ${
                  isOutOfStock
                    ? 'bg-[#222] text-[#666] cursor-not-allowed border border-[#333]'
                    : addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808]'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>{language === 'ar' ? 'تمت الإضافة للسلة بنجاح!' : 'Added to Cart!'}</span>
                  </>
                ) : isOutOfStock ? (
                  <span>{t('outOfStock')}</span>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>{t('addToCart')}</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="w-12 h-12 rounded-xl bg-[#151515] border border-[#D4AF37]/30 flex items-center justify-center text-[#B6B0A4] hover:text-[#D4AF37] transition-colors shrink-0 min-h-[44px]"
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`}
                />
              </button>
            </div>
          </div>

          {/* Cash on Delivery & Fast Delivery Trust Bar */}
          <div className="p-3 bg-[#111] rounded-xl border border-[#D4AF37]/20 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#B6B0A4]">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{language === 'ar' ? 'الدفع عند الاستلام كاش للمندوب متاح' : 'Cash on Delivery Available'}</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#d4af37]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>{language === 'ar' ? 'شحن سريع لكافة المحافظات' : 'Fast Egypt Delivery'}</span>
            </span>
          </div>

          {/* Applicable Offer Preview Banner */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[#171510] to-[#121212] border border-[#D4AF37]/35 flex items-start gap-3">
            <Gift className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-[#D4AF37] block mb-0.5">
                {language === 'ar' ? offerPreview.titleAr : offerPreview.titleEn}
              </span>
              <p className="text-[#B6B0A4] leading-relaxed">
                {language === 'ar' ? offerPreview.descAr : offerPreview.descEn}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-[#D4AF37]/15 space-y-2">
            <h3 className="text-sm font-semibold text-[#F5F1E8] font-display">
              {language === 'ar' ? 'قصة وتكوين العطر' : 'Fragrance Story'}
            </h3>
            <p className="text-sm text-[#B6B0A4] leading-relaxed">{description}</p>
          </div>

          {/* Fragrance Notes Pyramidal Breakdown */}
          <div className="pt-4 border-t border-[#D4AF37]/15 space-y-4">
            <h3 className="text-sm font-semibold text-[#F5F1E8] font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{language === 'ar' ? 'الهرم العطري والنوتات' : 'Fragrance Olfactory Pyramid'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#151515] border border-[#D4AF37]/15 rounded-xl space-y-1">
                <span className="font-semibold text-[#D4AF37] block">{t('topNotes')}</span>
                <p className="text-[#B6B0A4]">
                  {(language === 'ar' ? product.notes.top.ar : product.notes.top.en).join(' · ')}
                </p>
              </div>

              <div className="p-3 bg-[#151515] border border-[#D4AF37]/15 rounded-xl space-y-1">
                <span className="font-semibold text-[#D4AF37] block">{t('heartNotes')}</span>
                <p className="text-[#B6B0A4]">
                  {(language === 'ar' ? product.notes.heart.ar : product.notes.heart.en).join(' · ')}
                </p>
              </div>

              <div className="p-3 bg-[#151515] border border-[#D4AF37]/15 rounded-xl space-y-1">
                <span className="font-semibold text-[#D4AF37] block">{t('baseNotes')}</span>
                <p className="text-[#B6B0A4]">
                  {(language === 'ar' ? product.notes.base.ar : product.notes.base.en).join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Fragrances */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#D4AF37]/20 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold text-[#F5F1E8]">
              {t('relatedFragrances')}
            </h2>
            <Link
              to="/shop"
              className="text-xs font-semibold text-[#D4AF37] hover:underline min-h-[44px] flex items-center"
            >
              {language === 'ar' ? 'تصفح كل التشكيلة' : 'Browse All'}
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((relProd) => (
              <ProductCard key={relProd.id} product={relProd} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
