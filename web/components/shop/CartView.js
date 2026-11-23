'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { sek, totals } from '../../lib/money';
import { useCart } from '../CartProvider';

export function CartView() {
  const cart = useCart();
  const [catalog, setCatalog] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Cart — OPUS';
    api('/api/products')
      .then((data) => setCatalog(data.products || []))
      .catch((err) => setError(err.message));
  }, []);

  const lines = cart.items
    .map((item) => {
      const product = catalog.find((row) => row.id === item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter(Boolean);

  const sum = totals(lines.map((line) => ({ price: line.product.price, qty: line.qty })));

  return (
    <>
      <section className="hero flat">
        <div className="hero-inner">
          <h1>Cart</h1>
          <p>Review the items added to your cart and continue to checkout.</p>
        </div>
      </section>
      <div className="layout">
        <div className="table">
          <div className="thead"><div>PRODUCT</div><div style={{ textAlign: 'center' }}>QUANTITY</div><div>PRICE</div><div>TOTAL</div><div /></div>
          {error ? <div className="empty">{error}</div> : null}
          {!error && cart.ready && lines.length === 0 ? (
            <div className="empty">Your cart is empty.<br /><br /><Link href="/" style={{ textDecoration: 'underline' }}>Continue shopping</Link></div>
          ) : null}
          {lines.map((line) => (
            <div className="row" key={line.productId}>
              <div className="prod">
                <div className="thumb">🏺</div>
                <div>
                  <b>{line.product.name}</b>
                  <small>{line.product.article} <i>·</i> {line.product.category}</small>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="qty">
                  <button type="button" onClick={() => cart.setQty(line.productId, line.qty - 1)}>−</button>
                  <span>{line.qty}</span>
                  <button type="button" onClick={() => cart.setQty(line.productId, line.qty + 1)}>+</button>
                </div>
              </div>
              <div className="line-price">{sek(line.product.price)}</div>
              <div className="line-total">{sek(line.product.price * line.qty)}</div>
              <button className="del" type="button" onClick={() => cart.remove(line.productId)} aria-label="Remove">🗑</button>
            </div>
          ))}
        </div>
        <div>
          <div className="summary">
            <h3>Order Summary</h3>
            <div className="srow"><span>Subtotal</span><b>{sek(sum.subtotal)}</b></div>
            <div className="srow"><span>Shipping Estimate</span><b>{sek(sum.shipping)}</b></div>
            <div className="srow"><span>Tax (25% VAT)</span><b>{sek(sum.tax)}</b></div>
            <div className="stotal"><span>Total</span><strong>{sek(sum.total)}</strong></div>
            {lines.length ? <Link className="next" href="/checkout">Next &nbsp;→</Link> : <button className="next" type="button" disabled>Next &nbsp;→</button>}
            <Link href="/"><button className="cont" type="button">Continue Shopping</button></Link>
          </div>
          <div className="note"><span>ⓘ</span><span>Prices are specified in Swedish Kronor (SEK). Delivery schedules depend on standard logistical routes.</span></div>
        </div>
      </div>
    </>
  );
}
