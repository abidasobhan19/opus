'use client';

import { useState } from 'react';
import { Crumb, Head, Icon } from '../ui';

export function UserForm({ companies, branches, company, user, guest, onSave, onCancel }) {
  const [companyId, setCompanyId] = useState(user?.companyId || company?.id || companies[0]?.id || '');
  const [err, setErr] = useState('');
  const options = branches.filter((b) => b.companyId === companyId);
  async function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (!data.name || !data.email || !data.phone) { setErr('Name, email and mobile are required.'); return; }
    await onSave({ ...data, companyId, guest: guest || !!user?.guest });
  }
  return (
    <>
      {company ? <Crumb items={[{ label: 'Companies', href: 'companies' }, { label: company.name, href: 'company/' + company.id }, { label: 'Users', href: 'company/' + company.id + '/users' }, { label: user ? user.name : guest ? 'Guest user' : 'Add New User' }]} /> : null}
      <Head title={user ? 'Edit User' : guest ? 'Create Guest User' : 'Add New User'} sub={guest ? 'A guest can order without a full staff account.' : 'Create a new customer or internal account'}>
        <button className="ghost" type="button" onClick={onCancel}>Cancel</button>
        <button className="btn" type="submit" form="userForm">✓ Save User</button>
      </Head>
      <form className="card" id="userForm" style={{ marginTop: 16 }} onSubmit={submit}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--teal-deep)' }}><Icon name="user" /> User Information</h2>
        <div className="grid2" style={{ marginTop: 16 }}>
          <div className="field"><label>User Name <span className="req">*</span></label><input name="name" defaultValue={user?.name || ''} required /></div>
          <div className="field"><label>Email Address <span className="req">*</span></label><input name="email" type="email" defaultValue={user?.email || ''} required /></div>
          <div className="field"><label>Select Company <span className="req">*</span></label>
            <select value={companyId} onChange={(e) => setCompanyId(e.target.value)}>
              {companies.map((co) => <option key={co.id} value={co.id}>{co.name}</option>)}
            </select>
          </div>
          <div className="field"><label>Select Branch <span className="req">*</span></label>
            <select name="branchId" defaultValue={user?.branchId || options[0]?.id || ''}>
              {options.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div className="field"><label>Mobile Number <span className="req">*</span></label><input name="phone" defaultValue={user?.phone || ''} required /></div>
          <div className="field"><label>Role</label><input name="role" defaultValue={user?.role || (guest ? 'Guest' : 'Customer')} /></div>
        </div>
        <div className="err">{err}</div>
      </form>
    </>
  );
}
