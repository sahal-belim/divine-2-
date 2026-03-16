// Currency conversion utility
// 1 USD = 83 INR (approximate)
const USD_TO_INR_RATE = 83;

export function convertUsdToInr(usdPrice: number): number {
  return Math.round(usdPrice * USD_TO_INR_RATE);
}

export function formatPrice(usdPrice: number, currency: 'USD' | 'INR' = 'INR'): string {
  if (currency === 'INR') {
    const inrPrice = convertUsdToInr(usdPrice);
    return `₹${inrPrice.toLocaleString('en-IN')}`;
  }
  return `$${usdPrice.toFixed(2)}`;
}
