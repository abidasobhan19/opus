import { Icon } from '../ui';

export function InfoItem({ icon, k, v }) {
  return <div className="info-item"><div className="ibox"><Icon name={icon} /></div><div><small>{k}</small><b>{v || '—'}</b></div></div>;
}
