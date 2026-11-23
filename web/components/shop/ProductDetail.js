'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '../../lib/api';
import { kr } from '../../lib/money';
import { useCart } from '../CartProvider';

export function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const cart = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!id) return;
    api('/api/products/' + id)
      .then((data) => {
        setProduct(data.product);
        document.title = data.product.name + ' — OPUS';
      })
      .catch((err) => setError(err.message));
  }, [id]);

  function add() {
    cart.add(product.id, qty);
    setToast('Added ' + qty + ' × ' + product.name + ' to cart ✓');
    setTimeout(() => setToast(''), 2200);
  }

  if (error) return <p className="status">{error}</p>;
  if (!product) return <p className="status">Loading product…</p>;

  return (
    <>
    <div className="main-product">
      <div>
        <button className="back" type="button" onClick={() => router.push('/')}>← Back to portal</button>
        <div className="imgbox">
          <div className="big">
            <div className="script">{product.name.split(' ')[0]}</div>
            <div className="mocksub">MOCKUP</div>
          </div>
        </div>
      </div>
      <div className="details">
        <h1>{product.name}</h1>
        <div className="desc">{product.description}</div>
        <div className="meta"><span>{product.piece || '1 piece'}</span><span>SKU: {product.sku || product.article}</span></div>
        <div className="price">{kr(product.price)}</div>
        <div className="qty">
          <button type="button" onClick={() => setQty((n) => Math.max(1, n - 1))} aria-label="Decrease">−</button>
          <span>{qty}</span>
          <button className="plus" type="button" onClick={() => setQty((n) => n + 1)} aria-label="Increase">+</button>
        </div>
        <button className="addbtn" type="button" onClick={add} disabled={!product.stock}>
          {product.stock ? 'Add to cart' : 'Out of stock'}
        </button>
      </div>
    </div>
    <div className={toast ? 'toast show' : 'toast'}>{toast}</div>
    </>
  );
}
