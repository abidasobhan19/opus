import Link from 'next/link';

export const CATS = [
  ['Decals', 'decal'],
  ['Profile Products', 'car'],
  ['Posters', 'image'],
  ['Signs', 'flag'],
  ['Print Products', 'print'],
  ['Brochures', 'book'],
  ['Flags', 'flag'],
  ['Other', 'dots'],
];

const PATHS = {
  layers: '<path d="M12 3 20 7 12 11 4 7 12 3z"/><path d="M4 12l8 4 8-4M4 16.5 12 20.5 20 16.5"/>',
  clip: '<rect x="6" y="4" width="12" height="16.5" rx="2"/><path d="M9 4.2h6V7H9zM8.5 11h7M8.5 15h5"/>',
  user: '<circle cx="12" cy="8" r="3.2"/><path d="M5.5 19.5c1.1-3.2 3.2-4.8 6.5-4.8s5.4 1.6 6.5 4.8"/>',
  users: '<circle cx="9" cy="8.5" r="2.8"/><path d="M3.8 18.5c.8-2.6 2.5-4 5.2-4s4.4 1.4 5.2 4"/><circle cx="17" cy="9" r="2.2"/><path d="M16 14.8c1.5-.2 2.8.3 3.8 2"/>',
  building: '<path d="M4 20V7l8-3 8 3v13"/><path d="M9 20v-4h6v4M9 9h.01M12 9h.01M15 9h.01M9 12.5h.01M12 12.5h.01M15 12.5h.01"/>',
  home: '<path d="M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-5.2v-6.2H10.2V21H5a1 1 0 0 1-1-1v-8.8z"/>',
  info: '<circle cx="12" cy="12" r="8"/><path d="M12 11v5M12 8h.01"/>',
  tag: '<path d="M3.5 12.2V5h7.2L20.5 14.8l-5.7 5.7L3.5 12.2z"/><circle cx="8.2" cy="9" r="1.1" fill="currentColor" stroke="none"/>',
  eye: '<path d="M2.5 12S6.5 6.5 12 6.5 21.5 12 21.5 12 17.5 17.5 12 17.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.6"/>',
  pen: '<path d="M4 20h4l11-11-4-4L4 16v4z"/><path d="M13 7l4 4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16.5 20.5 21"/>',
  check: '<circle cx="12" cy="12" r="8"/><path d="M8.5 12.2 11 14.7 15.8 9.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  phone: '<path d="M8 3h3l1.5 4-2 1.5a12 12 0 0 0 5 5L17 12l4 1.5V17a2 2 0 0 1-2 2A15 15 0 0 1 5 5a2 2 0 0 1 2-2z"/>',
  pin: '<path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z"/><circle cx="12" cy="11" r="2"/>',
  trash: '<path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3.5v2.2M12 18.3V20.5M3.5 12h2.2M18.3 12h2.2M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6 5.8 18.2"/>',
  bell: '<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
  cloud: '<path d="M7 18h10a4 4 0 0 0 .4-8 6 6 0 0 0-11.5 1.5A3.5 3.5 0 0 0 7 18z"/><path d="M12 12v5M10 14.5 12 12l2 2.5"/>',
  box: '<path d="M3 8l9-4 9 4-9 4-9-4z"/><path d="M3 8v8l9 4 9-4V8M12 12v8"/>',
  out: '<path d="M14 7V5H5v14h9v-2M10 12h9M16 9l3 3-3 3"/>',
  chev: '<path d="M6 9l6 6 6-6"/>',
};

const BADGE = {
  Active: '', Treated: '', Published: '', Paused: 'paused', Finished: 'finished',
  Pending: 'pending', Exported: 'exported', 'Not Exported': 'off', Draft: 'draft',
  Private: 'off', Inactive: 'off', 'Out of stock': 'paused',
};

export function Icon({ name, className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={name === 'plus' ? 2 : 1.8} dangerouslySetInnerHTML={{ __html: PATHS[name] || '' }} />
  );
}

export function Badge({ status }) {
  const cls = BADGE[status] || '';
  return <span className={cls ? 'badge ' + cls : 'badge'}><i />{status || 'Active'}</span>;
}

export function money(n) {
  return Math.round(Number(n) || 0).toLocaleString('en-US');
}

export function orderAmount(order) {
  return (order.lines || []).reduce((sum, line) => sum + Number(line.qty) * Number(line.price), 0) + (Number(order.shipping) || 0);
}

export function listAmount(order) {
  return order.shownAmount != null ? order.shownAmount : orderAmount(order);
}

export function Crumb({ items }) {
  return (
    <nav className="crumb">
      {items.map((item, index) => (
        <span key={item.label + index} style={{ display: 'contents' }}>
          {index ? <span>›</span> : null}
          {item.href ? <Link href={'/admin/' + item.href}>{item.label}</Link> : <b>{item.label}</b>}
        </span>
      ))}
    </nav>
  );
}

export function Head({ title, sub, children }) {
  return (
    <div className="head">
      <div>
        <h1>{title}</h1>
        {sub ? <p className="sub">{sub}</p> : null}
      </div>
      <div className="actions">{children}</div>
    </div>
  );
}

export function Pager({ total, page, per, onPage, dark, extra }) {
  const pages = Math.max(1, Math.ceil(total / per) || 1);
  const safe = Math.min(Math.max(1, page), pages);
  const from = total ? (safe - 1) * per + 1 : 0;
  const to = Math.min(safe * per, total);
  const want = [...new Set([1, 2, 3, pages, safe])].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  const nums = [];
  want.forEach((n, index) => {
    if (index && n - want[index - 1] > 1) nums.push('…' + index);
    nums.push(n);
  });
  return (
    <div className="pagerow">
      <div>Showing <b>{total ? from : 0}{to !== from ? '–' + to : ''}</b> of <b>{total}</b></div>
      {extra}
      <div className="pages">
        <button type="button" disabled={safe <= 1} onClick={() => onPage(safe - 1)} aria-label="Previous">&lt;</button>
        {nums.map((n) => (
          typeof n === 'string'
            ? <span key={n}>…</span>
            : <button key={n} type="button" className={(n === safe ? 'on ' : '') + (dark ? 'dark' : '')} onClick={() => onPage(n)}>{n}</button>
        ))}
        <button type="button" disabled={safe >= pages} onClick={() => onPage(safe + 1)} aria-label="Next">&gt;</button>
      </div>
    </div>
  );
}

export function sliceRows(rows, page, per) {
  const start = (Math.max(1, page) - 1) * per;
  return rows.slice(start, start + per);
}
