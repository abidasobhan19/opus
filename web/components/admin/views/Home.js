import Link from 'next/link';
import { Head } from '../ui';

export function Home({ ctx }) {
  const opus = ctx.db.companies.find((c) => c.id === 'opus') || ctx.db.companies[0];
  const branches = opus?.listedBranches ?? ctx.db.branches.filter((b) => b.companyId === opus?.id).length;
  return (
    <>
      <Head title="Home" sub="Tryckeriett admin for every company on the ordering portal." />
      <div className="home-grid">
        <Link className="home-card" href="/admin/companies"><b>Companies</b><span>{String(ctx.db.companies.length).padStart(2, '0')} connected. Opus is live with {branches} branches.</span></Link>
        <Link className="home-card" href="/admin/orders"><b>Orders</b><span>{ctx.db.orders.length} orders in the list. Track treated, paused and finished jobs.</span></Link>
        <Link className="home-card" href="/admin/products"><b>Products</b><span>{ctx.db.products.length} products in the catalog, ready to add to an order.</span></Link>
        <Link className="home-card" href="/admin/company/opus/users"><b>Users</b><span>{ctx.db.users.length} accounts across the portals.</span></Link>
      </div>
    </>
  );
}
