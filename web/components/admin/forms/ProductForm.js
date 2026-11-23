'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { CATS, Head, Icon } from '../ui';

export function ProductForm({ product, onSave }) {
  const editing = !!product;
  const start = product || { name: '', article: '', price: '', description: '', brand: '', labels: ['New', 'Bestseller'], categories: ['Decals'], status: 'Published' };
  const [name, setName] = useState(start.name || '');
  const [article, setArticle] = useState(start.article || '');
  const [price, setPrice] = useState(start.price === '' || start.price == null ? '' : start.price);
  const [brand, setBrand] = useState(start.brand || '');
  const [labels, setLabels] = useState(start.labels || []);
  const [labelText, setLabelText] = useState('');
  const [categories, setCategories] = useState(start.categories || []);
  const [err, setErr] = useState('');
  const brands = useMemo(() => [...new Set(['AutoCheck Pro', 'SafeDrive', 'BeamRight', 'GripMaster', 'ClearAir Labs', 'TrueLine', 'TorqFix', 'HoldFast', 'Opus Bilprovning', start.brand].filter(Boolean))], [start.brand]);

  async function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (!name.trim()) { setErr('Enter a product name.'); return; }
    const draft = event.nativeEvent.submitter?.name === 'draft';
    await onSave({
      name, article, price, description: data.description, brand, labels, categories,
      status: draft ? 'Draft' : (data.status || 'Published'),
    });
  }

  function addLabel(event) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const value = labelText.trim();
    if (!value) return;
    setLabels((list) => list.includes(value) ? list : [...list, value]);
    setLabelText('');
  }

  return (
    <>
      <Link className="back" href="/admin/products">← Back to Products</Link>
      <Head title={editing ? 'Edit Product' : 'Add New Product'} sub={editing ? 'Update product information and settings.' : 'Create and publish a new product in the ordering portal.'}>
        <Link className="ghost" href="/admin/products">Discard</Link>
        <button className="btn" type="submit" form="productForm">Save Changes</button>
      </Head>
      <form id="productForm" className="editor" style={{ marginTop: 16 }} onSubmit={submit}>
        <div>
          <section className="card">
            <h2>Product Details</h2>
            <div className="field" style={{ marginTop: 12 }}><label>Product Name <span className="req">*</span></label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Premium Diagnostic Scanner" required /></div>
            <div className="field"><label>Description</label><textarea name="description" defaultValue={start.description || ''} placeholder="Describe the product features and specifications..." /></div>
            <div className="grid2">
              <div className="field"><label>Product ID / Number <span className="req">*</span></label><input value={article} onChange={(e) => setArticle(e.target.value)} placeholder="ART-00000" required /></div>
              <div className="field"><label>Price <span className="req">*</span></label><div className="suffix"><input type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" required /><span>{editing ? 'SEK' : 'kr'}</span></div></div>
            </div>
            <div className="grid2">
              <div className="field"><label>Labels</label>
                <div className="chips">
                  {labels.map((label) => (
                    <span key={label} className={'chip' + (label === 'Bestseller' || label === 'Branded' ? ' orange' : label === 'Outdoor' ? ' gray' : '')}>
                      {label} <button type="button" onClick={() => setLabels(labels.filter((item) => item !== label))}>×</button>
                    </span>
                  ))}
                </div>
                <input value={labelText} onChange={(e) => setLabelText(e.target.value)} onKeyDown={addLabel} placeholder="Add labels..." />
              </div>
              <div className="field"><label>Brand</label>
                <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                  <option value="">Select a brand</option>
                  {brands.map((item) => <option key={item}>{item}</option>)}
                </select>
              </div>
            </div>
            <div className="field"><label>Status</label>
              <select name="status" defaultValue={start.status || 'Published'}>{['Published', 'Draft', 'Private'].map((status) => <option key={status}>{status}</option>)}</select>
            </div>
          </section>
          <section className="card" style={{ marginTop: 14 }}>
            <div className="head"><h2>Categories</h2><span className="note">MULTIPLE SELECTION ALLOWED</span></div>
            <div className="cats">
              {CATS.map(([label]) => (
                <button key={label} type="button" className={categories.includes(label) ? 'cat on' : 'cat'} onClick={() => setCategories((list) => list.includes(label) ? list.filter((item) => item !== label) : [...list, label])}>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </section>
          <div className="editor-foot">
            <button className="btn" type="submit">{editing ? 'Save Changes' : 'Save Product'}</button>
            {editing ? <Link className="ghost" href={'/admin/product/' + product.id}>Preview Product</Link> : <button className="ghost" type="submit" name="draft" value="1">Save as Draft</button>}
            <Link className="spacer" href="/admin/products">Discard{editing ? ' Changes' : ''}</Link>
          </div>
          <div className="err">{err}</div>
        </div>
        <aside className="editor-side">
          <section className="card">
            <div className="head"><h2 style={{ fontSize: 12, letterSpacing: '.06em', color: '#6b7280' }}>{editing ? 'PRODUCT PREVIEW' : 'LIVE PREVIEW'}</h2>{editing ? <span className="badge">LIVE</span> : null}</div>
            <div className="preview-box" style={{ marginTop: 10 }}>{product?.hero === 'decal' ? <div className="decal" /> : <Icon name="box" />}</div>
            <div className="kvs">
              <div>PRODUCT NAME<b>{name || '—'}</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>ID NUMBER<b>{article || '—'}</b></span><span>PRICE<b>{price !== '' ? Number(price).toFixed(2) + ' SEK' : '—'}</b></span></div>
              <div>BRAND<b>{brand || '—'}</b></div>
              <div>LABELS<div className="chips">{labels.map((label) => <span key={label} className="chip">{label}</span>)}{labels.length ? null : <span className="muted">No labels selected</span>}</div></div>
              <div>CATEGORIES<div className="chips">{categories.map((label) => <span key={label} className="chip gray">{label}</span>)}{categories.length ? null : <span className="muted">No categories selected</span>}</div></div>
            </div>
          </section>
          <div className="tip"><Icon name="info" /> Changes saved here show up in the ordering portal and in new orders.</div>
        </aside>
      </form>
    </>
  );
}
