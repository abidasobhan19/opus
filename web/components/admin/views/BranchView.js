import Link from 'next/link';
import { Crumb, Head, Icon } from '../ui';
import { InfoItem } from './InfoItem';
import { Missing } from './Missing';

export function BranchView({ company, branch }) {
  if (!branch) return <Missing label="Branch" />;
  return (
    <>
      <Crumb items={[{ label: 'Companies', href: 'companies' }, { label: company.name, href: 'company/' + company.id }, { label: 'Branches', href: 'company/' + company.id + '/branches' }, { label: branch.name }]} />
      <Head title={branch.name} sub={company.name} />
      <div className="metric-row">
        <article className="stat"><div><div className="k">Total Sales</div><div className="v">{Number(branch.sales).toFixed(2).replace('.', ',')} kr</div></div></article>
        <article className="stat"><div><div className="k">Active Orders</div><div className="v">{branch.orders}</div></div></article>
        <article className="stat"><div><div className="k">Users</div><div className="v">{branch.users}</div></div></article>
      </div>
      <article className="card" style={{ marginTop: 16 }}>
        <div className="head"><h2>Branch Information</h2><Link className="ghost" href={'/admin/company/' + company.id + '/branch/' + branch.id + '/edit'}><Icon name="pen" /> Edit Info</Link></div>
        <h2 style={{ fontSize: 26, margin: '14px 0 8px' }}>{branch.name}</h2>
        <p className="lead" style={{ color: '#4b5563', fontSize: 14, lineHeight: 1.55, maxWidth: 720 }}>{branch.description}</p>
        <div className="info-grid" style={{ marginTop: 16 }}>
          <InfoItem icon="mail" k="Email Address" v={branch.email} />
          <InfoItem icon="phone" k="Mobile Number" v={branch.phone} />
          <div className="info-item wide"><div className="ibox"><Icon name="pin" /></div><div><small>Address</small><b>{branch.address || '—'}</b></div></div>
          <InfoItem icon="user" k="Point of Contact" v={branch.poc} />
          <InfoItem icon="phone" k="POC Mobile Number" v={branch.pocMobile} />
        </div>
      </article>
    </>
  );
}
