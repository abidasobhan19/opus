'use client';

import { useState } from 'react';
import { Crumb, Head } from '../ui';

export function BranchForm({ company, branch, onSave, onCancel }) {
  const editing = !!branch;
  const [err, setErr] = useState('');
  async function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (!String(data.name || '').trim()) { setErr('Enter a branch name.'); return; }
    await onSave({ ...data, companyId: company.id, users: Number(data.users) || 0, orders: Number(data.orders) || 0, sales: Number(data.sales) || 0 });
  }
  const b = branch || {};
  return (
    <>
      <Crumb items={[{ label: 'Companies', href: 'companies' }, { label: company.name, href: 'company/' + company.id }, { label: 'Branches', href: 'company/' + company.id + '/branches' }, { label: editing ? b.name : 'New branch' }]} />
      <Head title={editing ? 'Edit Branch' : 'Create New Branch'} sub={company.name} />
      <form className="card" style={{ marginTop: 16, maxWidth: 860 }} onSubmit={submit}>
        <div className="grid2">
          <div className="field"><label>Branch name</label><input name="name" defaultValue={b.name || ''} placeholder="Stockholm" /></div>
          <div className="field"><label>Status</label>
            <select name="status" defaultValue={b.status || 'Active'}><option>Active</option><option>Inactive</option></select>
          </div>
        </div>
        <div className="field"><label>Description</label><textarea name="description" defaultValue={b.description || ''} /></div>
        <div className="grid2">
          <div className="field"><label>Email Address</label><input name="email" defaultValue={b.email || ''} /></div>
          <div className="field"><label>Mobile Number</label><input name="phone" defaultValue={b.phone || ''} /></div>
        </div>
        <div className="field"><label>Address</label><input name="address" defaultValue={b.address || ''} /></div>
        <div className="grid2">
          <div className="field"><label>Point of Contact</label><input name="poc" defaultValue={b.poc || ''} /></div>
          <div className="field"><label>POC Mobile Number</label><input name="pocMobile" defaultValue={b.pocMobile || ''} /></div>
        </div>
        <div className="grid2">
          <div className="field"><label>Users</label><input name="users" type="number" min="0" defaultValue={Number(b.users) || 0} /></div>
          <div className="field"><label>Active orders</label><input name="orders" type="number" min="0" defaultValue={Number(b.orders) || 0} /></div>
        </div>
        <div className="field"><label>Total sales (kr)</label><input name="sales" type="number" min="0" step="0.01" defaultValue={Number(b.sales) || 0} /></div>
        <div className="err">{err}</div>
        <div className="actions">
          <button className="btn" type="submit">Save</button>
          <button className="ghost" type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}
