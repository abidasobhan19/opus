const express = require('express');
const dbApi = require('./models/db');
const cors = require('./middleware/cors');
const { requireAuth } = require('./middleware/auth');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const companyRoutes = require('./routes/companyRoutes');
const branchRoutes = require('./routes/branchRoutes');
const userRoutes = require('./routes/userRoutes');
const adminProductRoutes = require('./routes/adminProductRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
const supplierRoutes = require('./routes/supplierRoutes');

const PORT = Number(process.env.PORT || 4000);

const app = express();
app.use(express.json({ limit: '12mb' }));
app.use(cors);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'opus-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api', orderRoutes);

app.use('/api/admin', requireAuth);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/companies', companyRoutes);
app.use('/api/admin/branches', branchRoutes);
app.use('/api/admin/users', userRoutes);
app.use('/api/admin/products', adminProductRoutes);
app.use('/api/admin/orders', adminOrderRoutes);
app.use('/api/admin/suppliers', supplierRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

dbApi.connect()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log('OPUS API listening on http://localhost:' + PORT);
    });
    function shutdown() {
      server.close();
      dbApi.close().finally(() => process.exit(0));
    }
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
