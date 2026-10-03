import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const { storeSettings } = useStore();

  return (
    <footer className="bg-[#050505] border-t border-[#D4AF37]/20 text-[#B6B0A4] pt-10 sm:pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h2 className="font-brand text-2xl font-bold tracking-[0.2em] text-[#F5F1E8]">
              VIP PERFUM
            </h2>
            <p className="text-xs text-[#D4AF37] font-medium tracking-wider">
              {language === 'ar' ? storeSettings.brandTaglineAr : storeSettings.brandTaglineEn}
            </p>
            <p className="text-sm leading-relaxed text-[#B6B0A4]">
              {language === 'ar'
                ? 'متجر العطور الفاخر الأول في مصر. نقدم عطوراً بتركيزات استثنائية وباقات ملكية متكاملة مصممة لأصحاب الذوق المتميز.'
                : 'Premier luxury fragrance destination in Egypt. Exceptional concentrations and curated royal perfume wardrobes.'}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#D4AF37]/80">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{language === 'ar' ? 'تصنيع وتعبئة ممتازة - مصر' : 'Finest Formulation - Egypt'}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#F5F1E8] tracking-wider uppercase font-display border-b border-[#D4AF37]/20 pb-2">
              {language === 'ar' ? 'روابط التصفح' : 'Collections'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="hover:text-[#D4AF37] transition-colors">
                  {t('navShop')}
                </Link>
              </li>
              <li>
                <Link to="/shop/men" className="hover:text-[#D4AF37] transition-colors">
                  {t('navMen')}
                </Link>
              </li>
              <li>
                <Link to="/shop/women" className="hover:text-[#D4AF37] transition-colors">
                  {t('navWomen')}
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-[#D4AF37] transition-colors">
                  {t('navPackages')}
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-[#D4AF37] transition-colors">
                  {t('navOffers')}
                </Link>
              </li>
              <li>
                <Link to="/tracking" className="hover:text-[#D4AF37] transition-colors">
                  {t('navTrackOrder')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#F5F1E8] tracking-wider uppercase font-display border-b border-[#D4AF37]/20 pb-2">
              {language === 'ar' ? 'السياسات والضمان' : 'Policies & Care'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/info" className="hover:text-[#D4AF37] transition-colors">
                  {language === 'ar' ? 'سياسة الشحن ومواعيد التوصيل' : 'Shipping & Transit Times'}
                </Link>
              </li>
              <li>
                <Link to="/info" className="hover:text-[#D4AF37] transition-colors">
                  {language === 'ar' ? 'سياسة الاسترجاع والاستبدال' : 'Return & Exchange Policy'}
                </Link>
              </li>
              <li>
                <Link to="/info" className="hover:text-[#D4AF37] transition-colors">
                  {language === 'ar' ? 'سياسة الخصوصية وأمان البيانات' : 'Privacy & Data Protection'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D4AF37] transition-colors">
                  {t('navContact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Configurable Contact Placeholders */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#F5F1E8] tracking-wider uppercase font-display border-b border-[#D4AF37]/20 pb-2">
              {language === 'ar' ? 'بيانات التواصل (مقرر الإدارة)' : 'Store Headquarters'}
            </h3>
            <div className="space-y-2.5 text-xs text-[#B6B0A4]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  {language === 'ar'
                    ? storeSettings.contact.boutiqueAddressAr
                    : storeSettings.contact.boutiqueAddressEn}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span dir="ltr">{storeSettings.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{storeSettings.contact.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  {language === 'ar'
                    ? storeSettings.contact.workingHoursAr
                    : storeSettings.contact.workingHoursEn}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Accepted Payment Methods in Egypt */}
        <div className="py-4 border-t border-b border-[#D4AF37]/15 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#D4AF37] font-semibold">
            <span>{language === 'ar' ? 'طرق الدفع المعتمدة في مصر:' : 'Accepted Payment Methods:'}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px]">
            <span className="px-2.5 py-1 rounded-md bg-[#121212] border border-emerald-500/40 text-emerald-400 font-medium">
              💵 {language === 'ar' ? 'الدفع عند الاستلام (كاش للمندوب)' : 'Cash on Delivery (COD)'}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#121212] border border-[#D4AF37]/30 text-[#F5F1E8]">
              ⚡ {language === 'ar' ? 'شبكة إنستاباي (InstaPay)' : 'InstaPay Network'}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#121212] border border-[#D4AF37]/30 text-[#F5F1E8]">
              📱 {language === 'ar' ? 'المحافظ الذكية (فودافون كاش وغيرها)' : 'Mobile Wallets'}
            </span>
          </div>
        </div>

        {/* Demo Mode Notice Box */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#121212] border border-[#D4AF37]/20 text-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <div className="text-[#B6B0A4] leading-relaxed">
            <span className="font-semibold text-[#D4AF37]">
              {language === 'ar' ? 'توضيح النموذج التجريبي: ' : 'Demo Application Notice: '}
            </span>
            {language === 'ar' ? storeSettings.policies.demoNoticeAr : storeSettings.policies.demoNoticeEn}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#1a1a1a] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#777] gap-3">
          <div>
            © {new Date().getFullYear()} VIP PERFUM Egypt. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/info" className="hover:text-[#D4AF37]">
              {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
            </Link>
            <span>·</span>
            <Link to="/info" className="hover:text-[#D4AF37]">
              {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
