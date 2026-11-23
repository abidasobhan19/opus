'use client';

import { CartProvider } from './CartProvider';
import { ShopChrome } from './ShopChrome';

export function ShopShell({ children }) {
  return (
    <CartProvider>
      <div className="shop">
        <ShopChrome>{children}</ShopChrome>
      </div>
    </CartProvider>
  );
}
