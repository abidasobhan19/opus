'use client';

import { ShopFooter } from './shop/ShopFooter';
import { ShopHeader } from './shop/ShopHeader';

export function ShopChrome({ children }) {
  return (
    <>
      <ShopHeader />
      {children}
      <ShopFooter />
    </>
  );
}
