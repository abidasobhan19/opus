import { BranchForm, CompanyForm, OrderForm, ProductForm, UserForm } from './forms/index';
import { Branches } from './views/Branches';
import { BranchView } from './views/BranchView';
import { Categories } from './views/Categories';
import { Companies } from './views/Companies';
import { CompanyView } from './views/CompanyView';
import { Home } from './views/Home';
import { Info } from './views/Info';
import { Missing } from './views/Missing';
import { Orders } from './views/Orders';
import { Products } from './views/Products';
import { ProductView } from './views/ProductView';
import { Settings } from './views/Settings';
import { Statistics } from './views/Statistics';
import { Status } from './views/Status';
import { Suppliers } from './views/Suppliers';
import { Users } from './views/Users';
import { UserView } from './views/UserView';

export function Screen({ parts, ctx }) {
  const [a, b, c, d, e] = parts;
  const { db, findCompany, findBranch, findUser, findProduct, findOrder, go, ping, mutate } = ctx;
  const company = a === 'company' ? findCompany(b) : null;

  if (a === 'home') return <Home ctx={ctx} />;
  if (a === 'settings') return <Settings />;
  if (a === 'info') return <Info />;
  if (a === 'status') return <Status ctx={ctx} />;
  if (a === 'statistics') return <Statistics ctx={ctx} />;
  if (a === 'suppliers') return <Suppliers ctx={ctx} />;
  if (a === 'categories') return <Categories ctx={ctx} />;
  if (a === 'companies' && b === 'new') {
    return <CompanyForm onCancel={() => go('companies')} onSave={async (body) => {
      const data = await mutate('/api/admin/companies', { method: 'POST', body });
      ping('Company created');
      go('company/' + data.company.id);
    }} />;
  }
  if (a === 'companies' || !a) return <Companies ctx={ctx} />;
  if (company && c === 'edit') {
    return <CompanyForm company={company} onCancel={() => go('company/' + company.id)} onSave={async (body) => {
      await mutate('/api/admin/companies/' + company.id, { method: 'PUT', body });
      ping('Company updated');
      go('company/' + company.id);
    }} />;
  }
  if (company && c === 'branches' && d === 'new') {
    return <BranchForm company={company} onCancel={() => go('company/' + company.id + '/branches')} onSave={async (body) => {
      await mutate('/api/admin/branches', { method: 'POST', body });
      ping('Branch created');
      go('company/' + company.id + '/branches');
    }} />;
  }
  if (company && c === 'branch' && e === 'edit') {
    const branch = findBranch(d);
    return <BranchForm company={company} branch={branch} onCancel={() => go('company/' + company.id + '/branch/' + d)} onSave={async (body) => {
      await mutate('/api/admin/branches/' + d, { method: 'PUT', body });
      ping('Branch updated');
      go('company/' + company.id + '/branch/' + d);
    }} />;
  }
  if (company && c === 'branch') return <BranchView company={company} branch={findBranch(d)} />;
  if (company && c === 'branches') return <Branches ctx={ctx} company={company} />;
  if (company && c === 'users' && (d === 'new' || d === 'guest')) {
    return <UserForm companies={db.companies} branches={db.branches} company={company} guest={d === 'guest'} onCancel={() => go('company/' + company.id + '/users')} onSave={async (body) => {
      const data = await mutate('/api/admin/users', { method: 'POST', body });
      ping('User saved');
      go('company/' + company.id + '/user/' + data.user.id);
    }} />;
  }
  if (company && c === 'user' && e === 'edit') {
    const user = findUser(d);
    return <UserForm companies={db.companies} branches={db.branches} company={company} user={user} onCancel={() => go('company/' + company.id + '/user/' + d)} onSave={async (body) => {
      await mutate('/api/admin/users/' + d, { method: 'PUT', body });
      ping('User updated');
      go('company/' + company.id + '/user/' + d);
    }} />;
  }
  if (company && c === 'user') return <UserView ctx={ctx} user={findUser(d)} />;
  if (company && c === 'users') return <Users ctx={ctx} company={company} />;
  if (company) return <CompanyView company={company} />;
  if (a === 'users' && b === 'new') {
    return <UserForm companies={db.companies} branches={db.branches} onCancel={() => go('users')} onSave={async (body) => {
      const data = await mutate('/api/admin/users', { method: 'POST', body });
      ping('User saved');
      go('user/' + data.user.id);
    }} />;
  }
  if (a === 'users') return <Users ctx={ctx} />;
  if (a === 'user' && c === 'edit') {
    const user = findUser(b);
    return <UserForm companies={db.companies} branches={db.branches} company={findCompany(user?.companyId)} user={user} onCancel={() => go('user/' + b)} onSave={async (body) => {
      await mutate('/api/admin/users/' + b, { method: 'PUT', body });
      ping('User updated');
      go('user/' + b);
    }} />;
  }
  if (a === 'user') return <UserView ctx={ctx} user={findUser(b)} />;
  if (a === 'products' && b === 'new') {
    return <ProductForm onSave={async (body) => {
      await mutate('/api/admin/products', { method: 'POST', body });
      ping(body.status === 'Draft' ? 'Draft saved' : 'Product saved');
      go('products');
    }} />;
  }
  if (a === 'products') return <Products ctx={ctx} />;
  if (a === 'product' && c === 'edit') {
    const product = findProduct(b);
    if (!product) return <Missing label="Product" />;
    return <ProductForm product={product} onSave={async (body) => {
      await mutate('/api/admin/products/' + product.id, { method: 'PUT', body });
      ping('Product updated');
      go('products');
    }} />;
  }
  if (a === 'product') return <ProductView product={findProduct(b)} />;
  if (a === 'orders' && b === 'new') {
    return <OrderForm editing={false} products={db.products} order={{ iso: new Date().toISOString().slice(0, 10), status: 'Treated', lines: [{ name: 'Car Sticker', qty: 1, price: 1249 }], shipping: 0, same: false }} onSave={async (body) => {
      await mutate('/api/admin/orders', { method: 'POST', body });
      ping('Order created');
      go('orders');
    }} />;
  }
  if (a === 'orders') return <Orders ctx={ctx} />;
  if (a === 'order') {
    const order = findOrder(b);
    if (!order) return <Missing label="Order" />;
    return <OrderForm editing products={db.products} order={order} onSave={async (body) => {
      await mutate('/api/admin/orders/' + order.id, { method: 'PUT', body });
      ping('Order updated');
      go('orders');
    }} />;
  }
  return <Companies ctx={ctx} />;
}
