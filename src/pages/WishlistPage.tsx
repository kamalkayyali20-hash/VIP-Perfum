import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, ArrowLeft, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';

export const WishlistPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { products, wishlist } = useStore();
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-10 space-y-6 sm:space-y-8">
      <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4 sm:pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F1E8]">
            {t('wishlistTitle')}
          </h1>
          <p className="text-xs text-[#B6B0A4] mt-1">
            {wishlistedProducts.length > 0
              ? language === 'ar'
                ? `لديك ${wishlistedProducts.length} عطور في قائمتك المفضلة`
                : `You have ${wishlistedProducts.length} fragrances in your wishlist`
              : t('wishlistEmpty')}
          </p>
        </div>

        {wishlistedProducts.length > 0 && (
          <Link
            to="/shop"
            className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1 min-h-[44px]"
          >
            <span>{t('continueShopping')}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center bg-[#121212] border border-[#D4AF37]/20 rounded-2xl p-8 space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-full bg-[#181818] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="font-display font-bold text-lg text-[#F5F1E8]">
            {t('wishlistEmpty')}
          </h2>
          <p className="text-xs text-[#B6B0A4] leading-relaxed">
            {language === 'ar'
              ? 'تصفح تشكيلتنا من العطور الملكية واضغط على علامة القلب لحفظ العطور التي ترغب بشرائها لاحقاً.'
              : 'Browse our fragrance collections and click the heart icon to save items for later.'}
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-xs rounded-xl transition-colors min-h-[44px]"
            >
              <span>{t('continueShopping')}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
