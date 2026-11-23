'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const KEY = 'opus_cart_v2';
const SEEDED = 'opus_cart_seeded_v2';
const SEED = [
  { productId: '4821', qty: 1 },
  { productId: 'dec1024', qty: 10 },
  { productId: '4822', qty: 2 },
];

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
      else if (!localStorage.getItem(SEEDED)) {
        localStorage.setItem(SEEDED, '1');
        setItems(SEED);
      }
    } catch {
      setItems([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const count = items.reduce((sum, item) => sum + Number(item.qty || 0), 0);

  function add(productId, qty) {
    setItems((prev) => {
      const hit = prev.find((item) => item.productId === productId);
      if (hit) return prev.map((item) => item.productId === productId ? { ...item, qty: item.qty + qty } : item);
      return [...prev, { productId, qty }];
    });
  }

  function setQty(productId, qty) {
    setItems((prev) => prev.map((item) => item.productId === productId ? { ...item, qty: Math.max(1, qty) } : item));
  }

  function remove(productId) {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }

  function clear() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, count, ready, add, setQty, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
