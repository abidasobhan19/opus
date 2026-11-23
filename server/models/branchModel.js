const db = require('./db');
const { uid } = require('./helpers');

async function create(body) {
  const company = await db.findById('companies', body?.companyId);
  if (!company) return { error: 'Choose a company.', status: 400 };
  const name = String(body?.name || '').trim();
  if (!name) return { error: 'Enter a branch name.', status: 400 };
  const branch = {
    id: uid('b'),
    companyId: company.id,
    name,
    status: body.status === 'Inactive' ? 'Inactive' : 'Active',
    description: String(body.description || ''),
    email: String(body.email || '').trim(),
    phone: String(body.phone || '').trim(),
    address: String(body.address || '').trim(),
    poc: String(body.poc || '').trim(),
    pocMobile: String(body.pocMobile || '').trim(),
    users: Number(body.users) || 0,
    orders: Number(body.orders) || 0,
    sales: Number(body.sales) || 0,
  };
  await db.insert('branches', branch, 'end');
  if (company.listedBranches != null) await db.inc('companies', company.id, 'listedBranches', 1);
  return { branch };
}

async function update(id, body) {
  const branch = await db.findById('branches', id);
  if (!branch) return { error: 'Branch not found', status: 404 };
  const name = String(body?.name || '').trim();
  if (!name) return { error: 'Enter a branch name.', status: 400 };
  Object.assign(branch, {
    name,
    status: body.status === 'Inactive' ? 'Inactive' : 'Active',
    description: String(body.description || ''),
    email: String(body.email || '').trim(),
    phone: String(body.phone || '').trim(),
    address: String(body.address || '').trim(),
    poc: String(body.poc || '').trim(),
    pocMobile: String(body.pocMobile || '').trim(),
    users: Number(body.users) || 0,
    orders: Number(body.orders) || 0,
    sales: Number(body.sales) || 0,
  });
  await db.replace('branches', branch.id, branch);
  return { branch };
}

module.exports = { create, update };
