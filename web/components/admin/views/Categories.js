import Link from 'next/link';
import { CATS, Head } from '../ui';

export function Categories({ ctx }) {
  return (
    <>
      <Head title="Categories" sub="Groups used on the ordering portal. Open one to filter the product list." />
      <div className="cats" style={{ marginTop: 18 }}>
        {CATS.map(([name]) => {
          const n = ctx.db.products.filter((p) => p.category === name || (p.categories || []).includes(name)).length;
          return <Link key={name} className="cat" href={'/admin/products?cat=' + encodeURIComponent(name)} style={{ textDecoration: 'none', minHeight: 120 }}><span>{name}</span><small className="muted">{n} products</small></Link>;
        })}
      </div>
    </>
  );
}
