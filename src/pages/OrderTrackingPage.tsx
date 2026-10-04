import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Package,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  Upload,
  CreditCard,
  Smartphone,
  Copy,
  Check,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/currency';
import { Order } from '../types';
import { uploadService } from '../services';

export const OrderTrackingPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const { getOrderById, submitPaymentVerification, storeSettings } = useStore();

  const [orderNumberInput, setOrderNumberInput] = useState(searchParams.get('orderId') || '');
  const [verificationInput, setVerificationInput] = useState(searchParams.get('token') || '');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Late payment submission inside tracking page
  const [transferRef, setTransferRef] = useState('');
  const [paymentScreenshotFile, setPaymentScreenshotFile] = useState<File | null>(null);
  const [paymentScreenshotPreview, setPaymentScreenshotPreview] = useState<string | null>(null);
  const [isSubmittingProof, setIsSubmittingProof] = useState(false);
  const [proofSuccess, setProofSuccess] = useState(false);
  const [copiedHandle, setCopiedHandle] = useState(false);

  // Auto-search if query params present
  useEffect(() => {
    const qOrder = searchParams.get('orderId');
    const qToken = searchParams.get('token');
    if (qOrder) {
      setOrderNumberInput(qOrder);
      if (qToken) setVerificationInput(qToken);
      performSearch(qOrder, qToken || undefined);
    }
  }, [searchParams]);

  const performSearch = async (id: string, tokenOrPhone?: string) => {
    setSearchError(null);
    setHasSearched(true);
    if (!id.trim()) {
      setSearchError(
        language === 'ar' ? 'يرجى إدخال رقم الطلب' : 'Please provide the order number'
      );
      setFoundOrder(null);
      return;
    }

    const order = await getOrderById(id.trim(), tokenOrPhone?.trim() || undefined);
    if (!order) {
      setSearchError(
        language === 'ar'
          ? 'لم يتم العثور على طلب بهذا الرقم أو أن رمز التحقق / رقم الموبايل غير متطابق.'
          : 'No order matched this ID or the security token/mobile number did not match.'
      );
      setFoundOrder(null);
    } else {
      setFoundOrder(order);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(orderNumberInput, verificationInput);
  };

  const handleProofFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await uploadService.validateAndPrepareScreenshot(file);
      setPaymentScreenshotFile(file);
      setPaymentScreenshotPreview(res.previewUrl);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLateProofSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!foundOrder || (!transferRef.trim() && !paymentScreenshotPreview)) return;

    setIsSubmittingProof(true);
    try {
      const updated = await submitPaymentVerification(foundOrder.id, {
        method: foundOrder.paymentMethod,
        transferReference: transferRef.trim() || 'SUBMITTED_FROM_TRACKING',
        screenshotUrl: paymentScreenshotPreview || undefined,
        screenshotName: paymentScreenshotFile?.name,
        submittedAt: new Date().toISOString(),
      });
      setFoundOrder(updated);
      setProofSuccess(true);
      setTimeout(() => setProofSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingProof(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F1E8]">
          {t('trackOrderPageTitle')}
        </h1>
        <p className="text-xs text-[#B6B0A4] max-w-lg mx-auto">
          {language === 'ar'
            ? 'استعلم عن حالة شحنتك وموقف الدفع عبر رقم الطلب ورمز التتبع السري أو رقم الموبايل.'
            : 'Track your fragrance parcel and verification status using your Order ID and secure token.'}
        </p>
      </div>

      {/* Demo Disclosure Box */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-[#121212] border border-[#D4AF37]/25 text-xs flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
        <div className="text-[#B6B0A4] leading-relaxed">
          <span className="font-semibold text-[#D4AF37]">
            {language === 'ar' ? 'أمان التتبع في النسخة التجريبية: ' : 'Production Tracking Security: '}
          </span>
          {language === 'ar'
            ? 'تطبيقاً لمبدأ الخصوصية الصارمة، لا يتم عرض تفاصيل الطلبات بناءً على رقم الطلب المتسلسل فقط، بل يتطلب رمز تتبع خاص أو رقم الموبايل المسجل لمنع الاطلاع على بيانات العملاء.'
            : 'To uphold strict customer privacy, tracking requires an order ID paired with private token or registered phone number.'}
        </div>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearchSubmit}
        className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D4AF37]/30 space-y-4 shadow-xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#F5F1E8] block">
              {t('orderNumberLabel')} *
            </label>
            <input
              type="text"
              value={orderNumberInput}
              onChange={(e) => setOrderNumberInput(e.target.value)}
              placeholder="VIP-EG-2026-XXXX"
              className="w-full bg-[#080808] border border-[#D4AF37]/30 text-xs text-[#F5F1E8] px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-[#D4AF37] min-h-[44px]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#F5F1E8] block">
              {language === 'ar' ? 'رمز التتبع السري أو الموبايل' : 'Token or Phone'}
            </label>
            <input
              type="text"
              value={verificationInput}
              onChange={(e) => setVerificationInput(e.target.value)}
              placeholder={language === 'ar' ? 'رمز التتبع أو رقم الموبايل' : 'Private token or 010...'}
              className="w-full bg-[#080808] border border-[#D4AF37]/30 text-xs text-[#F5F1E8] px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-[#D4AF37] min-h-[44px]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 sm:py-3.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-xs rounded-xl tracking-wider transition-colors flex items-center justify-center gap-2 min-h-[44px]"
        >
          <Search className="w-4 h-4" />
          <span>{t('lookupBtn')}</span>
        </button>

        {searchError && (
          <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{searchError}</span>
          </div>
        )}
      </form>

      {/* Found Order Card */}
      {foundOrder && (
        <div className="space-y-4 sm:space-y-6">
          {/* Cash on Delivery Notice for Found Order */}
          {foundOrder.paymentMethod === 'cash_on_delivery' && (
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#172018] via-[#131a14] to-[#121212] border border-emerald-500/40 shadow-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'طلبك معتمد بنظام الدفع عند الاستلام (كاش للمندوب)'
                    : 'Order Confirmed via Cash on Delivery'}
                </span>
              </div>
              <p className="text-xs text-[#d1d5db] leading-relaxed">
                {language === 'ar'
                  ? `المبلغ المطلوب تسليمه نقداً لمندوب شركة الشحن عند الاستلام هو ${formatCurrency(foundOrder.total, language)}. لا يلزم إجراء أي تحويلات إلكترونية أو إرسال إيصالات.`
                  : `Total cash due to courier upon package delivery: ${formatCurrency(foundOrder.total, language)}. No bank transfer or receipt upload is required.`}
              </p>
            </div>
          )}

          {/* Header Summary */}
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D4AF37]/35 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-[#D4AF37]/15 pb-4">
              <div>
                <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider block">
                  {t('orderNumberLabel')}:
                </span>
                <span className="font-mono text-lg sm:text-xl font-bold text-[#F5F1E8]">{foundOrder.id}</span>
                <span className="text-xs text-[#B6B0A4] block mt-0.5">
                  {new Date(foundOrder.createdAt).toLocaleDateString(
                    language === 'ar' ? 'ar-EG' : 'en-EG',
                    { dateStyle: 'long' }
                  )}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="text-xs">
                  <span className="text-[#B6B0A4] block text-[10px]">{t('paymentStatusLabel')}:</span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded inline-block ${
                      foundOrder.paymentStatus === 'verified'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                        : foundOrder.paymentStatus === 'submitted_for_verification'
                        ? 'bg-amber-950/60 text-amber-300 border border-amber-500/40'
                        : foundOrder.paymentStatus === 'awaiting_cod'
                        ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/50'
                        : 'bg-[#222] text-[#B6B0A4]'
                    }`}
                  >
                    {t(`status_${foundOrder.paymentStatus}` as any)}
                  </span>
                </div>

                <div className="text-xs">
                  <span className="text-[#B6B0A4] block text-[10px]">{t('fulfilmentStatusLabel')}:</span>
                  <span className="font-semibold px-2 py-0.5 rounded inline-block bg-[#171717] text-[#D4AF37] border border-[#D4AF37]/30">
                    {t(`status_${foundOrder.fulfilmentStatus}` as any)}
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline History */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-[#F5F1E8] block">
                {language === 'ar' ? 'سجل تحديثات الطلب:' : 'Order Timeline & History:'}
              </span>
              <div className="space-y-2 border-s-2 border-[#D4AF37]/30 ms-2 ps-4">
                {foundOrder.statusHistory.map((step, idx) => (
                  <div key={idx} className="relative pb-2 text-xs">
                    <span className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                    <span className="text-[10px] font-mono text-[#888] block">
                      {new Date(step.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <p className="text-[#F5F1E8] font-medium mt-0.5">
                      {language === 'ar' ? step.noteAr : step.noteEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Late Proof Submission if awaiting transfer */}
          {foundOrder.paymentStatus === 'awaiting_transfer' && (
            <form
              onSubmit={handleLateProofSubmit}
              className="p-6 rounded-2xl bg-[#171511] border border-[#D4AF37]/45 space-y-4"
            >
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>
                  {language === 'ar'
                    ? 'طلبك بانتظار تحويل الدفعة أو إرفاق إشعار الدفع'
                    : 'Order is awaiting payment transfer evidence'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-[#F5F1E8] block">{t('transferRefLabel')}</label>
                  <input
                    type="text"
                    value={transferRef}
                    onChange={(e) => setTransferRef(e.target.value)}
                    placeholder={t('transferRefPlaceholder')}
                    className="w-full bg-[#0a0a0a] border border-[#D4AF37]/30 text-xs text-[#F5F1E8] px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#D4AF37] min-h-[44px]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#F5F1E8] block">{t('uploadProofLabel')}</label>
                  <label className="cursor-pointer px-4 py-2.5 bg-[#0a0a0a] hover:bg-[#202020] text-[#D4AF37] border border-[#D4AF37]/30 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 min-h-[44px]">
                    <Upload className="w-4 h-4" />
                    <span>{t('chooseFile')}</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleProofFileChange}
                      className="hidden"
                    />
                  </label>
                  {paymentScreenshotFile && (
                    <span className="text-[11px] text-emerald-400 block truncate">
                      {paymentScreenshotFile.name}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingProof || (!transferRef.trim() && !paymentScreenshotPreview)}
                className="w-full py-3 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-xs rounded-xl transition-colors disabled:opacity-50 min-h-[44px]"
              >
                {isSubmittingProof
                  ? language === 'ar'
                    ? 'جاري إرسال الإشعار...'
                    : 'Submitting...'
                  : language === 'ar'
                  ? 'إرسال بيانات الدفع للتحقق'
                  : 'Submit Payment Evidence'}
              </button>

              {proofSuccess && (
                <div className="p-2 bg-emerald-950/60 border border-emerald-500/40 rounded text-xs text-emerald-300 text-center">
                  {language === 'ar'
                    ? 'تم تقديم إشعار الدفع بنجاح وهو قيد المراجعة!'
                    : 'Payment evidence submitted and undergoing review!'}
                </div>
              )}
            </form>
          )}

          {/* Ordered Items and Totals */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#D4AF37]/20 space-y-4">
            <h3 className="font-bold text-sm text-[#F5F1E8] font-display border-b border-[#222] pb-2">
              {language === 'ar' ? 'العطور المطلوبة والهدايا' : 'Purchased Perfumes & Free Gifts'}
            </h3>

            <div className="space-y-2 text-xs">
              {foundOrder.items.map((it) => (
                <div key={it.id} className="flex justify-between text-[#B6B0A4]">
                  <span>
                    {it.quantity} × {language === 'ar' ? it.nameAr : it.nameEn} ({it.size}{it.concentration ? ` · ${it.concentration}` : ''})
                  </span>
                  <span className="font-mono text-[#F5F1E8]">
                    {formatCurrency(it.price * it.quantity, language)}
                  </span>
                </div>
              ))}

              {foundOrder.packages.map((pkg) => (
                <div key={pkg.id} className="flex justify-between text-[#B6B0A4]">
                  <span>
                    {pkg.quantity} × {language === 'ar' ? pkg.nameAr : pkg.nameEn}
                  </span>
                  <span className="font-mono text-[#F5F1E8]">
                    {formatCurrency(pkg.price * pkg.quantity, language)}
                  </span>
                </div>
              ))}

              {foundOrder.gifts.map((g) => (
                <div key={g.id} className="flex justify-between text-emerald-400">
                  <span>
                    🎁 {g.quantity} × {language === 'ar' ? g.nameAr : g.nameEn} ({g.size})
                  </span>
                  <span className="font-mono font-bold">0 {language === 'ar' ? 'ج.م' : 'EGP'}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#222] flex justify-between font-bold text-sm text-[#F5F1E8]">
              <span>{t('total')}</span>
              <span className="font-mono text-[#D4AF37] text-base">
                {formatCurrency(foundOrder.total, language)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
