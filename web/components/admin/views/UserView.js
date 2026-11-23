import Link from 'next/link';
import { Crumb, Head, Icon } from '../ui';
import { InfoItem } from './InfoItem';
import { Missing } from './Missing';

export function UserView({ ctx, user }) {
  if (!user) return <Missing label="User" />;
  const company = ctx.findCompany(user.companyId);
  const branch = ctx.findBranch(user.branchId);
  const edit = company ? 'company/' + company.id + '/user/' + user.id + '/edit' : 'user/' + user.id + '/edit';
  return (
    <>
      {company ? <Crumb items={[{ label: 'Companies', href: 'companies' }, { label: company.name, href: 'company/' + company.id }, { label: 'Users', href: 'company/' + company.id + '/users' }, { label: user.name }]} /> : <Crumb items={[{ label: 'Users', href: 'users' }, { label: user.name }]} />}
      <Head title={user.name} sub={branch?.name || ''}><Link className="btn" href={'/admin/' + edit}><Icon name="pen" /> Edit User</Link></Head>
      <article className="card" style={{ marginTop: 16 }}>
        <h2 style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--teal-deep)' }}><Icon name="user" /> User Information</h2>
        <div className="info-grid" style={{ marginTop: 18 }}>
          <InfoItem icon="user" k="FULL NAME" v={user.name} />
          <InfoItem icon="mail" k="EMAIL ADDRESS" v={user.email} />
          <InfoItem icon="building" k="COMPANY" v={company?.name} />
          <InfoItem icon="pin" k="BRANCH" v={branch?.name} />
          <InfoItem icon="phone" k="CONTACT NUMBER" v={user.phone} />
          <InfoItem icon="check" k="ROLE" v={user.role || 'Customer'} />
        </div>
        <div className="metric-row">
          <div className="metric"><small>TOTAL ORDERS</small><b>{user.orders || 0}</b></div>
          <div className="metric"><small>LAST ACTIVE</small><b>{user.active || user.lastLogin || '—'}</b></div>
          <div className="metric"><small>CREATED DATE</small><b>{user.created || '—'}</b></div>
        </div>
      </article>
    </>
  );
}
