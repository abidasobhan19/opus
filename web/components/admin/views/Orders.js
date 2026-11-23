'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Badge, Head, Icon, Pager, listAmount, money, sliceRows } from '../ui';
import { QuickOrder } from './QuickOrder';

export function Orders({ ctx }) {
  const { db, ui, setUi, ping, mutate, setModal } = ctx;
  const q = ui.q.trim().toLowerCase();
  let rowsAll = db.orders.slice();
  if (['Treated', 'Paused', 'Finished'].includes(ui.tab)) rowsAll = rowsAll.filter((o) => (o.listStatus || o.status) === ui.tab);
  if (q) rowsAll = rowsAll.filter((o) => (o.id + ' ' + o.title + ' ' + o.customer + ' ' + o.email + ' ' + o.origin).toLowerCase().includes(q));
  const [mode, setMode] = useState('export');
  const rows = sliceRows(rowsAll, ui.page, 20);
  const counts = {
    all: db.orders.length,
    Treated: db.orders.filter((o) => (o.listStatus || o.status) === 'Treated').length,
    Paused: db.orders.filter((o) => (o.listStatus || o.status) === 'Paused').length,
    Finished: db.orders.filter((o) => (o.listStatus || o.status) === 'Finished').length,
  };
  return (
    <>
      <Head title="Orders" sub="Manage and track all customer orders">
        <Link className="btn" href="/admin/orders/new"><Icon name="plus" /> Add New Order</Link>
      </Head>
      <div className="status-tabs">
        {[['all', 'All'], ['Treated', 'Treated'], ['Paused', 'Paused'], ['Finished', 'Finished']].map(([id, label]) => (
          <button key={id} type="button" className={(ui.tab || 'all') === id ? 'on' : ''} onClick={() => setUi({ ...ui, tab: id, page: 1 })}>{label} ({counts[id] || 0})</button>
        ))}
      </div>
      <div className="toolbar">
        <label className="search"><Icon name="search" /><input value={ui.q} placeholder="Search orders, customers, order #…" onChange={(e) => setUi({ ...ui, q: e.target.value, page: 1 })} /></label>
        <span className="muted">Mass Action</span>
        <select value={mode} onChange={(e) => setMode(e.target.value)}><option value="export">Mark exported</option><option value="finished">Mark finished</option><option value="treated">Mark treated</option></select>
        <button className="ghost" type="button" onClick={async () => {
          await mutate('/api/admin/orders/mass', { method: 'POST', body: { mode, tab: ui.tab, q: ui.q } });
          ping('Mass action applied');
        }}>Apply</button>
      </div>
      <div className="table-card"><table><thead><tr><th>ORDERS</th><th>DATE</th><th>STATUS</th><th>AMOUNT</th><th>EXPORT STATUS</th><th>ORIGIN</th></tr></thead><tbody>
        {rows.map((o) => (
          <tr key={o.id}>
            <td><div className="name-block"><Link href={'/admin/order/' + o.id}><b>Order #{o.id}</b></Link><small>{o.title}</small>
              <button className="linkish" type="button" onClick={() => setModal(<QuickOrder order={o} onClose={() => setModal(null)} />)}>Quick View</button>
            </div></td>
            <td>{o.date}</td><td><Badge status={o.listStatus || o.status} /></td><td>SEK {money(listAmount(o))}</td><td><Badge status={o.export} /></td><td>{o.origin}</td>
          </tr>
        ))}
        {rows.length ? null : <tr><td className="empty" colSpan={6}>No orders match.</td></tr>}
      </tbody></table></div>
      <Pager total={rowsAll.length} page={ui.page} per={20} onPage={(page) => setUi({ ...ui, page })} />
    </>
  );
}
