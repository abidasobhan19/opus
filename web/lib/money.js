export const SHIPPING = 49;
export const VAT = 0.25;

export function sek(n) {
  const x = Math.round(Number(n) || 0);
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' SEK';
}

export function kr(n) {
  const x = Number(n) || 0;
  const [a, b] = x.toFixed(2).split('.');
  return a.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ',' + b + ' kr';
}

export function moneyInt(n) {
  return Math.round(Number(n) || 0).toLocaleString('en-US');
}

export function totals(lines) {
  const subtotal = lines.reduce((sum, line) => sum + Number(line.price) * Number(line.qty), 0);
  const tax = Math.round(subtotal * VAT);
  const shipping = lines.length ? SHIPPING : 0;
  return { subtotal, tax, shipping, total: subtotal + tax + shipping, count: lines.reduce((s, l) => s + Number(l.qty), 0) };
}
