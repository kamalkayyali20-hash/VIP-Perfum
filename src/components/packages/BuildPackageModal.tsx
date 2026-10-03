import React, { useState } from 'react';
import { X, Sparkles, Check, Plus, Minus, AlertCircle } from 'lucide-react';
import { PackageDefinition } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface BuildPackageModalProps {
  pkg: PackageDefinition;
  isOpen: boolean;
  onClose: () => void;
}

export const BuildPackageModal: React.FC<BuildPackageModalProps> = ({ pkg, isOpen, onClose }) => {
  const { language } = useLanguage();
  const { products, addPackageToCart } = useStore();
  const targetCount = pkg.assumedBottleCount; // 12

  // Map of productId -> quantity selected
  const [selectedBottles, setSelectedBottles] = useState<Record<string, number>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentCount = Object.values(selectedBottles).reduce((sum, q) => sum + q, 0);
  const remaining = targetCount - currentCount;

  const handleAdd = (productId: string) => {
    setErrorMsg(null);
    if (currentCount >= targetCount) {
      setErrorMsg(
        language === 'ar'
          ? `تم الوصول للحد الأقصى (${targetCount} زجاجة).`
          : `Maximum casket capacity (${targetCount} bottles) reached.`
      );
      return;
    }
    setSelectedBottles((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleRemove = (productId: string) => {
    setErrorMsg(null);
    setSelectedBottles((prev) => {
      const existing = prev[productId] || 0;
      if (existing <= 1) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: existing - 1 };
    });
  };

  const handleConfirmAddToCart = () => {
    if (currentCount !== targetCount) {
      setErrorMsg(
        language === 'ar'
          ? `يرجى اختيار بالضبط ${targetCount} زجاجة لاكتمال الباقة (المتبقي: ${remaining}).`
          : `Please pick exactly ${targetCount} fragrances (Remaining: ${remaining}).`
      );
      return;
    }

    // Build fragrance name lists
    const namesAr: string[] = [];
    const namesEn: string[] = [];

    for (const [prodId, qty] of Object.entries(selectedBottles)) {
      const prod = products.find((p) => p.id === prodId);
      if (prod) {
        for (let i = 0; i < qty; i++) {
          namesAr.push(prod.nameAr);
          namesEn.push(prod.nameEn);
        }
      }
    }

    const success = addPackageToCart('gold', true, { ar: namesAr, en: namesEn });
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-[#080808]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#121212] border border-[#D4AF37]/35 rounded-xl sm:rounded-2xl p-3.5 sm:p-8 shadow-2xl text-[#F5F1E8] my-3 sm:my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#D4AF37]/20">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'ar' ? 'تخصيص الباقة الملكية' : 'Custom Royal Casket'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#F5F1E8]">
              {language === 'ar' ? pkg.nameAr : pkg.nameEn} (12 × 30 ml)
            </h2>
            <p className="text-xs text-[#B6B0A4] mt-1">
              {language === 'ar'
                ? 'اختر أي 12 عطر من تشكيلتنا الملكية لتضمينها في صندوق الهدايا المخملي الفاخر.'
                : 'Select any 12 master fragrances to be hand-packed into your luxury velvet presentation casket.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#B6B0A4] hover:text-[#F5F1E8] transition-colors rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Counter and Progress Banner */}
        <div className="py-3 px-4 my-4 bg-[#181818] rounded-xl border border-[#D4AF37]/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#B6B0A4]">
              {language === 'ar' ? 'الزجاجات المختارة:' : 'Selected Bottles:'}
            </span>
            <div className="flex items-center gap-1">
              <span className="font-mono text-lg font-bold text-[#D4AF37] tabular-nums">
                {currentCount}
              </span>
              <span className="text-xs text-[#B6B0A4]">/ {targetCount}</span>
            </div>
          </div>

          <div>
            {currentCount === targetCount ? (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                {language === 'ar' ? 'اكتملت 12 زجاجة بنجاح!' : '12 bottles fulfilled!'}
              </span>
            ) : (
              <span className="text-xs font-medium text-amber-400">
                {language === 'ar'
                  ? `متبقي ${remaining} زجاجة لاكتمال الباقة`
                  : `Please select ${remaining} more bottles`}
              </span>
            )}
          </div>

          <div className="text-right">
            <span className="text-xs text-[#B6B0A4] block">
              {language === 'ar' ? 'سعر الباقة الإجمالي:' : 'Package Total:'}
            </span>
            <span className="text-base font-bold text-[#D4AF37] tabular-nums font-mono">
              {pkg.price ? formatCurrency(pkg.price, language) : ''}
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-3 p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* List of eligible fragrances */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {products.map((product) => {
              const qty = selectedBottles[product.id] || 0;
              const hasGift30 = product.giftVariants.some((g) => g.size === '30ml' && g.stock > 0);

              return (
                <div
                  key={`custom_bottle_${product.id}`}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    qty > 0
                      ? 'bg-[#1a1813] border-[#D4AF37]/50'
                      : 'bg-[#161616] border-[#D4AF37]/15 hover:border-[#D4AF37]/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-[#0c0c0c] overflow-hidden shrink-0">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.nameEn}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-[#F5F1E8] truncate">
                        {language === 'ar' ? product.nameAr : product.nameEn}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#B6B0A4]">
                        <span>{product.gender === 'men' ? 'رجالي' : 'حريمي'}</span>
                        <span>·</span>
                        <span className="truncate">
                          {language === 'ar' ? product.fragranceFamily.ar : product.fragranceFamily.en}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {qty > 0 && (
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="w-8 h-8 rounded-lg bg-[#222] hover:bg-[#333] text-[#F5F1E8] flex items-center justify-center transition-colors min-h-[36px]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {qty > 0 && (
                      <span className="text-sm font-bold tabular-nums text-[#D4AF37] px-1 font-mono">
                        {qty}
                      </span>
                    )}

                    <button
                      onClick={() => handleAdd(product.id)}
                      disabled={currentCount >= targetCount || !hasGift30}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors min-h-[36px] ${
                        currentCount >= targetCount || !hasGift30
                          ? 'bg-[#222] text-[#555] cursor-not-allowed'
                          : 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold'
                      }`}
                      aria-label="Add bottle to package"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
          <div className="text-xs text-[#B6B0A4]">
            {language === 'ar'
              ? 'تصلك العطور في صندوق VIP المخملي مع بطاقة إهداء فاخرة.'
              : 'Delivered in signature VIP velvet box with gift note card.'}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#333] text-[#B6B0A4] hover:text-[#F5F1E8] text-xs font-semibold transition-colors min-h-[44px]"
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              onClick={handleConfirmAddToCart}
              disabled={currentCount !== targetCount}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-colors min-h-[44px] ${
                currentCount === targetCount
                  ? 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808]'
                  : 'bg-[#222] text-[#666] cursor-not-allowed border border-[#333]'
              }`}
            >
              {language === 'ar' ? 'إضافة الباقة المخصصة للسلة' : 'Add Custom Casket to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
