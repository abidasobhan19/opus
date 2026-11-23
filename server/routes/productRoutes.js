const express = require('express');
const products = require('../models/productModel');
const { SHIPPING, VAT } = require('../models/constants');
const { wrap } = require('./respond');

const router = express.Router();

router.get('/', wrap(async (req, res) => {
  const rows = await products.list({
    q: String(req.query.q || '').trim().toLowerCase(),
    category: String(req.query.category || '').trim().toLowerCase(),
    storefront: req.query.storefront === '1',
  });
  res.json({ products: rows, shipping: SHIPPING, vat: VAT });
}));

router.get('/:id', wrap(async (req, res) => {
  const product = await products.getById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ product, shipping: SHIPPING, vat: VAT });
}));

module.exports = router;
