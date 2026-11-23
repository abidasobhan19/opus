const db = require('./db');
const { uid } = require('./helpers');

async function list({ q, category, storefront }) {
  let rows = await db.all('products');
  if (storefront) {
    rows = rows.filter((product) => product.storefront && product.status === 'Published');
  }
  if (category) rows = rows.filter((product) => product.portalCat === category);
  if (q) {
    rows = rows.filter((product) =>
      (product.name + ' ' + product.article + ' ' + product.category).toLowerCase().includes(q)
    );
  }
  return rows;
}

async function getById(id) {
  return (await db.findById('products', id)) || null;
}

function productFromBody(body, existing) {
  const labels = Array.isArray(body.labels) ? body.labels.filter(Boolean) : [];
  const categories = Array.isArray(body.categories) ? body.categories.filter(Boolean) : [];
  return {
    name: String(body.name || '').trim(),
    article: String(body.article || '').trim(),
    sku: String(body.article || existing?.sku || '').trim(),
    price: Number(body.price) || 0,
    description: String(body.description || ''),
    brand: String(body.brand || ''),
    labels,
    label: labels[0] || '',
    categories,
    category: categories[0] || body.category || existing?.category || 'Other',
    status: body.status || 'Published',
    type: existing?.type || 'Print',
    date: existing?.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    color: existing?.color || '#e7f6f4',
    stock: existing ? existing.stock : Number(body.stock) || 0,
    storefront: existing ? existing.storefront : !!body.storefront,
    portalCat: existing?.portalCat || body.portalCat || '',
    art: existing?.art || '',
    extra: existing ? !!existing.extra : false,
    hero: existing?.hero || '',
    piece: existing?.piece || '1 piece',
    image: body.image || existing?.image || '',
  };
}

async function create(body) {
  const data = productFromBody(body || {});
  if (!data.name) return { error: 'Enter a product name.', status: 400 };
  const product = { id: uid('p'), ...data };
  await db.insert('products', product, 'start');
  return { product };
}

async function update(id, body) {
  const product = await db.findById('products', id);
  if (!product) return { error: 'Product not found', status: 404 };
  const data = productFromBody(body || {}, product);
  if (!data.name) return { error: 'Enter a product name.', status: 400 };
  Object.assign(product, data);
  await db.replace('products', product.id, product);
  return { product };
}

async function duplicate(id) {
  const source = await db.findById('products', id);
  if (!source) return { error: 'Product not found', status: 404 };
  const copy = {
    ...source,
    id: uid('p'),
    name: source.name + ' copy',
    categories: [...(source.categories || [])],
    labels: [...(source.labels || [])],
    storefront: false,
  };
  await db.insert('products', copy, 'start');
  return { product: copy };
}

async function trash(ids) {
  const set = (ids || []).map(String);
  if (!set.length) return { error: 'Select products first', status: 400 };
  await db.removeIds('products', set);
  return {};
}

async function discount(ids, percent) {
  const list = (ids || []).map(String);
  const value = Number(percent);
  if (!list.length) return { error: 'Select products first', status: 400 };
  if (!value) return { error: 'Enter a discount percent', status: 400 };
  const products = await db.all('products');
  for (const product of products) {
    if (list.includes(String(product.id))) {
      const price = Math.max(0, Math.round(product.price * (100 - value)) / 100);
      await db.setFields('products', product.id, { price });
    }
  }
  return {};
}

async function importCsv(csv) {
  const lines = String(csv || '').split(/\r?\n/).slice(1);
  let added = 0;
  for (const line of lines) {
    const [name, article, price, category, brand, stock] = line.split(',');
    if (!name) continue;
    await db.insert('products', {
      id: uid('p'),
      name,
      article: article || '',
      sku: article || '',
      price: Number(price) || 0,
      category: category || 'Other',
      brand: brand || '',
      stock: Number(stock) || 0,
      status: 'Draft',
      type: 'Print',
      labels: [],
      label: '',
      categories: [category || 'Other'],
      description: '',
      date: '',
      color: '#e5e7eb',
      storefront: false,
      portalCat: '',
      art: '',
      extra: false,
      hero: '',
      piece: '1 piece',
    }, 'end');
    added += 1;
  }
  return { added };
}

async function csv() {
  const products = await db.all('products');
  return ['name,article,price,category,brand,stock']
    .concat(products.map((product) => [product.name, product.article, product.price, product.category, product.brand, product.stock].join(',')))
    .join('\n');
}

module.exports = { list, getById, create, update, duplicate, trash, discount, importCsv, csv };
