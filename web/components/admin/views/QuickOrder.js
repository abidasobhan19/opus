import Link from 'next/link';
import { Badge, listAmount, money } from '../ui';

export function QuickOrder({ order, onClose }) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="dialog" role="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="head"><h2>Order Overview</h2><button className="ghost" type="button" onClick={onClose}>Close</button></div>
        <p className="sub">Order #{order.id}</p>
        <div className="info-grid">
          <div><small className="muted">CUSTOMER</small><b>{order.customer}</b></div>
          <div><small className="muted">ORDER DATE</small><b>{order.date}</b></div>
          <div><small className="muted">STATUS</small><div><Badge status={order.status} /></div></div>
          <div><small className="muted">ORDER AMOUNT</small><b>SEK {money(listAmount(order))}</b></div>
        </div>
        <h3 style={{ margin: '16px 0 8px', fontSize: 14 }}>Summary</h3>
        {(order.lines || []).map((line, index) => (
          <div className="pagerow" key={index} style={{ margin: 0, padding: '6px 0', borderBottom: '1px solid #f3f4f6' }}><span>{line.name} ({line.qty})</span><b>SEK {money(line.qty * line.price)}</b></div>
        ))}
        <div className="dlg-actions"><Link className="btn" href={'/admin/order/' + order.id} onClick={onClose}>View Full Order</Link></div>
      </div>
    </div>
  );
}
