const express = require('express');
const dbApi = require('../models/db');
const users = require('../models/userModel');
const products = require('../models/productModel');
const { publicDb, send } = require('../middleware/auth');
const { csv, wrap } = require('./respond');

const router = express.Router();

router.get('/bootstrap', wrap(async (_req, res) => {
  res.json(await publicDb());
}));

router.post('/reset', wrap(async (_req, res) => {
  await dbApi.reset();
  await send(res);
}));

router.get('/users.csv', wrap(async (req, res) => {
  csv(res, 'users.csv', await users.csv(String(req.query.companyId || '')));
}));

router.get('/products.csv', wrap(async (_req, res) => {
  csv(res, 'products.csv', await products.csv());
}));

module.exports = router;
