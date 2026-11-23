import Link from 'next/link';
import { Head } from '../ui';

export function Settings() {
  return (
    <>
      <Head title="Settings" sub="All portal settings and related lists." />
      <div className="home-grid">
        <Link className="home-card" href="/admin/info"><b>Info</b><span>How the admin is organised.</span></Link>
        <Link className="home-card" href="/admin/status"><b>Product Status</b><span>Published, draft, and stock.</span></Link>
        <Link className="home-card" href="/admin/statistics"><b>Statistics</b><span>Orders and catalog totals.</span></Link>
        <Link className="home-card" href="/admin/suppliers"><b>Suppliers</b><span>Print and material suppliers.</span></Link>
        <Link className="home-card" href="/"><b>Ordering portal</b><span>Leave admin and return to the shop.</span></Link>
      </div>
    </>
  );
}
