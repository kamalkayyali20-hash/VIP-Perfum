import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Package,
  Gift,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Smartphone,
  CreditCard,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/currency';
import { Order } from '../types';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { language, t } = useLanguage();
  const { getOrderById } = useStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedToken, setCopiedToken] = useState(false);

  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId).then((res) => {
        setOrder(res);
        setLoading(false);
      });
    }
  }, [orderId, getOrderById]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <p className="text-sm text-[#D4AF37] animate-pulse">
          {language === 'ar' ? 'جاري استرجاع تفاصيل الطلب...' : 'Loading order details...'}
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold font-display text-[#F5F1E8]">
          {language === 'ar' ? 'الطلب غير موجود' : 'Order Not Found'}
        </h2>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#080808] font-bold text-xs rounded-xl"
        >
          {t('navHome')}
        </Link>
      </div>
    );
  }

  const handleCopyToken = () => {
    navigator.clipboard.writeText(order.trackingToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">
      {/* Success Header */}
      <div className="text-center space-y-2 sm:space-y-3">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mx-auto shadow-xl">
          <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F1E8]">
          {t('orderConfirmationTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-[#B6B0A4] max-w-lg mx-auto">
          {language === 'ar'
            ? 'شكراً لاختيارك VIP PERFUM. تم تسجيل طلبك بنجاح وحفظه في سجل الطلبات.'
            : 'Thank you for choosing VIP PERFUM. Your order has been recorded in our store registry.'}
        </p>
      </div>

      {/* Cash on Delivery Notice Banner (if COD selected) */}
      {order.paymentMethod === 'cash_on_delivery' && (
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#172018] via-[#131a14] to-[#121212] border border-emerald-500/40 shadow-xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>
              {language === 'ar'
                ? 'طلبك معتمد بنظام الدفع عند الاستلام (كاش للمندوب)'
                : 'Order Confirmed: Cash on Delivery (COD)'}
            </span>
          </div>
          <p className="text-xs text-[#d1d5db] leading-relaxed">
            {language === 'ar'
              ? `المبلغ المطلوب تسليمه نقداً لمندوب شركة الشحن عند وصول العطور ومعاينتها هو ${formatCurrency(order.total, language)}. سيتواصل معك فريق خدمة العملاء هاتفياً لتأكيد العنوان وموعد التسليم.`
              : `Total cash due to courier upon package arrival and inspection: ${formatCurrency(order.total, language)}. Customer care will call to confirm delivery schedule.`}
          </p>
        </div>
      )}

      {/* Order Identification Box */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D4AF37]/35 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider block">
              {t('orderNumberLabel')}:
            </span>
            <span className="font-mono text-lg sm:text-xl font-bold text-[#F5F1E8]">{order.id}</span>
          </div>

          <div>
            <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider block">
              {t('trackingTokenLabel')}:
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-amber-300">{order.trackingToken}</span>
              <button
                onClick={handleCopyToken}
                className="p-1.5 rounded-lg bg-[#222] hover:bg-[#333] text-[#B6B0A4] hover:text-[#F5F1E8] text-xs flex items-center gap-1 transition-colors min-h-[36px]"
                title="Copy tracking token"
              >
                {copiedToken ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[10px]">{copiedToken ? t('copiedText') : t('copyBtn')}</span>
              </button>
            </div>
            <span className="text-[10px] text-[#777] block mt-0.5">
              {language === 'ar'
                ? 'احتفظ بهذا الرمز السري للاستعلام عن الطلب لاحقاً دون إظهار بياناتك للغرباء.'
                : 'Keep this private token to securely track your shipment without exposing personal info.'}
            </span>
          </div>
        </div>

        {/* Statuses Badges */}
        <div className="pt-3 border-t border-[#D4AF37]/15 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
          <div className="p-3 bg-[#0a0a0a] rounded-xl border border-[#222] space-y-1">
            <span className="text-[#B6B0A4] block">{language === 'ar' ? 'طريقة الدفع:' : 'Payment Method:'}</span>
            <span className="font-semibold text-[#F5F1E8] block">
              {order.paymentMethod === 'cash_on_delivery'
                ? t('payCashOnDelivery')
                : order.paymentMethod === 'instapay'
                ? t('payInstaPay')
                : t('payMobileWallet')}
            </span>
          </div>

          <div className="p-3 bg-[#0a0a0a] rounded-xl border border-[#222] space-y-1">
            <span className="text-[#B6B0A4] block">{t('paymentStatusLabel')}:</span>
            <span
              className={`font-semibold px-2 py-0.5 rounded inline-block ${
                order.paymentStatus === 'verified'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                  : order.paymentStatus === 'submitted_for_verification'
                  ? 'bg-amber-950/60 text-amber-300 border border-amber-500/40'
                  : order.paymentStatus === 'awaiting_cod'
                  ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/50'
                  : 'bg-[#222] text-[#B6B0A4]'
              }`}
            >
              {t(`status_${order.paymentStatus}` as any)}
            </span>
          </div>

          <div className="p-3 bg-[#0a0a0a] rounded-xl border border-[#222] space-y-1">
            <span className="text-[#B6B0A4] block">{t('fulfilmentStatusLabel')}:</span>
            <span className="font-semibold px-2 py-0.5 rounded inline-block bg-[#171717] text-[#D4AF37] border border-[#D4AF37]/30">
              {t(`status_${order.fulfilmentStatus}` as any)}
            </span>
          </div>
        </div>
      </div>

      {/* Items & Gifts Breakdown */}
      <div className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#141414] border border-[#D4AF37]/20 space-y-4">
        <h2 className="text-base font-bold font-display text-[#F5F1E8] border-b border-[#D4AF37]/15 pb-2">
          {language === 'ar' ? 'محتويات الشحنة' : 'Package Contents'}
        </h2>

        <div className="divide-y divide-[#222] text-xs space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="pt-2 flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#F5F1E8]">
                  {item.quantity} × {language === 'ar' ? item.nameAr : item.nameEn}
                </span>
                <span className="text-[#B6B0A4] block text-[11px]">{item.size}</span>
              </div>
              <span className="font-mono text-[#D4AF37] font-semibold tabular-nums">
                {formatCurrency(item.price * item.quantity, language)}
              </span>
            </div>
          ))}

          {order.packages.map((pkg) => (
            <div key={pkg.id} className="pt-2 flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#F5F1E8]">
                  {language === 'ar' ? pkg.nameAr : pkg.nameEn}
                </span>
                <span className="text-[#B6B0A4] block text-[11px]">
                  {pkg.bottleCount} × {pkg.bottleSize}
                </span>
              </div>
              <span className="font-mono text-[#D4AF37] font-semibold tabular-nums">
                {formatCurrency(pkg.price * pkg.quantity, language)}
              </span>
            </div>
          ))}

          {order.gifts.map((gift) => (
            <div key={gift.id} className="pt-2 flex items-center justify-between text-emerald-400">
              <div>
                <span className="font-semibold">
                  🎁 {gift.quantity} × {language === 'ar' ? gift.nameAr : gift.nameEn} ({gift.size})
                </span>
                <span className="text-emerald-500/80 block text-[10px]">{t('freeGiftBadge')}</span>
              </div>
              <span className="font-mono font-bold">0 {language === 'ar' ? 'ج.م' : 'EGP'}</span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="pt-3 border-t border-[#D4AF37]/15 space-y-1.5 text-xs">
          <div className="flex justify-between text-[#B6B0A4]">
            <span>{t('subtotal')}</span>
            <span className="font-mono">{formatCurrency(order.subtotal, language)}</span>
          </div>
          <div className="flex justify-between text-[#B6B0A4]">
            <span>{t('shipping')}</span>
            <span className="font-mono">{formatCurrency(order.shippingFee, language)}</span>
          </div>
          <div className="flex justify-between font-bold text-sm text-[#F5F1E8] pt-1 border-t border-[#222]">
            <span>{t('total')}</span>
            <span className="text-[#D4AF37] font-mono text-base tabular-nums">
              {formatCurrency(order.total, language)}
            </span>
          </div>
        </div>
      </div>

      {/* Delivery Address & Next Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/20 space-y-2 text-xs">
          <h3 className="font-bold text-[#F5F1E8] font-display">
            {language === 'ar' ? 'عنوان التوصيل' : 'Delivery Address'}
          </h3>
          <p className="text-[#F5F1E8] font-medium">{order.customer.fullName}</p>
          <p className="text-[#B6B0A4]" dir="ltr">{order.customer.phoneNumber}</p>
          <p className="text-[#B6B0A4]">
            {order.customer.cityArea}، {order.customer.governorate}
          </p>
          <p className="text-[#B6B0A4]">{order.customer.streetAndBuilding}</p>
          {order.customer.apartmentFloor && (
            <p className="text-[#B6B0A4]">{order.customer.apartmentFloor}</p>
          )}
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/20 space-y-3 text-xs">
          <h3 className="font-bold text-[#F5F1E8] font-display">
            {language === 'ar' ? 'الخطوات القادمة' : 'Next Steps'}
          </h3>
          <ul className="space-y-2 text-[#B6B0A4]">
            <li className="flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>
                {order.paymentMethod === 'cash_on_delivery'
                  ? language === 'ar'
                    ? 'سيقوم فريق خدمة العملاء بالتواصل معك هاتفياً لتأكيد موعد التسليم، ويتم دفع المبلغ كاش للمندوب عند الاستلام.'
                    : 'Our customer support will call you to confirm delivery timing, and payment is collected in cash upon arrival.'
                  : order.paymentStatus === 'submitted_for_verification'
                  ? language === 'ar'
                    ? 'جاري مراجعة إشعار التحويل من قِبل إدارة المتجر.'
                    : 'Payment evidence submitted and pending store staff verification.'
                  : language === 'ar'
                  ? 'يرجى تحويل المبلغ عبر إنستاباي أو المحفظة وإرفاق الإشعار لتسريع الشحن.'
                  : 'Please complete payment transfer via InstaPay or Mobile Wallet.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Package className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>
                {language === 'ar'
                  ? 'سيتم تغليف عطورك بعناية في عبوات VIP المحمية وتجهيزها للتسليم.'
                  : 'Your perfumes will be packed securely in VIP presentation boxes.'}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          to={`/tracking?orderId=${order.id}&token=${order.trackingToken}`}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-xs rounded-xl tracking-wider transition-colors min-h-[44px] flex items-center justify-center gap-2"
        >
          <span>{t('trackYourOrderBtn')}</span>
          <ArrowIcon className="w-4 h-4" />
        </Link>
        <Link
          to="/"
          className="w-full sm:w-auto px-8 py-3.5 bg-[#151515] hover:bg-[#202020] text-[#F5F1E8] border border-[#D4AF37]/40 font-semibold text-xs rounded-xl tracking-wider transition-colors min-h-[44px] flex items-center justify-center"
        >
          {t('continueShopping')}
        </Link>
      </div>
    </div>
  );
};
