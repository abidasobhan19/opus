'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Head, Icon, money } from '../ui';

export function OrderForm({ order, products, editing, onSave }) {
  const [lines, setLines] = useState(order.lines?.length ? order.lines.map((line) => ({ ...line })) : [{ name: '', qty: 1, price: 0 }]);
  const [same, setSame] = useState(!!order.same);
  const [ship, setShip] = useState(order.ship || '');
  const [bill, setBill] = useState(order.same ? order.ship || '' : order.bill || '');
  const [err, setErr] = useState('');
  const goods = lines.reduce((sum, line) => sum + Number(line.qty) * Number(line.price), 0);
  const shipping = Number(order.shipping) || 0;

  function setLine(index, patch) {
    setLines((rows) => rows.map((line, i) => i === index ? { ...line, ...patch } : line));
  }

  function onName(index, name) {
    const product = products.find((item) => item.name.toLowerCase() === name.trim().toLowerCase());
    setLine(index, { name, price: product ? product.price : lines[index].price, productId: product?.id || '' });
  }

  async function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (!String(data.customer || '').trim()) { setErr('Enter the customer name.'); return; }
    await onSave({
      ...data,
      same,
      ship,
      bill: same ? ship : bill,
      shipping,
      lines,
      as: event.nativeEvent.submitter?.value,
    });
  }

  function invoice() {
    const rows = lines.map((line) => '<tr><td>' + line.name + '</td><td>' + line.qty + '</td><td>' + money(line.price) + '</td><td>' + money(line.qty * line.price) + '</td></tr>').join('');
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write('<title>Invoice ' + (order.id || '') + '</title><body style="font-family:Inter,sans-serif;padding:32px"><h1>Invoice</h1><p>' + (order.customer || '') + '</p><p>' + ship + '</p><table width="100%" cellpadding="8">' + rows + '</table><h2>Total ' + money(goods + shipping) + ' SEK</h2></body>');
    win.document.close();
    win.focus();
    win.print();
  }

  return (
    <>
      <Link className="back" href="/admin/orders">← Back to Orders</Link>
      <Head title={editing ? 'Edit Order' : 'Add New Order'} sub={editing ? 'Update the order details, products, customer information, and pricing.' : 'Create a new order and enter the required customer and product information.'} />
      <form className="order-wrap" style={{ marginTop: 16 }} onSubmit={submit}>
        <div>
          <section className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <div><h2>Order Information</h2><p className="hint">This reference number is generated automatically and cannot be edited.</p></div>
            <span className="refbadge"># {editing ? (order.ref || order.id) : 'AUTO'} <em>AUTO</em></span>
          </section>
          <section className="card" style={{ marginTop: 12 }}>
            <h2>Order Details</h2>
            <div className="grid2" style={{ marginTop: 12 }}>
              <div className="field"><label>Date of Order</label><input type="date" name="iso" defaultValue={order.iso || ''} /></div>
              <div className="field"><label>Order Status</label>
                <select name="status" defaultValue={order.status || 'Treated'}>{['Treated', 'Paused', 'Finished'].map((status) => <option key={status}>{status}</option>)}</select>
              </div>
            </div>
          </section>
          <section className="card" style={{ marginTop: 12 }}>
            <div className="head"><h2>Order Products</h2><span className="muted">Search by product name or ID</span></div>
            <datalist id="product-names">{products.map((product) => <option key={product.id} value={product.name} />)}</datalist>
            {lines.map((line, index) => (
              <div className="line" key={index}>
                <div className="field" style={{ margin: 0 }}><label>Product</label><input list="product-names" value={line.name} onChange={(e) => onName(index, e.target.value)} placeholder="Search product" /></div>
                <div className="field" style={{ margin: 0 }}><label>Quantity</label>
                  <div className="qty">
                    <button type="button" onClick={() => setLine(index, { qty: Math.max(1, Number(line.qty) - 1) })}>−</button>
                    <input value={line.qty} onChange={(e) => setLine(index, { qty: Math.max(1, Number(e.target.value) || 1) })} />
                    <button type="button" onClick={() => setLine(index, { qty: Number(line.qty) + 1 })}>+</button>
                  </div>
                </div>
                <div className="price-col">PRICE / PC<b>{money(line.price)} SEK / pc</b></div>
                <div className="price-col">TOTAL PRICE<b>{money(line.qty * line.price)} SEK</b>
                  <button className="iconbtn" type="button" aria-label="Remove" onClick={() => setLines((rows) => rows.length === 1 ? [{ name: '', qty: 1, price: 0 }] : rows.filter((_, i) => i !== index))}><Icon name="trash" /></button>
                </div>
              </div>
            ))}
            <button className="linkish" type="button" style={{ marginTop: 8 }} onClick={() => setLines((rows) => [...rows, { name: '', qty: 1, price: 0 }])}>+ Add Product</button>
          </section>
          <section className="card" style={{ marginTop: 12 }}>
            <h2>Customer Information</h2>
            <div className="grid2" style={{ marginTop: 12 }}>
              <div className="field"><label>Customer Name <span className="req">*</span></label><input name="customer" defaultValue={order.customer || ''} placeholder="e.g. Karin Andersson" /></div>
              <div className="field"><label>Email <span className="req">*</span></label><input name="email" defaultValue={order.email || ''} /></div>
            </div>
          </section>
          <section className="card" style={{ marginTop: 12 }}><h2>Shipping Address</h2><div className="field" style={{ marginTop: 12 }}><label>Address</label><textarea value={ship} onChange={(e) => { setShip(e.target.value); if (same) setBill(e.target.value); }} /></div></section>
          <section className="card" style={{ marginTop: 12 }}>
            <div className="head"><h2>Billing Address</h2><label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13.5 }}><input type="checkbox" checked={same} onChange={(e) => { setSame(e.target.checked); if (e.target.checked) setBill(ship); }} /> Same as shipping address</label></div>
            <div className="field"><label>Address</label><textarea value={same ? ship : bill} readOnly={same} onChange={(e) => setBill(e.target.value)} /></div>
          </section>
          <section className="card" style={{ marginTop: 12 }}><h2>Notes for the Order</h2><p className="hint">Optional — visible to the fulfillment team.</p><div className="field" style={{ marginTop: 8 }}><textarea name="notes" defaultValue={order.notes || ''} /></div></section>
          <div className="err">{err}</div>
          <div className="actions">
            <button className="btn" type="submit">{editing ? 'Save Changes' : 'Create Order'}</button>
            {editing ? null : <button className="btn dark" type="submit" name="as" value="draft">Save Draft</button>}
            <Link className="ghost" href="/admin/orders">{editing ? 'Discard Changes' : 'Discard'}</Link>
          </div>
        </div>
        <div>
          <aside className="sum">
            <h3>ORDER SUMMARY</h3>
            <div className="row"><span>Number of Products</span><b>{lines.length}</b></div>
            <div className="row"><span>Total Quantity</span><b>{lines.reduce((sum, line) => sum + Number(line.qty || 0), 0)}</b></div>
            <div className="row"><span>Subtotal</span><b>{money(goods)} SEK</b></div>
            <div className="row"><span>Shipping</span><b>{shipping ? money(shipping) + ' SEK' : 'Free'}</b></div>
            <div className="total"><span>Total Order Price</span><div><b>{money(goods + shipping)} SEK</b>{editing ? <small>Incl. VAT</small> : null}</div></div>
          </aside>
          {editing ? <button className="ghost" type="button" onClick={invoice} style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>Generate PDF Invoice</button> : null}
          <div className="tip" style={{ marginTop: 12 }}><Icon name="info" /> Totals update as products and quantities change.</div>
        </div>
      </form>
    </>
  );
}
