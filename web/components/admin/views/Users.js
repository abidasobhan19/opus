import Link from 'next/link';
import { downloadCsv } from '../../../lib/api';
import { Crumb, Head, Icon, Pager, sliceRows } from '../ui';

export function Users({ ctx, company }) {
  const { db, ui, setUi, ping, mutate } = ctx;
  const q = ui.q.trim().toLowerCase();
  let rowsAll = db.users.filter((u) => !company || u.companyId === company.id);
  rowsAll = rowsAll.filter((u) => !q || (u.name + ' ' + u.email + ' ' + u.phone + ' ' + ctx.branchName(u.branchId)).toLowerCase().includes(q));
  const per = ui.per || 10;
  const rows = sliceRows(rowsAll, ui.page, per);
  return (
    <>
      {company ? <Crumb items={[{ label: 'Companies', href: 'companies' }, { label: company.name, href: 'company/' + company.id }, { label: 'Users' }]} /> : null}
      <Head title="Users" sub={company ? 'Manage all users, guests, and permissions' : 'Every account that can sign in to a company portal.'}>
        {company ? <button className="ghost" type="button" onClick={() => downloadCsv('/api/admin/users.csv?companyId=' + company.id, 'users.csv')}>↓ Export User Details</button> : null}
        {company ? <Link className="ghost" href={'/admin/company/' + company.id + '/users/guest'}><Icon name="user" /> Create Guest User</Link> : null}
        <Link className="btn" href={company ? '/admin/company/' + company.id + '/users/new' : '/admin/users/new'}><Icon name="plus" /> Add New User</Link>
      </Head>
      <div className="toolbar">
        <label className="search"><Icon name="search" /><input value={ui.q} placeholder="Search by name or email..." onChange={(e) => setUi({ ...ui, q: e.target.value, page: 1 })} /></label>
      </div>
      <div className="table-card">
        <table><thead><tr><th>NAME</th><th>EMAIL</th><th>PHONE</th><th>BRANCH</th><th>LAST LOGIN</th><th style={{ textAlign: 'right' }}>ACTIONS</th></tr></thead><tbody>
          {rows.map((u) => (
            <tr key={u.id}>
              <td><Link href={'/admin/' + (company ? 'company/' + company.id + '/user/' + u.id : 'user/' + u.id)}><b>{u.name}</b></Link></td>
              <td>{u.email}</td><td>{u.phone}</td><td>{ctx.branchName(u.branchId)}</td>
              <td>{u.lastLogin}<br /><span className="muted">{u.lastTime}</span></td>
              <td className="actions-cell"><button className="iconbtn" type="button" aria-label="Remove" onClick={async () => { await mutate('/api/admin/users/' + u.id, { method: 'DELETE' }); ping('User removed'); }}><Icon name="trash" /></button></td>
            </tr>
          ))}
          {rows.length ? null : <tr><td className="empty" colSpan={6}>No users match this search.</td></tr>}
        </tbody></table>
        <Pager total={rowsAll.length} page={ui.page} per={per} onPage={(page) => setUi({ ...ui, page })} extra={<label className="per">Rows per page: <input type="number" min="5" max="100" value={per} onChange={(e) => setUi({ ...ui, per: Math.max(5, Number(e.target.value) || 10), page: 1 })} /></label>} />
      </div>
    </>
  );
}
