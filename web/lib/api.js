const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export function getToken() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('opus_token') || '';
}

export function setToken(token) {
  localStorage.setItem('opus_token', token);
}

export async function api(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) headers.Authorization = 'Bearer ' + getToken();
  const res = await fetch(BASE + path, {
    method,
    headers,
    body: body == null ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { error: text }; }
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export async function downloadCsv(path, filename) {
  const res = await fetch(BASE + path, {
    headers: { Authorization: 'Bearer ' + getToken() },
  });
  if (!res.ok) throw new Error('Download failed');
  const blob = await res.blob();
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export async function login(email, password) {
  const data = await api('/api/auth/login', { method: 'POST', body: { email, password } });
  setToken(data.token);
  return data.user;
}
