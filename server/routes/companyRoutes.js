const express = require('express');
const companies = require('../models/companyModel');
const { send } = require('../middleware/auth');
const { fail, wrap } = require('./respond');

const router = express.Router();

router.post('/', wrap(async (req, res) => {
  const result = await companies.create(req.body);
  if (fail(res, result)) return;
  await send(res, { company: result.company });
}));

router.put('/:id', wrap(async (req, res) => {
  const result = await companies.update(req.params.id, req.body);
  if (fail(res, result)) return;
  await send(res, { company: result.company });
}));

module.exports = router;
