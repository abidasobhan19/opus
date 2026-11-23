'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '../../lib/api';
import { sek } from '../../lib/money';
import { useCart } from '../CartProvider';

export function OrderComplete() {
  const { id } = useParams();
  const cart = useCart();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Order Completed — OPUS';
    if (!id) return;
    api('/api/orders/' + id)
      .then((data) => setOrder(data.order))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="status">{error}</p>;
  if (!order) return <p className="status">Loading order…</p>;

  const qty = (order.lines || []).reduce((sum, line) => sum + Number(line.qty), 0);
  const subtotal = order.subtotal ?? (order.lines || []).reduce((sum, line) => sum + line.qty * line.price, 0);
  const shipping = Number(order.shipping) || 0;
  const tax = order.tax != null ? order.tax : 0;
  const total = order.shownAmount != null ? order.shownAmount : subtotal + shipping + tax;

  return (
    <>
      <section className="hero center">
        <div className="check"><span>✓</span></div>
        <h1>Order Completed</h1>
        <p>Thank you for your order. Your request has been received successfully.</p>
        <div className="hero-meta">
          <span>Order No: &nbsp;<b>{order.ref || order.id}</b></span>
          <span>●</span>
          <span>Date: &nbsp;<b>{order.date}</b></span>
        </div>
      </section>
      <div className="layout">
        <div>
          <div className="card">
            <h3>ⓘ Order Information</h3>
            <div className="grid4">
              <div><div className="lbl">ORDER NUMBER</div><div className="val">{order.ref || order.id}</div></div>
              <div><div className="lbl">ORDER DATE</div><div className="val">{order.date}</div></div>
              <div><div className="lbl">ORDER STATUS</div><span className="pilltag teal">RECEIVED</span></div>
              <div><div className="lbl">PAYMENT STATUS</div><span className="pilltag grey">{order.paymentStatus || 'INVOICE PENDING'}</span></div>
            </div>
          </div>
          <div className="card">
            <h3>○ Contact Information</h3>
            <div className="grid3">
              <div><div className="lbl">NAME</div><div className="val">{order.customer}</div></div>
              <div><div className="lbl">EMAIL</div><div className="val">{order.email || '—'}</div></div>
              <div><div className="lbl">PHONE NUMBER</div><div className="val">{order.phone || '—'}</div></div>
            </div>
          </div>
          <div className="two">
            <div className="card"><h3>Shipping Address</h3><div className="addr"><b>{order.customer}</b>{'\n'}{order.ship}</div></div>
            <div className="card">
              <h3>Billing Address</h3>
              {order.same ? <div className="same">◉ Same as Shipping Address</div> : null}
              <div className="addr"><b>{order.customer}</b>{'\n'}{order.bill}</div>
            </div>
          </div>
          <div className="card"><h3>Additional Notes</h3><div className="notes">{order.notes ? '“' + order.notes + '”' : 'No additional notes.'}</div></div>
          <div className="card" style={{ padding: '22px 0 6px' }}>
            <h3 style={{ padding: '0 22px' }}>Ordered Items</h3>
            <table className="otable">
              <thead><tr><th>PRODUCT</th><th>QUANTITY</th><th>PRICE</th><th style={{ textAlign: 'right' }}>TOTAL</th></tr></thead>
              <tbody>
                {(order.lines || []).map((line, index) => (
                  <tr key={index}>
                    <td><b>{line.name}</b><div className="lbl">{line.category || ''}</div></td>
                    <td>{line.qty}</td>
                    <td>{sek(line.price)}</td>
                    <td style={{ textAlign: 'right', fontWeight: 800 }}>{sek(line.qty * line.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="summary">
            <h3>Order Summary</h3>
            <div className="srow"><span>Total Items</span><b>{qty} Items</b></div>
            <div className="srow"><span>Subtotal</span><b>{sek(subtotal)}</b></div>
            <div className="srow"><span>Shipping</span><b>{sek(shipping)}</b></div>
            <div className="srow"><span>Tax (25% VAT)</span><b>{sek(tax)}</b></div>
            <div className="stotal"><small>TOTAL PRICE</small><strong style={{ color: '#0d9a92' }}>{sek(total)}</strong></div>
            <div className="incl">INCL. VAT</div>
            <Link className="btn-teal" href="/" onClick={() => cart.clear()}>Continue Shopping &nbsp;→</Link>
            <button className="btn-out" type="button" onClick={() => window.print()}>📄 &nbsp;Download Invoice PDF</button>
          </div>
          <div className="trust">
            <div className="titem"><div className="ticon">🚚</div><div><b>FAST DELIVERY</b><small>Logistics sync</small></div></div>
            <div className="titem"><div className="ticon">🛡</div><div><b>SECURE</b><small>Encrypted flow</small></div></div>
            <div className="titem"><div className="ticon">✔</div><div><b>VERIFIED</b><small>Brand quality</small></div></div>
            <div className="titem"><div className="ticon">🎧</div><div><b>SUPPORT</b><small>24/7 Expert</small></div></div>
          </div>
        </div>
      </div>
    </>
  );
}
