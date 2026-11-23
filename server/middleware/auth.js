const crypto = require('crypto');
const dbApi = require('../models/db');
const { DEMO, SHIPPING, VAT } = require('../models/constants');

const sessions = new Map();

async function publicDb() {
  const [companies, branches, users, products, orders, suppliers] = await Promise.all([
    dbApi.all('companies'),
    dbApi.all('branches'),
    dbApi.all('users'),
    dbApi.all('products'),
    dbApi.all('orders'),
    dbApi.all('suppliers'),
  ]);
  return {
    companies,
    branches,
    users,
    products,
    orders,
    suppliers,
    shipping: SHIPPING,
    vat: VAT,
    admin: { name: DEMO.name, role: DEMO.role, email: DEMO.email },
  };
}

async function send(res, extra) {
  res.json({ ok: true, ...extra, db: await publicDb() });
}

function requireAuth(req, res, next) {
  const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token || !sessions.has(token)) {
    return res.status(401).json({ error: 'Sign in required' });
  }
  next();
}

function createSession(email) {
  const token = crypto.randomBytes(24).toString('hex');
  sessions.set(token, { email, at: Date.now() });
  return token;
}

module.exports = { publicDb, send, requireAuth, createSession };
