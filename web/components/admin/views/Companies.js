import Link from 'next/link';
import { Badge, Head, Icon, Pager, sliceRows } from '../ui';

export function Companies({ ctx }) {
  const { db, ui, setUi } = ctx;
  const q = ui.q.trim().toLowerCase();
  const companies = db.companies.filter((c) => !q || (c.name + ' ' + c.location + ' ' + c.reg + ' ' + c.email).toLowerCase().includes(q));
  const branches = db.branches.filter((b) => !q || (b.name + ' ' + ctx.companyName(b.companyId)).toLowerCase().includes(q));
  const list = ui.tab === 'branches' ? branches : companies;
  const rows = sliceRows(list, ui.page, 8);
  const branchTotal = db.companies.reduce((n, c) => n + (c.listedBranches != null ? c.listedBranches : db.branches.filter((b) => b.companyId === c.id).length), 0);
  return (
    <>
      <Head title="Companies" sub="Manage and view all companies connected to the ordering portal.">
        <Link className="btn pill" href="/admin/companies/new"><Icon name="plus" /> Create Company</Link>
      </Head>
      <div className="stats">
        <article className="stat"><div><div className="k">Total Companies</div><div className="v">{String(db.companies.length).padStart(2, '0')}</div></div><div className="ic"><Icon name="building" /></div></article>
        <article className="stat"><div><div className="k">Branches</div><div className="v">{branchTotal}</div></div><div className="ic"><Icon name="check" /></div></article>
        <article className="stat"><div><div className="k">Total Users</div><div className="v">{db.users.length}</div></div><div className="ic"><Icon name="users" /></div></article>
      </div>
      <div className="toolbar">
        <label className="search"><Icon name="search" /><input value={ui.q} placeholder={ui.tab === 'branches' ? 'Search branches...' : 'Search companies...'} onChange={(e) => setUi({ ...ui, q: e.target.value, page: 1 })} /></label>
        <div className="tabs">
          <button type="button" className={ui.tab !== 'branches' ? 'on' : ''} onClick={() => setUi({ ...ui, tab: 'all', page: 1 })}>All Companies</button>
          <button type="button" className={ui.tab === 'branches' ? 'on' : ''} onClick={() => setUi({ ...ui, tab: 'branches', page: 1 })}>Branches</button>
        </div>
      </div>
      <div className="table-card">
        {ui.tab === 'branches' ? (
          <table><thead><tr><th>BRANCH</th><th>COMPANY</th><th>USERS</th><th>STATUS</th><th /></tr></thead><tbody>
            {rows.map((b) => (
              <tr key={b.id}><td><b>{b.name}</b></td><td>{ctx.companyName(b.companyId)}</td><td><span className="users"><Icon name="user" />{b.users}</span></td><td><Badge status={b.status} /></td>
                <td className="actions-cell"><Link className="iconbtn" href={'/admin/company/' + b.companyId + '/branch/' + b.id}><Icon name="eye" /></Link><Link className="iconbtn" href={'/admin/company/' + b.companyId + '/branch/' + b.id + '/edit'}><Icon name="pen" /></Link></td>
              </tr>
            ))}
            {rows.length ? null : <tr><td className="empty" colSpan={5}>No branches match this search.</td></tr>}
          </tbody></table>
        ) : (
          <table><thead><tr><th>COMPANY</th><th>REG. NUMBER</th><th>USERS</th><th>STATUS</th><th>BRANCHES</th><th style={{ textAlign: 'right' }}>ACTIONS</th></tr></thead><tbody>
            {rows.map((c) => (
              <tr key={c.id}>
                <td><Link className="who-cell" href={'/admin/company/' + c.id}><div className="mark"><Icon name="building" /></div><div><b>{c.name}</b><small>{c.location || c.address}</small></div></Link></td>
                <td>{c.reg || '—'}</td>
                <td><span className="users"><Icon name="user" />{db.users.filter((u) => u.companyId === c.id).length}</span></td>
                <td><Badge status={c.status} /></td>
                <td>{c.listedBranches != null ? c.listedBranches : db.branches.filter((b) => b.companyId === c.id).length}</td>
                <td className="actions-cell"><Link className="iconbtn" href={'/admin/company/' + c.id}><Icon name="eye" /></Link><Link className="iconbtn" href={'/admin/company/' + c.id + '/edit'}><Icon name="pen" /></Link></td>
              </tr>
            ))}
            {rows.length ? null : <tr><td className="empty" colSpan={6}>No companies match this search.</td></tr>}
          </tbody></table>
        )}
      </div>
      <Pager total={list.length} page={ui.page} per={8} dark onPage={(page) => setUi({ ...ui, page })} />
    </>
  );
}
