const db = require('./db');
const { uid } = require('./helpers');

async function create(body) {
  const name = String(body?.name || '').trim();
  if (!name) return { error: 'Enter a company name.', status: 400 };
  const company = {
    id: uid('c'),
    name,
    email: String(body.email || '').trim(),
    description: String(body.description || ''),
    address: String(body.address || '').trim(),
    location: String(body.address || '').trim(),
    reg: String(body.reg || '').trim(),
    phone: String(body.phone || '').trim(),
    poc: String(body.poc || '').trim(),
    pocMobile: String(body.pocMobile || '').trim(),
    color: '#' + String(body.color || '069691').replace('#', ''),
    logo: String(body.logo || ''),
    status: 'Active',
    listedBranches: 0,
  };
  await db.insert('companies', company, 'end');
  return { company };
}

async function update(id, body) {
  const company = await db.findById('companies', id);
  if (!company) return { error: 'Company not found', status: 404 };
  const name = String(body?.name || '').trim();
  if (!name) return { error: 'Enter a company name.', status: 400 };
  Object.assign(company, {
    name,
    email: String(body.email || '').trim(),
    description: String(body.description || ''),
    address: String(body.address || '').trim(),
    location: String(body.address || '').trim(),
    reg: String(body.reg || '').trim(),
    phone: String(body.phone || '').trim(),
    poc: String(body.poc || '').trim(),
    pocMobile: String(body.pocMobile || '').trim(),
    color: '#' + String(body.color || company.color || '069691').replace('#', ''),
    logo: body.logo ? String(body.logo) : company.logo || '',
  });
  await db.replace('companies', company.id, company);
  return { company };
}

module.exports = { create, update };
