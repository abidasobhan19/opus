# OPUS order portal

The static HTML portal and admin panel now run as a Next.js shop and an Express API.

The API starts at `server/server.js`. Models live in `server/models`, routes in `server/routes`, and shared checks in `server/middleware`. Shop screens are in `web/components/shop`. Admin screens, forms, and the shell are in `web/components/admin`.

## Run both

```bash
npm install
npm install --prefix server
npm install --prefix web
npm run dev
```

- Shop: http://localhost:3000
- Admin: http://localhost:3000/admin
- API: http://localhost:4000

The admin signs in automatically with `admin@opus.com` / `opus-admin`.

Orders, products, companies, branches, users, and suppliers are stored in MongoDB database `opus` at `mongodb://127.0.0.1:27017`. Set `MONGODB_URI` and `MONGODB_DB` if the database lives somewhere else. When nothing is already listening on port 27017, the API starts a local MongoDB and keeps its files in `server/data/mongo`. The first start copies `server/data/db.json` when that file exists, otherwise it loads the demo seed. Admin reset restores the demo seed.

## What the API covers

- Published storefront products, search, and product detail
- Checkout that creates an order, checks stock, and adds 49 SEK shipping plus 25% VAT
- Admin create, update, and delete for companies, branches, users, products, orders, and suppliers
