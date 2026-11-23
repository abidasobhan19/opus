const { SHIPPING, VAT } = require('./constants');
const db = require('./db');
const { find, orderAmount, formatDate, todayIso } = require('./helpers');

async function nextOrderId() {
  const orders = await db.all('orders');
  const nums = orders
    .map((order) => parseInt(String(order.id).replace(/\D/g, ''), 10))
    .filter((n) => !Number.isNaN(n));
  return String(Math.max(10245, ...nums) + 1);
}

async function nextRef() {
  const orders = await db.all('orders');
  const nums = orders.map((order) => {
    const match = String(order.ref || '').match(/(\d+)$/);
    return match ? parseInt(match[1], 10) : 0;
  });
  const n = Math.max(124, ...nums) + 1;
  return 'ORD-' + new Date().getFullYear() + '-' + String(n).padStart(5, '0');
}

async function readLines(lines, existing) {
  const products = await db.all('products');
  return (Array.isArray(lines) ? lines : []).map((line, index) => {
    const base = (existing && existing.lines && existing.lines[index]) || { price: 0 };
    const named = products.find((product) => product.name.toLowerCase() === String(line.name || '').trim().toLowerCase());
    const byId = line.productId ? find(products, line.productId) : null;
    const product = byId || named;
    return {
      name: String(line.name || '').trim() || 'Product',
      qty: Math.max(1, Number(line.qty) || 1),
      price: product ? Number(product.price) : Number(line.price ?? base.price) || 0,
      productId: product ? product.id : line.productId || '',
    };
  });
}

async function checkout(body) {
  const email = String(body.email || '').trim();
  const name = String(body.name || '').trim();
  const phone = String(body.phone || '').trim();
  const address = String(body.address || '').trim();
  const postcode = String(body.postcode || '').trim();
  const city = String(body.city || '').trim();
  const same = !!body.sameBilling;
  const billAddress = same ? address : String(body.billAddress || '').trim();
  const billPostcode = same ? postcode : String(body.billPostcode || '').trim();
  const billCity = same ? city : String(body.billCity || '').trim();
  const notes = String(body.notes || '').trim();
  const linesIn = Array.isArray(body.lines) ? body.lines : [];

  if (!name || !phone || !address || !postcode || !city) {
    return { error: 'Please fill all required fields marked with *.', status: 400 };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { error: 'Enter a valid email address.', status: 400 };
  }
  if (!same && (!billAddress || !billPostcode || !billCity)) {
    return { error: 'Enter the billing address, or use the same address as delivery.', status: 400 };
  }
  if (!linesIn.length) return { error: 'Your cart is empty.', status: 400 };

  const products = await db.all('products');
  const lines = [];
  for (const line of linesIn) {
    const product = find(products, line.productId);
    if (!product || product.status !== 'Published') {
      return { error: 'A product in the cart is no longer available.', status: 400 };
    }
    const qty = Math.max(1, parseInt(line.qty, 10) || 1);
    if (product.stock < qty) {
      return { error: product.name + ' only has ' + product.stock + ' in stock.', status: 400 };
    }
    lines.push({
      productId: product.id,
      name: product.name,
      qty,
      price: Number(product.price) || 0,
      category: product.category,
    });
  }

  for (const line of lines) {
    await db.inc('products', line.productId, 'stock', -line.qty);
  }

  const ship = [address, postcode + ' ' + city, 'Sweden'].filter(Boolean).join('\n');
  const bill = [billAddress, billPostcode + ' ' + billCity, 'Sweden'].filter(Boolean).join('\n');
  const subtotal = lines.reduce((sum, line) => sum + line.qty * line.price, 0);
  const tax = Math.round(subtotal * VAT);
  const order = {
    id: await nextOrderId(),
    ref: await nextRef(),
    title: lines[0].name,
    date: formatDate(todayIso()),
    iso: todayIso(),
    status: 'Treated',
    export: 'Not Exported',
    origin: 'Customer Portal',
    customer: name,
    email,
    phone,
    ship,
    bill,
    same,
    notes,
    shipping: SHIPPING,
    tax,
    subtotal,
    lines,
    paymentStatus: 'INVOICE PENDING',
    amount: subtotal + SHIPPING + tax,
  };
  await db.insert('orders', order, 'start');
  return { order };
}

async function getById(id) {
  const key = String(id);
  const order = await db.findOne('orders', { $or: [{ id: key }, { ref: key }] });
  if (!order) return null;
  const subtotal = (order.lines || []).reduce((sum, line) => sum + Number(line.qty) * Number(line.price), 0);
  const tax = order.tax != null ? order.tax : Math.round(subtotal * VAT);
  return {
    ...order,
    subtotal,
    tax,
    shipping: Number(order.shipping) || 0,
    amount: order.shownAmount != null ? order.shownAmount : subtotal + (Number(order.shipping) || 0) + (order.tax != null ? tax : 0),
  };
}

async function create(body) {
  const customer = String(body?.customer || '').trim();
  if (!customer) return { error: 'Enter the customer name.', status: 400 };
  const lines = await readLines(body.lines);
  if (!lines.length) lines.push({ name: 'Product', qty: 1, price: 0, productId: '' });
  const same = !!body.same;
  const ship = String(body.ship || '');
  const order = {
    id: await nextOrderId(),
    ref: await nextRef(),
    title: lines[0].name || 'New order',
    iso: body.iso || todayIso(),
    date: formatDate(body.iso || todayIso()),
    status: body.as === 'draft' ? 'Paused' : (body.status || 'Treated'),
    export: 'Not Exported',
    origin: 'Admin',
    customer,
    email: String(body.email || '').trim(),
    phone: String(body.phone || '').trim(),
    ship,
    bill: same ? ship : String(body.bill || ''),
    same,
    notes: String(body.notes || ''),
    shipping: Number(body.shipping) || 0,
    lines,
    paymentStatus: 'INVOICE PENDING',
  };
  order.amount = orderAmount(order);
  await db.insert('orders', order, 'start');
  return { order };
}

async function update(id, body) {
  const order = await db.findById('orders', id);
  if (!order) return { error: 'Order not found', status: 404 };
  const customer = String(body?.customer || '').trim();
  if (!customer) return { error: 'Enter the customer name.', status: 400 };
  const lines = await readLines(body.lines, order);
  const same = !!body.same;
  const ship = String(body.ship || '');
  Object.assign(order, {
    iso: body.iso || order.iso,
    date: body.iso ? formatDate(body.iso) : order.date,
    status: body.status || order.status,
    customer,
    email: String(body.email || '').trim(),
    phone: String(body.phone || order.phone || '').trim(),
    ship,
    bill: same ? ship : String(body.bill || ''),
    same,
    notes: String(body.notes || ''),
    shipping: Number(body.shipping) || 0,
    lines,
    title: order.title || (lines[0] ? lines[0].name : 'New order'),
  });
  delete order.listStatus;
  delete order.shownAmount;
  order.amount = orderAmount(order);
  await db.replace('orders', order.id, order);
  return { order };
}

async function mass(body) {
  const mode = String(body?.mode || '');
  const tab = String(body?.tab || 'all');
  const q = String(body?.q || '').trim().toLowerCase();
  const orders = await db.all('orders');
  for (const order of orders) {
    const status = order.listStatus || order.status;
    if (['Treated', 'Paused', 'Finished'].includes(tab) && status !== tab) continue;
    const hay = (order.id + ' ' + order.title + ' ' + order.customer + ' ' + order.email + ' ' + order.origin).toLowerCase();
    if (q && !hay.includes(q)) continue;
    if (mode === 'export') order.export = 'Exported';
    if (mode === 'finished') {
      order.status = 'Finished';
      delete order.listStatus;
    }
    if (mode === 'treated') {
      order.status = 'Treated';
      delete order.listStatus;
    }
    if (mode === 'export' || mode === 'finished' || mode === 'treated') {
      await db.replace('orders', order.id, order);
    }
  }
  return {};
}

module.exports = { checkout, getById, create, update, mass };
