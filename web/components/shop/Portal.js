'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '../../lib/api';
import { FilterBar } from './FilterBar';
import { ProductCard } from './ProductCard';

const FILTERS = [
  ['decals', 'Decals'],
  ['profile', 'Profile Products'],
  ['posters', 'Posters'],
  ['signs', 'Signs'],
  ['print', 'Print Products'],
  ['brochures', 'Brochures / Flyers'],
  ['flags', 'Flags'],
  ['other', 'Other'],
];

const START = new Set(['print', 'brochures', 'flags']);

export function Portal() {
  const params = useSearchParams();
  const q = (params.get('q') || '').toLowerCase();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [active, setActive] = useState(START);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    api('/api/products?storefront=1')
      .then((data) => setProducts(data.products || []))
      .catch((err) => setError(err.message));
  }, []);

  const visible = useMemo(() => {
    return products.filter((product) => {
      const catOk = active.size === 0 || active.has(product.portalCat);
      const text = (product.name + ' ' + product.category + ' ' + product.description).toLowerCase();
      const queryOk = !q || text.includes(q);
      const extraOk = expanded || !product.extra || !!q;
      return catOk && queryOk && extraOk;
    });
  }, [products, active, q, expanded]);

  function toggle(cat) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <h1>Order Portal</h1>
          <p>Designify 3 ordering portal for printed materials, below you will find all items in the range. Categorize the range with the buttons below.</p>
        </div>
      </section>
      <div className="container">
        <FilterBar filters={FILTERS} active={active} onToggle={toggle} onClear={() => setActive(new Set())} />
        {error ? <p className="status">{error}. Start the API with npm run dev in the server folder.</p> : null}
        <div className="grid">
          {visible.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
        {!error && visible.length === 0 ? <p className="status">No products match this filter.</p> : null}
        <div className="more-wrap">
          <button className="more" type="button" onClick={() => setExpanded((v) => !v)}>
            {expanded ? 'Show Less Products' : 'Show More Products'} <span>﹀</span>
          </button>
        </div>
      </div>
    </>
  );
}
