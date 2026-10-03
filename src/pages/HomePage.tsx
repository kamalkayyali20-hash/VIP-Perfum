import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Gift, ArrowRight, ArrowLeft, PackageCheck, Award, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { STORE_PACKAGES } from '../config/packages';
import { formatCurrency } from '../utils/currency';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { BuildPackageModal } from '../components/packages/BuildPackageModal';

import heroBanner from '../assets/images/hero_vip_perfume_1791037255220.jpg';

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const { products, addPackageToCart } = useStore();
  const [isBuildModalOpen, setIsBuildModalOpen] = useState(false);
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);
  const goldPackage = STORE_PACKAGES.find((p) => p.id === 'gold')!;

  const concentrationCards = [
    {
      titleAr: 'عطور بارفيوم (Parfum)',
      titleEn: 'Parfum Essence',
      concentration: 'Parfum',
      descAr: 'أعلى نسبة تركيز وثبات يدوم لأكثر من 24 ساعة بمكونات ملكية نقية.',
      descEn: 'Highest concentration exceeding 24 hours of commanding sillage.',
    },
    {
      titleAr: 'أو دو بارفيوم (Eau de Parfum)',
      titleEn: 'Eau de Parfum',
      concentration: 'Eau de Parfum',
      descAr: 'توازن ساحر بين الفوحان الفوري والعمق العطري المناسب لكافة الإطلالات.',
      descEn: 'A radiant balance between immediate projection and deep longevity.',
    },
    {
      titleAr: 'أو دو تواليت (Eau de Toilette)',
      titleEn: 'Eau de Toilette',
      concentration: 'Eau de Toilette',
      descAr: 'انتعاش مبهج ونفحات حيوية تناسب الأجواء الصباحية وساعات العمل.',
      descEn: 'Crisp invigorating top notes tailored for daywear and workdays.',
    },
    {
      titleAr: 'مجموعة النيش (Luxury Perfume)',
      titleEn: 'Luxury Niche Collection',
      concentration: 'Luxury Perfume',
      descAr: 'إصدارات استثنائية لعشاق الندرة والروائح الدخانية والخشبية غير التقليدية.',
      descEn: 'Signature handcrafted private blends with rare resins and smoke accords.',
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-20 pb-16">
      {/* 1. Premium Hero Section */}
      <section className="relative overflow-hidden bg-[#080808] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-20 lg:py-28 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151515] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'المتجر الفاخر الأول للعطور في مصر' : 'Premier Luxury Fragrance House'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-[#F5F1E8] text-balance">
              {t('heroTitle')}
            </h1>

            <p className="text-base sm:text-lg text-[#B6B0A4] max-w-2xl leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* CTAs: Shop Men and Shop Women */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/shop/men"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-sm tracking-wider rounded-xl transition-all shadow-lg hover:shadow-[#D4AF37]/20 flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>{t('shopMenBtn')}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
              <Link
                to="/shop/women"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#151515] hover:bg-[#202020] text-[#F5F1E8] border border-[#D4AF37]/40 hover:border-[#D4AF37] font-semibold text-sm tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>{t('shopWomenBtn')}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>

            {/* Quiet trust markers */}
            <div className="pt-6 border-t border-[#D4AF37]/15 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#B6B0A4]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>{language === 'ar' ? 'تركيزات وثبات عالي' : 'High Concentration'}</span>
              </div>
              <span aria-hidden="true" className="hidden xs:inline">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>{language === 'ar' ? 'شحن سريع لكافة المحافظات' : 'Nationwide Egypt Delivery'}</span>
              </div>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-medium">
                  {language === 'ar' ? 'متاح الدفع عند الاستلام (كاش)' : 'Cash on Delivery Available'}
                </span>
              </div>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>{language === 'ar' ? 'عروض زجاجات مجانية' : 'Free Bottle Offers'}</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#D4AF37]/35 shadow-2xl bg-[#0c0c0c] group">
              <ImageWithFallback
                src={heroBanner}
                alt="VIP PERFUM Luxury Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 inset-x-5 text-center sm:text-start">
                <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase block mb-1">
                  VIP PERFUM Signature Edition
                </span>
                <p className="text-sm font-display font-medium text-[#F5F1E8]">
                  {language === 'ar'
                    ? 'فخامة لا تُنسى في كل قطرة'
                    : 'Uncompromising luxury in every drop'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Men / Women Category Tiles */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6">
          {/* Men Category Tile */}
          <Link
            to="/shop/men"
            className="group relative h-52 sm:h-72 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-[#1c1a17] to-[#121212] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 transition-all p-4 sm:p-8 flex flex-col justify-between shadow-xl"
          >
            <div className="relative z-10 space-y-2">
              <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37]">
                Pour Homme
              </span>
              <h2 className="text-xl sm:text-3xl font-display font-bold text-[#F5F1E8]">
                {language === 'ar' ? 'العطور الرجالية' : "Men's Fragrances"}
              </h2>
              <p className="text-xs sm:text-sm text-[#B6B0A4] max-w-sm">
                {language === 'ar'
                  ? 'تركيبات جلدية وخشبية وعنبرية تعكس القوة والأناقة الحازمة.'
                  : 'Deep woody, leather, and smoked amber compositions defining masculinity.'}
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              <span>{t('shopMenBtn')}</span>
              <ArrowIcon className="w-4 h-4" />
            </div>
          </Link>

          {/* Women Category Tile */}
          <Link
            to="/shop/women"
            className="group relative h-52 sm:h-72 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a171c] to-[#121212] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 transition-all p-4 sm:p-8 flex flex-col justify-between shadow-xl"
          >
            <div className="relative z-10 space-y-2">
              <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37]">
                Pour Femme
              </span>
              <h2 className="text-xl sm:text-3xl font-display font-bold text-[#F5F1E8]">
                {language === 'ar' ? 'العطور الحريمية' : "Women's Fragrances"}
              </h2>
              <p className="text-xs sm:text-sm text-[#B6B0A4] max-w-sm">
                {language === 'ar'
                  ? 'أريج الزهور النادرة والورد الدمشقي والفانيليا الحريرية لأنوثة طاغية.'
                  : 'Rare damask rose, Egyptian jasmine, and silky vanilla for timeless grace.'}
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              <span>{t('shopWomenBtn')}</span>
              <ArrowIcon className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Concentration Category Cards */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F1E8]">
            {t('concentrationsTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[#B6B0A4]">
            {language === 'ar'
              ? 'صُممت عطور VIP PERFUM بنسب زيوت عطرية مدروسة لتحقيق أعلى ثبات وفوحان'
              : 'Formulated with calibrated fragrance oil loads for maximum sillage and endurance'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {concentrationCards.map((c) => (
            <Link
              key={c.concentration}
              to={`/shop?concentration=${encodeURIComponent(c.concentration)}`}
              className="p-4 sm:p-6 rounded-xl bg-[#141414] border border-[#D4AF37]/15 hover:border-[#D4AF37]/45 transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider block mb-2">
                  VIP Standard
                </span>
                <h3 className="font-display font-semibold text-sm sm:text-base text-[#F5F1E8] group-hover:text-[#D4AF37] transition-colors mb-2">
                  {language === 'ar' ? c.titleAr : c.titleEn}
                </h3>
                <p className="text-xs text-[#B6B0A4] leading-relaxed">
                  {language === 'ar' ? c.descAr : c.descEn}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#D4AF37]/10 flex items-center justify-between text-xs text-[#D4AF37] font-semibold">
                <span>{language === 'ar' ? 'تصفح المجموعة' : 'Explore'}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Featured Products Collection */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-[#D4AF37]/20 gap-3 sm:gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F1E8]">
              {t('featuredFragrances')}
            </h2>
            <p className="text-xs sm:text-sm text-[#B6B0A4] mt-1">
              {t('featuredSubtitle')}
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-[#D4AF37] hover:text-[#E5C158] flex items-center gap-1.5 uppercase tracking-wider shrink-0 min-h-[44px]"
          >
            <span>{language === 'ar' ? 'عرض كل العطور' : 'View All Fragrances'}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Free-Bottle Promotions Section */}
      <section className="bg-gradient-to-b from-[#101010] to-[#080808] border-y border-[#D4AF37]/20 py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181818] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]">
              <Gift className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'عروض حصرية للعملاء في مصر' : 'Exclusive Egypt Offers'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#F5F1E8]">
              {t('offersSectionTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[#B6B0A4]">
              {t('offersSectionSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Offer 1 */}
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#151515] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 transition-all space-y-3.5 sm:space-y-4">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <Gift className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#D4AF37] block mb-1">العرض الأول / Offer 1</span>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#F5F1E8]">
                  {language === 'ar' ? 'اشتري 1 × 100 مل' : 'Buy 1 × 100 ml'}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#D4AF37] mt-0.5">
                  {language === 'ar' ? '← احصل على 1 × 30 مل مجاناً' : '→ Get 1 × 30 ml Free'}
                </p>
              </div>
              <p className="text-xs text-[#B6B0A4] leading-relaxed">
                {language === 'ar'
                  ? 'عند شراء أي زجاجة عطر بحجم 100 مل، تختار زجاجة ثانية بحجم 30 مل هدية مجانية من اختيارك في السلة.'
                  : 'Every single 100 ml bottle purchased entitles you to a complimentary 30 ml bottle of your choice.'}
              </p>
            </div>

            {/* Offer 2 */}
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#151515] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 transition-all space-y-3.5 sm:space-y-4">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <Gift className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#D4AF37] block mb-1">العرض الثاني / Offer 2</span>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#F5F1E8]">
                  {language === 'ar' ? 'اشتري 2 × 50 مل' : 'Buy 2 × 50 ml'}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#D4AF37] mt-0.5">
                  {language === 'ar' ? '← احصل على 1 × 30 مل مجاناً' : '→ Get 1 × 30 ml Free'}
                </p>
              </div>
              <p className="text-xs text-[#B6B0A4] leading-relaxed">
                {language === 'ar'
                  ? 'كل زوج من زجاجات 50 مل (سواء نفس العطر أو عطور مختلفة) يمنحك زجاجة 30 مل هدية مجانية.'
                  : 'Each pair of 50 ml bottles grants one 30 ml free gift bottle in your cart.'}
              </p>
            </div>

            {/* Offer 3 */}
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#151515] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all space-y-3.5 sm:space-y-4 relative overflow-hidden">
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#D4AF37] text-[#080808] font-bold text-[10px] rounded uppercase">
                Best Value
              </div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#D4AF37] block mb-1">العرض الثالث / Offer 3</span>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#F5F1E8]">
                  {language === 'ar' ? 'اشتري 2 × 100 مل' : 'Buy 2 × 100 ml'}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#D4AF37] mt-0.5">
                  {language === 'ar' ? '← احصل على 1 × 50 مل مجاناً' : '→ Get 1 × 50 ml Free'}
                </p>
              </div>
              <p className="text-xs text-[#B6B0A4] leading-relaxed">
                {language === 'ar'
                  ? 'العرض الأقوى: كل زجاجتين 100 مل تمنحك زجاجة كاملة بحجم 50 مل مجاناً من أي عطر متوفر في المخزن.'
                  : 'Supreme reward: Every pair of 100 ml bottles grants an entire 50 ml luxury bottle free.'}
              </p>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <Link
              to="/offers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#151515] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#F5F1E8] hover:text-[#D4AF37] text-xs font-bold rounded-xl transition-colors min-h-[44px]"
            >
              <span>{language === 'ar' ? 'عرض تفاصيل وشروط العروض' : 'Explore All Offer Examples & Rules'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Packages Section (Bronze, Silver, Gold) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#F5F1E8]">
            {t('packagesSectionTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[#B6B0A4]">
            {t('packagesSectionSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 items-stretch">
          {STORE_PACKAGES.map((pkg) => {
            const isConfirmed = pkg.isConfirmed;

            return (
              <div
                key={pkg.id}
                className={`p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-[#151515] border transition-all flex flex-col justify-between ${
                  isConfirmed
                    ? 'border-[#D4AF37]/60 shadow-xl relative'
                    : 'border-[#333] opacity-80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
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
                        {language === 'ar' ? 'متاح للطلب' : 'Available'}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-2xl font-bold font-display text-[#F5F1E8] mb-2">
                    {language === 'ar' ? pkg.nameAr : pkg.nameEn}
                  </h3>

                  <p className="text-xs text-[#B6B0A4] mb-4 sm:mb-6 leading-relaxed">
                    {language === 'ar' ? pkg.descriptionAr : pkg.descriptionEn}
                  </p>

                  {/* Pricing / Status */}
                  <div className="py-3 sm:py-4 border-y border-[#D4AF37]/15 my-3 sm:my-4">
                    {isConfirmed && pkg.price ? (
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl sm:text-3xl font-bold text-[#D4AF37] font-mono tabular-nums">
                            {formatCurrency(pkg.price, language)}
                          </span>
                          {pkg.originalPrice && (
                            <span className="text-xs sm:text-sm line-through text-[#666] font-mono">
                              {formatCurrency(pkg.originalPrice, language)}
                            </span>
                          )}
                        </div>
                        {pkg.originalPrice && (
                          <span className="text-xs text-emerald-400 font-semibold block mt-1">
                            {language === 'ar'
                              ? `وفر ${formatCurrency(pkg.originalPrice - pkg.price, language)} عند طلب الباقة الكاملة`
                              : `Save ${formatCurrency(pkg.originalPrice - pkg.price, language)} with this casket`}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="text-amber-400/90 text-xs font-medium py-1">
                        {t('detailsComingSoon')}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 text-xs text-[#B6B0A4] mb-4 sm:mb-6">
                    {(language === 'ar' ? pkg.featuresAr : pkg.featuresEn).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="pt-2">
                  {isConfirmed ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => addPackageToCart('gold', false)}
                        className="w-full py-3 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-xs rounded-xl transition-colors min-h-[44px]"
                      >
                        {t('addCuratedToCart')}
                      </button>
                      <button
                        onClick={() => setIsBuildModalOpen(true)}
                        className="w-full py-3 bg-[#111] hover:bg-[#1a1a1a] text-[#F5F1E8] border border-[#D4AF37]/40 hover:border-[#D4AF37] font-semibold text-xs rounded-xl transition-colors min-h-[44px]"
                      >
                        {t('customOption')}
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 bg-[#222] text-[#666] font-semibold text-xs rounded-xl cursor-not-allowed border border-[#333] min-h-[44px]"
                    >
                      {t('packageUnavailableBtn')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. How to Order Section */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="p-4 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#141414] to-[#0c0c0c] border border-[#D4AF37]/25">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F1E8]">
              {t('howToOrderTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[#B6B0A4]">
              {language === 'ar'
                ? 'تجربة تسوق سلسة من الاختيار حتى باب منزلك'
                : 'A seamless luxury shopping experience to your doorstep'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 text-center sm:text-start">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mx-auto sm:mx-0">
                <PackageCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-base text-[#F5F1E8]">
                {t('step1Title')}
              </h3>
              <p className="text-xs text-[#B6B0A4] leading-relaxed">
                {t('step1Desc')}
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-start">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mx-auto sm:mx-0">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-base text-[#F5F1E8]">
                {t('step2Title')}
              </h3>
              <p className="text-xs text-[#B6B0A4] leading-relaxed">
                {t('step2Desc')}
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-start">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mx-auto sm:mx-0">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-base text-[#F5F1E8]">
                {t('step3Title')}
              </h3>
              <p className="text-xs text-[#B6B0A4] leading-relaxed">
                {t('step3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Build-Your-Own Package Modal */}
      {isBuildModalOpen && (
        <BuildPackageModal
          pkg={goldPackage}
          isOpen={isBuildModalOpen}
          onClose={() => setIsBuildModalOpen(false)}
        />
      )}
    </div>
  );
};
