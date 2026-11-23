'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { api, login } from '../../lib/api';
import { Screen } from './Screen';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { DEMO, focusedRoute, sideKey } from './nav';

export default function AdminApp() {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const parts = (pathname.replace(/^\/admin\/?/, '') || 'companies').split('/').filter(Boolean);
  const here = parts.join('/');
  const catQuery = params.get('cat') || '';
  const [db, setDb] = useState(null);
  const [error, setError] = useState('');
  const [ui, setUi] = useState({ q: '', page: 1, tab: 'all', per: 10, cat: '', type: '', stock: '', brand: '' });
  const [toast, setToast] = useState('');
  const [modal, setModal] = useState(null);
  const [checked, setChecked] = useState([]);
  const [openMenus, setOpenMenus] = useState(() => new Set(['companies']));
  const [gear, setGear] = useState(false);
  const [bell, setBell] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);

  useEffect(() => {
    let gone = false;
    (async () => {
      try {
        await login(DEMO.email, DEMO.password);
        const data = await api('/api/admin/bootstrap', { auth: true });
        if (!gone) setDb(data);
      } catch (err) {
        if (!gone) setError(err.message);
      }
    })();
    return () => { gone = true; };
  }, []);

  useEffect(() => {
    setUi({ q: '', page: 1, tab: 'all', per: 10, cat: catQuery, type: '', stock: '', brand: '' });
    setChecked([]);
    setModal(null);
    setSideOpen(false);
    setGear(false);
    setBell(false);
  }, [pathname, catQuery]);

  function ping(message) {
    setToast(message);
    setTimeout(() => setToast(''), 2200);
  }

  async function mutate(path, options) {
    const data = await api(path, { auth: true, ...options });
    if (data.db) setDb(data.db);
    return data;
  }

  function go(hash) {
    router.push('/admin/' + hash);
  }

  const findCompany = (id) => db?.companies.find((row) => row.id === id);
  const findBranch = (id) => db?.branches.find((row) => row.id === id);
  const findUser = (id) => db?.users.find((row) => row.id === id);
  const findProduct = (id) => db?.products.find((row) => String(row.id) === String(id));
  const findOrder = (id) => db?.orders.find((row) => String(row.id) === String(id));
  const branchName = (id) => findBranch(id)?.name || '—';
  const companyName = (id) => findCompany(id)?.name || '—';

  const menuKey = sideKey(parts);
  const open = useMemo(() => {
    const next = new Set(openMenus);
    if (menuKey) next.add(menuKey);
    next.add('companies');
    return next;
  }, [openMenus, menuKey]);

  function toggleMenu(id) {
    setOpenMenus((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  if (error) {
    return <div className="adm"><div className="view"><h1>Admin API is not running</h1><p className="sub">{error}</p><p>Start it with <b>npm run dev</b> inside the server folder, then refresh.</p></div></div>;
  }
  if (!db) return <div className="adm"><div className="view">Loading admin…</div></div>;

  const ctx = { db, ui, setUi, go, ping, mutate, checked, setChecked, setModal, findCompany, findBranch, findUser, findProduct, findOrder, branchName, companyName };

  return (
    <div className={'adm' + (focusedRoute(parts) ? ' focused' : '')}>
      <div className="app">
        <Sidebar here={here} menuKey={menuKey} open={open} sideOpen={sideOpen} onToggle={toggleMenu} />
        <div className={'scrim' + (sideOpen ? ' show' : '')} onClick={() => setSideOpen(false)} />
        <div className="maincol">
          <Topbar parts={parts} admin={db.admin} gear={gear} bell={bell} setGear={setGear} setBell={setBell} onOpenMenu={() => setSideOpen(true)} />
          <main className="view">
            <Screen parts={parts} ctx={ctx} />
          </main>
        </div>
      </div>
      {modal}
      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  );
}
