'use client';

import Link from 'next/link';
import { Icon } from './ui';

export function Topbar({ parts, admin, gear, bell, setGear, setBell, onOpenMenu }) {
  return (
    <header className="top">
      <button className="burger" type="button" aria-label="Open menu" onClick={onOpenMenu}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
      </button>
      <nav className="topnav">
        {[['home', 'Home', 'home'], ['info', 'Info', 'info'], ['status', 'Product Status', 'tag']].map(([id, label, icon]) => (
          <Link key={id} href={'/admin/' + id} className={parts[0] === id ? 'on' : ''}><Icon name={icon} /><span>{label}</span></Link>
        ))}
      </nav>
      <div className="top-right">
        <div className="popwrap">
          <button className="iconbtn" type="button" aria-label="Settings" onClick={() => { setGear((v) => !v); setBell(false); }}><Icon name="gear" /></button>
          {gear ? <div className="pop"><Link href="/admin/settings">Settings</Link><Link href="/admin/info">Admin info</Link><Link href="/">Back to ordering portal</Link></div> : null}
        </div>
        <div className="popwrap">
          <button className="iconbtn bell" type="button" aria-label="Notifications" onClick={() => { setBell((v) => !v); setGear(false); }}><Icon name="bell" /><i className="dot" /></button>
          {bell ? <div className="pop">No new notifications.</div> : null}
        </div>
        <div className="who">
          <div className="avatar" aria-hidden="true">
            <svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="#d5ebe7" /><circle cx="18" cy="14" r="6" fill="#e7b89a" /><path d="M6 32c1.6-7 6-10 12-10s10.4 3 12 10" fill="#0f766e" /></svg>
          </div>
          <div><b>{admin?.name || 'Admin User'}</b><span>{admin?.role || 'Super Admin'}</span></div>
        </div>
      </div>
    </header>
  );
}
