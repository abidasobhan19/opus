const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const PORTAL_BLURB = 'Lorem ipsum dolor for printed materials, below you w..';
const PORTAL_BLURB_2 = 'Lorem ipsum dolor for printed materials, below you re.';

function portalItem(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description || 'A3 sheets with decals, each decal is 210×150 mm.',
    price: row.price,
    sku: row.sku,
    article: row.sku,
    stock: row.stock ?? 120,
    category: row.category,
    categories: row.categories || [row.category],
    portalCat: row.portalCat,
    art: row.art,
    extra: !!row.extra,
    storefront: true,
    type: 'Print',
    label: row.label || '',
    labels: row.labels || [],
    brand: 'Opus Bilprovning',
    date: '01 Mar 2026',
    status: 'Published',
    color: row.color || '#eef0f2',
    hero: row.art === 'script' ? 'decal' : '',
    piece: '1 piece',
  };
}

function seed() {
  const branches = [
    { id: 'stockholm', companyId: 'opus', name: 'Stockholm', users: 105, status: 'Active', email: 'stockholm@opus.com', phone: '+46 70 123 4567', address: 'Sveavägen ; Swedish Match North Europe. SE-118 85 Stockholm.', poc: '556677-8899', pocMobile: '+46 70 123 4567', description: LOREM, sales: 45665.8, orders: 124 },
    { id: 'gothenburg', companyId: 'opus', name: 'Gothenburg', users: 30, status: 'Active', email: 'gothenburg@opus.com', phone: '+46 31 555 0190', address: 'Östra Hamngatan 16, 411 09 Göteborg.', poc: 'Helena Berg', pocMobile: '+46 70 200 1100', description: LOREM, sales: 18240, orders: 48 },
    { id: 'malmo', companyId: 'opus', name: 'Malmö', users: 55, status: 'Active', email: 'malmo@opus.com', phone: '+46 40 555 0144', address: 'Stortorget 9, 211 22 Malmö.', poc: 'Armin Haddad', pocMobile: '+46 70 300 2200', description: LOREM, sales: 22110.5, orders: 61 },
    { id: 'uppsala', companyId: 'opus', name: 'Uppsala', users: 43, status: 'Active', email: 'uppsala@opus.com', phone: '+46 18 555 0177', address: 'Dragarbrunnsgatan 46, 753 20 Uppsala.', poc: 'Nora Ek', pocMobile: '+46 70 400 3300', description: LOREM, sales: 9800, orders: 29 },
    { id: 'huskvarna', companyId: 'opus', name: 'Huskvarna', users: 67, status: 'Active', email: 'huskvarna@opus.com', phone: '+46 36 555 0122', address: 'Esplanaden 8, 561 31 Huskvarna.', poc: 'Lars Holm', pocMobile: '+46 70 500 4400', description: LOREM, sales: 14320, orders: 36 },
  ];

  const companies = [{
    id: 'opus',
    name: 'Opus',
    location: 'Stockholm, Sweden',
    email: 'email@opus.com',
    phone: '+46 70 123 4567',
    reg: '556677-8899',
    poc: '556677-8899',
    pocMobile: '+46 70 123 4567',
    address: 'Stockholm, Sweden',
    description: LOREM,
    status: 'Active',
    color: '#069691',
    logo: '',
    listedBranches: 71,
  }];

  const named = [
    ['Erik Andersson', 'erik.andersson@opus.com', '+46 70 123 4567', 'stockholm', '12 Feb 2026', '09:24'],
    ['Anna Svensson', 'anna.svensson@opus.com', '+46 70 234 5678', 'stockholm', '12 Feb 2026', '14:35'],
    ['Lars Johansson', 'lars.j@opus.com', '+46 70 345 6789', 'stockholm', '12 Feb 2026', '16:42'],
    ['Maria Nilsson', 'maria.n@opus.com', '+46 70 456 7890', 'stockholm', '12 Feb 2026', '11:20'],
    ['Johan Karlsson', 'johan.k@opus.com', '+46 70 567 8901', 'stockholm', '12 Feb 2026', '13:15'],
    ['Sofia Bergström', 'sofia.b@opus.com', '+46 70 678 9012', 'stockholm', '12 Feb 2026', '10:45'],
    ['Peter Lindberg', 'peter.lindberg@opus.com', '+46 70 789 0123', 'stockholm', '15 Feb 2026', '15:30'],
    ['Emma Gustafsson', 'emma.g@opus.com', '+46 70 890 1234', 'stockholm', '12 Feb 2026', '08:12'],
    ['Mikael Ström', 'mikael.strom@opus.com', '+46 70 901 2345', 'stockholm', '12 Feb 2026', '12:55'],
    ['Karin Olsson', 'karin.olsson@opus.com', '+46 70 012 3456', 'stockholm', '02 Feb 2026', '09:30'],
  ];

  const first = ['Nora', 'Oskar', 'Elin', 'Gustav', 'Ida', 'Nils', 'Freja', 'Hugo', 'Maja', 'Axel', 'Alva', 'Liam', 'Wilma', 'Noah', 'Ella', 'William', 'Alice', 'Lucas', 'Olivia', 'Elias', 'Astrid', 'Leo', 'Saga', 'Oliver', 'Ebba', 'Viktor', 'Linnea', 'Isak', 'Agnes', 'Vera'];
  const last = ['Lindström', 'Eriksson', 'Hansson', 'Pettersson', 'Jonsson', 'Larsson', 'Persson', 'Olofsson', 'Nyström', 'Berg', 'Holm', 'Dahl', 'Sandberg', 'Lund', 'Engström'];

  const users = named.map((n, i) => ({
    id: 'u' + (i + 1),
    name: n[0],
    email: n[1],
    phone: n[2],
    companyId: 'opus',
    branchId: n[3],
    role: i === 0 ? 'Branch admin' : 'Customer',
    lastLogin: n[4],
    lastTime: n[5],
    orders: 12 + i * 3,
    created: 'Jan 14, 2024',
    active: '1 day ago',
    guest: false,
  }));

  users.push({
    id: 'alex',
    name: 'Alexander Thompson',
    email: 'alex.thompson@opus.com',
    phone: '+46 70 123 45 67',
    companyId: 'opus',
    branchId: 'stockholm',
    role: 'Project Manager / Lead Admin',
    lastLogin: '12 Feb 2026',
    lastTime: '16:10',
    orders: 142,
    created: 'Oct 12, 2023',
    active: '2 Hours Ago',
    guest: false,
  });

  const branchIds = branches.map((b) => b.id);
  let n = users.length;
  let fi = 0;
  while (users.length < 642) {
    n += 1;
    const fn = first[fi % first.length];
    const ln = last[Math.floor(fi / first.length) % last.length];
    const branchId = branchIds[fi % branchIds.length];
    users.push({
      id: 'u' + n,
      name: fn + ' ' + ln,
      email: (fn + '.' + ln).toLowerCase().replace(/ö/g, 'o').replace(/ä/g, 'a').replace(/å/g, 'a') + n + '@opus.com',
      phone: '+46 70 ' + String(100 + (fi % 900)).padStart(3, '0') + ' ' + String(1000 + (fi % 9000)).slice(0, 4),
      companyId: 'opus',
      branchId,
      role: 'Customer',
      lastLogin: '0' + ((fi % 9) + 1) + ' Feb 2026',
      lastTime: '08:' + String(fi % 60).padStart(2, '0'),
      orders: fi % 40,
      created: 'Mar 2, 2024',
      active: '3 days ago',
      guest: false,
    });
    fi += 1;
  }

  const portal = [
    portalItem({ id: 'portal-1', name: 'Decale name', portalCat: 'decals', art: 'script', description: PORTAL_BLURB, price: 12, sku: 'OP195', category: 'Decals', color: '#fef4e8' }),
    portalItem({ id: 'portal-2', name: 'Profile Product', portalCat: 'profile', art: 'book', description: PORTAL_BLURB, price: 12, sku: 'OP248', category: 'Profile Products', color: '#fef4e8' }),
    portalItem({ id: 'portal-3', name: 'Poster Signs', portalCat: 'posters', art: 'poster', description: PORTAL_BLURB, price: 12, sku: 'OP285', category: 'Posters', color: '#eef0f2' }),
    portalItem({ id: 'portal-4', name: 'Print Products', portalCat: 'print', art: 'diamond', description: PORTAL_BLURB, price: 12, sku: 'OP206', category: 'Print Products', color: '#e8d9c3' }),
    portalItem({ id: 'portal-5', name: 'Prine Product', portalCat: 'decals', art: 'teal', description: PORTAL_BLURB_2, price: 12, sku: 'OP206', category: 'Decals', color: '#eef0f2' }),
    portalItem({ id: 'portal-6', name: 'Brochures / Flyers', portalCat: 'brochures', art: 'brochure', description: PORTAL_BLURB_2, price: 12, sku: 'OP359', category: 'Print Products', categories: ['Brochures'], color: '#eef0f2' }),
    portalItem({ id: 'portal-7', name: 'Flager Signs', portalCat: 'print', art: 'table', description: PORTAL_BLURB_2, price: 12, sku: 'OP206', category: 'Print Products', color: '#fef4e8' }),
    portalItem({ id: 'portal-8', name: 'Print Products flag', portalCat: 'flags', art: 'flag', description: PORTAL_BLURB_2, price: 12, sku: 'OP206', category: 'Print Products', categories: ['Flags'], color: '#eef0f2' }),
    portalItem({ id: 'portal-9', name: 'Sign Deluxe', portalCat: 'signs', art: 'poster', description: PORTAL_BLURB_2, price: 12, sku: 'OP243', category: 'Signs', extra: true, color: '#fef4e8' }),
    portalItem({ id: 'portal-10', name: 'Other item', portalCat: 'other', art: 'script', description: PORTAL_BLURB_2, price: 12, sku: 'OP243', category: 'Other', extra: true, color: '#eef0f2' }),
    portalItem({ id: 'portal-11', name: 'Beach Flag', portalCat: 'flags', art: 'flag', description: PORTAL_BLURB_2, price: 12, sku: 'OP206', category: 'Flags', extra: true, color: '#eef0f2' }),
    portalItem({ id: 'portal-12', name: 'Flyer Premium', portalCat: 'brochures', art: 'table', description: PORTAL_BLURB_2, price: 12, sku: 'OP359', category: 'Brochures / Flyers', categories: ['Brochures'], extra: true, color: '#fef4e8' }),
  ];

  const catalog = [
    { id: '4821', name: 'OBD-II Diagnostic Scanner', article: 'ART-88213', sku: 'ART-88213', stock: 142, price: 1249, category: 'Diagnostics', type: 'Equipment', label: 'Bestseller', brand: 'AutoCheck Pro', date: '12 Mar 2025', status: 'Published', description: 'Workshop diagnostic scanner for Opus stations.', labels: ['Bestseller'], categories: ['Print Products'], color: '#dbeafe', storefront: false, portalCat: '', art: '', extra: false, hero: '', piece: '1 piece' },
    { id: '4822', name: 'Brake Pad Inspection Kit', article: 'ART-44109', sku: 'ART-44109', stock: 38, price: 689, category: 'Inspection Tools', type: 'Kit', label: '', brand: 'SafeDrive', date: '09 Mar 2025', status: 'Published', description: 'Pads, gauges and report cards for brake checks.', labels: [], categories: ['Print Products'], color: '#fee2e2', storefront: false, portalCat: '', art: '', extra: false, hero: '', piece: '1 piece' },
    { id: '4823', name: 'Headlight Alignment Tool', article: 'ART-77321', sku: 'ART-77321', stock: 0, price: 2450, category: 'Lighting', type: 'Tool', label: 'New', brand: 'BeamRight', date: '05 Mar 2025', status: 'Published', description: 'Alignment tool for headlight testing lanes.', labels: ['New'], categories: ['Signs'], color: '#fef3c7', storefront: false, portalCat: '', art: '', extra: false, hero: '', piece: '1 piece' },
    { id: '4824', name: 'Tire Tread Depth Gauge', article: 'ART-12980', sku: 'ART-12980', stock: 215, price: 189, category: 'Inspection Tools', type: 'Tool', label: '', brand: 'GripMaster', date: '28 Feb 2025', status: 'Published', description: 'Digital tread depth gauge.', labels: [], categories: ['Other'], color: '#e0e7ff', storefront: false, portalCat: '', art: '', extra: false, hero: '', piece: '1 piece' },
    { id: '4825', name: 'Emission Test Analyzer Kit', article: 'ART-55604', sku: 'ART-55604', stock: 78, price: 990, category: 'Emissions', type: 'Kit', label: 'New', brand: 'ClearAir Labs', date: '24 Feb 2025', status: 'Published', description: 'Analyzer kit and printed log sheets.', labels: ['New'], categories: ['Brochures'], color: '#d1fae5', storefront: false, portalCat: '', art: '', extra: false, hero: '', piece: '1 piece' },
    { id: '4826', name: 'Wheel Alignment Sensor Set', article: 'ART-33477', sku: 'ART-33477', stock: 54, price: 4320, category: 'Alignment', type: 'Equipment', label: '', brand: 'TrueLine', date: '18 Feb 2025', status: 'Published', description: 'Sensor set for wheel alignment.', labels: [], categories: ['Profile Products'], color: '#cffafe', storefront: false, portalCat: '', art: '', extra: false, hero: '', piece: '1 piece' },
    { id: '4827', name: 'Digital Torque Wrench', article: 'ART-90112', sku: 'ART-90112', stock: 88, price: 1595, category: 'Inspection Tools', type: 'Tool', label: 'Bestseller', brand: 'TorqFix', date: '11 Feb 2025', status: 'Published', description: 'Torque wrench for safety checks.', labels: ['Bestseller'], categories: ['Print Products'], color: '#fce7f3', storefront: false, portalCat: '', art: '', extra: false, hero: '', piece: '1 piece' },
    { id: '4828', name: 'Vehicle Lift Safety Pads', article: 'ART-66238', sku: 'ART-66238', stock: 310, price: 420, category: 'Safety', type: 'Parts', label: '', brand: 'HoldFast', date: '03 Feb 2025', status: 'Published', description: 'Replacement pads for vehicle lifts.', labels: [], categories: ['Other'], color: '#ffedd5', storefront: false, portalCat: '', art: '', extra: false, hero: '', piece: '1 piece' },
    { id: 'dec1024', name: 'Opus Bilprovning Reflective Decal', article: 'OP-DEC-1024', sku: 'OP-DEC-1024', stock: 80, price: 149, category: 'Decals', type: 'Print', label: 'Reflective', brand: 'Opus Bilprovning', date: '14 Mar 2025', status: 'Published', description: 'High-visibility reflective decals designed for vehicle inspection stations. Durable, weather-resistant, and compliant with safety standards. Ideal for marking service areas and equipment.', labels: ['Outdoor', 'Reflective', 'Branded'], categories: ['Decals', 'Profile Products', 'Signs'], color: '#bbf7d0', hero: 'decal', storefront: false, portalCat: 'decals', art: 'script', extra: false, piece: '1 piece' },
    { id: '9001', name: 'Station Poster Draft', article: 'ART-22001', sku: 'ART-22001', stock: 12, price: 320, category: 'Posters', type: 'Print', label: '', brand: 'Opus Bilprovning', date: '01 Mar 2025', status: 'Draft', description: 'Draft poster for the station waiting room.', labels: [], categories: ['Posters'], color: '#e0e7ff', storefront: false, portalCat: '', art: '', extra: false, hero: '', piece: '1 piece' },
    { id: '9002', name: 'Internal Price List', article: 'ART-22002', sku: 'ART-22002', stock: 4, price: 0, category: 'Print Products', type: 'Print', label: '', brand: 'Opus Bilprovning', date: '01 Mar 2025', status: 'Private', description: 'Private price list for staff.', labels: [], categories: ['Print Products'], color: '#f3f4f6', storefront: false, portalCat: '', art: '', extra: false, hero: '', piece: '1 piece' },
  ];

  const products = portal.concat(catalog);

  const orders = [
    { id: '10245', ref: 'ORD-2025-10245', title: 'Corporate Decals + Posters', date: '12 Mar 2025', iso: '2025-03-12', status: 'Treated', export: 'Not Exported', origin: 'Web', customer: 'Nordic Services', email: 'orders@nordicservices.se', phone: '', ship: 'Sveavägen 12, 111 57 Stockholm, Sweden', bill: 'Sveavägen 12, 111 57 Stockholm, Sweden', same: true, notes: '', shipping: 0, lines: [{ name: 'Corporate Wall Decal', qty: 2, price: 2600, productId: '' }, { name: 'Framed Posters A2', qty: 5, price: 1540, productId: '' }] },
    { id: '10244', ref: 'ORD-2025-10244', title: 'Vehicle Wrap – Fleet Van', date: '11 Mar 2025', iso: '2025-03-11', status: 'Paused', export: 'Pending', origin: 'Customer Portal', customer: 'Fleet Nordic AB', email: 'fleet@nordic.se', phone: '', ship: 'Industrivägen 4, 417 05 Göteborg', bill: 'Industrivägen 4, 417 05 Göteborg', same: true, notes: '', shipping: 0, lines: [{ name: 'Fleet Van Wrap', qty: 1, price: 5075, productId: '' }] },
    { id: '10243', ref: 'ORD-2025-00124', title: 'Safety Signage Bundle', date: '10 Mar 2025', iso: '2025-03-14', status: 'Treated', listStatus: 'Finished', shownAmount: 1860, export: 'Exported', origin: 'Admin', customer: 'Karin Andersson', email: 'karin.andersson@email.com', phone: '+46 70 123 45 67', ship: 'Sveavägen 44, 111 34 Stockholm, Sweden', bill: 'Sveavägen 44, 111 34 Stockholm, Sweden', same: true, notes: 'Please handle with care. Fragile items included.', shipping: 49, lines: [{ name: 'Reflective Decals', qty: 10, price: 149, productId: 'dec1024' }, { name: 'Safety Signage Bundle', qty: 1, price: 1249, productId: '4821' }] },
    { id: '10242', ref: 'ORD-2025-10242', title: 'Window Graphics – Showroom', date: '09 Mar 2025', iso: '2025-03-09', status: 'Treated', export: 'Not Exported', origin: 'Web', customer: 'Showroom Syd', email: 'hello@showroomsyd.se', phone: '', ship: 'Södra Förstadsgatan 2, Malmö', bill: 'Södra Förstadsgatan 2, Malmö', same: true, notes: '', shipping: 0, lines: [{ name: 'Window Graphic', qty: 1, price: 3410, productId: '' }] },
    { id: '10241', ref: 'ORD-2025-10241', title: 'Inspection Report Print Pack', date: '08 Mar 2025', iso: '2025-03-08', status: 'Finished', export: 'Pending', origin: 'Customer Portal', customer: 'Opus Uppsala', email: 'uppsala@opus.com', phone: '', ship: 'Dragarbrunnsgatan 46, Uppsala', bill: 'Dragarbrunnsgatan 46, Uppsala', same: true, notes: '', shipping: 0, lines: [{ name: 'Inspection Report Pack', qty: 1, price: 7640, productId: '' }] },
    { id: '10240', ref: 'ORD-2025-10240', title: 'Branded Floor Decals', date: '07 Mar 2025', iso: '2025-03-07', status: 'Paused', export: 'Exported', origin: 'Admin', customer: 'Nordic Services', email: 'orders@nordicservices.se', phone: '', ship: 'Sveavägen 12, Stockholm', bill: 'Sveavägen 12, Stockholm', same: true, notes: '', shipping: 0, lines: [{ name: 'Branded Floor Decals', qty: 1, price: 4250, productId: '' }] },
    { id: '10239', ref: 'ORD-2025-10239', title: 'Reception Signage Set', date: '06 Mar 2025', iso: '2025-03-06', status: 'Treated', export: 'Exported', origin: 'Web', customer: 'Opus Stockholm', email: 'stockholm@opus.com', phone: '', ship: 'Sveavägen, Stockholm', bill: 'Sveavägen, Stockholm', same: true, notes: '', shipping: 0, lines: [{ name: 'Reception Signage Set', qty: 1, price: 2180, productId: '' }] },
    { id: '10238', ref: 'ORD-2025-10238', title: 'Test Lane Wall Graphics', date: '05 Mar 2025', iso: '2025-03-05', status: 'Finished', export: 'Exported', origin: 'Admin', customer: 'Opus Huskvarna', email: 'huskvarna@opus.com', phone: '', ship: 'Esplanaden 8, Huskvarna', bill: 'Esplanaden 8, Huskvarna', same: true, notes: '', shipping: 0, lines: [{ name: 'Test Lane Wall Graphics', qty: 1, price: 990, productId: '' }] },
  ];

  orders.forEach((o) => {
    o.amount = o.lines.reduce((s, l) => s + l.qty * l.price, 0) + (o.shipping || 0);
    o.paymentStatus = 'INVOICE PENDING';
  });

  const suppliers = [
    { id: 's1', name: 'Antalis Paper', contact: 'orders@antalis.se', city: 'Stockholm', status: 'Active' },
    { id: 's2', name: 'Hexis Vinyl', contact: 'se@hexis.se', city: 'Göteborg', status: 'Active' },
    { id: 's3', name: 'Scan Textile', contact: 'hello@scantex.se', city: 'Borås', status: 'Active' },
    { id: 's4', name: 'Local Signage', contact: 'print@localsignage.se', city: 'Malmö', status: 'Paused' },
  ];

  return { companies, branches, users, products, orders, suppliers };
}

module.exports = { seed, LOREM };
