const express = require('express');
const orders = require('../models/orderModel');
const { send } = require('../middleware/auth');
const { fail, wrap } = require('./respond');

const router = express.Router();

router.post('/', wrap(async (req, res) => {
  const result = await orders.create(req.body);
  if (fail(res, result)) return;
  await send(res, { order: result.order });
}));

router.post('/mass', wrap(async (req, res) => {
  await orders.mass(req.body);
  await send(res);
}));

router.put('/:id', wrap(async (req, res) => {
  const result = await orders.update(req.params.id, req.body);
  if (fail(res, result)) return;
  await send(res, { order: result.order });
}));

module.exports = router;
