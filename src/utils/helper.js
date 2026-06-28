export function formatPrice(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

export function calculateDiscount(price, oldPrice) {
  if (!oldPrice) return null;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
