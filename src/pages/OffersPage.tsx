import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Calculator } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { calculatePromotions } from '../utils/promotionCalculator';
import { CartItem } from '../types';

export const OffersPage: React.FC = () => {
  const { language, t } = useLanguage();
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Interactive Promotion Simulator State
  const [sim100ml, setSim100ml] = useState<number>(2);
  const [sim50ml, setSim50ml] = useState<number>(0);

  // Run calculation on simulated cart
  const dummyItems: CartItem[] = [
    ...Array(sim100ml).fill(null).map((_, i) => ({
      id: `sim_100_${i}`,
      productId: 'sim',
      slug: 'sim',
      nameAr: 'زجاجة تجريبية 100 مل',
      nameEn: 'Demo 100ml Bottle',
      image: '',
      size: '100ml' as const,
      price: 1500,
      quantity: 1,
    })),
    ...Array(sim50ml).fill(null).map((_, i) => ({
      id: `sim_50_${i}`,
      productId: 'sim',
      slug: 'sim',
      nameAr: 'زجاجة تجريبية 50 مل',
      nameEn: 'Demo 50ml Bottle',
      image: '',
      size: '50ml' as const,
      price: 1000,
      quantity: 1,
    })),
  ];

  const simulation = calculatePromotions(dummyItems);

  const exactPromptExamples = [
    { in: '1 × 100 ml', out: '1 × 30 ml gift', outAr: '1 × زجاجة 30 مل هدية' },
    { in: '2 × 100 ml', out: '1 × 50 ml gift', outAr: '1 × زجاجة 50 مل هدية' },
    { in: '3 × 100 ml', out: '1 × 50 ml + 1 × 30 ml gifts', outAr: '1 × 50 مل + 1 × 30 مل هدايا' },
    { in: '4 × 100 ml', out: '2 × 50 ml gifts', outAr: '2 × زجاجات 50 مل هدايا' },
    { in: '2 × 50 ml', out: '1 × 30 ml gift', outAr: '1 × زجاجة 30 مل هدية' },
    { in: '4 × 50 ml', out: '2 × 30 ml gifts', outAr: '2 × زجاجات 30 مل هدايا' },
    { in: '1 × 100 ml + 2 × 50 ml', out: '2 × 30 ml gifts', outAr: '2 × زجاجات 30 مل هدايا' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-16">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151515] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]">
          <Gift className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'نظام المكافآت الحصري' : 'Exclusive Reward System'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-bold text-[#F5F1E8]">
          {language === 'ar' ? 'عروض الزجاجات المجانية التلقائية' : 'Complimentary Bottle Promotions'}
        </h1>
        <p className="text-xs sm:text-sm text-[#B6B0A4] leading-relaxed">
          {language === 'ar'
            ? 'في VIP PERFUM، نكافئك بزجاجات عطرية فاخرة مجانية مع كل طلب مؤهل. العروض تطبق تلقائياً وتكرر مع زيادة الكميات، وتختار أنت العطور المهداة بنفسك في السلة!'
            : 'At VIP PERFUM, earn complimentary bottles automatically with qualifying orders. Repeat rules for larger orders and pick your favorite gift fragrances in your cart!'}
        </p>
      </div>

      {/* The 3 Core Rules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D4AF37]/30 space-y-3 sm:space-y-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-bold text-sm">
            1
          </div>
          <div>
            <span className="text-xs text-[#D4AF37] font-mono block mb-1">القاعدة الأولى / Rule 1</span>
            <h3 className="font-display font-bold text-base sm:text-lg text-[#F5F1E8]">
              {language === 'ar' ? 'زجاجة 100 مل ← زجاجة 30 مل مجاناً' : 'Buy 1 × 100 ml → 1 × 30 ml Free'}
            </h3>
          </div>
          <p className="text-xs text-[#B6B0A4] leading-relaxed">
            {language === 'ar'
              ? 'كل زجاجة 100 مل فردية تمنحك زجاجة بحجم 30 مل مجاناً من أي عطر متوفر في قائمة الهدايا.'
              : 'Each individual 100 ml bottle qualifies you for a free 30 ml bottle.'}
          </p>
        </div>

        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D4AF37]/30 space-y-3 sm:space-y-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-bold text-sm">
            2
          </div>
          <div>
            <span className="text-xs text-[#D4AF37] font-mono text-[#D4AF37] block mb-1">القاعدة الثانية / Rule 2</span>
            <h3 className="font-display font-bold text-base sm:text-lg text-[#F5F1E8]">
              {language === 'ar' ? 'زجاجتين 50 مل ← زجاجة 30 مل مجاناً' : 'Buy 2 × 50 ml → 1 × 30 ml Free'}
            </h3>
          </div>
          <p className="text-xs text-[#B6B0A4] leading-relaxed">
            {language === 'ar'
              ? 'كل زوج من زجاجات 50 مل يمنحك زجاجة 30 مل مجانية. لا يشترط أن تكون الزجاجات من نفس العطر.'
              : 'Every pair of 50 ml bottles grants one 30 ml free bottle. Matching fragrances are not required.'}
          </p>
        </div>

        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D4AF37]/50 space-y-3 sm:space-y-4 bg-gradient-to-b from-[#181612] to-[#121212]">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#D4AF37] text-[#080808] flex items-center justify-center font-bold text-sm">
            3
          </div>
          <div>
            <span className="text-xs text-[#D4AF37] font-mono block mb-1">القاعدة الثالثة (الأولى تطبيقاً) / Rule 3</span>
            <h3 className="font-display font-bold text-base sm:text-lg text-[#F5F1E8]">
              {language === 'ar' ? 'زجاجتين 100 مل ← زجاجة 50 مل مجاناً' : 'Buy 2 × 100 ml → 1 × 50 ml Free'}
            </h3>
          </div>
          <p className="text-xs text-[#B6B0A4] leading-relaxed">
            {language === 'ar'
              ? 'تطبق هذه القاعدة أولاً: كل زوج من زجاجات 100 مل يرتقي بهديتك لتصبح زجاجة كاملة بحجم 50 مل مجاناً!'
              : 'Applied first: Every pair of 100 ml bottles elevates your gift to a full 50 ml free bottle!'}
          </p>
        </div>
      </div>

      {/* Interactive Promotion Simulator */}
      <section className="p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-[#121212] border border-[#D4AF37]/30 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-[#F5F1E8]">
                {language === 'ar' ? 'حاسبة العروض الذكية' : 'Interactive Offer Simulator'}
              </h2>
              <p className="text-xs text-[#B6B0A4]">
                {language === 'ar'
                  ? 'جرب تغيير عدد الزجاجات وشاهد استحقاقات الهدايا فورياً حسب المنطق المعتمد'
                  : 'Adjust bottle quantities below to simulate earned gifts in real time'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Controls */}
          <div className="space-y-6">
            {/* 100ml Control */}
            <div className="p-4 rounded-xl bg-[#171717] border border-[#D4AF37]/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#F5F1E8]">
                  {language === 'ar' ? 'عدد زجاجات 100 مل المشتراة:' : '100 ml Bottles Purchased:'}
                </span>
                <span className="font-mono text-base font-bold text-[#D4AF37] tabular-nums">
                  {sim100ml}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSim100ml((n) => Math.max(0, n - 1))}
                  className="w-10 h-10 rounded-lg bg-[#222] hover:bg-[#333] text-[#F5F1E8] font-bold text-base flex items-center justify-center min-h-[44px]"
                >
                  -
                </button>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={sim100ml}
                  onChange={(e) => setSim100ml(Number(e.target.value))}
                  className="flex-1 accent-[#D4AF37]"
                />
                <button
                  onClick={() => setSim100ml((n) => n + 1)}
                  className="w-10 h-10 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-base flex items-center justify-center min-h-[44px]"
                >
                  +
                </button>
              </div>
            </div>

            {/* 50ml Control */}
            <div className="p-4 rounded-xl bg-[#171717] border border-[#D4AF37]/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#F5F1E8]">
                  {language === 'ar' ? 'عدد زجاجات 50 مل المشتراة:' : '50 ml Bottles Purchased:'}
                </span>
                <span className="font-mono text-base font-bold text-[#D4AF37] tabular-nums">
                  {sim50ml}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSim50ml((n) => Math.max(0, n - 1))}
                  className="w-10 h-10 rounded-lg bg-[#222] hover:bg-[#333] text-[#F5F1E8] font-bold text-base flex items-center justify-center min-h-[44px]"
                >
                  -
                </button>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={sim50ml}
                  onChange={(e) => setSim50ml(Number(e.target.value))}
                  className="flex-1 accent-[#D4AF37]"
                />
                <button
                  onClick={() => setSim50ml((n) => n + 1)}
                  className="w-10 h-10 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-base flex items-center justify-center min-h-[44px]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1813] to-[#121212] border border-[#D4AF37]/40 space-y-4">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block">
              {language === 'ar' ? 'الهدايا المستحقة تلقائياً:' : 'Calculated Gift Entitlements:'}
            </span>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#080808] rounded-xl border border-[#D4AF37]/20">
                <span className="text-sm font-semibold text-[#F5F1E8]">
                  {language === 'ar' ? 'زجاجات 50 مل هدية:' : '50 ml Gift Bottles:'}
                </span>
                <span className="text-2xl font-bold font-mono text-[#D4AF37] tabular-nums">
                  {simulation.earned50ml}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#080808] rounded-xl border border-[#D4AF37]/20">
                <span className="text-sm font-semibold text-[#F5F1E8]">
                  {language === 'ar' ? 'زجاجات 30 مل هدية:' : '30 ml Gift Bottles:'}
                </span>
                <span className="text-2xl font-bold font-mono text-[#D4AF37] tabular-nums">
                  {simulation.earned30ml}
                </span>
              </div>
            </div>

            {simulation.breakdown.length > 0 ? (
              <div className="text-xs text-[#B6B0A4] space-y-1 pt-2 border-t border-[#D4AF37]/15">
                <span className="font-semibold text-[#F5F1E8] block mb-1">
                  {language === 'ar' ? 'تفصيل منطق العرض:' : 'Rule Application Breakdown:'}
                </span>
                {simulation.breakdown.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{language === 'ar' ? b.descriptionAr : b.descriptionEn}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#888] italic">
                {language === 'ar'
                  ? 'أضف زجاجة 100 مل على الأقل أو زجاجتين 50 مل لتفعيل الهدايا المجانية.'
                  : 'Add at least one 100 ml or two 50 ml bottles to trigger free gifts.'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Official Rule Examples Table */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-[#F5F1E8]">
          {language === 'ar' ? 'أمثلة عملية لحساب الهدايا' : 'Promotion Specification Examples'}
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-[#D4AF37]/20 bg-[#121212]">
          <table className="w-full text-xs text-start">
            <thead className="bg-[#181818] border-b border-[#D4AF37]/20 text-[#D4AF37]">
              <tr>
                <th className="py-3.5 px-4 text-start font-semibold">
                  {language === 'ar' ? 'الكميات المشتراة' : 'Purchased Bottles'}
                </th>
                <th className="py-3.5 px-4 text-start font-semibold">
                  {language === 'ar' ? 'الهدايا المجانية المستحقة' : 'Complimentary Gifts Earned'}
                </th>
                <th className="py-3.5 px-4 text-start font-semibold">
                  {language === 'ar' ? 'المنطق المطبق' : 'Applied Rule Logic'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4AF37]/10 text-[#F5F1E8]">
              {exactPromptExamples.map((ex, i) => (
                <tr key={i} className="hover:bg-[#161616] transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-[#D4AF37]">{ex.in}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-400">
                    {language === 'ar' ? ex.outAr : ex.out}
                  </td>
                  <td className="py-3 px-4 text-[#B6B0A4]">
                    {i === 0 && (language === 'ar' ? 'قاعدة زجاجة 100 مل الفردية' : 'Single 100 ml rule')}
                    {i === 1 && (language === 'ar' ? 'قاعدة الزوج (2 × 100 مل تسبق الـ 30 مل)' : '100 ml pair prioritized over 30 ml')}
                    {i === 2 && (language === 'ar' ? 'زوج 100 مل + زجاجة فردية متبقية' : 'One 100 ml pair + one remaining single')}
                    {i === 3 && (language === 'ar' ? 'زوجين كاملين من 100 مل' : 'Two pairs of 100 ml')}
                    {i === 4 && (language === 'ar' ? 'زوج واحد من 50 مل' : 'Single pair of 50 ml')}
                    {i === 5 && (language === 'ar' ? 'زوجين كاملين من 50 مل' : 'Two pairs of 50 ml')}
                    {i === 6 && (language === 'ar' ? '1 فردي 100 مل (هدية 30) + زوج 50 مل (هدية 30)' : '1 single 100 ml (30 ml gift) + 1 pair 50 ml (30 ml gift)')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA to Shop */}
      <div className="text-center pt-4">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-sm tracking-wider rounded-xl transition-all shadow-xl min-h-[44px]"
        >
          <span>{language === 'ar' ? 'ابدأ التسوق واستفد من العروض الآن' : 'Start Shopping & Claim Offers'}</span>
          <ArrowIcon className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
