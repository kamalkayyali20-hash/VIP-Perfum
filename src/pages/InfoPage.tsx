import React from 'react';
import { Truck, RotateCcw, Shield, MapPin, AlertCircle, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { EGYPT_GOVERNORATES } from '../config/storeSettings';
import { formatCurrency } from '../utils/currency';

export const InfoPage: React.FC = () => {
  const { language } = useLanguage();
  const { storeSettings } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-6 sm:space-y-12 text-[#F5F1E8]">
      {/* Title */}
      <div className="text-center space-y-3">
        <h1 className="text-2xl sm:text-4xl font-display font-bold text-[#F5F1E8]">
          {language === 'ar' ? 'معلومات الشحن، الإرجاع والخصوصية' : 'Shipping, Returns & Privacy Information'}
        </h1>
        <p className="text-xs sm:text-sm text-[#B6B0A4] max-w-2xl mx-auto">
          {language === 'ar'
            ? 'سياسات واضحة تضمن لعملاء VIP PERFUM تجربة تسوق موثوقة ومريحة داخل كافة محافظات مصر.'
            : 'Clear store policies ensuring transparent and dependable luxury fragrance shopping.'}
        </p>
      </div>

      {/* Disclaimers & Placeholders Banner */}
      <div className="p-4 rounded-xl bg-[#141414] border border-[#D4AF37]/30 text-xs flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
        <div className="text-[#B6B0A4] leading-relaxed space-y-1">
          <span className="font-semibold text-[#D4AF37] block">
            {language === 'ar' ? 'تنويه السياسات وقابلية التعديل:' : 'Policy Configuration Notice:'}
          </span>
          <p>
            {language === 'ar'
              ? 'كافة السياسات الموضحة أدناه قابلة للإدارة والتعديل من قِبل إدارة المتجر في ملف إعدادات المتجر (src/config/storeSettings.ts). لا نعتمد سياسات وهمية أو وعود قانونية غير مصرح بها.'
              : 'All policies listed below are configurable in src/config/storeSettings.ts. No fabricated legal promises are made.'}
          </p>
        </div>
      </div>

      {/* 1. Shipping & Delivery Policy */}
      <section className="p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D4AF37]/20 space-y-6">
        <div className="flex items-center gap-3 border-b border-[#D4AF37]/15 pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-[#F5F1E8]">
              {language === 'ar' ? '1. سياسة الشحن ومواعيد التوصيل في مصر' : '1. Shipping & Transit Times in Egypt'}
            </h2>
            <p className="text-xs text-[#B6B0A4]">
              {language === 'ar' ? 'توصيل لباب المنزل عبر شركات شحن معتمدة' : 'Doorstep courier delivery across Egypt'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-[#0a0a0a] rounded-xl border border-[#222] space-y-2">
            <span className="font-bold text-[#D4AF37] block">
              {language === 'ar' ? 'القاهرة الكبرى والجيزة' : 'Greater Cairo & Giza'}
            </span>
            <p className="text-[#F5F1E8] font-semibold">{storeSettings.policies.shippingDaysCairo}</p>
            <p className="text-[#888]">
              {language === 'ar' ? 'الشحن المباشر خلال 24 - 48 ساعة من تأكيد الدفع.' : 'Delivery within 24-48 hours from payment audit.'}
            </p>
          </div>

          <div className="p-4 bg-[#0a0a0a] rounded-xl border border-[#222] space-y-2">
            <span className="font-bold text-[#D4AF37] block">
              {language === 'ar' ? 'الإسكندرية ومحافظات الدلتا' : 'Alexandria & Delta'}
            </span>
            <p className="text-[#F5F1E8] font-semibold">{storeSettings.policies.shippingDaysAlexDelta}</p>
            <p className="text-[#888]">
              {language === 'ar' ? 'طنطا، المنصورة، الزقازيق، كفر الشيخ وغيرها.' : 'Transit to all Lower Egypt centers.'}
            </p>
          </div>

          <div className="p-4 bg-[#0a0a0a] rounded-xl border border-[#222] space-y-2">
            <span className="font-bold text-[#D4AF37] block">
              {language === 'ar' ? 'القناة والصعيد والمناطق الساحلية' : 'Canal, Upper Egypt & Coastal'}
            </span>
            <p className="text-[#F5F1E8] font-semibold">{storeSettings.policies.shippingDaysOther}</p>
            <p className="text-[#888]">
              {language === 'ar' ? 'بورسعيد، السويس، سوهاج، قنا، الأقصر، أسوان والبحر الأحمر.' : 'Full coverage to regional cities.'}
            </p>
          </div>
        </div>

        <div className="text-xs text-[#B6B0A4] leading-relaxed pt-2">
          <p>
            {language === 'ar'
              ? 'ملاحظة: لا يتم تصنيف الشحن على أنه مجاني إلا إذا حقق الطلب الحد الأدنى المحدد في إعدادات المتجر (حالياً لا يتوفر شحن مجاني افتراضي إلا بحملات محددة).'
              : 'Note: Shipping is never labeled as free unless store configuration explicitly meets a free threshold.'}
          </p>
        </div>
      </section>

      {/* 2. Returns & Exchanges Policy */}
      <section className="p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D4AF37]/20 space-y-6">
        <div className="flex items-center gap-3 border-b border-[#D4AF37]/15 pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-[#F5F1E8]">
              {language === 'ar' ? '2. سياسة الاسترجاع والاستبدال' : '2. Return & Exchange Policy'}
            </h2>
            <p className="text-xs text-[#B6B0A4]">
              {language === 'ar' ? 'شروط حفظ جودة مستحضرات العطور الفاخرة' : 'Preserving fragrance authenticity and safety'}
            </p>
          </div>
        </div>

        <div className="text-xs text-[#B6B0A4] leading-relaxed space-y-3">
          <p>
            {language === 'ar'
              ? storeSettings.policies.returnsNoticeAr
              : storeSettings.policies.returnsNoticeEn}
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-[#F5F1E8]/90">
            <li>
              {language === 'ar'
                ? 'يجب أن تكون العبوة مغلفة بالسلوفان الحراري الأصلي ولم يتم فكها أو رشها.'
                : 'Items must retain original sealed cellophane wrapping intact.'}
            </li>
            <li>
              {language === 'ar'
                ? 'الزجاجات المهداة مجاناً (30 مل أو 50 مل) جزء لا يتجزأ من العرض ويجب إرجاعها بحالتها.'
                : 'Complimentary gift bottles must be returned alongside paid items.'}
            </li>
            <li>
              {language === 'ar'
                ? 'في حال وجود عيب في الرشاش أو كسر أثناء النقل، يتم الاستبدال الفوري دون أي تكلفة إضافية.'
                : 'Defective atomizers or transit damage qualify for swift complimentary replacement.'}
            </li>
          </ul>
        </div>
      </section>

      {/* 3. Privacy & Data Handling Policy */}
      <section className="p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D4AF37]/20 space-y-6">
        <div className="flex items-center gap-3 border-b border-[#D4AF37]/15 pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-[#F5F1E8]">
              {language === 'ar' ? '3. سياسة الخصوصية وأمان معلومات العملاء' : '3. Customer Privacy & Data Security'}
            </h2>
            <p className="text-xs text-[#B6B0A4]">
              {language === 'ar' ? 'حماية بياناتك وبيانات التحويل المالي' : 'Protecting contact details and transfer verification'}
            </p>
          </div>
        </div>

        <div className="text-xs text-[#B6B0A4] leading-relaxed space-y-3">
          <p>
            {language === 'ar'
              ? storeSettings.policies.privacyNoticeAr
              : storeSettings.policies.privacyNoticeEn}
          </p>
          <p>
            {language === 'ar'
              ? 'في النسخة الإنتاجية: تحفظ صور الشاشات وإشعارات الدفع في مساحة تخزين مشفرة خاصة (Private Cloud Storage) ولا يتم كشفها للعموم، ويتم مطابقتها حصرياً من قِبل المحاسب المخول.'
              : 'In production: transfer screenshots and transaction references are safely stored in private authenticated storage and verified strictly by authorized staff.'}
          </p>
        </div>
      </section>

      {/* 4. Payment Methods in Egypt */}
      <section className="p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D4AF37]/20 space-y-6">
        <div className="flex items-center gap-3 border-b border-[#D4AF37]/15 pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-[#F5F1E8]">
              {language === 'ar' ? '4. طرق الدفع المعتمدة في مصر' : '4. Approved Payment Methods in Egypt'}
            </h2>
            <p className="text-xs text-[#B6B0A4]">
              {language === 'ar' ? 'خيارات دفع مرنة ومريحة تناسب كافة العملاء' : 'Flexible payment choices tailored for Egyptian customers'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-[#0a0a0a] rounded-xl border border-emerald-500/30 space-y-2">
            <span className="font-bold text-emerald-400 block">
              {language === 'ar' ? 'الدفع عند الاستلام (كاش)' : 'Cash on Delivery (COD)'}
            </span>
            <span className="text-[11px] font-mono text-[#D4AF37] block">
              {language === 'ar' ? 'الأكثر طلباً · بدون رسوم إضافية' : 'Most Popular · 0 EGP Surcharge'}
            </span>
            <p className="text-[#B6B0A4] leading-relaxed">
              {language === 'ar'
                ? 'استلم طردك وادفع القيمة نقداً لمندوب الشحن عند باب المنزل بكل راحة وأمان.'
                : 'Pay directly in cash to the courier upon parcel delivery at your doorstep.'}
            </p>
          </div>

          <div className="p-4 bg-[#0a0a0a] rounded-xl border border-[#222] space-y-2">
            <span className="font-bold text-[#D4AF37] block">
              {language === 'ar' ? 'شبكة إنستاباي (InstaPay)' : 'InstaPay Network'}
            </span>
            <span className="text-[11px] font-mono text-[#B6B0A4] block">
              {storeSettings.paymentRecipients.instapay.accountHandle}
            </span>
            <p className="text-[#B6B0A4] leading-relaxed">
              {language === 'ar'
                ? 'تحويل لحظي مباشر عبر حساب أو عنوان الدفع اللحظي IPA مع إرفاق لقطة شاشة للتأكيد الفوري.'
                : 'Instant account-to-account transfer via IPA address with swift verification.'}
            </p>
          </div>

          <div className="p-4 bg-[#0a0a0a] rounded-xl border border-[#222] space-y-2">
            <span className="font-bold text-[#D4AF37] block">
              {language === 'ar' ? 'المحافظ الذكية (Mobile Wallets)' : 'Smart Mobile Wallets'}
            </span>
            <span className="text-[11px] font-mono text-[#B6B0A4] block">
              {storeSettings.paymentRecipients.mobileWallet.walletNumber}
            </span>
            <p className="text-[#B6B0A4] leading-relaxed">
              {language === 'ar'
                ? 'فودافون كاش، أورنج كاش، اتصالات كاش، ووي باي لتأكيد الشحن فوراً.'
                : 'Vodafone Cash, Orange Cash, Etisalat Cash, and WE Pay supported.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
