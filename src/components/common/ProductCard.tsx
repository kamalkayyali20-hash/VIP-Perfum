import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t } = useLanguage();
  const { addToCart, isInWishlist, toggleWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('100ml');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentVariant = product.variants.find((v) => v.size === selectedSize) || product.variants[0];
  const isOutOfStock = !currentVariant || currentVariant.stock < 1;
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, selectedSize, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const title = language === 'ar' ? product.nameAr : product.nameEn;
  const family = language === 'ar' ? product.fragranceFamily.ar : product.fragranceFamily.en;

  return (
    <div className="group relative bg-[#151515] border border-[#D4AF37]/15 hover:border-[#D4AF37]/45 rounded-xl transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-lg hover:-translate-y-0.5">
      {/* Top Media Area */}
      <div className="relative aspect-[4/3] bg-[#0c0c0c] overflow-hidden">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <ImageWithFallback
            src={product.image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label="Toggle wishlist"
          className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-[#080808]/80 backdrop-blur-sm border border-[#D4AF37]/30 flex items-center justify-center text-[#B6B0A4] hover:text-[#D4AF37] transition-colors"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#D4AF37] text-[#D4AF37]' : ''
            }`}
          />
        </button>

        {/* Luxury collection or Offer hint tag (unobtrusive, single tag max) */}
        {product.isLuxuryCollection && (
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-[#080808]/85 border border-[#D4AF37]/40 rounded text-[11px] font-semibold text-[#D4AF37] tracking-wider uppercase">
            VIP Luxury
          </div>
        )}
      </div>

      {/* Content & Metadata */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Zero-Pill Metadata */}
          <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-[#B6B0A4] mb-1.5 truncate">
            <span>{product.gender === 'men' ? t('navMen') : t('navWomen')}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{family}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.concentration}</span>
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="font-display text-xs sm:text-base font-semibold text-[#F5F1E8] group-hover:text-[#D4AF37] transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>
        </div>

        {/* Size Selection & Price Section */}
        <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-[#D4AF37]/10 flex flex-col gap-2">
          {/* Size segmented tabs & Price */}
          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1 bg-[#0c0c0c] p-0.5 sm:p-1 rounded-lg border border-[#D4AF37]/15">
              {product.variants.map((v) => (
                <button
                  key={v.size}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSize(v.size);
                  }}
                  className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold rounded transition-colors ${
                    selectedSize === v.size
                      ? 'bg-[#D4AF37] text-[#080808]'
                      : 'text-[#B6B0A4] hover:text-[#F5F1E8]'
                  }`}
                >
                  {v.size}
                </button>
              ))}
            </div>

            {/* Price display with tabular nums */}
            <div className="text-start xs:text-end w-full xs:w-auto">
              <span className="font-semibold text-xs sm:text-base text-[#D4AF37] tabular-nums block font-mono">
                {currentVariant ? formatCurrency(currentVariant.price, language) : '---'}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 min-h-[42px] sm:min-h-[44px] ${
              isOutOfStock
                ? 'bg-[#222] text-[#666] cursor-not-allowed border border-[#333]'
                : addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-[#080808] border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#080808] text-[#D4AF37]'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>تمت الإضافة للسلة!</span>
              </>
            ) : isOutOfStock ? (
              <span>{t('outOfStock')}</span>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>{t('addToCart')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
