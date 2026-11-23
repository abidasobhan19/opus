const express = require('express');
const orders = require('../models/orderModel');
const { wrap } = require('./respond');

const router = express.Router();

router.post('/checkout', wrap(async (req, res) => {
  const result = await orders.checkout(req.body || {});
  if (result.error) return res.status(result.status).json({ error: result.error });
  res.status(201).json({ order: result.order });
}));

router.get('/orders/:id', wrap(async (req, res) => {
  const order = await orders.getById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ order });
}));

module.exports = router;
