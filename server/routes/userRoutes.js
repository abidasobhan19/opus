const express = require('express');
const users = require('../models/userModel');
const { send } = require('../middleware/auth');
const { fail, wrap } = require('./respond');

const router = express.Router();

router.post('/', wrap(async (req, res) => {
  const result = await users.create(req.body);
  if (fail(res, result)) return;
  await send(res, { user: result.user });
}));

router.put('/:id', wrap(async (req, res) => {
  const result = await users.update(req.params.id, req.body);
  if (fail(res, result)) return;
  await send(res, { user: result.user });
}));

router.delete('/:id', wrap(async (req, res) => {
  const result = await users.remove(req.params.id);
  if (fail(res, result)) return;
  await send(res);
}));

module.exports = router;
