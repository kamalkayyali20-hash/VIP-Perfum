import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { storeSettings } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitted(true);
    setName('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-8 sm:space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-2xl sm:text-4xl font-display font-bold text-[#F5F1E8]">
          {t('navContact')}
        </h1>
        <p className="text-xs sm:text-sm text-[#B6B0A4]">
          {language === 'ar'
            ? 'فريق خدمة عملاء VIP PERFUM يسعد بتلقي استفساراتكم حول العطور وباقات الهدايا والشحن داخل مصر.'
            : 'VIP PERFUM fragrance specialists are at your service for consultations and order inquiries.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        {/* Contact Info Cards (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D4AF37]/25 space-y-5 sm:space-y-6">
            <h2 className="text-base font-bold font-display text-[#F5F1E8] border-b border-[#D4AF37]/15 pb-3">
              {language === 'ar' ? 'بيانات التواصل الرسمية' : 'Headquarters & Channels'}
            </h2>

            <div className="space-y-4 text-xs text-[#B6B0A4]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#F5F1E8] block mb-0.5">
                    {language === 'ar' ? 'عنوان الإدارة / المعرض:' : 'Boutique Location:'}
                  </span>
                  <p>
                    {language === 'ar'
                      ? storeSettings.contact.boutiqueAddressAr
                      : storeSettings.contact.boutiqueAddressEn}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#F5F1E8] block mb-0.5">
                    {language === 'ar' ? 'الهاتف المباشر:' : 'Phone Line:'}
                  </span>
                  <p dir="ltr">{storeSettings.contact.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#F5F1E8] block mb-0.5">
                    {language === 'ar' ? 'البريد الإلكتروني:' : 'Email Address:'}
                  </span>
                  <p>{storeSettings.contact.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#F5F1E8] block mb-0.5">
                    {language === 'ar' ? 'ساعات العمل الرسمية:' : 'Customer Care Hours:'}
                  </span>
                  <p>
                    {language === 'ar'
                      ? storeSettings.contact.workingHoursAr
                      : storeSettings.contact.workingHoursEn}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#0a0a0a] rounded-xl border border-[#222] text-[11px] text-[#888]">
              {language === 'ar'
                ? '* تنويه: الأرقام والعناوين أعلاه عبارة عن قيم تجريبية قابلة للتعديل عبر ملف إعدادات المتجر (storeSettings.ts).'
                : '* Note: Contact values above are configurable demo placeholders in storeSettings.ts.'}
            </div>
          </div>
        </div>

        {/* Contact Form (Col 7) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D4AF37]/25 space-y-4 shadow-xl"
          >
            <h2 className="text-base font-bold font-display text-[#F5F1E8] border-b border-[#D4AF37]/15 pb-3">
              {language === 'ar' ? 'أرسل لنا رسالة مباشرة' : 'Send Direct Inquiry'}
            </h2>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#F5F1E8] block">{t('fullName')} *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل اسمك' : 'Your name'}
                className="w-full bg-[#0a0a0a] border border-[#D4AF37]/30 text-xs text-[#F5F1E8] px-3.5 py-3 rounded-xl focus:outline-none focus:border-[#D4AF37] min-h-[44px]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#F5F1E8] block">
                {t('phoneNumber')}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01012345678"
                className="w-full bg-[#0a0a0a] border border-[#D4AF37]/30 text-xs text-[#F5F1E8] px-3.5 py-3 rounded-xl focus:outline-none focus:border-[#D4AF37] min-h-[44px]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#F5F1E8] block">
                {language === 'ar' ? 'نص الرسالة أو الاستفسار' : 'Message'} *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  language === 'ar'
                    ? 'اكتب استفسارك عن العطور أو الشحن هنا...'
                    : 'Your message regarding fragrances or orders...'
                }
                className="w-full bg-[#0a0a0a] border border-[#D4AF37]/30 text-xs text-[#F5F1E8] px-3.5 py-3 rounded-xl focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-xs rounded-xl tracking-wider transition-colors flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
            </button>

            {submitted && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'شكراً لتواصلك! تم استلام رسالتك وسيتم الرد عليك في أقرب وقت.'
                    : 'Thank you! Your message has been received and our team will get in touch.'}
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
