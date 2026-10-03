import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Gift,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  Package,
  Check,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/currency';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { GiftSelectorModal } from '../components/cart/GiftSelectorModal';

export const CartPage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const {
    cart,
    cartPackages,
    cartGifts,
    updateCartItemQuantity,
    removeCartItem,
    removePackageFromCart,
    removeGiftItem,
    subtotal,
    packagesTotal,
    shippingFee,
    finalTotal,
    promotionResult,
    isGiftSelectionSatisfied,
    declineGifts,
  } = useStore();

  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const isCartEmpty = cart.length === 0 && cartPackages.length === 0 && cartGifts.length === 0;

  const handleProceedToCheckout = () => {
    if (!isGiftSelectionSatisfied) {
      setIsGiftModalOpen(true);
      return;
    }
    navigate('/checkout');
  };

  if (isCartEmpty) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-[#151515] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F1E8] mb-2">
          {t('cartEmpty')}
        </h1>
        <p className="text-xs text-[#B6B0A4] max-w-md mx-auto mb-8 leading-relaxed">
          {language === 'ar'
            ? 'لم تقم بإضافة أي عطور أو باقات ملكية لسلتك بعد. تصفح تشكيلتنا واستفد من عروض الزجاجات الإضافية المجانية.'
            : 'You have not added any perfumes or packages yet. Explore our royal collections and claim free gift bottles.'}
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-xs rounded-xl tracking-wider transition-colors min-h-[44px]"
        >
          <span>{t('continueShopping')}</span>
          <ArrowIcon className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-10 space-y-5 sm:space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F1E8]">
          {t('cartTitle')}
        </h1>
        <Link
          to="/shop"
          className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1 min-h-[44px]"
        >
          <span>{t('continueShopping')}</span>
          <ArrowIcon className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Unclaimed Gifts Warning Bar (if customer hasn't chosen or declined yet) */}
      {!isGiftSelectionSatisfied && promotionResult.hasUnclaimedGifts && (
        <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-[#201c10] via-[#1a1711] to-[#141414] border border-[#D4AF37]/60 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Gift className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5 animate-bounce" />
            <div>
              <h3 className="text-sm font-bold text-[#D4AF37]">
                {language === 'ar' ? 'لديك هدايا مجانية تنتظر اختيارك!' : 'You have earned free gifts!'}
              </h3>
              <p className="text-xs text-[#F5F1E8]/90 mt-0.5">
                {language === 'ar'
                  ? `مؤهل لـ ${promotionResult.remaining50ml > 0 ? `${promotionResult.remaining50ml} زجاجة 50 مل ` : ''}${promotionResult.remaining30ml > 0 ? `${promotionResult.remaining30ml} زجاجة 30 مل` : ''}. اختر عطور الهدايا قبل إتمام الطلب.`
                  : `Eligible for free gift bottles. Complete selection before checkout.`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={declineGifts}
              className="text-xs text-[#B6B0A4] hover:text-red-400 py-2 px-3 underline min-h-[44px] flex items-center"
            >
              {t('declineGiftsBtn')}
            </button>
            <button
              onClick={() => setIsGiftModalOpen(true)}
              className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-xs rounded-xl whitespace-nowrap min-h-[44px]"
            >
              {t('selectGiftFragranceBtn')}
            </button>
          </div>
        </div>
      )}

      {/* Cart Layout: Items List (Col 8) + Summary (Col 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Items */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Paid Fragrances */}
          {cart.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block">
                {t('paidBottlesLabel')} ({cart.reduce((s, i) => s + i.quantity, 0)})
              </span>

              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 sm:p-4 rounded-xl bg-[#141414] border border-[#D4AF37]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-16 h-16 rounded-lg bg-[#0c0c0c] overflow-hidden shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.nameEn}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <Link
                          to={`/product/${item.slug}`}
                          className="font-display font-semibold text-sm text-[#F5F1E8] hover:text-[#D4AF37] transition-colors truncate block"
                        >
                          {language === 'ar' ? item.nameAr : item.nameEn}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-[#B6B0A4] mt-0.5">
                          <span className="text-[#D4AF37] font-semibold">{item.size}</span>
                          <span>·</span>
                          <span className="tabular-nums font-mono">
                            {formatCurrency(item.price, language)} / {language === 'ar' ? 'زجاجة' : 'bottle'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-[#080808] border border-[#D4AF37]/25 rounded-lg p-0.5">
                        <button
                          onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-sm text-[#F5F1E8] hover:text-[#D4AF37] min-h-[36px]"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono font-bold text-xs text-[#D4AF37]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-sm text-[#F5F1E8] hover:text-[#D4AF37] min-h-[36px]"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right min-w-[90px]">
                        <span className="font-mono font-bold text-sm text-[#F5F1E8] tabular-nums">
                          {formatCurrency(item.price * item.quantity, language)}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeCartItem(item.id)}
                        className="p-2 text-[#666] hover:text-red-400 transition-colors rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                        title={t('removeItem')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Packages */}
          {cartPackages.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-[#D4AF37]/15">
              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block">
                {t('packagesLabel')} ({cartPackages.length})
              </span>

              <div className="space-y-3">
                {cartPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="p-4 rounded-xl bg-[#141414] border border-[#D4AF37]/35 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-[#0c0c0c] overflow-hidden shrink-0">
                          <ImageWithFallback
                            src={pkg.image}
                            alt={pkg.nameEn}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-display font-semibold text-sm text-[#F5F1E8]">
                              {language === 'ar' ? pkg.nameAr : pkg.nameEn}
                            </h3>
                            <span className="px-2 py-0.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] rounded text-[10px] font-bold">
                              {pkg.isCustom
                                ? language === 'ar'
                                  ? 'باقة مخصصة'
                                  : 'Custom'
                                : language === 'ar'
                                ? 'تشكيلة مختارة'
                                : 'Curated'}
                            </span>
                          </div>
                          <span className="text-xs text-[#B6B0A4] block mt-0.5">
                            {pkg.bottleCount} × {pkg.bottleSize}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <span className="font-mono font-bold text-sm text-[#D4AF37] tabular-nums">
                          {formatCurrency(pkg.price * pkg.quantity, language)}
                        </span>
                        <button
                          onClick={() => removePackageFromCart(pkg.id)}
                          className="p-2 text-[#666] hover:text-red-400 transition-colors rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                          title={t('removeItem')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Bottle List Breakdown */}
                    <div className="p-3 bg-[#0a0a0a] rounded-lg text-xs text-[#B6B0A4] border border-[#222]">
                      <span className="font-semibold text-[#D4AF37] block mb-1">
                        {language === 'ar' ? 'العطور المتضمنة في الباقة:' : 'Fragrances Included:'}
                      </span>
                      <p className="line-clamp-2 text-[11px] leading-relaxed">
                        {(language === 'ar'
                          ? pkg.selectedFragranceNames.ar
                          : pkg.selectedFragranceNames.en
                        ).join(' · ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Complimentary Gifts Lines (0 EGP) */}
          {(cartGifts.length > 0 || promotionResult.earned30ml > 0 || promotionResult.earned50ml > 0) && (
            <div className="space-y-3 pt-4 border-t border-[#D4AF37]/15">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5" />
                  <span>{t('giftsEarnedHeader')}</span>
                </span>
                <button
                  onClick={() => setIsGiftModalOpen(true)}
                  className="text-xs text-[#D4AF37] hover:underline font-semibold min-h-[44px] flex items-center"
                >
                  {cartGifts.length > 0 ? t('changeGiftSelection') : t('selectGiftFragranceBtn')}
                </button>
              </div>

              {cartGifts.length > 0 ? (
                <div className="space-y-2">
                  {cartGifts.map((gift) => (
                    <div
                      key={gift.id}
                      className="p-3.5 rounded-xl bg-gradient-to-r from-[#171612] to-[#121212] border border-[#D4AF37]/40 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#0c0c0c] overflow-hidden shrink-0">
                          <ImageWithFallback
                            src={gift.image}
                            alt={gift.nameEn}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-[#F5F1E8]">
                              {language === 'ar' ? gift.nameAr : gift.nameEn}
                            </h4>
                            <span className="px-2 py-0.5 bg-[#D4AF37] text-[#080808] font-bold text-[10px] rounded uppercase">
                              {t('freeGiftBadge')}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#B6B0A4]">
                            {gift.size} · {language === 'ar' ? 'عرض ترويجي مؤهل' : 'Qualifying Promo'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-emerald-400 font-mono">
                          0 {language === 'ar' ? 'ج.م' : 'EGP'}
                        </span>
                        <button
                          onClick={() => removeGiftItem(gift.id)}
                          className="p-1.5 text-[#666] hover:text-red-400 min-h-[36px] min-w-[36px] flex items-center justify-center"
                          title="Remove gift"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-[#141414] border border-amber-500/30 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-amber-300 font-medium">
                    {language === 'ar'
                      ? 'لديك زجاجات هدية لم يتم تحديد عطورها بعد!'
                      : 'You have earned free bottles! Click to pick fragrances.'}
                  </span>
                  <button
                    onClick={() => setIsGiftModalOpen(true)}
                    className="px-4 py-2 bg-[#D4AF37] text-[#080808] font-bold rounded-lg min-h-[44px]"
                  >
                    {t('selectGiftFragranceBtn')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Order Summary (Sticky) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D4AF37]/30 space-y-5 shadow-xl sticky top-28">
            <h2 className="text-base sm:text-lg font-bold font-display text-[#F5F1E8] border-b border-[#D4AF37]/15 pb-3">
              {language === 'ar' ? 'ملخص السلة' : 'Cart Summary'}
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-[#B6B0A4]">
                <span>{t('subtotal')}</span>
                <span className="font-mono text-sm text-[#F5F1E8] tabular-nums">
                  {formatCurrency(subtotal + packagesTotal, language)}
                </span>
              </div>

              <div className="flex items-center justify-between text-[#B6B0A4]">
                <span>{t('shipping')}</span>
                <span className="font-mono text-sm text-[#F5F1E8] tabular-nums">
                  {shippingFee > 0
                    ? formatCurrency(shippingFee, language)
                    : t('shippingCalculatedAtCheckout')}
                </span>
              </div>

              {/* Free Gifts Line */}
              {cartGifts.length > 0 && (
                <div className="flex items-center justify-between text-emerald-400">
                  <span className="flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5" />
                    <span>{t('freeGiftBadge')} ({cartGifts.reduce((s, g) => s + g.quantity, 0)})</span>
                  </span>
                  <span className="font-mono font-bold">0 {language === 'ar' ? 'ج.م' : 'EGP'}</span>
                </div>
              )}

              <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between">
                <span className="text-sm font-bold text-[#F5F1E8]">{t('total')}</span>
                <span className="text-xl font-bold font-mono text-[#D4AF37] tabular-nums">
                  {formatCurrency(finalTotal, language)}
                </span>
              </div>
            </div>

            {/* Validation Notice if gifts pending */}
            {!isGiftSelectionSatisfied && (
              <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{t('giftsPendingAlert')}</span>
              </div>
            )}

            {/* Primary Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 sm:py-4 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-xs sm:text-sm tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>{t('proceedToCheckout')}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>

            {/* Payment methods support banner */}
            <div className="pt-2 border-t border-[#222] text-center space-y-1">
              <span className="text-[11px] font-semibold text-emerald-400 block">
                {language === 'ar' ? '✓ متاح الدفع عند الاستلام كاش للمندوب' : '✓ Cash on Delivery (COD) Available'}
              </span>
              <p className="text-[10px] text-[#777] leading-relaxed">
                {language === 'ar'
                  ? 'ادفع نقداً عند استلام شحنتك، أو عبر إنستاباي والمحافظ الذكية.'
                  : 'Pay cash upon courier arrival, or via InstaPay and mobile wallets.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gift Selector Modal */}
      {isGiftModalOpen && (
        <GiftSelectorModal
          isOpen={isGiftModalOpen}
          onClose={() => setIsGiftModalOpen(false)}
        />
      )}
    </div>
  );
};
