const express = require('express');
const products = require('../models/productModel');
const { send } = require('../middleware/auth');
const { fail, wrap } = require('./respond');

const router = express.Router();

router.post('/', wrap(async (req, res) => {
  const result = await products.create(req.body);
  if (fail(res, result)) return;
  await send(res, { product: result.product });
}));

router.post('/trash', wrap(async (req, res) => {
  const result = await products.trash(req.body?.ids);
  if (fail(res, result)) return;
  await send(res);
}));

router.post('/discount', wrap(async (req, res) => {
  const result = await products.discount(req.body?.ids, req.body?.percent);
  if (fail(res, result)) return;
  await send(res);
}));

router.post('/import', wrap(async (req, res) => {
  const result = await products.importCsv(req.body?.csv);
  await send(res, { added: result.added });
}));

router.put('/:id', wrap(async (req, res) => {
  const result = await products.update(req.params.id, req.body);
  if (fail(res, result)) return;
  await send(res, { product: result.product });
}));

router.post('/:id/duplicate', wrap(async (req, res) => {
  const result = await products.duplicate(req.params.id);
  if (fail(res, result)) return;
  await send(res, { product: result.product });
}));

module.exports = router;
