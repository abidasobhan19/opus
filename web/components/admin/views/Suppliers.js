import { Badge, Head, Icon } from '../ui';

export function Suppliers({ ctx }) {
  const { db, mutate, ping } = ctx;
  return (
    <>
      <Head title="Suppliers" sub="Print and material suppliers used for portal orders.">
        <button className="btn" type="button" onClick={async () => {
          const name = window.prompt('Supplier name');
          if (!name) return;
          await mutate('/api/admin/suppliers', { method: 'POST', body: { name, contact: window.prompt('Contact email') || '', city: window.prompt('City') || '' } });
          ping('Supplier added');
        }}><Icon name="plus" /> Add Supplier</button>
      </Head>
      <div className="table-card" style={{ marginTop: 16 }}><table><thead><tr><th>SUPPLIER</th><th>CONTACT</th><th>CITY</th><th>STATUS</th><th /></tr></thead><tbody>
        {db.suppliers.map((s) => (
          <tr key={s.id}><td><b>{s.name}</b></td><td>{s.contact}</td><td>{s.city}</td><td><Badge status={s.status === 'Paused' ? 'Paused' : 'Active'} /></td>
            <td className="actions-cell"><button className="iconbtn" type="button" onClick={async () => { await mutate('/api/admin/suppliers/' + s.id, { method: 'DELETE' }); ping('Supplier removed'); }}><Icon name="trash" /></button></td>
          </tr>
        ))}
      </tbody></table></div>
    </>
  );
}
