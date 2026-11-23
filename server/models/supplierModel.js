const db = require('./db');
const { uid } = require('./helpers');

async function create(body) {
  const name = String(body?.name || '').trim();
  if (!name) return { error: 'Enter a supplier name', status: 400 };
  const supplier = {
    id: uid('s'),
    name,
    contact: String(body.contact || '').trim(),
    city: String(body.city || '').trim(),
    status: 'Active',
  };
  await db.insert('suppliers', supplier, 'end');
  return { supplier };
}

async function remove(id) {
  await db.remove('suppliers', id);
  return {};
}

module.exports = { create, remove };
