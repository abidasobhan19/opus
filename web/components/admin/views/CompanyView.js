import Link from 'next/link';
import { Badge, Crumb, Head } from '../ui';
import { InfoItem } from './InfoItem';

export function CompanyView({ company }) {
  return (
    <>
      <Crumb items={[{ label: 'Companies', href: 'companies' }, { label: company.name }]} />
      <Head title={company.name} sub={company.location || company.address}>
        <Link className="btn" href={'/admin/company/' + company.id + '/branches'}>View Branches</Link>
        <Link className="btn dark" href={'/admin/company/' + company.id + '/users'}>View Users</Link>
      </Head>
      <article className="card" style={{ marginTop: 18 }}>
        <div className="profile">
          <div className="sphere" style={company.logo ? { backgroundImage: 'url(' + company.logo + ')', backgroundSize: 'cover' } : company.color ? { background: company.color } : undefined} />
          <div>
            <h2>{company.name}</h2>
            <Badge status={company.status} />
            <p className="lead">{company.description}</p>
            <div className="info-grid">
              <InfoItem icon="mail" k="Email Address" v={company.email} />
              <InfoItem icon="phone" k="Mobile Number" v={company.phone} />
              <InfoItem icon="building" k="Reg. Number" v={company.reg} />
              <div />
              <InfoItem icon="user" k="Point of Contact" v={company.poc} />
              <InfoItem icon="phone" k="POC Mobile Number" v={company.pocMobile} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
