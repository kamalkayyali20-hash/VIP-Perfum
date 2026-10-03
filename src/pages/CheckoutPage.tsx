import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Copy,
  Check,
  AlertCircle,
  Upload,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  CreditCard,
  Building2,
  FileCheck,
  Banknote,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { EGYPT_GOVERNORATES } from '../config/storeSettings';
import { formatCurrency } from '../utils/currency';
import { PaymentMethod, ShippingAddress } from '../types';
import { uploadService } from '../services';

export const CheckoutPage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const {
    cart,
    cartPackages,
    cartGifts,
    subtotal,
    packagesTotal,
    shippingFee,
    finalTotal,
    selectedGovernorateId,
    setSelectedGovernorateId,
    storeSettings,
    createOrder,
    submitPaymentVerification,
    isGiftSelectionSatisfied,
  } = useStore();

  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Form Fields
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    phoneNumber: '',
    governorate: selectedGovernorateId,
    cityArea: '',
    streetAndBuilding: '',
    apartmentFloor: '',
    orderNotes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash_on_delivery');
  const [transferReference, setTransferReference] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

  // UI state
  const [copiedHandle, setCopiedHandle] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Check if store has configured recipient for selected method
  const isSelectedMethodConfigured =
    paymentMethod === 'instapay'
      ? storeSettings.paymentRecipients.instapay.isConfigured
      : paymentMethod === 'mobile_wallet'
      ? storeSettings.paymentRecipients.mobileWallet.isConfigured
      : storeSettings.paymentRecipients.cashOnDelivery.isAvailable;

  // Copy helper
  const handleCopy = (text: string, type: 'handle' | 'wallet') => {
    navigator.clipboard.writeText(text);
    if (type === 'handle') {
      setCopiedHandle(true);
      setTimeout(() => setCopiedHandle(false), 2000);
    } else {
      setCopiedWallet(true);
      setTimeout(() => setCopiedWallet(false), 2000);
    }
  };

  // Screenshot upload validation
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadService.validateAndPrepareScreenshot(file);
      setScreenshotFile(file);
      setScreenshotPreview(result.previewUrl);
    } catch (err: any) {
      setUploadError(err.message || 'خطأ في معالجة ملف الصورة');
      setScreenshotFile(null);
      setScreenshotPreview(null);
    }
  };

  // Form Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = language === 'ar' ? 'الاسم مطلوب' : 'Full name is required';
    }

    // Egyptian phone number format: e.g. 010..., 011..., 012..., 015... (11 digits)
    const phoneClean = formData.phoneNumber.replace(/[\s-]/g, '');
    const egyptPhoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    if (!phoneClean) {
      errors.phoneNumber =
        language === 'ar' ? 'رقم الموبايل المصري مطلوب' : 'Egyptian phone number required';
    } else if (!egyptPhoneRegex.test(phoneClean) && !/^\+20(10|11|12|15)[0-9]{8}$/.test(phoneClean)) {
      errors.phoneNumber =
        language === 'ar'
          ? 'يرجى إدخال رقم موبايل مصري صحيح (مثال: 01012345678)'
          : 'Please enter a valid 11-digit Egyptian phone (e.g. 01012345678)';
    }

    if (!formData.cityArea.trim()) {
      errors.cityArea = language === 'ar' ? 'المدينة أو المنطقة مطلوبة' : 'City/area is required';
    }

    if (!formData.streetAndBuilding.trim()) {
      errors.streetAndBuilding =
        language === 'ar'
          ? 'تفاصيل الشارع ورقم العمارة مطلوبة'
          : 'Street and building details required';
    }

    // Check payment config blockage
    if (!isSelectedMethodConfigured) {
      errors.payment =
        language === 'ar'
          ? 'حساب الدفع غير مهيأ في إعدادات المتجر حالياً. لا يمكن المتابعة.'
          : 'Store payment recipient is not configured. Submission blocked.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create order in store
      const order = await createOrder(formData, paymentMethod);

      // 2. If customer supplied reference or screenshot, submit for verification
      if (transferReference.trim() || screenshotPreview) {
        await submitPaymentVerification(order.id, {
          method: paymentMethod,
          transferReference: transferReference.trim() || 'SUBMITTED_WITHOUT_REF',
          screenshotUrl: screenshotPreview || undefined,
          screenshotName: screenshotFile?.name,
          submittedAt: new Date().toISOString(),
        });
      }

      // Navigate to order confirmation
      navigate(`/order-confirmation/${order.id}`);
    } catch (err: any) {
      setValidationErrors((prev) => ({
        ...prev,
        submit: err.message || 'حدث خطأ أثناء تسجيل الطلب.',
      }));
      setIsSubmitting(false);
    }
  };

  const isCartEmpty = cart.length === 0 && cartPackages.length === 0;

  if (isCartEmpty) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-display text-[#F5F1E8]">
          {language === 'ar' ? 'السلة فارغة' : 'Your Cart is Empty'}
        </h2>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-3 bg-[#D4AF37] text-[#080808] font-bold text-xs rounded-xl"
        >
          {t('continueShopping')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* Left Column: Delivery and Payment Details (Col 8) */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F1E8] mb-1.5">
              {t('checkoutTitle')}
            </h1>
            <p className="text-xs text-[#B6B0A4]">
              {language === 'ar'
                ? 'شحن سريع ومباشر داخل كافة محافظات جمهورية مصر العربية'
                : 'Direct and swift delivery across all Egyptian governorates'}
            </p>
          </div>

          {/* 1. Recipient Details Box */}
          <div className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D4AF37]/25 space-y-5 sm:space-y-6">
            <h2 className="text-sm sm:text-base font-bold font-display text-[#F5F1E8] flex items-center gap-2 border-b border-[#D4AF37]/15 pb-3">
              <Building2 className="w-4 h-4 text-[#D4AF37]" />
              <span>{t('contactInfo')}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Full Name */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-[#F5F1E8] block">
                  {t('fullName')} *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder={language === 'ar' ? 'أدخل اسمك الثلاثي' : 'Full recipient name'}
                  className="w-full bg-[#0a0a0a] border border-[#D4AF37]/30 text-xs text-[#F5F1E8] px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-[#D4AF37] min-h-[44px]"
                />
                {validationErrors.fullName && (
                  <span className="text-[11px] text-red-400 block">{validationErrors.fullName}</span>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-[#F5F1E8] block">
                  {t('phoneNumber')} *
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="01012345678"
                  className="w-full bg-[#0a0a0a] border border-[#D4AF37]/30 text-xs text-[#F5F1E8] px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-[#D4AF37] min-h-[44px]"
                />
                {validationErrors.phoneNumber && (
                  <span className="text-[11px] text-red-400 block">{validationErrors.phoneNumber}</span>
                )}
              </div>

              {/* Governorate */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#F5F1E8] block">
                  {t('governorate')} *
                </label>
                <select
                  value={formData.governorate}
                  onChange={(e) => {
                    const gov = e.target.value;
                    setFormData({ ...formData, governorate: gov });
                    setSelectedGovernorateId(gov);
                  }}
                  className="w-full bg-[#0a0a0a] border border-[#D4AF37]/30 text-xs text-[#F5F1E8] px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-[#D4AF37] min-h-[44px]"
                >
                  {EGYPT_GOVERNORATES.map((gov) => (
                    <option key={gov.id} value={gov.id}>
                      {language === 'ar' ? gov.nameAr : gov.nameEn} ({formatCurrency(gov.shippingFee, language)})
                    </option>
                  ))}
                </select>
              </div>

              {/* City / Area */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#F5F1E8] block">
                  {t('cityArea')} *
                </label>
                <input
                  type="text"
                  value={formData.cityArea}
                  onChange={(e) => setFormData({ ...formData, cityArea: e.target.value })}
                  placeholder={language === 'ar' ? 'التجمع الخامس / سموحة / المنصورة...' : 'District / Area'}
                  className="w-full bg-[#0a0a0a] border border-[#D4AF37]/30 text-xs text-[#F5F1E8] px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-[#D4AF37] min-h-[44px]"
                />
                {validationErrors.cityArea && (
                  <span className="text-[11px] text-red-400 block">{validationErrors.cityArea}</span>
                )}
              </div>

              {/* Street and Building */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-[#F5F1E8] block">
                  {t('streetAndBuilding')} *
                </label>
                <input
                  type="text"
                  value={formData.streetAndBuilding}
                  onChange={(e) => setFormData({ ...formData, streetAndBuilding: e.target.value })}
                  placeholder={language === 'ar' ? 'الشارع، رقم العمارة، بجوار...' : 'Street name, building no., landmark'}
                  className="w-full bg-[#0a0a0a] border border-[#D4AF37]/30 text-xs text-[#F5F1E8] px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-[#D4AF37] min-h-[44px]"
                />
                {validationErrors.streetAndBuilding && (
                  <span className="text-[11px] text-red-400 block">{validationErrors.streetAndBuilding}</span>
                )}
              </div>

              {/* Apartment and Floor */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-[#B6B0A4] block">
                  {t('apartmentFloor')}
                </label>
                <input
                  type="text"
                  value={formData.apartmentFloor || ''}
                  onChange={(e) => setFormData({ ...formData, apartmentFloor: e.target.value })}
                  placeholder={language === 'ar' ? 'شقة 4، الدور الثالث (اختياري)' : 'Apartment 4, Floor 3 (optional)'}
                  className="w-full bg-[#0a0a0a] border border-[#D4AF37]/20 text-xs text-[#F5F1E8] px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-[#D4AF37] min-h-[44px]"
                />
              </div>

              {/* Order Notes */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-[#B6B0A4] block">
                  {t('orderNotes')}
                </label>
                <textarea
                  rows={2}
                  value={formData.orderNotes || ''}
                  onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                  placeholder={language === 'ar' ? 'أي ملاحظات خاصة بالتوصيل...' : 'Special delivery instructions...'}
                  className="w-full bg-[#0a0a0a] border border-[#D4AF37]/20 text-xs text-[#F5F1E8] px-3 sm:px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Section */}
          <div className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D4AF37]/25 space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-[#D4AF37]/15 pb-3">
              <h2 className="text-sm sm:text-base font-bold font-display text-[#F5F1E8] flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                <span>{t('paymentMethodTitle')}</span>
              </h2>
              <span className="text-[11px] text-[#D4AF37] font-medium">
                {language === 'ar' ? 'دفع آمن وموثوق 100%' : '100% Secure & Trusted'}
              </span>
            </div>

            {/* Payment Method Switcher (Cash on Delivery FIRST, then InstaPay, then Mobile Wallet) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 1. Cash on Delivery (Featured & Default) */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cash_on_delivery')}
                className={`p-3.5 sm:p-4 rounded-xl border text-start transition-all min-h-[48px] relative overflow-hidden ${
                  paymentMethod === 'cash_on_delivery'
                    ? 'bg-[#1e1b12] border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-lg'
                    : 'bg-[#0a0a0a] border-[#D4AF37]/25 hover:border-[#D4AF37]/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] shrink-0 mt-0.5">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-xs text-[#F5F1E8]">{t('payCashOnDelivery')}</h3>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
                      {t('codBadge')}
                    </span>
                    <span className="text-[10px] text-[#B6B0A4] mt-0.5 block">
                      {language === 'ar' ? 'ادفع كاش للمندوب عند الاستلام' : 'Cash upon delivery'}
                    </span>
                  </div>
                </div>
              </button>

              {/* 2. InstaPay */}
              <button
                type="button"
                onClick={() => setPaymentMethod('instapay')}
                className={`p-3.5 sm:p-4 rounded-xl border text-start transition-all min-h-[48px] ${
                  paymentMethod === 'instapay'
                    ? 'bg-[#1e1b12] border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-lg'
                    : 'bg-[#0a0a0a] border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] shrink-0 mt-0.5">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-xs text-[#F5F1E8]">{t('payInstaPay')}</h3>
                    <span className="text-[10px] text-[#D4AF37] font-medium mt-1 block">
                      {language === 'ar' ? 'تحويل IPA فوري' : 'Instant IPA'}
                    </span>
                    <span className="text-[10px] text-[#B6B0A4] mt-0.5 block">
                      {language === 'ar' ? 'تحويل بنكي بالهاتف' : 'Bank IPA Handle'}
                    </span>
                  </div>
                </div>
              </button>

              {/* 3. Mobile Wallet */}
              <button
                type="button"
                onClick={() => setPaymentMethod('mobile_wallet')}
                className={`p-3.5 sm:p-4 rounded-xl border text-start transition-all min-h-[48px] ${
                  paymentMethod === 'mobile_wallet'
                    ? 'bg-[#1e1b12] border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-lg'
                    : 'bg-[#0a0a0a] border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] shrink-0 mt-0.5">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-xs text-[#F5F1E8]">{t('payMobileWallet')}</h3>
                    <span className="text-[10px] text-[#D4AF37] font-medium mt-1 block">
                      {language === 'ar' ? 'فودافون كاش والمحافظ' : 'Vodafone/Telco'}
                    </span>
                    <span className="text-[10px] text-[#B6B0A4] mt-0.5 block">
                      {language === 'ar' ? 'فودافون، أورنج، وي، اتصالات' : 'Mobile Wallets'}
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Cash on Delivery Comprehensive Details */}
            {paymentMethod === 'cash_on_delivery' && (
              <div className="p-3.5 sm:p-5 rounded-xl bg-gradient-to-b from-[#141814] to-[#0a0a0a] border border-[#D4AF37]/40 space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
                    <Banknote className="w-4 h-4" />
                    <span className="font-bold">{t('payCashOnDelivery')}</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 rounded-full text-[10px] font-bold">
                    {t('codBadge')}
                  </span>
                </div>

                <p className="text-xs text-[#F5F1E8] leading-relaxed">
                  {t('codDescription')}
                </p>

                {/* Amount to deliver in cash */}
                <div className="p-3.5 bg-[#101010] rounded-xl border border-[#D4AF37]/25 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#B6B0A4]">
                    <span>{t('codFeeLabel')}</span>
                    <span className="text-emerald-400 font-bold">{t('codFreeText')}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#222]">
                    <span className="text-xs text-[#F5F1E8] font-semibold">
                      {language === 'ar' ? 'المبلغ المطلوب تسليمه كاش للمندوب:' : 'Total Cash Due on Delivery:'}
                    </span>
                    <span className="font-mono font-bold text-lg text-[#D4AF37] tabular-nums">
                      {formatCurrency(finalTotal, language)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-[#0e120e] border border-emerald-900/40 text-[11px] text-[#ccc] leading-relaxed flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{t('codVerificationNotice')}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#141414] border border-[#222] text-[11px] text-[#999] leading-relaxed flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>
                      {language === 'ar'
                        ? 'تأكيد فوري دون الحاجة لرفع إيصالات أو إجراء تحويلات إلكترونية الآن.'
                        : 'Instant order confirmation without uploading transfer slips or advance online charges.'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Recipient Details & Working Copy Button for Electronic Transfer */}
            {paymentMethod !== 'cash_on_delivery' && isSelectedMethodConfigured && (
              <div className="p-4 sm:p-5 rounded-xl bg-[#0a0a0a] border border-[#D4AF37]/35 space-y-4">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block">
                  {t('recipientDetailsTitle')}
                </span>

                {paymentMethod === 'instapay' ? (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#121212] rounded-lg border border-[#222]">
                      <div>
                        <span className="text-[11px] text-[#B6B0A4] block">{t('accountHandle')}:</span>
                        <span className="font-mono text-sm font-bold text-[#F5F1E8]" dir="ltr">
                          {storeSettings.paymentRecipients.instapay.accountHandle}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(storeSettings.paymentRecipients.instapay.accountHandle, 'handle')
                        }
                        className="px-3 py-1.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto min-h-[36px]"
                      >
                        {copiedHandle ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedHandle ? t('copiedText') : t('copyBtn')}</span>
                      </button>
                    </div>

                    <div className="text-xs text-[#B6B0A4] space-y-1">
                      <p>
                        <span className="text-[#F5F1E8] font-medium">
                          {language === 'ar' ? 'اسم المستلم:' : 'Recipient Name:'}{' '}
                        </span>
                        {language === 'ar'
                          ? storeSettings.paymentRecipients.instapay.accountHolderNameAr
                          : storeSettings.paymentRecipients.instapay.accountHolderNameEn}
                      </p>
                      <p className="text-[11px] text-[#888]">
                        {language === 'ar'
                          ? storeSettings.paymentRecipients.instapay.instructionsAr
                          : storeSettings.paymentRecipients.instapay.instructionsEn}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#121212] rounded-lg border border-[#222]">
                      <div>
                        <span className="text-[11px] text-[#B6B0A4] block">
                          {t('walletNumberLabel')}:
                        </span>
                        <span className="font-mono text-sm font-bold text-[#F5F1E8]" dir="ltr">
                          {storeSettings.paymentRecipients.mobileWallet.walletNumber}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(storeSettings.paymentRecipients.mobileWallet.walletNumber, 'wallet')
                        }
                        className="px-3 py-1.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto min-h-[36px]"
                      >
                        {copiedWallet ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedWallet ? t('copiedText') : t('copyBtn')}</span>
                      </button>
                    </div>

                    <div className="text-xs text-[#B6B0A4] space-y-1">
                      <p>
                        <span className="text-[#F5F1E8] font-medium">
                          {language === 'ar' ? 'المحافظ المدعومة:' : 'Supported Providers:'}{' '}
                        </span>
                        {language === 'ar'
                          ? storeSettings.paymentRecipients.mobileWallet.walletProviderAr
                          : storeSettings.paymentRecipients.mobileWallet.walletProviderEn}
                      </p>
                      <p className="text-[11px] text-[#888]">
                        {language === 'ar'
                          ? storeSettings.paymentRecipients.mobileWallet.instructionsAr
                          : storeSettings.paymentRecipients.mobileWallet.instructionsEn}
                      </p>
                    </div>
                  </div>
                )}

                {/* Amount Due Indicator */}
                <div className="p-3 bg-[#151515] rounded-lg border border-[#D4AF37]/20 flex items-center justify-between">
                  <span className="text-xs text-[#B6B0A4]">{t('amountToTransfer')}:</span>
                  <span className="font-mono font-bold text-base text-[#D4AF37] tabular-nums">
                    {formatCurrency(finalTotal, language)}
                  </span>
                </div>
              </div>
            )}

            {paymentMethod !== 'cash_on_delivery' && !isSelectedMethodConfigured && (
              <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold block">{t('paymentConfigMissingError')}</span>
                  <p className="text-[11px] text-red-300/80">
                    {language === 'ar'
                      ? 'تم تعطيل إتمام الطلب لأن إعدادات حساب الدفع غير مهيأة بعد من إدارة المتجر.'
                      : 'Order submission is disabled until payment accounts are configured in store settings.'}
                  </p>
                </div>
              </div>
            )}

            {/* Transfer Reference & Screenshot Upload (Only needed for electronic transfers) */}
            {paymentMethod !== 'cash_on_delivery' && (
              <div className="space-y-4 pt-2 border-t border-[#D4AF37]/15">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#F5F1E8] block">
                    {t('transferRefLabel')}
                  </label>
                  <input
                    type="text"
                    value={transferReference}
                    onChange={(e) => setTransferReference(e.target.value)}
                    placeholder={t('transferRefPlaceholder')}
                    className="w-full bg-[#0a0a0a] border border-[#D4AF37]/30 text-xs text-[#F5F1E8] px-3.5 py-3 rounded-xl focus:outline-none focus:border-[#D4AF37] min-h-[44px]"
                  />
                </div>

                {/* Optional Screenshot */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#B6B0A4] block">
                    {t('uploadProofLabel')}
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <label className="cursor-pointer px-4 py-2.5 bg-[#171717] hover:bg-[#202020] text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 min-h-[44px]">
                      <Upload className="w-4 h-4" />
                      <span>{t('chooseFile')}</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    {screenshotFile && (
                      <span className="text-xs text-emerald-400 font-medium truncate max-w-xs">
                        {screenshotFile.name} ({(screenshotFile.size / 1024).toFixed(0)} KB)
                      </span>
                    )}
                  </div>

                  {uploadError && (
                    <span className="text-[11px] text-red-400 block">{uploadError}</span>
                  )}

                  {/* Screenshot thumbnail preview */}
                  {screenshotPreview && (
                    <div className="mt-2 w-28 h-28 rounded-lg overflow-hidden border border-[#D4AF37]/40 bg-[#080808]">
                      <img
                        src={screenshotPreview}
                        alt="Payment screenshot"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Crucial Payment Audit Notice */}
                <div className="p-3.5 rounded-xl bg-[#0e0e0e] border border-[#333] text-xs text-[#999] leading-relaxed flex items-start gap-2.5">
                  <FileCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{t('paymentNoticeText')}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Checkout Summary (Sticky) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D4AF37]/35 space-y-5 shadow-2xl sticky top-28">
            <h2 className="text-base sm:text-lg font-bold font-display text-[#F5F1E8] border-b border-[#D4AF37]/15 pb-3 flex items-center justify-between">
              <span>{language === 'ar' ? 'محتويات طلبك' : 'Order Overview'}</span>
              <span className="text-xs text-[#D4AF37] font-mono">
                {cart.reduce((s, i) => s + i.quantity, 0) + cartPackages.length} {language === 'ar' ? 'عناصر' : 'items'}
              </span>
            </h2>

            {/* Compact items list */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 text-xs">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-[#B6B0A4]">
                  <span className="truncate max-w-[170px]">
                    {item.quantity} × {language === 'ar' ? item.nameAr : item.nameEn} ({item.size})
                  </span>
                  <span className="font-mono text-[#F5F1E8] tabular-nums">
                    {formatCurrency(item.price * item.quantity, language)}
                  </span>
                </div>
              ))}

              {cartPackages.map((pkg) => (
                <div key={pkg.id} className="flex items-center justify-between text-[#B6B0A4]">
                  <span className="truncate max-w-[170px]">
                    1 × {language === 'ar' ? pkg.nameAr : pkg.nameEn}
                  </span>
                  <span className="font-mono text-[#F5F1E8] tabular-nums">
                    {formatCurrency(pkg.price * pkg.quantity, language)}
                  </span>
                </div>
              ))}

              {cartGifts.map((gift) => (
                <div key={gift.id} className="flex items-center justify-between text-emerald-400">
                  <span className="truncate max-w-[170px]">
                    🎁 {gift.quantity} × {language === 'ar' ? gift.nameAr : gift.nameEn} ({gift.size})
                  </span>
                  <span className="font-mono font-bold">0 {language === 'ar' ? 'ج.م' : 'EGP'}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs pt-3 border-t border-[#D4AF37]/15">
              <div className="flex items-center justify-between text-[#B6B0A4]">
                <span>{t('subtotal')}</span>
                <span className="font-mono text-[#F5F1E8] tabular-nums">
                  {formatCurrency(subtotal + packagesTotal, language)}
                </span>
              </div>

              <div className="flex items-center justify-between text-[#B6B0A4]">
                <span>{t('shipping')}</span>
                <span className="font-mono text-[#F5F1E8] tabular-nums">
                  {formatCurrency(shippingFee, language)}
                </span>
              </div>

              {/* Payment Method Badge */}
              <div className="flex items-center justify-between text-xs py-1 border-y border-[#222]">
                <span className="text-[#B6B0A4]">{language === 'ar' ? 'طريقة الدفع:' : 'Payment:'}</span>
                <span className="font-semibold text-[#D4AF37] flex items-center gap-1">
                  {paymentMethod === 'cash_on_delivery' ? (
                    <>
                      <Banknote className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t('payCashOnDelivery')}</span>
                    </>
                  ) : paymentMethod === 'instapay' ? (
                    <>
                      <Smartphone className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{t('payInstaPay')}</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{t('payMobileWallet')}</span>
                    </>
                  )}
                </span>
              </div>

              {paymentMethod === 'cash_on_delivery' && (
                <div className="flex items-center justify-between text-[11px] text-emerald-400">
                  <span>{t('codFeeLabel')}</span>
                  <span className="font-bold">{t('codFreeText')}</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#D4AF37]/15 flex items-center justify-between">
                <span className="text-sm font-bold text-[#F5F1E8]">{t('total')}</span>
                <span className="text-xl font-bold font-mono text-[#D4AF37] tabular-nums">
                  {formatCurrency(finalTotal, language)}
                </span>
              </div>
            </div>

            {validationErrors.payment && (
              <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-xl text-xs text-red-300">
                {validationErrors.payment}
              </div>
            )}

            {validationErrors.submit && (
              <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-xl text-xs text-red-300">
                {validationErrors.submit}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !isSelectedMethodConfigured}
              className={`w-full py-3.5 sm:py-4 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 min-h-[48px] ${
                isSubmitting || !isSelectedMethodConfigured
                  ? 'bg-[#222] text-[#666] cursor-not-allowed border border-[#333]'
                  : 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808]'
              }`}
            >
              {isSubmitting ? (
                <span>{language === 'ar' ? 'جاري تسجيل الطلب...' : 'Processing...'}</span>
              ) : paymentMethod === 'cash_on_delivery' ? (
                <>
                  <Banknote className="w-4 h-4 shrink-0" />
                  <span>{t('confirmOrderCodBtn')}</span>
                  <ArrowIcon className="w-4 h-4 shrink-0" />
                </>
              ) : (
                <>
                  <span>{t('confirmOrderBtn')}</span>
                  <ArrowIcon className="w-4 h-4 shrink-0" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
