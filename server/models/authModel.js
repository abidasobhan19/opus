const { DEMO } = require('./constants');

function login(email, password) {
  const normalized = String(email || '').trim().toLowerCase();
  const given = String(password || '');
  if (normalized !== DEMO.email || given !== DEMO.password) {
    return { error: 'Email or password is incorrect', status: 401 };
  }
  return {
    user: { name: DEMO.name, role: DEMO.role, email: DEMO.email },
    email: normalized,
  };
}

module.exports = { login };
