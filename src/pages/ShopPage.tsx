import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { Gender, Concentration } from '../types';

interface ShopPageProps {
  forcedGender?: Gender;
}

export const ShopPage: React.FC<ShopPageProps> = ({ forcedGender }) => {
  const { language, t } = useLanguage();
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedGender, setSelectedGender] = useState<Gender | 'all'>(
    forcedGender || (searchParams.get('gender') as Gender) || 'all'
  );
  const [selectedConcentration, setSelectedConcentration] = useState<string>(
    searchParams.get('concentration') || 'all'
  );
  const [selectedSize, setSelectedSize] = useState<'all' | '50ml' | '100ml'>(
    (searchParams.get('size') as '50ml' | '100ml') || 'all'
  );
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'name'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync URL search params
  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null) setSearchQuery(q);
    const conc = searchParams.get('concentration');
    if (conc) setSelectedConcentration(conc);
    if (!forcedGender) {
      const g = searchParams.get('gender') as Gender;
      if (g) setSelectedGender(g);
    }
  }, [searchParams, forcedGender]);

  if (forcedGender && selectedGender !== forcedGender) {
    setSelectedGender(forcedGender);
  }

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Gender
      if (selectedGender !== 'all' && p.gender !== selectedGender) return false;

      // 2. Concentration / Collection
      if (selectedConcentration !== 'all' && p.concentration !== selectedConcentration) return false;

      // 3. Bottle Size
      if (selectedSize !== 'all') {
        const hasVariant = p.variants.some((v) => v.size === selectedSize && v.stock > 0);
        if (!hasVariant) return false;
      }

      // 4. In Stock Only
      if (inStockOnly) {
        const hasStock = p.variants.some((v) => v.stock > 0);
        if (!hasStock) return false;
      }

      // 5. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchName =
          p.nameAr.toLowerCase().includes(query) || p.nameEn.toLowerCase().includes(query);
        const matchFamily =
          p.fragranceFamily.ar.toLowerCase().includes(query) ||
          p.fragranceFamily.en.toLowerCase().includes(query);
        const matchNotes =
          [...p.notes.top.ar, ...p.notes.heart.ar, ...p.notes.base.ar].some((n) =>
            n.toLowerCase().includes(query)
          ) ||
          [...p.notes.top.en, ...p.notes.heart.en, ...p.notes.base.en].some((n) =>
            n.toLowerCase().includes(query)
          );

        if (!matchName && !matchFamily && !matchNotes) return false;
      }

      return true;
    });
  }, [products, selectedGender, selectedConcentration, selectedSize, inStockOnly, searchQuery]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price_asc':
        return list.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
      case 'price_desc':
        return list.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
      case 'name':
        return list.sort((a, b) =>
          language === 'ar' ? a.nameAr.localeCompare(b.nameAr) : a.nameEn.localeCompare(b.nameEn)
        );
      case 'featured':
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProducts, sortBy, language]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedGender !== 'all' && !forcedGender) count++;
    if (selectedConcentration !== 'all') count++;
    if (selectedSize !== 'all') count++;
    if (inStockOnly) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [selectedGender, selectedConcentration, selectedSize, inStockOnly, searchQuery, forcedGender]);

  const clearAllFilters = () => {
    if (!forcedGender) setSelectedGender('all');
    setSelectedConcentration('all');
    setSelectedSize('all');
    setInStockOnly(false);
    setSearchQuery('');
    setSearchParams({});
  };

  const concentrationOptions: { id: string; label: string }[] = [
    { id: 'all', label: t('filterAll') },
    { id: 'Parfum', label: 'Parfum' },
    { id: 'Eau de Parfum', label: 'Eau de Parfum' },
    { id: 'Eau de Toilette', label: 'Eau de Toilette' },
    { id: 'Luxury Perfume', label: t('luxuryLabel') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-8">
      {/* Title & Live Search Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-4 sm:pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F1E8]">
            {forcedGender === 'men'
              ? t('navMen')
              : forcedGender === 'women'
              ? t('navWomen')
              : t('navShop')}
          </h1>
          <p className="text-xs text-[#B6B0A4] mt-1">
            {t('resultsCount', { count: sortedProducts.length })}
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3 text-[#B6B0A4]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-[#151515] border border-[#D4AF37]/30 text-xs text-[#F5F1E8] pl-9 pr-9 py-2.5 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute top-1/2 -translate-y-1/2 right-3 text-[#B6B0A4] hover:text-[#F5F1E8]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Control Bar: Filters & Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#121212] p-4 rounded-xl border border-[#D4AF37]/15">
        {/* Gender Segmented Filter (if not forced) */}
        {!forcedGender && (
          <div className="flex items-center gap-1 bg-[#080808] p-1 rounded-lg border border-[#D4AF37]/15">
            <button
              onClick={() => setSelectedGender('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors min-h-[36px] ${
                selectedGender === 'all'
                  ? 'bg-[#D4AF37] text-[#080808]'
                  : 'text-[#B6B0A4] hover:text-[#F5F1E8]'
              }`}
            >
              {t('filterAll')}
            </button>
            <button
              onClick={() => setSelectedGender('men')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors min-h-[36px] ${
                selectedGender === 'men'
                  ? 'bg-[#D4AF37] text-[#080808]'
                  : 'text-[#B6B0A4] hover:text-[#F5F1E8]'
              }`}
            >
              {t('navMen')}
            </button>
            <button
              onClick={() => setSelectedGender('women')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors min-h-[36px] ${
                selectedGender === 'women'
                  ? 'bg-[#D4AF37] text-[#080808]'
                  : 'text-[#B6B0A4] hover:text-[#F5F1E8]'
              }`}
            >
              {t('navWomen')}
            </button>
          </div>
        )}

        {/* Concentration Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-[#B6B0A4] hidden sm:inline">{t('filterConcentration')}:</label>
          <select
            value={selectedConcentration}
            onChange={(e) => setSelectedConcentration(e.target.value)}
            className="bg-[#080808] border border-[#D4AF37]/25 text-xs text-[#F5F1E8] px-3 py-2 rounded-lg focus:outline-none focus:border-[#D4AF37] min-h-[44px]"
          >
            {concentrationOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Size Filter */}
        <div className="flex items-center gap-1.5 bg-[#080808] p-1 rounded-lg border border-[#D4AF37]/15">
          {(['all', '50ml', '100ml'] as const).map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSize(sz)}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors min-h-[36px] ${
                selectedSize === sz
                  ? 'bg-[#D4AF37] text-[#080808]'
                  : 'text-[#B6B0A4] hover:text-[#F5F1E8]'
              }`}
            >
              {sz === 'all' ? t('filterAll') : sz}
            </button>
          ))}
        </div>

        {/* In-Stock Toggle */}
        <label className="flex items-center gap-2 cursor-pointer text-xs text-[#B6B0A4] hover:text-[#F5F1E8] min-h-[44px]">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="rounded border-[#D4AF37]/40 text-[#D4AF37] focus:ring-0 bg-[#080808] w-4 h-4 accent-[#D4AF37]"
          />
          <span>{t('filterStockOnly')}</span>
        </label>

        {/* Sort By */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-[#D4AF37]" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#080808] border border-[#D4AF37]/25 text-xs text-[#F5F1E8] px-3 py-2 rounded-lg focus:outline-none focus:border-[#D4AF37] min-h-[44px]"
          >
            <option value="featured">{t('sortFeatured')}</option>
            <option value="price_asc">{t('sortPriceAsc')}</option>
            <option value="price_desc">{t('sortPriceDesc')}</option>
            <option value="name">{t('sortName')}</option>
          </select>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#B6B0A4]">{language === 'ar' ? 'التصفيات الحالية:' : 'Active filters:'}</span>

          {selectedGender !== 'all' && !forcedGender && (
            <button
              onClick={() => setSelectedGender('all')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1813] border border-[#D4AF37]/40 text-[#D4AF37] rounded-lg min-h-[32px]"
            >
              <span>{selectedGender === 'men' ? t('navMen') : t('navWomen')}</span>
              <X className="w-3 h-3" />
            </button>
          )}

          {selectedConcentration !== 'all' && (
            <button
              onClick={() => setSelectedConcentration('all')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1813] border border-[#D4AF37]/40 text-[#D4AF37] rounded-lg min-h-[32px]"
            >
              <span>{selectedConcentration}</span>
              <X className="w-3 h-3" />
            </button>
          )}

          {selectedSize !== 'all' && (
            <button
              onClick={() => setSelectedSize('all')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1813] border border-[#D4AF37]/40 text-[#D4AF37] rounded-lg min-h-[32px]"
            >
              <span>{selectedSize}</span>
              <X className="w-3 h-3" />
            </button>
          )}

          {inStockOnly && (
            <button
              onClick={() => setInStockOnly(false)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1813] border border-[#D4AF37]/40 text-[#D4AF37] rounded-lg min-h-[32px]"
            >
              <span>{t('filterStockOnly')}</span>
              <X className="w-3 h-3" />
            </button>
          )}

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1813] border border-[#D4AF37]/40 text-[#D4AF37] rounded-lg min-h-[32px]"
            >
              <span>"{searchQuery}"</span>
              <X className="w-3 h-3" />
            </button>
          )}

          <button
            onClick={clearAllFilters}
            className="text-xs text-red-400 hover:text-red-300 underline underline-offset-2 ml-2 min-h-[32px] flex items-center"
          >
            {t('clearFilters')}
          </button>
        </div>
      )}

      {/* Product Grid or Empty State */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-[#121212] border border-[#D4AF37]/20 rounded-2xl p-8 space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#181818] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-[#F5F1E8]">
            {t('noProductsFound')}
          </h3>
          <p className="text-xs text-[#B6B0A4] leading-relaxed">
            {language === 'ar'
              ? 'جرّب تعديل كلمات البحث أو مسح خيارات التصفية لعرض مجموعة أوسع من العطور الفاخرة.'
              : 'Try clearing some filters or searching for a different fragrance note or family.'}
          </p>
          <button
            onClick={clearAllFilters}
            className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-xs rounded-xl transition-colors min-h-[44px]"
          >
            {t('clearFilters')}
          </button>
        </div>
      )}
    </div>
  );
};
