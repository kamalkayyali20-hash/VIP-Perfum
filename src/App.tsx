/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { MenPerfumesPage } from './pages/MenPerfumesPage';
import { WomenPerfumesPage } from './pages/WomenPerfumesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { PackagesPage } from './pages/PackagesPage';
import { OffersPage } from './pages/OffersPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { ContactPage } from './pages/ContactPage';
import { InfoPage } from './pages/InfoPage';

export default function App() {
  return (
    <LanguageProvider>
      <StoreProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-[#080808] text-[#F5F1E8]">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/men" element={<MenPerfumesPage />} />
                <Route path="/shop/women" element={<WomenPerfumesPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/packages" element={<PackagesPage />} />
                <Route path="/offers" element={<OffersPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                <Route path="/tracking" element={<OrderTrackingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/info" element={<InfoPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </StoreProvider>
    </LanguageProvider>
  );
}
