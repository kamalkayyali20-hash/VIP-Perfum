export function formatCurrency(amount: number, lang: 'ar' | 'en' = 'ar'): string {
  const formattedNumber = new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-EG', {
    maximumFractionDigits: 0,
  }).format(amount);

  return lang === 'ar' ? `${formattedNumber} ج.م` : `${formattedNumber} EGP`;
}
