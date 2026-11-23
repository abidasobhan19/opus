import Link from 'next/link';
import { Badge, Head } from '../ui';

export function Status({ ctx }) {
  return (
    <>
      <Head title="Product Status" sub="What is published, drafted, or out of stock." />
      <div className="table-card" style={{ marginTop: 16 }}><table><thead><tr><th>PRODUCT</th><th>STATUS</th><th>STOCK</th><th /></tr></thead><tbody>
        {ctx.db.products.map((p) => (
          <tr key={p.id}><td><b>{p.name}</b><br /><span className="muted">{p.article}</span></td><td><Badge status={p.status} /></td><td>{p.stock ? p.stock : <span className="badge paused"><i />Out of stock</span>}</td><td><Link href={'/admin/product/' + p.id + '/edit'}>Edit</Link></td></tr>
        ))}
      </tbody></table></div>
    </>
  );
}
