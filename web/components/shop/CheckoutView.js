'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../lib/api';
import { sek, totals } from '../../lib/money';
import { useCart } from '../CartProvider';
import { Popup } from './Popup';

const EMPTY = {
  email: '', name: '', phone: '', address: '', postcode: '', city: '',
  billAddress: '', billPostcode: '', billCity: '', notes: '',
};

export function CheckoutView() {
  const cart = useCart();
  const router = useRouter();
  const [catalog, setCatalog] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [same, setSame] = useState(false);
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { document.title = 'Checkout — OPUS'; }, []);
  useEffect(() => {
    api('/api/products').then((data) => setCatalog(data.products || [])).catch(() => {});
  }, []);

  const lines = cart.items.map((item) => {
    const product = catalog.find((row) => row.id === item.productId);
    return product ? { product, qty: item.qty } : null;
  }).filter(Boolean);
  const sum = totals(lines.map((line) => ({ price: line.product.price, qty: line.qty })));

  function setField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  }

  async function complete() {
    const required = ['email', 'name', 'phone', 'address', 'postcode', 'city'];
    if (!same) required.push('billAddress', 'billPostcode', 'billCity');
    const next = {};
    required.forEach((key) => { if (!String(form[key] || '').trim()) next[key] = true; });
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = true;
    setErrors(next);
    if (Object.keys(next).length) {
      setPopup({ type: 'error', title: 'Missing details', msg: 'Please fill all required fields marked with * with a valid email.' });
      return;
    }
    if (!lines.length) {
      setPopup({ type: 'error', title: 'Cart is empty', msg: 'Add a product before completing the order.' });
      return;
    }
    setBusy(true);
    try {
      const data = await api('/api/checkout', {
        method: 'POST',
        body: {
          ...form,
          sameBilling: same,
          lines: lines.map((line) => ({ productId: line.product.id, qty: line.qty })),
        },
      });
      cart.clear();
      setPopup({ type: 'success', title: 'Order placed!', msg: 'Thank you ' + form.name + '. Your order is being processed...' });
      setTimeout(() => router.push('/order/' + encodeURIComponent(data.order.ref)), 1200);
    } catch (err) {
      setPopup({ type: 'error', title: 'Could not place order', msg: err.message });
    } finally {
      setBusy(false);
    }
  }

  const field = (name, label, placeholder, type = 'text') => (
    <>
      <label>{label} <em>*</em></label>
      <input className={errors[name] ? 'err' : ''} type={type} placeholder={placeholder} value={form[name]} onChange={(e) => setField(name, e.target.value)} />
    </>
  );

  return (
    <>
      <section className="hero flat">
        <div className="hero-inner">
          <h1>Checkout</h1>
          <p>Enter your details below to complete your order.</p>
        </div>
      </section>
      <div className="layout">
        <div>
          <div className="card"><h3>Contact Information</h3>
            {field('email', 'Email', 'email@example.com', 'email')}
            <div className="row2">
              <div>{field('name', 'Name', 'Full name')}</div>
              <div>{field('phone', 'Phone Number', '+46 00 000 00 00')}</div>
            </div>
          </div>
          <div className="card"><h3>Shipping Address</h3>
            {field('address', 'Address', 'Street name and number')}
            <div className="row2">
              <div>{field('postcode', 'Postcode', '000 00')}</div>
              <div>{field('city', 'City / Location', 'City')}</div>
            </div>
          </div>
          <div className="card">
            <div className="bill-head">
              <h3>Billing Address</h3>
              <div className="switch-wrap">
                <button type="button" className={same ? 'switch on' : 'switch'} aria-pressed={same} onClick={() => setSame((v) => !v)} />
                <span>Invoice address same as delivery address</span>
              </div>
            </div>
            {same ? null : (
              <>
                {field('billAddress', 'Address', 'Street name and number')}
                <div className="row2">
                  <div>{field('billPostcode', 'Postcode', '000 00')}</div>
                  <div>{field('billCity', 'City / Location', 'City')}</div>
                </div>
              </>
            )}
          </div>
          <div className="card">
            <h3>Additional Notes</h3>
            <textarea placeholder="Add any requests, delivery instructions, or additional information..." value={form.notes} onChange={(e) => setField('notes', e.target.value)} />
          </div>
        </div>
        <div>
          <div className="summary">
            <h3>Order Summary</h3>
            {lines.map((line) => (
              <div className="sitem" key={line.product.id}>
                <div className="sicon">🏺</div>
                <div><b>{line.product.name}</b><small>{line.qty} × {sek(line.product.price)}</small></div>
              </div>
            ))}
            <div className="srow" style={{ marginTop: 8 }}><span>Product Count</span><b>{lines.length} Items</b></div>
            <div className="srow"><span>Subtotal</span><b>{sek(sum.subtotal)}</b></div>
            <div className="srow"><span>Shipping</span><b>{sek(sum.shipping)}</b></div>
            <div className="srow"><span>Tax (25% VAT)</span><b>{sek(sum.tax)}</b></div>
            <div className="stotal"><span style={{ fontSize: 13, fontWeight: 700 }}>Total Price</span><strong>{sek(sum.total)}</strong></div>
            <div className="incl">Inc. VAT</div>
          </div>
          <div className="trust">
            <div className="titem"><div className="ticon">🚚</div><div><b>Fast Delivery</b><small>Standard logistics</small></div></div>
            <div className="titem"><div className="ticon">🛡</div><div><b>Secure Payment</b><small>Encrypted checkout</small></div></div>
            <div className="titem"><div className="ticon">✔</div><div><b>Guaranteed</b><small>Full satisfaction</small></div></div>
            <div className="titem"><div className="ticon">🎧</div><div><b>24/7 Support</b><small>Expert assistance</small></div></div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <Link href="/cart" className="backlink">← Go Back to Cart</Link>
        <button className="complete" type="button" onClick={complete} disabled={busy}>{busy ? 'Placing order…' : 'Complete Order'}</button>
      </div>
      <Popup popup={popup} onClose={() => setPopup(null)} />
    </>
  );
}
