import Link from 'next/link';
import { Badge, Crumb, Head, Icon, Pager, sliceRows } from '../ui';

export function Branches({ ctx, company }) {
  const { ui, setUi, db } = ctx;
  const q = ui.q.trim().toLowerCase();
  const rowsAll = db.branches.filter((b) => b.companyId === company.id && (!q || (b.name + ' ' + company.name).toLowerCase().includes(q)));
  const rows = sliceRows(rowsAll, ui.page, 8);
  const users = db.users.filter((u) => u.companyId === company.id).length;
  return (
    <>
      <Crumb items={[{ label: 'Companies', href: 'companies' }, { label: company.name, href: 'company/' + company.id }, { label: 'Branches' }]} />
      <Head title="Branches" sub="Manage and view all companies connected to the ordering portal.">
        <Link className="btn pill" href={'/admin/company/' + company.id + '/branches/new'}><Icon name="plus" /> Create New Branch</Link>
      </Head>
      <div className="toolbar"><label className="search"><Icon name="search" /><input value={ui.q} placeholder="Search Branches..." onChange={(e) => setUi({ ...ui, q: e.target.value, page: 1 })} /></label></div>
      <div className="table-card"><table><thead><tr><th>BRANCH</th><th>COMPANY</th><th>USERS</th><th>STATUS</th><th style={{ textAlign: 'right' }}>ACTIONS</th></tr></thead><tbody>
        {rows.map((b) => (
          <tr key={b.id}>
            <td><Link href={'/admin/company/' + company.id + '/branch/' + b.id}><b>{b.name}</b></Link></td>
            <td>{company.name}</td>
            <td><span className="users"><Icon name="user" /> {b.users}</span></td>
            <td><Badge status={b.status} /></td>
            <td className="actions-cell">
              <Link className="iconbtn" href={'/admin/company/' + company.id + '/branch/' + b.id}><Icon name="eye" /></Link>
              <Link className="iconbtn" href={'/admin/company/' + company.id + '/branch/' + b.id + '/edit'}><Icon name="pen" /></Link>
            </td>
          </tr>
        ))}
        {rows.length ? null : <tr><td className="empty" colSpan={5}>No branches yet.</td></tr>}
      </tbody></table></div>
      <Pager total={rowsAll.length} page={ui.page} per={8} dark onPage={(page) => setUi({ ...ui, page })} />
      <article className="stat" style={{ marginTop: 16 }}><div><div className="k">Total Users</div><div className="v">{users}</div></div><div className="ic"><Icon name="users" /></div></article>
      <Link className="btn dark" style={{ marginTop: 14 }} href={'/admin/company/' + company.id + '/users'}>View All Users</Link>
    </>
  );
}
