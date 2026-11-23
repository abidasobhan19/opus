'use client';

import { useState } from 'react';
import { Crumb, Head, Icon } from '../ui';

const PALETTE = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#0ea5e9', '#6366f1', '#a855f7', '#ec4899', '#069691'];

function readFile(file) {
  return new Promise((resolve) => {
    if (!file) return resolve('');
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.readAsDataURL(file);
  });
}

export function CompanyForm({ company, onSave, onCancel }) {
  const editing = !!company;
  const [color, setColor] = useState((company?.color || '#069691').replace('#', ''));
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState('');
  const [logoName, setLogoName] = useState('');

  async function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    if (!name) { setErr('Enter a company name.'); return; }
    const file = data.get('logo');
    const logo = file && file.size ? await readFile(file) : '';
    await onSave({
      name,
      email: data.get('email'),
      description: data.get('description'),
      address: data.get('address'),
      reg: data.get('reg'),
      phone: data.get('phone'),
      poc: data.get('poc'),
      pocMobile: data.get('pocMobile'),
      color,
      logo,
    });
  }

  const hex = '#' + color.replace('#', '');
  return (
    <>
      <Crumb items={editing ? [{ label: 'Companies', href: 'companies' }, { label: company.name, href: 'company/' + company.id }, { label: 'Edit' }] : [{ label: 'Companies', href: 'companies' }, { label: 'Create New Company' }]} />
      <Head title={editing ? 'Edit Company' : 'Create Company'} sub={editing ? 'Update the company connected to the ordering portal.' : 'Add a new company to the ordering portal.'} />
      <form className="card" style={{ marginTop: 16, maxWidth: 980 }} onSubmit={submit}>
        <h2>Company Information</h2>
        <p className="hint" style={{ marginBottom: 16 }}>Fill in the details below to register a new company.</p>
        <div className="grid2">
          <div className="field"><label>Company Name</label><input name="name" defaultValue={company?.name || ''} placeholder="Enter company name" /></div>
          <div className="field"><label>Email Address</label><input name="email" defaultValue={company?.email || ''} placeholder="Enter Email Address" /></div>
        </div>
        <div className="field"><label>Description</label><textarea name="description" defaultValue={company?.description || ''} placeholder="Enter Description" /></div>
        <div className="field"><label>Address</label><input name="address" defaultValue={company?.address || company?.location || ''} placeholder="Enter Address" /></div>
        <div className="grid2">
          <div className="field"><label>Reg. Number</label><input name="reg" defaultValue={company?.reg || ''} placeholder="Enter registration number" /></div>
          <div className="field"><label>Mobile Number</label><input name="phone" defaultValue={company?.phone || ''} placeholder="Enter Mobile number" /></div>
        </div>
        <div className="grid2">
          <div className="field"><label>Point of Contact (POC)</label><input name="poc" defaultValue={company?.poc || ''} placeholder="Contact Person Name" /></div>
          <div className="field"><label>POC Mobile Number</label><input name="pocMobile" defaultValue={company?.pocMobile || ''} placeholder="Enter POC Mobile number" /></div>
        </div>
        <div className="grid2">
          <label className="drop">
            {company?.logo ? <img alt="" src={company.logo} style={{ maxHeight: 80 }} /> : <Icon name="cloud" />}
            <strong>{logoName || 'Upload company logo'}</strong>
            <span>PNG, JPG or SVG</span>
            <em className="ghost" style={{ pointerEvents: 'none' }}>Browse Files</em>
            <input type="file" name="logo" accept="image/*" onChange={(e) => setLogoName(e.target.files?.[0]?.name || '')} />
          </label>
          <div className="field" style={{ position: 'relative' }}>
            <label>Company Color</label>
            <div className="color-row">
              <button type="button" className="swatch" style={{ background: hex }} onClick={() => setOpen((v) => !v)} />
              <span className="hash">#</span>
              <input value={color.replace('#', '')} onChange={(e) => setColor(e.target.value.replace('#', ''))} />
            </div>
            {open ? (
              <div className="color-pop">
                <input type="color" value={hex.length === 7 ? hex : '#069691'} onChange={(e) => setColor(e.target.value.replace('#', ''))} style={{ width: '100%', height: 90, border: 0, background: 'none', padding: 0 }} />
                <div className="palette">
                  {PALETTE.map((c) => <button key={c} type="button" style={{ background: c }} onClick={() => setColor(c.replace('#', ''))} />)}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="err">{err}</div>
        <div className="actions">
          <button className="btn" type="submit">Save</button>
          <button className="ghost" type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}
