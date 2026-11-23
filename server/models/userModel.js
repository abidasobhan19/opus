const db = require('./db');
const { uid, find } = require('./helpers');

async function create(body) {
  const name = String(body?.name || '').trim();
  const email = String(body?.email || '').trim();
  const phone = String(body?.phone || '').trim();
  if (!name || !email || !phone) return { error: 'Name, email and mobile are required.', status: 400 };
  const user = {
    id: uid('u'),
    name,
    email,
    phone,
    companyId: String(body.companyId || ''),
    branchId: String(body.branchId || ''),
    role: String(body.role || 'Customer'),
    guest: !!body.guest,
    lastLogin: 'Today',
    lastTime: '',
    orders: 0,
    created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    active: 'Just now',
  };
  await db.insert('users', user, 'end');
  return { user };
}

async function update(id, body) {
  const user = await db.findById('users', id);
  if (!user) return { error: 'User not found', status: 404 };
  const name = String(body?.name || '').trim();
  const email = String(body?.email || '').trim();
  const phone = String(body?.phone || '').trim();
  if (!name || !email || !phone) return { error: 'Name, email and mobile are required.', status: 400 };
  Object.assign(user, {
    name,
    email,
    phone,
    companyId: String(body.companyId || user.companyId),
    branchId: String(body.branchId || ''),
    role: String(body.role || 'Customer'),
    guest: !!body.guest,
  });
  await db.replace('users', user.id, user);
  return { user };
}

async function remove(id) {
  const deleted = await db.remove('users', id);
  if (!deleted) return { error: 'User not found', status: 404 };
  return {};
}

async function csv(companyId) {
  const [users, branches] = await Promise.all([db.all('users'), db.all('branches')]);
  const rows = users.filter((user) => !companyId || user.companyId === companyId);
  const branchName = (id) => (find(branches, id) || {}).name || '';
  return ['name,email,phone,branch']
    .concat(rows.map((user) => [user.name, user.email, user.phone, branchName(user.branchId)].join(',')))
    .join('\n');
}

module.exports = { create, update, remove, csv };
