import React, { useState } from 'react';
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

  return (
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
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden fixed inset-x-0 bottom-0 ${isAnnouncementVisible ? 'top-[92px] sm:top-[109px]' : 'top-16 sm:top-20'} bg-[#080808]/98 backdrop-blur-xl z-50 flex flex-col p-4 sm:p-6 overflow-y-auto border-t border-[#D4AF37]/20`}>
          <nav className="flex flex-col gap-4 text-base font-medium">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 px-4 text-[#F5F1E8] hover:text-[#D4AF37] border-b border-[#222] min-h-[44px] flex items-center"
            >
              {t('navHome')}
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-3 px-4 rounded-lg min-h-[44px] flex items-center justify-between border-b border-[#222] ${
                  isActive(link.to) ? 'text-[#D4AF37] bg-[#151515]' : 'text-[#B6B0A4]'
                }`}
              >
                <span>{link.label}</span>
                <Compass className="w-4 h-4 opacity-40" />
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 px-4 text-[#B6B0A4] hover:text-[#D4AF37] border-b border-[#222] min-h-[44px] flex items-center"
            >
              {t('navContact')}
            </Link>
            <Link
              to="/info"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 px-4 text-[#B6B0A4] hover:text-[#D4AF37] border-b border-[#222] min-h-[44px] flex items-center"
            >
              {t('navInfo')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
