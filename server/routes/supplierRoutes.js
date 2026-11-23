const express = require('express');
const suppliers = require('../models/supplierModel');
const { send } = require('../middleware/auth');
const { fail, wrap } = require('./respond');

const router = express.Router();

router.post('/', wrap(async (req, res) => {
  const result = await suppliers.create(req.body);
  if (fail(res, result)) return;
  await send(res, { supplier: result.supplier });
}));

router.delete('/:id', wrap(async (req, res) => {
  await suppliers.remove(req.params.id);
  await send(res);
}));

module.exports = router;
