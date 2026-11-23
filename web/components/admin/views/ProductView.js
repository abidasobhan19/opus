import Link from 'next/link';
import { Badge, Head } from '../ui';
import { Missing } from './Missing';

export function ProductView({ product }) {
  if (!product) return <Missing label="Product" />;
  return (
    <>
      <Link className="back" href="/admin/products">← Back to Products</Link>
      <Head title={product.name} sub={(product.brand || '') + ' · ' + product.article}>
        <Link className="btn" href={'/admin/product/' + product.id + '/edit'}>Edit</Link>
      </Head>
      <article className="card" style={{ marginTop: 16, maxWidth: 720 }}>
        <div className="preview-box" style={{ marginBottom: 14 }}>{product.hero === 'decal' ? <div className="decal" /> : <div className="thumb" style={{ width: 120, height: 120, background: product.color || '#e5e7eb' }} />}</div>
        <p>{product.description}</p>
        <div className="info-grid" style={{ marginTop: 16 }}>
          <div><small className="muted">PRICE</small><b>{Number(product.price).toFixed(2)} SEK</b></div>
          <div><small className="muted">STOCK</small><b>{product.stock || 'Out of stock'}</b></div>
          <div><small className="muted">CATEGORY</small><b>{product.category}</b></div>
          <div><small className="muted">STATUS</small><div><Badge status={product.status} /></div></div>
        </div>
      </article>
    </>
  );
}
