export const DEMO = { email: 'admin@opus.com', password: 'opus-admin' };

export const MENUS = [
  { id: 'products', label: 'Product Management', icon: 'layers', items: [['All', 'products'], ['Add New Product', 'products/new'], ['Categories', 'categories']] },
  { id: 'orders', label: 'Orders', icon: 'clip', items: [['All', 'orders'], ['Add New Order', 'orders/new']] },
  { id: 'users', label: 'Users', icon: 'users', items: [['All', 'company/opus/users'], ['Add New User', 'company/opus/users/new'], ['Guest User', 'company/opus/users/guest']] },
  { id: 'settings', label: 'Settings', icon: 'gear', items: [['All', 'settings'], ['Product Status', 'status'], ['Statistics', 'statistics'], ['Suppliers', 'suppliers'], ['Info', 'info']] },
];

export function sideKey(parts) {
  const [a, , c] = parts;
  if (a === 'product' || a === 'products' || a === 'categories') return 'products';
  if (a === 'order' || a === 'orders') return 'orders';
  if (a === 'users' || a === 'user') return 'users';
  if (a === 'company' && (c === 'users' || c === 'user')) return 'users';
  if (a === 'company' || a === 'companies') return 'companies';
  if (['settings', 'suppliers', 'statistics', 'info', 'status'].includes(a)) return 'settings';
  return '';
}

export function focusedRoute(parts) {
  const [a, b, c] = parts;
  return (a === 'products' && b === 'new') || (a === 'product' && c === 'edit') || (a === 'orders' && b === 'new') || a === 'order';
}
