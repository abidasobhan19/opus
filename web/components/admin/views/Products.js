import Link from 'next/link';
import { downloadCsv } from '../../../lib/api';
import { Head, Icon, Pager, sliceRows } from '../ui';

export function Products({ ctx }) {
  const { db, ui, setUi, checked, setChecked, ping, mutate } = ctx;
  const q = ui.q.trim().toLowerCase();
  let rowsAll = db.products.slice();
  if (['Published', 'Draft', 'Private'].includes(ui.tab)) rowsAll = rowsAll.filter((p) => p.status === ui.tab);
  if (ui.cat) rowsAll = rowsAll.filter((p) => p.category === ui.cat || (p.categories || []).includes(ui.cat));
  if (ui.type) rowsAll = rowsAll.filter((p) => p.type === ui.type);
  if (ui.stock === 'out') rowsAll = rowsAll.filter((p) => !p.stock);
  if (ui.stock === 'in') rowsAll = rowsAll.filter((p) => p.stock > 0);
  if (ui.brand) rowsAll = rowsAll.filter((p) => p.brand === ui.brand);
  if (q) rowsAll = rowsAll.filter((p) => (p.name + ' ' + p.article + ' ' + p.brand + ' ' + p.id).toLowerCase().includes(q));
  const rows = sliceRows(rowsAll, ui.page, 8);
  const counts = {
    all: db.products.length,
    Published: db.products.filter((p) => p.status === 'Published').length,
    Draft: db.products.filter((p) => p.status === 'Draft').length,
    Private: db.products.filter((p) => p.status === 'Private').length,
  };
  const brands = [...new Set(db.products.map((p) => p.brand).filter(Boolean))];
  const types = [...new Set(db.products.map((p) => p.type).filter(Boolean))];
  const cats = [...new Set(db.products.flatMap((p) => [p.category, ...(p.categories || [])]).filter(Boolean))];

  async function trash() {
    if (!checked.length) return ping('Select products first');
    await mutate('/api/admin/products/trash', { method: 'POST', body: { ids: checked } });
    setChecked([]);
    ping('Moved to trash');
  }
  async function discount() {
    if (!checked.length) return ping('Select products first');
    const pct = Number(window.prompt('Discount percent', '10'));
    if (!pct) return;
    await mutate('/api/admin/products/discount', { method: 'POST', body: { ids: checked, percent: pct } });
    ping('Discount applied');
  }
  async function duplicate(id) {
    const data = await mutate('/api/admin/products/' + id + '/duplicate', { method: 'POST' });
    ping('Product duplicated');
    ctx.go('product/' + data.product.id + '/edit');
  }
  async function onImport(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const csv = await file.text();
    await mutate('/api/admin/products/import', { method: 'POST', body: { csv } });
    ping('Import finished');
    event.target.value = '';
  }

  return (
    <>
      <Head title="Product Management" sub="Manage your product catalog.">
        <button className="ghost" type="button" onClick={() => downloadCsv('/api/admin/products.csv', 'products.csv')}>Export</button>
        <label className="ghost">Import<input type="file" accept=".csv,text/csv" hidden onChange={onImport} /></label>
        <Link className="btn" href="/admin/products/new"><Icon name="plus" /> Add New Product</Link>
      </Head>
      <div className="status-tabs">
        {[['all', 'All'], ['Published', 'Published'], ['Draft', 'Draft'], ['Private', 'Private']].map(([id, label]) => (
          <button key={id} type="button" className={(ui.tab || 'all') === id ? 'on' : ''} onClick={() => setUi({ ...ui, tab: id, page: 1 })}>{label} ({counts[id] || 0})</button>
        ))}
      </div>
      <div className="toolbar"><label className="search"><Icon name="search" /><input value={ui.q} placeholder="Search products..." onChange={(e) => setUi({ ...ui, q: e.target.value, page: 1 })} /></label></div>
      <div className="filters">
        <span className="muted">Filters</span>
        <select value={ui.cat} onChange={(e) => setUi({ ...ui, cat: e.target.value, page: 1 })}><option value="">Category</option>{cats.map((c) => <option key={c}>{c}</option>)}</select>
        <select value={ui.type} onChange={(e) => setUi({ ...ui, type: e.target.value, page: 1 })}><option value="">Product Type</option>{types.map((c) => <option key={c}>{c}</option>)}</select>
        <select value={ui.stock} onChange={(e) => setUi({ ...ui, stock: e.target.value, page: 1 })}><option value="">Stock Status</option><option value="in">In stock</option><option value="out">Out of stock</option></select>
        <select value={ui.brand} onChange={(e) => setUi({ ...ui, brand: e.target.value, page: 1 })}><option value="">Brand</option>{brands.map((c) => <option key={c}>{c}</option>)}</select>
        <button type="button" className="linkish" onClick={() => setUi({ ...ui, cat: '', type: '', stock: '', brand: '', page: 1 })}>Clear filters</button>
      </div>
      <div className="actions" style={{ marginBottom: 10 }}>
        <button className="ghost" type="button" onClick={() => downloadCsv('/api/admin/products.csv', 'products.csv')}>Export to CSV</button>
        <button className="ghost" type="button" onClick={discount}>Apply Discount</button>
        <button className="ghost" type="button" onClick={trash}>Add to Trash</button>
      </div>
      <div className="table-card"><table><thead><tr>
        <th><input className="check" type="checkbox" checked={rows.length > 0 && rows.every((p) => checked.includes(String(p.id)))} onChange={(e) => {
          const ids = rows.map((p) => String(p.id));
          setChecked(e.target.checked ? [...new Set([...checked, ...ids])] : checked.filter((id) => !ids.includes(id)));
        }} /></th>
        <th>IMAGE</th><th>PRODUCT NAME</th><th>ARTICLE NO.</th><th>STOCK</th><th>PRICE</th><th>CATEGORY</th><th>LABEL</th><th>BRAND</th><th>DATE</th>
      </tr></thead><tbody>
        {rows.map((p) => (
          <tr key={p.id}>
            <td><input className="check" type="checkbox" checked={checked.includes(String(p.id))} onChange={(e) => setChecked(e.target.checked ? [...checked, String(p.id)] : checked.filter((id) => id !== String(p.id)))} /></td>
            <td><div className="thumb" style={{ background: p.color || '#e5e7eb' }} /></td>
            <td><div className="name-block"><b>{p.name}</b>
              <div className="mini-links">
                <Link href={'/admin/product/' + p.id + '/edit'}>Quick Edit</Link><span className="sep">|</span>
                <Link href={'/admin/product/' + p.id}>View</Link><span className="sep">|</span>
                <button type="button" onClick={() => duplicate(p.id)}>Duplicate</button><span className="sep">|</span>
                <Link href={'/admin/product/' + p.id + '/edit'}>Edit</Link>
              </div>
              <span className="muted">ID: {p.id}</span>
            </div></td>
            <td>{p.article}</td>
            <td>{p.stock ? p.stock : <span className="badge paused"><i />Out of stock</span>}</td>
            <td><b>{Math.round(Number(p.price) || 0)} kr</b></td>
            <td>{p.category}</td>
            <td>{p.label ? <span className={'chip' + (p.label === 'Bestseller' ? ' orange' : '')}>{p.label}</span> : '—'}</td>
            <td>{p.brand}</td>
            <td>{p.date}</td>
          </tr>
        ))}
        {rows.length ? null : <tr><td className="empty" colSpan={10}>No products match.</td></tr>}
      </tbody></table></div>
      <Pager total={rowsAll.length} page={ui.page} per={8} onPage={(page) => setUi({ ...ui, page })} />
    </>
  );
}
