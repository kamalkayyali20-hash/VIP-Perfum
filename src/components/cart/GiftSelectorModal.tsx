import React from 'react';
import { X, Gift, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useStore } from '../../context/StoreContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface GiftSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GiftSelectorModal: React.FC<GiftSelectorModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const {
    products,
    promotionResult,
    selectGiftFragrance,
    removeGiftItem,
    cartGifts,
    declineGifts,
  } = useStore();

  if (!isOpen) return null;

  const { earned30ml, earned50ml, remaining30ml, remaining50ml, selected30ml, selected50ml } =
    promotionResult;

  // Find products that have in-stock gift variants for 30ml and 50ml
  const eligibleProducts30ml = products.filter((p) => {
    const gv = p.giftVariants.find((g) => g.size === '30ml');
    return gv && gv.stock > 0;
  });

  const eligibleProducts50ml = products.filter((p) => {
    const gv = p.giftVariants.find((g) => g.size === '50ml');
    return gv && gv.stock > 0;
  });

  const handleDecline = () => {
    declineGifts();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-[#080808]/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#121212] border border-[#D4AF37]/30 rounded-xl sm:rounded-2xl p-3.5 sm:p-8 shadow-2xl text-[#F5F1E8] my-3 sm:my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-display text-[#F5F1E8]">
                {language === 'ar' ? 'اختيار عطور الهدايا المجانية' : 'Select Complimentary Gift Bottles'}
              </h2>
              <p className="text-xs text-[#B6B0A4] mt-0.5">
                {language === 'ar'
                  ? 'مبارك! طلبك مؤهل للحصول على زجاجات عطرية فاخرة مجاناً بقيمة 0 ج.م'
                  : 'Congratulations! Your order qualifies for luxury gift bottles at 0 EGP'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#B6B0A4] hover:text-[#F5F1E8] transition-colors rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Breakdown Bar */}
        <div className="py-4 my-3 px-4 bg-[#181818] rounded-xl border border-[#D4AF37]/15 flex flex-wrap items-center justify-between gap-4 text-xs">
          {earned50ml > 0 && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#D4AF37]">
                {language === 'ar' ? 'هدايا 50 مل:' : '50 ml Gifts:'}
              </span>
              <span className="tabular-nums font-mono text-[#F5F1E8]">
                {selected50ml} / {earned50ml}
              </span>
              {remaining50ml > 0 ? (
                <span className="text-amber-400 font-medium">
                  ({language === 'ar' ? `متبقي ${remaining50ml}` : `${remaining50ml} remaining`})
                </span>
              ) : (
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" /> {language === 'ar' ? 'مكتمل' : 'Complete'}
                </span>
              )}
            </div>
          )}

          {earned30ml > 0 && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#D4AF37]">
                {language === 'ar' ? 'هدايا 30 مل:' : '30 ml Gifts:'}
              </span>
              <span className="tabular-nums font-mono text-[#F5F1E8]">
                {selected30ml} / {earned30ml}
              </span>
              {remaining30ml > 0 ? (
                <span className="text-amber-400 font-medium">
                  ({language === 'ar' ? `متبقي ${remaining30ml}` : `${remaining30ml} remaining`})
                </span>
              ) : (
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" /> {language === 'ar' ? 'مكتمل' : 'Complete'}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Scrollable Fragrance Selector */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1 custom-scrollbar">
          {/* Section: 50ml Gifts (if earned) */}
          {earned50ml > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#F5F1E8] flex items-center gap-2 font-display">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    {language === 'ar'
                      ? `عطور الهدايا المتاحة بحجم 50 مل (متبقي ${remaining50ml})`
                      : `Available 50 ml Gift Fragrances (${remaining50ml} remaining)`}
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {eligibleProducts50ml.map((product) => {
                  const giftVariant = product.giftVariants.find((g) => g.size === '50ml')!;
                  const alreadySelectedCount = cartGifts
                    .filter((g) => g.productId === product.id && g.size === '50ml')
                    .reduce((sum, g) => sum + g.quantity, 0);

                  const canAdd = remaining50ml > 0 && giftVariant.stock > alreadySelectedCount;

                  return (
                    <div
                      key={`gift_50_${product.id}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#171717] border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#080808] overflow-hidden shrink-0">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.nameEn}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-[#F5F1E8] line-clamp-1">
                            {language === 'ar' ? product.nameAr : product.nameEn}
                          </h4>
                          <span className="text-[11px] text-[#B6B0A4]">
                            50 ml · {language === 'ar' ? product.fragranceFamily.ar : product.fragranceFamily.en}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {alreadySelectedCount > 0 && (
                          <button
                            onClick={() => {
                              const found = cartGifts.find(
                                (g) => g.productId === product.id && g.size === '50ml'
                              );
                              if (found) removeGiftItem(found.id);
                            }}
                            className="w-7 h-7 rounded border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-bold flex items-center justify-center transition-colors min-h-[30px]"
                            title="Remove one"
                          >
                            -
                          </button>
                        )}
                        {alreadySelectedCount > 0 && (
                          <span className="text-xs font-bold tabular-nums text-[#D4AF37] px-1">
                            {alreadySelectedCount}
                          </span>
                        )}
                        <button
                          onClick={() => selectGiftFragrance(product.id, '50ml')}
                          disabled={!canAdd}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors min-h-[36px] ${
                            canAdd
                              ? 'bg-[#D4AF37] text-[#080808] hover:bg-[#E5C158]'
                              : 'bg-[#222] text-[#666] cursor-not-allowed'
                          }`}
                        >
                          {alreadySelectedCount > 0 ? '+ أضف المزيد' : 'اختر هذا العطر'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section: 30ml Gifts (if earned) */}
          {earned30ml > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#F5F1E8] flex items-center gap-2 font-display">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    {language === 'ar'
                      ? `عطور الهدايا المتاحة بحجم 30 مل (متبقي ${remaining30ml})`
                      : `Available 30 ml Gift Fragrances (${remaining30ml} remaining)`}
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {eligibleProducts30ml.map((product) => {
                  const giftVariant = product.giftVariants.find((g) => g.size === '30ml')!;
                  const alreadySelectedCount = cartGifts
                    .filter((g) => g.productId === product.id && g.size === '30ml')
                    .reduce((sum, g) => sum + g.quantity, 0);

                  const canAdd = remaining30ml > 0 && giftVariant.stock > alreadySelectedCount;

                  return (
                    <div
                      key={`gift_30_${product.id}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#171717] border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#080808] overflow-hidden shrink-0">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.nameEn}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-[#F5F1E8] line-clamp-1">
                            {language === 'ar' ? product.nameAr : product.nameEn}
                          </h4>
                          <span className="text-[11px] text-[#B6B0A4]">
                            30 ml · {language === 'ar' ? product.fragranceFamily.ar : product.fragranceFamily.en}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {alreadySelectedCount > 0 && (
                          <button
                            onClick={() => {
                              const found = cartGifts.find(
                                (g) => g.productId === product.id && g.size === '30ml'
                              );
                              if (found) removeGiftItem(found.id);
                            }}
                            className="w-7 h-7 rounded border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-bold flex items-center justify-center transition-colors min-h-[30px]"
                            title="Remove one"
                          >
                            -
                          </button>
                        )}
                        {alreadySelectedCount > 0 && (
                          <span className="text-xs font-bold tabular-nums text-[#D4AF37] px-1">
                            {alreadySelectedCount}
                          </span>
                        )}
                        <button
                          onClick={() => selectGiftFragrance(product.id, '30ml')}
                          disabled={!canAdd}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors min-h-[36px] ${
                            canAdd
                              ? 'bg-[#D4AF37] text-[#080808] hover:bg-[#E5C158]'
                              : 'bg-[#222] text-[#666] cursor-not-allowed'
                          }`}
                        >
                          {alreadySelectedCount > 0 ? '+ أضف المزيد' : 'اختر هذا العطر'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-5 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
          <button
            onClick={handleDecline}
            className="text-xs text-[#B6B0A4] hover:text-red-400 transition-colors py-2 px-3 min-h-[44px] flex items-center"
          >
            {t('declineGiftsBtn')}
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-xs rounded-xl tracking-wider transition-colors min-h-[44px]"
          >
            {promotionResult.isSelectionComplete
              ? language === 'ar'
                ? 'تم الاختيار (حفظ والعودة للسلة)'
                : 'Selection Complete (Save & Return)'
              : language === 'ar'
              ? 'إغلاق ومتابعة'
              : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
