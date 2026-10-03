import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, ShoppingBag, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { STORE_PACKAGES } from '../config/packages';
import { formatCurrency } from '../utils/currency';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { BuildPackageModal } from '../components/packages/BuildPackageModal';

export const PackagesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { addPackageToCart } = useStore();
  const [isBuildModalOpen, setIsBuildModalOpen] = useState(false);
  const [addedCurated, setAddedCurated] = useState(false);

  const goldPkg = STORE_PACKAGES.find((p) => p.id === 'gold')!;

  const handleAddCurated = () => {
    const ok = addPackageToCart('gold', false);
    if (ok) {
      setAddedCurated(true);
      setTimeout(() => setAddedCurated(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-16">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151515] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]">
          <Layers className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'صناديق وباقات هدايا فاخرة' : 'Curated Gift Caskets'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-bold text-[#F5F1E8]">
          {t('packagesSectionTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-[#B6B0A4] leading-relaxed">
          {t('packagesSectionSubtitle')}
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 items-stretch">
        {STORE_PACKAGES.map((pkg) => {
          const isConfirmed = pkg.isConfirmed;

          return (
            <div
              key={pkg.id}
              className={`p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-[#141414] border transition-all flex flex-col justify-between ${
                isConfirmed
                  ? 'border-[#D4AF37]/60 shadow-2xl relative bg-gradient-to-b from-[#181612] to-[#121212]'
                  : 'border-[#2a2a2a] opacity-80'
              }`}
            >
              <div>
                {/* Visual Image */}
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#0c0c0c] mb-6 border border-[#D4AF37]/20">
                  <ImageWithFallback
                    src={pkg.image}
                    alt={pkg.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
                    {language === 'ar' ? pkg.subtitleAr : pkg.subtitleEn}
                  </span>
                  {!isConfirmed && (
                    <span className="px-2 py-0.5 bg-[#222] text-[#888] rounded text-[11px] font-medium">
                      {language === 'ar' ? 'قيد التأكيد' : 'Pending'}
                    </span>
                  )}
                  {isConfirmed && (
                    <span className="px-2 py-0.5 bg-[#D4AF37] text-[#080808] rounded text-[11px] font-bold">
                      {language === 'ar' ? 'متاح للطلب الفوري' : 'Available'}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold font-display text-[#F5F1E8] mb-2">
                  {language === 'ar' ? pkg.nameAr : pkg.nameEn}
                </h2>

                <p className="text-xs text-[#B6B0A4] mb-6 leading-relaxed">
                  {language === 'ar' ? pkg.descriptionAr : pkg.descriptionEn}
                </p>

                {/* Price or Coming Soon Banner */}
                <div className="py-4 border-y border-[#D4AF37]/15 my-4">
                  {isConfirmed && pkg.price ? (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-bold text-[#D4AF37] font-mono tabular-nums">
                          {formatCurrency(pkg.price, language)}
                        </span>
                        {pkg.originalPrice && (
                          <span className="text-sm line-through text-[#666] font-mono">
                            {formatCurrency(pkg.originalPrice, language)}
                          </span>
                        )}
                      </div>
                      {pkg.originalPrice && (
                        <span className="text-xs text-emerald-400 font-semibold block mt-1">
                          {language === 'ar'
                            ? `توفير حقيقي ${formatCurrency(pkg.originalPrice - pkg.price, language)} مقارنة بالشراء المنفصل`
                            : `Real savings: ${formatCurrency(pkg.originalPrice - pkg.price, language)} vs individual buy`}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="text-amber-400/90 text-xs font-medium py-1 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{t('detailsComingSoon')}</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 text-xs text-[#B6B0A4] mb-6">
                  {(language === 'ar' ? pkg.featuresAr : pkg.featuresEn).map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Curated list if confirmed */}
                {isConfirmed && pkg.curatedBottleNamesAr && (
                  <div className="p-3 bg-[#0a0a0a] rounded-xl border border-[#D4AF37]/15 text-xs text-[#B6B0A4] mb-6">
                    <span className="font-semibold text-[#D4AF37] block mb-1">
                      {language === 'ar' ? 'تشمل 12 عطراً ملكياً:' : 'Includes 12 royal fragrances:'}
                    </span>
                    <p className="line-clamp-3 text-[11px] leading-relaxed">
                      {(language === 'ar' ? pkg.curatedBottleNamesAr : pkg.curatedBottleNamesEn)?.join(' · ')}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                {isConfirmed ? (
                  <div className="space-y-2">
                    <button
                      onClick={handleAddCurated}
                      className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        {addedCurated
                          ? language === 'ar'
                            ? 'تمت الإضافة للسلة!'
                            : 'Added to Cart!'
                          : t('addCuratedToCart')}
                      </span>
                    </button>
                    <button
                      onClick={() => setIsBuildModalOpen(true)}
                      className="w-full py-3.5 bg-[#151515] hover:bg-[#202020] text-[#F5F1E8] border border-[#D4AF37]/40 hover:border-[#D4AF37] font-semibold text-xs rounded-xl transition-colors min-h-[44px]"
                    >
                      {t('customOption')}
                    </button>
                  </div>
                ) : (
                  <button
                    disabled
                    className="w-full py-3.5 bg-[#222] text-[#666] font-semibold text-xs rounded-xl cursor-not-allowed border border-[#333] min-h-[44px]"
                  >
                    {t('packageUnavailableBtn')}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Build-Your-Own Package Modal */}
      {isBuildModalOpen && (
        <BuildPackageModal
          pkg={goldPkg}
          isOpen={isBuildModalOpen}
          onClose={() => setIsBuildModalOpen(false)}
        />
      )}
    </div>
  );
};
