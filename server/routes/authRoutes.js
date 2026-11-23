const express = require('express');
const auth = require('../models/authModel');
const { createSession } = require('../middleware/auth');

const router = express.Router();

router.post('/login', (req, res) => {
  const result = auth.login(req.body?.email, req.body?.password);
  if (result.error) return res.status(result.status).json({ error: result.error });
  const token = createSession(result.email);
  res.json({ token, user: result.user });
});

module.exports = router;
