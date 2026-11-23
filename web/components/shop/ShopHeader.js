'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '../CartProvider';

export function ShopHeader() {
  const cart = useCart();
  const router = useRouter();
  const [q, setQ] = useState('');

  function onSearch(event) {
    event.preventDefault();
    router.push(q.trim() ? '/?q=' + encodeURIComponent(q.trim()) : '/');
  }

  return (
    <header>
      <div className="nav">
        <Link className="logo" href="/">
          <img src="/opus-logo.png" alt="OPUS" />
        </Link>
        <form className="search" onSubmit={onSearch}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="6" /><path d="M21 21l-4.3-4.3" /></svg>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." aria-label="Search products" />
        </form>
        <nav className="nav-links">
          <Link href="/">Portal</Link>
          <Link href="/support">Support</Link>
          <Link href="/admin">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            Admin
          </Link>
          <Link href="/cart" className="cart" aria-label="Cart">
            🛒<span className="cart-badge">{cart?.count || 0}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
