const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const { seed } = require('./seed');

const COLLECTIONS = ['companies', 'branches', 'users', 'products', 'orders', 'suppliers'];
const DEFAULT_URI = 'mongodb://127.0.0.1:27017';
const DB_NAME = process.env.MONGODB_DB || 'opus';

let client;
let database;
let memoryServer;

function col(name) {
  return database.collection(name);
}

function clean(doc) {
  if (!doc) return null;
  const copy = { ...doc };
  delete copy._id;
  delete copy._pos;
  return copy;
}

function withPos(rows) {
  return (rows || []).map((row, index) => {
    const doc = { ...row, _id: String(row.id), id: String(row.id), _pos: index };
    delete doc._id;
    doc._id = String(row.id);
    Object.keys(doc).forEach((key) => {
      if (doc[key] === undefined) delete doc[key];
    });
    return doc;
  });
}

async function all(name) {
  const rows = await col(name).find({}).sort({ _pos: 1, _id: 1 }).toArray();
  return rows.map(clean);
}

async function findById(name, id) {
  const doc = await col(name).findOne({ id: String(id) });
  return clean(doc);
}

async function findOne(name, filter) {
  const doc = await col(name).findOne(filter);
  return clean(doc);
}

async function edgePos(name, edge) {
  const sort = edge === 'start' ? 1 : -1;
  const row = await col(name).find({}).sort({ _pos: sort }).limit(1).next();
  if (!row || typeof row._pos !== 'number') return 0;
  return edge === 'start' ? row._pos - 1 : row._pos + 1;
}

async function insert(name, doc, edge) {
  const stored = { ...doc, id: String(doc.id) };
  Object.keys(stored).forEach((key) => {
    if (stored[key] === undefined) delete stored[key];
  });
  stored._id = stored.id;
  stored._pos = await edgePos(name, edge === 'start' ? 'start' : 'end');
  await col(name).insertOne(stored);
  return clean(stored);
}

async function replace(name, id, doc) {
  const existing = await col(name).findOne({ id: String(id) });
  if (!existing) return null;
  const stored = { ...doc, _id: existing._id, id: existing.id, _pos: existing._pos };
  Object.keys(stored).forEach((key) => {
    if (stored[key] === undefined) delete stored[key];
  });
  await col(name).replaceOne({ _id: existing._id }, stored);
  return clean(stored);
}

async function remove(name, id) {
  const result = await col(name).deleteOne({ id: String(id) });
  return result.deletedCount;
}

async function removeIds(name, ids) {
  const list = (ids || []).map(String);
  if (!list.length) return 0;
  const result = await col(name).deleteMany({ id: { $in: list } });
  return result.deletedCount;
}

async function setFields(name, id, fields) {
  await col(name).updateOne({ id: String(id) }, { $set: fields });
}

async function inc(name, id, field, by) {
  await col(name).updateOne({ id: String(id) }, { $inc: { [field]: by } });
}

async function unset(name, id, fields) {
  const spec = {};
  fields.forEach((field) => { spec[field] = ''; });
  await col(name).updateOne({ id: String(id) }, { $unset: spec });
}

async function writeAll(data) {
  for (const name of COLLECTIONS) {
    await col(name).deleteMany({});
    const docs = withPos(data[name] || []);
    if (docs.length) await col(name).insertMany(docs, { ordered: true });
  }
}

function readJsonSeed() {
  const file = path.join(__dirname, '..', 'data', 'db.json');
  if (!fs.existsSync(file)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (parsed && Array.isArray(parsed.companies) && parsed.companies.length) return parsed;
  } catch (err) {
    console.error('Could not read db.json:', err.message);
  }
  return null;
}

async function reset() {
  await writeAll(seed());
}

async function ensureSeed() {
  const count = await col('companies').countDocuments();
  if (count > 0) return;
  await writeAll(readJsonSeed() || seed());
}

async function ensureIndexes() {
  for (const name of COLLECTIONS) {
    await col(name).createIndex({ id: 1 }, { unique: true });
  }
  await col('orders').createIndex({ ref: 1 });
}

async function open(uri) {
  client = new MongoClient(uri, { serverSelectionTimeoutMS: 4000 });
  await client.connect();
  database = client.db(DB_NAME);
  await database.command({ ping: 1 });
}

async function startEmbedded() {
  const { MongoMemoryServer } = require('mongodb-memory-server');
  const dbPath = path.join(__dirname, '..', 'data', 'mongo');
  fs.mkdirSync(dbPath, { recursive: true });
  memoryServer = await MongoMemoryServer.create({
    binary: { version: '7.0.16' },
    instance: {
      port: 27017,
      portGeneration: false,
      ip: '127.0.0.1',
      dbPath,
      storageEngine: 'wiredTiger',
    },
  });
  return memoryServer.getUri();
}

async function connect() {
  const uri = process.env.MONGODB_URI;
  if (uri) {
    await open(uri);
    console.log('OPUS MongoDB connected at ' + uri.replace(/\/\/.*@/, '//') + ' db ' + DB_NAME);
  } else {
    try {
      await open(DEFAULT_URI);
      console.log('OPUS MongoDB connected at ' + DEFAULT_URI + '/' + DB_NAME);
    } catch (err) {
      if (client) await client.close().catch(() => {});
      client = null;
      console.log('MongoDB is not running (' + err.message + '). Starting a local MongoDB on port 27017.');
      const embedded = await startEmbedded();
      await open(embedded);
      console.log('OPUS MongoDB connected at ' + embedded + DB_NAME);
    }
  }
  await ensureIndexes();
  await ensureSeed();
}

async function close() {
  if (client) await client.close().catch(() => {});
  client = null;
  if (memoryServer) await memoryServer.stop({ doCleanup: false, force: true }).catch(() => {});
  memoryServer = null;
}

module.exports = {
  connect,
  close,
  reset,
  all,
  findById,
  findOne,
  insert,
  replace,
  remove,
  removeIds,
  setFields,
  inc,
  unset,
  col,
  COLLECTIONS,
};
