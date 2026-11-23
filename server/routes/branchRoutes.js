const express = require('express');
const branches = require('../models/branchModel');
const { send } = require('../middleware/auth');
const { fail, wrap } = require('./respond');

const router = express.Router();

router.post('/', wrap(async (req, res) => {
  const result = await branches.create(req.body);
  if (fail(res, result)) return;
  await send(res, { branch: result.branch });
}));

router.put('/:id', wrap(async (req, res) => {
  const result = await branches.update(req.params.id, req.body);
  if (fail(res, result)) return;
  await send(res, { branch: result.branch });
}));

module.exports = router;
