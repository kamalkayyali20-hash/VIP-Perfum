import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, Globe, Compass } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useStore } from '../../context/StoreContext';

export const Header: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { wishlist, totalCartItemCount } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { to: '/shop', label: t('navShop') },
    { to: '/shop/men', label: t('navMen') },
    { to: '/shop/women', label: t('navWomen') },
    { to: '/packages', label: t('navPackages') },
    { to: '/offers', label: t('navOffers') },
    { to: '/tracking', label: t('navTrackOrder') },
  ];

  const isActive = (path: string) => {
    if (path === '/shop' && location.pathname === '/shop' && !location.search) return true;
    return location.pathname.startsWith(path);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-[#D4AF37]/15">
        {/* 1. Slim Announcement Bar */}
        {isAnnouncementVisible && (
          <div className="bg-gradient-to-r from-[#121212] via-[#1a1813] to-[#121212] border-b border-[#D4AF37]/20 px-4 py-1.5 text-xs text-[#D4AF37] flex items-center justify-between">
            <div className="mx-auto flex items-center gap-2 text-center truncate">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="font-medium tracking-wide truncate">{t('announcementOffer')}</span>
            </div>
            <button
              onClick={() => setIsAnnouncementVisible(false)}
              aria-label="Dismiss announcement"
              className="p-1 hover:text-[#F5F1E8] transition-colors shrink-0 text-[#B6B0A4]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 2. Top Bar Contract (3 Zones) */}
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#F5F1E8] hover:text-[#D4AF37] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center -ms-1"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Zone 1: Single text element Brand Wordmark */}
          <Link
            to="/"
            className="font-brand text-lg sm:text-2xl lg:text-3xl font-bold tracking-[0.15em] sm:tracking-[0.2em] text-[#F5F1E8] hover:text-[#D4AF37] transition-colors whitespace-nowrap"
          >
            VIP PERFUM
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors py-2 relative hover:text-[#D4AF37] ${
                  isActive(link.to) ? 'text-[#D4AF37] font-semibold' : 'text-[#B6B0A4]'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 text-[#B6B0A4] hover:text-[#D4AF37] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-[#151515]"
              aria-label="Search perfumes"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 text-xs font-semibold tracking-wider text-[#D4AF37] border border-[#D4AF37]/30 rounded hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors flex items-center gap-1.5 min-h-[44px]"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="p-2.5 text-[#B6B0A4] hover:text-[#D4AF37] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center relative rounded-lg hover:bg-[#151515]"
              aria-label={t('navWishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[#D4AF37] text-[#080808] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Link with Count */}
            <Link
              to="/cart"
              className="px-3 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-bold text-sm rounded-lg transition-colors flex items-center gap-2 min-h-[44px]"
              aria-label={t('navCart')}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="tabular-nums font-semibold">{totalCartItemCount}</span>
            </Link>
          </div>
        </div>

        {/* Expandable Search Overlay */}
        {isSearchOpen && (
          <div className="border-t border-[#D4AF37]/20 bg-[#121212] px-4 py-3 sm:px-6">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                autoFocus
                className="w-full bg-[#080808] border border-[#D4AF37]/30 text-[#F5F1E8] px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] font-semibold text-sm rounded-lg whitespace-nowrap min-h-[44px]"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-2.5 text-[#B6B0A4] hover:text-[#F5F1E8] min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Full-Screen Drawer Menu (Rendered OUTSIDE header to escape containing-block restrictions) */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="lg:hidden fixed inset-0 z-[100] bg-[#080808] flex flex-col overflow-hidden"
        >
          {/* Mobile Menu Top Bar */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-[#D4AF37]/20 bg-[#0c0c0c] shrink-0">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-brand text-xl font-bold tracking-[0.18em] text-[#F5F1E8]"
            >
              VIP PERFUM
            </Link>

            <div className="flex items-center gap-2">
              {/* Language toggle inside mobile header */}
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1 text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30 rounded flex items-center gap-1 min-h-[38px]"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'English' : 'عربي'}</span>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#B6B0A4] hover:text-[#F5F1E8] rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center bg-[#151515] border border-[#333]"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6 text-[#D4AF37]" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Quick search input in mobile menu */}
            <form
              onSubmit={(e) => {
                handleSearchSubmit(e);
                setIsMobileMenuOpen(false);
              }}
              className="relative"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-[#121212] border border-[#D4AF37]/30 text-xs text-[#F5F1E8] px-3.5 py-3 rounded-xl focus:outline-none focus:border-[#D4AF37] min-h-[44px]"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 text-[#D4AF37]"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Main Links */}
            <nav className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] px-3 block mb-1">
                {language === 'ar' ? 'التنقل الرئيسي' : 'Main Menu'}
              </span>
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl font-medium text-sm transition-colors min-h-[44px] ${
                  location.pathname === '/' ? 'bg-[#1a1813] text-[#D4AF37] border border-[#D4AF37]/30' : 'text-[#F5F1E8] hover:bg-[#151515]'
                }`}
              >
                <span>{t('navHome')}</span>
              </Link>
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl font-medium text-sm transition-colors min-h-[44px] ${
                  location.pathname === '/shop' && !location.search ? 'bg-[#1a1813] text-[#D4AF37] border border-[#D4AF37]/30' : 'text-[#F5F1E8] hover:bg-[#151515]'
                }`}
              >
                <span>{t('navShop')}</span>
              </Link>
              <Link
                to="/shop/men"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl font-medium text-sm transition-colors min-h-[44px] ${
                  location.pathname === '/shop/men' ? 'bg-[#1a1813] text-[#D4AF37] border border-[#D4AF37]/30' : 'text-[#F5F1E8] hover:bg-[#151515]'
                }`}
              >
                <span>{t('navMen')}</span>
              </Link>
              <Link
                to="/shop/women"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl font-medium text-sm transition-colors min-h-[44px] ${
                  location.pathname === '/shop/women' ? 'bg-[#1a1813] text-[#D4AF37] border border-[#D4AF37]/30' : 'text-[#F5F1E8] hover:bg-[#151515]'
                }`}
              >
                <span>{t('navWomen')}</span>
              </Link>
              <Link
                to="/packages"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl font-medium text-sm transition-colors min-h-[44px] ${
                  location.pathname.startsWith('/packages') ? 'bg-[#1a1813] text-[#D4AF37] border border-[#D4AF37]/30' : 'text-[#F5F1E8] hover:bg-[#151515]'
                }`}
              >
                <span>{t('navPackages')}</span>
              </Link>
              <Link
                to="/offers"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl font-medium text-sm transition-colors min-h-[44px] ${
                  location.pathname.startsWith('/offers') ? 'bg-[#1a1813] text-[#D4AF37] border border-[#D4AF37]/30' : 'text-[#F5F1E8] hover:bg-[#151515]'
                }`}
              >
                <span>{t('navOffers')}</span>
              </Link>
              <Link
                to="/tracking"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl font-medium text-sm transition-colors min-h-[44px] ${
                  location.pathname.startsWith('/tracking') ? 'bg-[#1a1813] text-[#D4AF37] border border-[#D4AF37]/30' : 'text-[#F5F1E8] hover:bg-[#151515]'
                }`}
              >
                <span>{t('navTrackOrder')}</span>
              </Link>
            </nav>

            {/* 4 Concentration Types Direct Shortcuts */}
            <div className="space-y-2 pt-2 border-t border-[#222]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] px-3 block">
                {language === 'ar' ? 'أنواع وتركيزات العطور الأربعة' : 'The 4 Perfume Types'}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/shop?concentration=Eau%20de%20Toilette"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-[#141414] border border-[#2a2a2a] hover:border-[#D4AF37]/40 text-xs font-semibold text-[#F5F1E8] min-h-[50px] flex flex-col justify-center"
                >
                  <span className="block">{language === 'ar' ? 'أو دو تواليت' : 'Eau de Toilette'}</span>
                  <span className="text-[10px] text-[#888] font-normal">12-15% oils</span>
                </Link>
                <Link
                  to="/shop?concentration=Eau%20de%20Parfum"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-[#141414] border border-[#2a2a2a] hover:border-[#D4AF37]/40 text-xs font-semibold text-[#F5F1E8] min-h-[50px] flex flex-col justify-center"
                >
                  <span className="block">{language === 'ar' ? 'أو دو بارفيوم' : 'Eau de Parfum'}</span>
                  <span className="text-[10px] text-[#888] font-normal">18-20% oils</span>
                </Link>
                <Link
                  to="/shop?concentration=Parfum"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-[#141414] border border-[#2a2a2a] hover:border-[#D4AF37]/40 text-xs font-semibold text-[#F5F1E8] min-h-[50px] flex flex-col justify-center"
                >
                  <span className="block">{language === 'ar' ? 'بارفيوم نقي' : 'Parfum'}</span>
                  <span className="text-[10px] text-[#888] font-normal">25-30% oils</span>
                </Link>
                <Link
                  to="/shop?concentration=Luxury%20Perfume"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-[#141414] border border-[#2a2a2a] hover:border-[#D4AF37]/40 text-xs font-semibold text-[#F5F1E8] min-h-[50px] flex flex-col justify-center"
                >
                  <span className="block">{language === 'ar' ? 'مجموعة النيش' : 'Luxury Niche'}</span>
                  <span className="text-[10px] text-[#888] font-normal">35%+ oils</span>
                </Link>
              </div>
            </div>

            {/* Quick access bottom actions */}
            <div className="pt-2 border-t border-[#222] space-y-2">
              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 bg-[#D4AF37] text-[#080808] font-bold text-xs rounded-xl flex items-center justify-center gap-2 min-h-[44px]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('navCart')} ({totalCartItemCount})</span>
              </Link>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-[#151515] border border-[#2a2a2a] text-center text-[#B6B0A4] hover:text-[#F5F1E8] min-h-[44px] flex items-center justify-center"
                >
                  {t('navContact')}
                </Link>
                <Link
                  to="/info"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-[#151515] border border-[#2a2a2a] text-center text-[#B6B0A4] hover:text-[#F5F1E8] min-h-[44px] flex items-center justify-center"
                >
                  {t('navInfo')}
                </Link>
              </div>
            </div>

            {/* Cash on delivery banner */}
            <div className="p-3 bg-[#111] rounded-xl border border-emerald-500/30 text-[11px] text-emerald-400 text-center font-medium">
              ✓ {language === 'ar' ? 'متاح الدفع نقداً عند الاستلام كاش للمندوب لكافة محافظات مصر' : 'Cash on Delivery Available Across All Egypt'}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
