'use client';

import Link from 'next/link';
import { Icon } from './ui';
import { MENUS } from './nav';

export function Sidebar({ here, menuKey, open, sideOpen, onToggle }) {
  return (
    <aside className={'side' + (sideOpen ? ' open' : '')}>
      <Link className="brand" href="/admin/companies">
        <div className="wordmark">tryckeriett</div>
        <div className="tag">ALLT MED TRYCK</div>
      </Link>
      <nav className="sidenav">
        <div className={'acc' + (open.has('companies') ? ' open' : '') + (menuKey === 'companies' ? ' on' : '')}>
          <button type="button" onClick={() => onToggle('companies')}><Icon name="building" /><span className="lbl">All Companies</span><Icon name="chev" className="chev" /></button>
          <div className="sub">
            {[['All Companies', 'companies'], ['Create Company', 'companies/new'], ['Branches', 'company/opus/branches']].map(([label, href]) => (
              <Link key={href} href={'/admin/' + href} className={here === href ? 'on' : ''}>{label}</Link>
            ))}
            {MENUS.map((menu) => (
              <div key={menu.id} className={'acc nest' + (open.has(menu.id) ? ' open' : '') + (menuKey === menu.id ? ' on' : '')}>
                <button type="button" onClick={() => onToggle(menu.id)}><Icon name={menu.icon} /><span className="lbl">{menu.label}</span><Icon name="chev" className="chev" /></button>
                <div className="sub">
                  {menu.items.map(([label, href]) => <Link key={href} href={'/admin/' + href} className={here === href ? 'on' : ''}>{label}</Link>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>
      <Link className="logout" href="/"><Icon name="out" /> Log Out</Link>
    </aside>
  );
}
