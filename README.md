# VIP PERFUM - Luxury Egyptian Fragrance Boutique

A high-end black-and-gold e-commerce web application created for fragrance connoisseurs in Egypt, built with **React**, **TypeScript**, **Tailwind CSS**, and **React Router**.

---

## 1. Brand Identity & Visual Language

- **Brand Name**: **VIP PERFUM** (exact spelling maintained across all components)
- **Palette**:
  - Deep obsidian background: `#080808`
  - Subtle dark card surfaces: `#151515`
  - Warm antique gold accents: `#D4AF37`
  - Elevated parchment text: `#F5F1E8`
  - Muted secondary typography: `#B6B0A4`
  - Subtle hairline borders: `rgba(212, 175, 55, 0.18)`
- **Typography**: Cinzel display serif + Plus Jakarta Sans + Cairo / Noto Sans Arabic.
- **Bilingual & Directional**:
  - Default: **Arabic (RTL)** with simple, friendly Egyptian Arabic phrasing ("عطرك… بصمتك", "رجالي", "حريمي", "جنيه").
  - Seamless toggle to **English (LTR)**.
- **Egyptian Currency**: Formatted accurately with `ج.م` (EGP).

---

## 2. Tested Promotion Rules (Free Bottle Logic)

The promotion engine (`src/utils/promotionCalculator.ts`) strictly enforces the following hierarchy:

1. **Rule 3 (Applied First)**: Buy two 100 ml bottles $\rightarrow$ receive one 50 ml bottle free.
2. **Rule 1**: Each remaining unpaired 100 ml bottle $\rightarrow$ receive one 30 ml bottle free.
3. **Rule 2**: Each pair of 50 ml bottles $\rightarrow$ receive one 30 ml bottle free.

### Verified Test Matrix (100% automated passing in `src/tests/promotions.test.ts`):
- `1 × 100 ml` $\rightarrow$ `1 × 30 ml` gift
- `2 × 100 ml` $\rightarrow$ `1 × 50 ml` gift
- `3 × 100 ml` $\rightarrow$ `1 × 50 ml + 1 × 30 ml` gifts
- `4 × 100 ml` $\rightarrow$ `2 × 50 ml` gifts
- `2 × 50 ml` $\rightarrow$ `1 × 30 ml` gift
- `4 × 50 ml` $\rightarrow$ `2 × 30 ml` gifts
- `1 × 100 ml + 2 × 50 ml` $\rightarrow$ `2 × 30 ml` gifts
- **Package Exclusion**: Pre-curated or custom packages do not generate free bottle entitlements.
- **Gift Exclusion**: Complimentary gifts never generate recursive gift entitlements.
- **Cart Reductions**: Decreasing cart quantities trims surplus gifts safely.

---

## 3. Package Definitions

Configured in `src/config/packages.ts`:
- **Bronze Package**: Assumed 4 bottles; bottle volume requires store confirmation. Purchase is disabled with a friendly *"Details coming soon"* badge.
- **Silver Package**: Assumed 8 bottles; bottle volume requires store confirmation. Purchase is disabled with a friendly *"Details coming soon"* badge.
- **Gold Package (VIP Gold)**: 12 bottles $\times$ 30 ml. Priced at 2,950 EGP (original 3,800 EGP comparison).
  - Supports both **Curated Master Selection** and **Build-Your-Own Custom Casket** (enforcing exactly 12 bottles).

---

## 4. Payment & Checkout (Honest Egyptian Manual Transfer)

- **InstaPay**: Transfer to store IPA handle (`vipperfum@instapay`). Includes a 1-click copy button.
- **Mobile Wallets**: Transfer to Vodafone Cash / Orange / Etisalat / WE Pay wallet (`01099998888`).
- **Honest Verification Boundary**:
  - Submitting a transfer reference or uploading a payment screenshot changes status to `submitted_for_verification`.
  - **Orders are NEVER automatically marked verified** merely because a customer submits evidence.
  - Store payment recipient configuration is checked; missing configuration safely disables checkout.

---

## 5. Routes

1. `/`: Home with Hero, Category Tiles, Concentration Cards, Featured Perfumes, Offers, Packages, and How to Order.
2. `/shop`: Full catalog with Live Search, Gender, Concentration, Bottle Size, In-Stock filters, Sorting, and Filter Chips.
3. `/shop/men`: Men's perfumes.
4. `/shop/women`: Women's perfumes.
5. `/product/:slug`: Product detail page with image switcher, size selector, dynamic offer preview, and notes.
6. `/packages`: Curated & build-your-own package selector.
7. `/offers`: Complete promotions guide with interactive offer simulator.
8. `/wishlist`: LocalStorage-persisted customer wishlist.
9. `/cart`: Cart with paid items, packages, 0-EGP gift lines, and gift selector modal.
10. `/checkout`: Egyptian address and governorate selector with dynamic shipping fees and manual transfer.
11. `/order-confirmation/:orderId`: Receipt with private tracking token.
12. `/tracking`: Order tracking by order ID + private token or registered phone.
13. `/contact`: Customer care contacts and inquiry form.
14. `/info`: Configurable shipping times, returns, and privacy policies.

---

## 6. Demo versus Production Checklist

This frontend demo persists cart, wishlist, and demo orders to the browser's `localStorage`. For live production deployment:

- [ ] **Backend API & Central Database**: Migrate from `localStorage` to a resilient database (PostgreSQL / Firestore) to store orders centrally.
- [ ] **Private Cloud Storage**: Securely store payment screenshots in private, signed storage buckets (never accessible publicly).
- [ ] **Authenticated Admin Portal**: Provide a protected dashboard for authorized accounting staff to inspect InstaPay bank records and approve/reject transfers.
- [ ] **Server-Side Price & Promotion Validation**: All promotions, stock limits, and shipping rates must be strictly validated server-side on order creation to prevent client manipulation.
- [ ] **Anti-Scraping / Sequential Order Protection**: Orders use random suffixes and private security tokens so customer records cannot be iterated sequentially.

---

## 7. Development & Testing Commands

```bash
# Install dependencies
npm install

# Run automated promotion test suite
npm test

# Run development server
npm run dev

# Build for production
npm run build
```
