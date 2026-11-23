const crypto = require('crypto');

function uid(prefix) {
  return prefix + crypto.randomBytes(3).toString('hex');
}

function find(list, id) {
  return list.find((row) => String(row.id) === String(id));
}

function orderAmount(order) {
  const goods = (order.lines || []).reduce((sum, line) => sum + Number(line.qty) * Number(line.price), 0);
  return goods + (Number(order.shipping) || 0);
}

function formatDate(iso) {
  const date = iso ? new Date(iso) : new Date();
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

module.exports = { uid, find, orderAmount, formatDate, todayIso };
