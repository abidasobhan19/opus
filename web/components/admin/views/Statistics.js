import Link from 'next/link';
import { Badge, Head, money, orderAmount } from '../ui';

export function Statistics({ ctx }) {
  const sum = ctx.db.orders.reduce((total, order) => total + orderAmount(order), 0);
  return (
    <>
      <Head title="Statistics" sub="Orders, products and accounts across the portal." />
      <div className="stats">
        <article className="stat"><div><div className="k">Orders</div><div className="v">{ctx.db.orders.length}</div></div></article>
        <article className="stat"><div><div className="k">Order value</div><div className="v" style={{ fontSize: 22 }}>{money(sum)} SEK</div></div></article>
        <article className="stat"><div><div className="k">Products</div><div className="v">{ctx.db.products.length}</div></div></article>
      </div>
      <article className="card" style={{ marginTop: 16 }}>
        <h2>Order status</h2>
        {['Treated', 'Paused', 'Finished'].map((status) => (
          <p key={status} style={{ marginTop: 10 }}><Badge status={status} /> {ctx.db.orders.filter((o) => o.status === status).length}</p>
        ))}
        <p style={{ marginTop: 14 }}><Link className="linkish" href="/admin/orders">Open orders</Link></p>
      </article>
    </>
  );
}
