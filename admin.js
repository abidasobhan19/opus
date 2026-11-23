const I = {
  layers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 20 7 12 11 4 7 12 3z"/><path d="M4 12l8 4 8-4M4 16.5 12 20.5 20 16.5"/></svg>',
  grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg>',
  clip:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="4" width="12" height="16.5" rx="2"/><path d="M9 4.2h6V7H9zM8.5 11h7M8.5 15h5"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.2"/><path d="M5.5 19.5c1.1-3.2 3.2-4.8 6.5-4.8s5.4 1.6 6.5 4.8"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8.5" r="2.8"/><path d="M3.8 18.5c.8-2.6 2.5-4 5.2-4s4.4 1.4 5.2 4"/><circle cx="17" cy="9" r="2.2"/><path d="M16 14.8c1.5-.2 2.8.3 3.8 2"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19V5M4 19h16"/><path d="M8 16v-5M12 16V8M16 16v-3"/></svg>',
  building:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V7l8-3 8 3v13"/><path d="M9 20v-4h6v4M9 9h.01M12 9h.01M15 9h.01M9 12.5h.01M12 12.5h.01M15 12.5h.01"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-5.2v-6.2H10.2V21H5a1 1 0 0 1-1-1v-8.8z"/></svg>',
  info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M12 11v5M12 8h.01"/></svg>',
  tag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3.5 12.2V5h7.2L20.5 14.8l-5.7 5.7L3.5 12.2z"/><circle cx="8.2" cy="9" r="1.1" fill="currentColor" stroke="none"/></svg>',
  eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2.5 12S6.5 6.5 12 6.5 21.5 12 21.5 12 17.5 17.5 12 17.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.6"/></svg>',
  pen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20h4l11-11-4-4L4 16v4z"/><path d="M13 7l4 4"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="6.5"/><path d="M16 16.5 20.5 21"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M8.5 12.2 11 14.7 15.8 9.5"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 3h3l1.5 4-2 1.5a12 12 0 0 0 5 5L17 12l4 1.5V17a2 2 0 0 1-2 2A15 15 0 0 1 5 5a2 2 0 0 1 2-2z"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z"/><circle cx="12" cy="11" r="2"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13"/></svg>',
  out:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 7V5H5v14h9v-2M10 12h9M16 9l3 3-3 3"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 3.5v2.2M12 18.3V20.5M3.5 12h2.2M18.3 12h2.2M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6 5.8 18.2"/></svg>',
  bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16z"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>',
  cloud:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 18h10a4 4 0 0 0 .4-8 6 6 0 0 0-11.5 1.5A3.5 3.5 0 0 0 7 18z"/><path d="M12 12v5M10 14.5 12 12l2 2.5"/></svg>',
  box:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 8l9-4 9 4-9 4-9-4z"/><path d="M3 8v8l9 4 9-4V8M12 12v8"/></svg>'
};
const CHILD_MENUS = [
  {id:'products', label:'Product Management', icon:I.layers, items:[
    ['All','products'],
    ['Add New Product','products/new'],
    ['Categories','categories']
  ]},
  {id:'orders', label:'Orders', icon:I.clip, items:[
    ['All','orders'],
    ['Add New Order','orders/new']
  ]},
  {id:'users', label:'Users', icon:I.users, items:[
    ['All','company/opus/users'],
    ['Add New User','company/opus/users/new'],
    ['Guest User','company/opus/users/guest']
  ]},
  {id:'settings', label:'Settings', icon:I.gear, items:[
    ['All','settings'],
    ['Product Status','status'],
    ['Statistics','statistics'],
    ['Suppliers','suppliers'],
    ['Info','info']
  ]}
];
const COMPANY_LINKS = [
  ['All Companies','companies'],
  ['Create Company','companies/new'],
  ['Branches','company/opus/branches']
];
let openMenus = new Set(['companies']);
let accLock = '';
const TOP = [['home','Home',I.home],['info','Info',I.info],['status','Product Status',I.tag]];
const CATS = [
  ['Decals','decal'],['Profile Products','car'],['Posters','image'],['Signs','flag'],
  ['Print Products','print'],['Brochures','book'],['Flags','flag'],['Other','dots']
];
const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const KEY = 'tryck_admin_v3';

function esc(s){return String(s ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
function uid(p){return p + Math.random().toString(36).slice(2,8);}
function money(n){return Math.round(Number(n)||0).toLocaleString('en-US');}
function kr(n){const x=Number(n)||0; const [a,b]=x.toFixed(2).split('.'); return a.replace(/\B(?=(\d{3})+(?!\d))/g,' ') + ',' + b + ' kr';}
function badge(status){
  const map = {Active:'',Treated:'',Paused:'paused',Finished:'finished',Pending:'pending',Exported:'exported','Not Exported':'off',Draft:'draft',Private:'off',Published:'',Inactive:'off','Out of stock':'paused'};
  const cls = map[status] || '';
  return `<span class="badge${cls?' '+cls:''}"><i></i>${esc(status||'Active')}</span>`;
}
function route(){return (location.hash.replace(/^#\/?/, '') || 'companies').split('/').filter(Boolean);}
function go(hash){location.hash = hash;}
function companyUsersCount(c){return db.users.filter(u => u.companyId===c.id).length;}

function seed(){
  const branches = [
    {id:'stockholm', companyId:'opus', name:'Stockholm', users:105, status:'Active', email:'stockholm@opus.com', phone:'+46 70 123 4567', address:'Sveavägen ; Swedish Match North Europe. SE-118 85 Stockholm.', poc:'556677-8899', pocMobile:'+46 70 123 4567', description:LOREM, sales:45665.8, orders:124},
    {id:'gothenburg', companyId:'opus', name:'Gothenburg', users:30, status:'Active', email:'gothenburg@opus.com', phone:'+46 31 555 0190', address:'Östra Hamngatan 16, 411 09 Göteborg.', poc:'Helena Berg', pocMobile:'+46 70 200 1100', description:LOREM, sales:18240, orders:48},
    {id:'malmo', companyId:'opus', name:'Malmö', users:55, status:'Active', email:'malmo@opus.com', phone:'+46 40 555 0144', address:'Stortorget 9, 211 22 Malmö.', poc:'Armin Haddad', pocMobile:'+46 70 300 2200', description:LOREM, sales:22110.5, orders:61},
    {id:'uppsala', companyId:'opus', name:'Uppsala', users:43, status:'Active', email:'uppsala@opus.com', phone:'+46 18 555 0177', address:'Dragarbrunnsgatan 46, 753 20 Uppsala.', poc:'Nora Ek', pocMobile:'+46 70 400 3300', description:LOREM, sales:9800, orders:29},
    {id:'huskvarna', companyId:'opus', name:'Huskvarna', users:67, status:'Active', email:'huskvarna@opus.com', phone:'+46 36 555 0122', address:'Esplanaden 8, 561 31 Huskvarna.', poc:'Lars Holm', pocMobile:'+46 70 500 4400', description:LOREM, sales:14320, orders:36}
  ];
  const companies = [{
    id:'opus', name:'Opus', location:'Stockholm, Sweden', email:'email@opus.com', phone:'+46 70 123 4567',
    reg:'556677-8899', poc:'556677-8899', pocMobile:'+46 70 123 4567', address:'Stockholm, Sweden',
    description:LOREM, status:'Active', color:'#069691', logo:'', listedBranches:71
  }];
  const named = [
    ['Erik Andersson','erik.andersson@opus.com','+46 70 123 4567','stockholm','12 Feb 2026','09:24'],
    ['Anna Svensson','anna.svensson@opus.com','+46 70 234 5678','stockholm','12 Feb 2026','14:35'],
    ['Lars Johansson','lars.j@opus.com','+46 70 345 6789','stockholm','12 Feb 2026','16:42'],
    ['Maria Nilsson','maria.n@opus.com','+46 70 456 7890','stockholm','12 Feb 2026','11:20'],
    ['Johan Karlsson','johan.k@opus.com','+46 70 567 8901','stockholm','12 Feb 2026','13:15'],
    ['Sofia Bergström','sofia.b@opus.com','+46 70 678 9012','stockholm','12 Feb 2026','10:45'],
    ['Peter Lindberg','peter.lindberg@opus.com','+46 70 789 0123','stockholm','15 Feb 2026','15:30'],
    ['Emma Gustafsson','emma.g@opus.com','+46 70 890 1234','stockholm','12 Feb 2026','08:12'],
    ['Mikael Ström','mikael.strom@opus.com','+46 70 901 2345','stockholm','12 Feb 2026','12:55'],
    ['Karin Olsson','karin.olsson@opus.com','+46 70 012 3456','stockholm','02 Feb 2026','09:30']
  ];
  const first = ['Nora','Oskar','Elin','Gustav','Ida','Nils','Freja','Hugo','Maja','Axel','Alva','Liam','Wilma','Noah','Ella','William','Alice','Lucas','Olivia','Elias','Astrid','Leo','Saga','Oliver','Ebba','Viktor','Linnea','Isak','Agnes','Vera'];
  const last = ['Lindström','Eriksson','Hansson','Pettersson','Jonsson','Larsson','Persson','Olofsson','Nyström','Berg','Holm','Dahl','Sandberg','Lund','Engström'];
  const users = named.map((n,i) => ({
    id:'u'+(i+1), name:n[0], email:n[1], phone:n[2], companyId:'opus', branchId:n[3],
    role: i===0 ? 'Branch admin' : 'Customer', lastLogin:n[4], lastTime:n[5],
    orders: 12+i*3, created:'Jan 14, 2024', active:'1 day ago', guest:false
  }));
  users.push({
    id:'alex', name:'Alexander Thompson', email:'alex.thompson@opus.com', phone:'+46 70 123 45 67',
    companyId:'opus', branchId:'stockholm', role:'Project Manager / Lead Admin',
    lastLogin:'12 Feb 2026', lastTime:'16:10', orders:142, created:'Oct 12, 2023', active:'2 Hours Ago', guest:false
  });
  const branchIds = branches.map(b => b.id);
  let n = users.length;
  let fi = 0;
  while(users.length < 642){
    n++;
    const fn = first[fi % first.length];
    const ln = last[Math.floor(fi / first.length) % last.length];
    const branchId = branchIds[fi % branchIds.length];
    users.push({
      id:'u'+n, name:fn+' '+ln, email:(fn+'.'+ln).toLowerCase().replace(/ö/g,'o').replace(/ä/g,'a').replace(/å/g,'a')+n+'@opus.com',
      phone:'+46 70 ' + String(100+ (fi%900)).padStart(3,'0') + ' ' + String(1000+(fi%9000)).slice(0,4),
      companyId:'opus', branchId, role:'Customer', lastLogin:'0'+((fi%9)+1)+' Feb 2026', lastTime:'08:'+String(fi%60).padStart(2,'0'),
      orders: fi%40, created:'Mar 2, 2024', active:'3 days ago', guest:false
    });
    fi++;
  }
  const products = [
    {id:'4821', name:'OBD-II Diagnostic Scanner', article:'ART-88213', stock:142, price:1249, category:'Diagnostics', type:'Equipment', label:'Bestseller', brand:'AutoCheck Pro', date:'12 Mar 2025', status:'Published', description:'Workshop diagnostic scanner for Opus stations.', labels:['Bestseller'], categories:['Print Products'], color:'#dbeafe'},
    {id:'4822', name:'Brake Pad Inspection Kit', article:'ART-44109', stock:38, price:689, category:'Inspection Tools', type:'Kit', label:'', brand:'SafeDrive', date:'09 Mar 2025', status:'Published', description:'Pads, gauges and report cards for brake checks.', labels:[], categories:['Print Products'], color:'#fee2e2'},
    {id:'4823', name:'Headlight Alignment Tool', article:'ART-77321', stock:0, price:2450, category:'Lighting', type:'Tool', label:'New', brand:'BeamRight', date:'05 Mar 2025', status:'Published', description:'Alignment tool for headlight testing lanes.', labels:['New'], categories:['Signs'], color:'#fef3c7'},
    {id:'4824', name:'Tire Tread Depth Gauge', article:'ART-12980', stock:215, price:189, category:'Inspection Tools', type:'Tool', label:'', brand:'GripMaster', date:'28 Feb 2025', status:'Published', description:'Digital tread depth gauge.', labels:[], categories:['Other'], color:'#e0e7ff'},
    {id:'4825', name:'Emission Test Analyzer Kit', article:'ART-55604', stock:78, price:990, category:'Emissions', type:'Kit', label:'New', brand:'ClearAir Labs', date:'24 Feb 2025', status:'Published', description:'Analyzer kit and printed log sheets.', labels:['New'], categories:['Brochures'], color:'#d1fae5'},
    {id:'4826', name:'Wheel Alignment Sensor Set', article:'ART-33477', stock:54, price:4320, category:'Alignment', type:'Equipment', label:'', brand:'TrueLine', date:'18 Feb 2025', status:'Published', description:'Sensor set for wheel alignment.', labels:[], categories:['Profile Products'], color:'#cffafe'},
    {id:'4827', name:'Digital Torque Wrench', article:'ART-90112', stock:88, price:1595, category:'Inspection Tools', type:'Tool', label:'Bestseller', brand:'TorqFix', date:'11 Feb 2025', status:'Published', description:'Torque wrench for safety checks.', labels:['Bestseller'], categories:['Print Products'], color:'#fce7f3'},
    {id:'4828', name:'Vehicle Lift Safety Pads', article:'ART-66238', stock:310, price:420, category:'Safety', type:'Parts', label:'', brand:'HoldFast', date:'03 Feb 2025', status:'Published', description:'Replacement pads for vehicle lifts.', labels:[], categories:['Other'], color:'#ffedd5'},
    {id:'dec1024', name:'Opus Bilprovning Reflective Decal', article:'OP-DEC-1024', stock:80, price:149, category:'Decals', type:'Print', label:'Reflective', brand:'Opus Bilprovning', date:'14 Mar 2025', status:'Published', description:'High-visibility reflective decals designed for vehicle inspection stations. Durable, weather-resistant, and compliant with safety standards. Ideal for marking service areas and equipment.', labels:['Outdoor','Reflective','Branded'], categories:['Decals','Profile Products','Signs'], color:'#bbf7d0', hero:'decal'},
    {id:'9001', name:'Station Poster Draft', article:'ART-22001', stock:12, price:320, category:'Posters', type:'Print', label:'', brand:'Opus Bilprovning', date:'01 Mar 2025', status:'Draft', description:'Draft poster for the station waiting room.', labels:[], categories:['Posters'], color:'#e0e7ff'},
    {id:'9002', name:'Internal Price List', article:'ART-22002', stock:4, price:0, category:'Print Products', type:'Print', label:'', brand:'Opus Bilprovning', date:'01 Mar 2025', status:'Private', description:'Private price list for staff.', labels:[], categories:['Print Products'], color:'#f3f4f6'}
  ];
  const orders = [
    {id:'10245', title:'Corporate Decals + Posters', date:'12 Mar 2025', iso:'2025-03-12', status:'Treated', export:'Not Exported', origin:'Web', customer:'Nordic Services', email:'orders@nordicservices.se', ship:'Sveavägen 12, 111 57 Stockholm, Sweden', bill:'Sveavägen 12, 111 57 Stockholm, Sweden', same:true, notes:'', shipping:0, lines:[{name:'Corporate Wall Decal', qty:2, price:2600},{name:'Framed Posters A2', qty:5, price:1540}]},
    {id:'10244', title:'Vehicle Wrap – Fleet Van', date:'11 Mar 2025', iso:'2025-03-11', status:'Paused', export:'Pending', origin:'Customer Portal', customer:'Fleet Nordic AB', email:'fleet@nordic.se', ship:'Industrivägen 4, 417 05 Göteborg', bill:'Industrivägen 4, 417 05 Göteborg', same:true, notes:'', shipping:0, lines:[{name:'Fleet Van Wrap', qty:1, price:5075}]},
    {id:'10243', ref:'ORD-00124', title:'Safety Signage Bundle', date:'10 Mar 2025', iso:'2025-03-14', status:'Treated', listStatus:'Finished', shownAmount:1860, export:'Exported', origin:'Admin', customer:'Karin Andersson', email:'karin.andersson@email.com', ship:'Sveavägen 44, 111 34 Stockholm, Sweden', bill:'Sveavägen 44, 111 34 Stockholm, Sweden', same:true, notes:'Please handle with care. Fragile items included.', shipping:49, lines:[{name:'Reflective Decals', qty:10, price:149},{name:'Safety Signage Bundle', qty:1, price:1249}]},
    {id:'10242', title:'Window Graphics – Showroom', date:'09 Mar 2025', iso:'2025-03-09', status:'Treated', export:'Not Exported', origin:'Web', customer:'Showroom Syd', email:'hello@showroomsyd.se', ship:'Södra Förstadsgatan 2, Malmö', bill:'Södra Förstadsgatan 2, Malmö', same:true, notes:'', shipping:0, lines:[{name:'Window Graphic', qty:1, price:3410}]},
    {id:'10241', title:'Inspection Report Print Pack', date:'08 Mar 2025', iso:'2025-03-08', status:'Finished', export:'Pending', origin:'Customer Portal', customer:'Opus Uppsala', email:'uppsala@opus.com', ship:'Dragarbrunnsgatan 46, Uppsala', bill:'Dragarbrunnsgatan 46, Uppsala', same:true, notes:'', shipping:0, lines:[{name:'Inspection Report Pack', qty:1, price:7640}]},
    {id:'10240', title:'Branded Floor Decals', date:'07 Mar 2025', iso:'2025-03-07', status:'Paused', export:'Exported', origin:'Admin', customer:'Nordic Services', email:'orders@nordicservices.se', ship:'Sveavägen 12, Stockholm', bill:'Sveavägen 12, Stockholm', same:true, notes:'', shipping:0, lines:[{name:'Branded Floor Decals', qty:1, price:4250}]},
    {id:'10239', title:'Reception Signage Set', date:'06 Mar 2025', iso:'2025-03-06', status:'Treated', export:'Exported', origin:'Web', customer:'Opus Stockholm', email:'stockholm@opus.com', ship:'Sveavägen, Stockholm', bill:'Sveavägen, Stockholm', same:true, notes:'', shipping:0, lines:[{name:'Reception Signage Set', qty:1, price:2180}]},
    {id:'10238', title:'Test Lane Wall Graphics', date:'05 Mar 2025', iso:'2025-03-05', status:'Finished', export:'Exported', origin:'Admin', customer:'Opus Huskvarna', email:'huskvarna@opus.com', ship:'Esplanaden 8, Huskvarna', bill:'Esplanaden 8, Huskvarna', same:true, notes:'', shipping:0, lines:[{name:'Test Lane Wall Graphics', qty:1, price:990}]}
  ];
  orders.forEach(o => { o.amount = o.lines.reduce((s,l)=>s+l.qty*l.price,0) + (o.shipping||0); });
  const suppliers = [
    {id:'s1', name:'Antalis Paper', contact:'orders@antalis.se', city:'Stockholm', status:'Active'},
    {id:'s2', name:'Hexis Vinyl', contact:'se@hexis.se', city:'Göteborg', status:'Active'},
    {id:'s3', name:'Scan Textile', contact:'hello@scantex.se', city:'Borås', status:'Active'},
    {id:'s4', name:'Local Signage', contact:'print@localsignage.se', city:'Malmö', status:'Paused'}
  ];
  return {companies, branches, users, products, orders, suppliers};
}

let db = load();
let ui = freshUi();
let entered = '';
let formBuf = null;

function freshUi(){return {q:'', page:1, tab:'all', per:10, cat:'', type:'', stock:'', brand:'', mass:'export', discount:''};}
function load(){
  try{
    const raw = localStorage.getItem(KEY);
    if(raw){
      const data = JSON.parse(raw);
      if(data && data.companies && data.users && data.users.length) return data;
    }
  }catch(e){}
  const data = seed();
  try{localStorage.setItem(KEY, JSON.stringify(data));}catch(e){}
  return data;
}
function save(){try{localStorage.setItem(KEY, JSON.stringify(db));}catch(e){}}
function findCompany(id){return db.companies.find(c=>c.id===id);}
function findBranch(id){return db.branches.find(b=>b.id===id);}
function findUser(id){return db.users.find(u=>u.id===id);}
function findProduct(id){return db.products.find(p=>p.id===id);}
function findOrder(id){return db.orders.find(o=>String(o.id)===String(id));}
function branchName(id){const b=findBranch(id); return b?b.name:'—';}
function companyName(id){const c=findCompany(id); return c?c.name:'—';}
function orderAmount(o){return (o.lines||[]).reduce((s,l)=>s+Number(l.qty)*Number(l.price),0) + (Number(o.shipping)||0);}
function listAmount(o){return o.shownAmount!=null ? o.shownAmount : orderAmount(o);}
function branchShown(c){return c.listedBranches!=null ? c.listedBranches : db.branches.filter(b=>b.companyId===c.id).length;}
function toast(msg){const t=document.createElement('div'); t.className='toast'; t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(), 2200);}
function crumb(items){
  return `<nav class="crumb">${items.map((it,i)=>{
    const node = it[1] ? `<a href="#${it[1]}">${esc(it[0])}</a>` : `<b>${esc(it[0])}</b>`;
    return (i?`<span>›</span>`:'')+node;
  }).join('')}</nav>`;
}
function pager(total, dark){
  const pages = Math.max(1, Math.ceil(total / ui.per));
  if(ui.page>pages) ui.page = pages;
  if(ui.page<1) ui.page = 1;
  const from = total? (ui.page-1)*ui.per+1 : 0;
  const to = Math.min(ui.page*ui.per, total);
  const nums = [];
  const want = new Set([1,2,3,pages,ui.page]);
  [...want].filter(n=>n>=1&&n<=pages).sort((a,b)=>a-b).forEach((n,i,arr)=>{
    if(i && n-arr[i-1]>1) nums.push('<span>…</span>');
    nums.push(`<button type="button" data-page="${n}" class="${n===ui.page?'on':''} ${dark?'dark':''}">${n}</button>`);
  });
  return {from,to,pages, html:`<div class="pages">
    <button type="button" data-page="${ui.page-1}" ${ui.page<=1?'disabled':''} aria-label="Previous">&lt;</button>
    ${nums.join('')}
    <button type="button" data-page="${ui.page+1}" ${ui.page>=pages?'disabled':''} aria-label="Next">&gt;</button>
  </div>`};
}
function slice(rows){return rows.slice((ui.page-1)*ui.per, ui.page*ui.per);}
function designPages(last, realPages){
  realPages = realPages || 1;
  const seq = last > 4 ? [1,2,3,'…',last] : [1,2,3,4].slice(0, last);
  const btns = seq.map(n => {
    if(n==='…') return '<span>…</span>';
    if(n===1) return '<button type="button" class="on" data-page="1">1</button>';
    if(n<=realPages) return `<button type="button" data-page="${n}">${n}</button>`;
    return `<button type="button" data-act="sample-page">${n}</button>`;
  }).join('');
  return `<div class="pages"><button type="button" disabled aria-label="Previous">&lt;</button>${btns}<button type="button" ${realPages>1?'data-page="2"':'disabled'} aria-label="Next">&gt;</button></div>`;
}
function qok(s){return !ui.q || String(s).toLowerCase().includes(ui.q.trim().toLowerCase());}

function sideKey(p){
  if(p[0]==='product'||p[0]==='products'||p[0]==='categories') return 'products';
  if(p[0]==='order'||p[0]==='orders') return 'orders';
  if(p[0]==='users'||p[0]==='user') return 'users';
  if(p[0]==='company' && (p[2]==='users'||p[2]==='user')) return 'users';
  if(p[0]==='company'||p[0]==='companies') return 'companies';
  if(p[0]==='settings'||p[0]==='suppliers'||p[0]==='supplier'||p[0]==='statistics'||p[0]==='info'||p[0]==='status') return 'settings';
  return '';
}
function focused(p){
  return (p[0]==='products'&&p[1]==='new') || (p[0]==='product'&&p[2]==='edit') || (p[0]==='orders'&&p[1]==='new') || (p[0]==='order');
}
function paintChrome(){
  const p = route();
  const key = sideKey(p);
  document.body.classList.toggle('focused', focused(p));
  if(accLock!=='companies') openMenus.add('companies');
  if(key && key!=='companies' && key!==accLock) openMenus.add(key);
  const here = (location.hash.replace(/^#\/?/, '') || 'companies');
  const chev = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';
  const childHtml = CHILD_MENUS.map(menu => {
    const open = openMenus.has(menu.id);
    return `<div class="acc nest${open?' open':''}${key===menu.id?' on':''}">
      <button type="button" data-acc="${menu.id}" aria-expanded="${open?'true':'false'}">${menu.icon}<span class="lbl">${esc(menu.label)}</span>${chev}</button>
      <div class="sub">${menu.items.map(([label,href])=>`<a href="#${href}" class="${here===href?'on':''}">${esc(label)}</a>`).join('')}</div>
    </div>`;
  }).join('');
  const companiesOpen = openMenus.has('companies');
  document.getElementById('sidenav').innerHTML = `<div class="acc${companiesOpen?' open':''}${key==='companies'?' on':''}">
    <button type="button" data-acc="companies" aria-expanded="${companiesOpen?'true':'false'}">${I.building}<span class="lbl">All Companies</span>${chev}</button>
    <div class="sub">
      ${COMPANY_LINKS.map(([label,href])=>`<a href="#${href}" class="${here===href?'on':''}">${esc(label)}</a>`).join('')}
      ${childHtml}
    </div>
  </div>`;
  const top = p[0]==='home'?'home':p[0]==='info'?'info':p[0]==='status'?'status':'';
  document.getElementById('topnav').innerHTML = TOP.map(([id,label,icon])=>`<a href="#${id}" class="${top===id?'on':''}">${icon}<span>${esc(label)}</span></a>`).join('');
}
function shellHead(title, sub, actions){
  return `<div class="head"><div><h1>${esc(title)}</h1>${sub?`<p class="sub">${esc(sub)}</p>`:''}</div><div class="actions">${actions||''}</div></div>`;
}

function companiesView(){
  const rows = db.companies.filter(c => qok(c.name+' '+c.location+' '+c.reg+' '+c.email));
  const allBranches = db.branches.filter(b => qok(b.name+' '+companyName(b.companyId)));
  const list = ui.tab==='branches' ? allBranches : rows;
  ui.per = 8;
  const pg = pager(list.length, true);
  const stats = `<div class="stats">
    <article class="stat"><div><div class="k">Total Companies</div><div class="v">${String(db.companies.length).padStart(2,'0')}</div></div><div class="ic">${I.building}</div></article>
    <article class="stat"><div><div class="k">Branches</div><div class="v">${db.companies.reduce((n,c)=>n+branchShown(c),0)}</div></div><div class="ic">${I.check}</div></article>
    <article class="stat"><div><div class="k">Total Users</div><div class="v">${db.users.length}</div></div><div class="ic">${I.users}</div></article>
  </div>`;
  let table;
  if(ui.tab==='branches'){
    table = list.length? `<table><thead><tr><th>BRANCH</th><th>COMPANY</th><th>USERS</th><th>STATUS</th><th></th></tr></thead><tbody>
      ${slice(list).map(b=>`<tr>
        <td><b>${esc(b.name)}</b></td><td>${esc(companyName(b.companyId))}</td><td><span class="users">${I.user}${b.users}</span></td><td>${badge(b.status)}</td>
        <td class="actions-cell">
          <a class="iconbtn" href="#company/${b.companyId}/branch/${b.id}" aria-label="View">${I.eye}</a>
          <a class="iconbtn" href="#company/${b.companyId}/branch/${b.id}/edit" aria-label="Edit">${I.pen}</a>
        </td></tr>`).join('')}
    </tbody></table>` : `<div class="empty">No branches match this search.</div>`;
  }else{
    table = list.length? `<table><thead><tr><th>COMPANY</th><th>REG. NUMBER</th><th>USERS</th><th>STATUS</th><th>BRANCHES</th><th style="text-align:right">ACTIONS</th></tr></thead><tbody>
      ${slice(list).map(c=>{
        const n = branchShown(c);
        return `<tr>
          <td><a class="who-cell" href="#company/${c.id}"><div class="mark">${I.building}</div><div><b>${esc(c.name)}</b><small>${esc(c.location||c.address||'')}</small></div></a></td>
          <td>${esc(c.reg||'—')}</td>
          <td><span class="users">${I.user}${companyUsersCount(c)}</span></td>
          <td>${badge(c.status)}</td><td>${n}</td>
          <td class="actions-cell">
            <a class="iconbtn" href="#company/${c.id}" aria-label="View ${esc(c.name)}">${I.eye}</a>
            <a class="iconbtn" href="#company/${c.id}/edit" aria-label="Edit ${esc(c.name)}">${I.pen}</a>
          </td></tr>`;
      }).join('')}
    </tbody></table>` : `<div class="empty">No companies match this search.</div>`;
  }
  const noun = ui.tab==='branches'?'branches':'companies';
  return `${shellHead('Companies','Manage and view all companies connected to the ordering portal.', `<a class="btn pill" href="#companies/new">${I.plus} Create Company</a>`)}
    ${stats}
    <div class="toolbar">
      <label class="search">${I.search}<input id="q" placeholder="${ui.tab==='branches'?'Search branches...':'Search companies...'}" value="${esc(ui.q)}"></label>
      <div class="tabs">
        <button type="button" data-tab="all" class="${ui.tab!=='branches'?'on':''}">All Companies</button>
        <button type="button" data-tab="branches" class="${ui.tab==='branches'?'on':''}">Branches</button>
      </div>
    </div>
    <div class="table-card">${table}</div>
    <div class="pagerow"><div>Showing <b>${list.length?pg.from:0}</b>${list.length&&pg.to!==pg.from?'–<b>'+pg.to+'</b>':''} of <b>${list.length}</b> ${noun}</div>${pg.html}</div>`;
}

function companyForm(c){
  const editing = !!c;
  const color = (formBuf && formBuf.color) || (c&&c.color) || '#069691';
  return `${crumb(editing?[['Companies','companies'],[c.name,'company/'+c.id],['Edit']]:[['Companies','companies'],['Create New Company']])}
    ${shellHead(editing?'Edit Company':'Create Company', editing?'Update the company connected to the ordering portal.':'Add a new company to the ordering portal.')}
    <form class="card" id="companyForm" style="margin-top:16px;max-width:980px">
      <h2>Company Information</h2>
      <p class="hint" style="margin-bottom:16px">Fill in the details below to register a new company.</p>
      <div class="grid2">
        <div class="field"><label>Company Name</label><input name="name" value="${esc(c?c.name:'')}" placeholder="Enter company name"></div>
        <div class="field"><label>Email Address</label><input name="email" value="${esc(c?c.email:'')}" placeholder="Enter Email Address"></div>
      </div>
      <div class="field"><label>Description</label><textarea name="description" placeholder="Enter Description">${esc(c?c.description:'')}</textarea></div>
      <div class="field"><label>Address</label><input name="address" value="${esc(c?c.address||c.location||'':'')}" placeholder="Enter Address"></div>
      <div class="grid2">
        <div class="field"><label>Reg. Number</label><input name="reg" value="${esc(c?c.reg:'')}" placeholder="Enter registration number"></div>
        <div class="field"><label>Mobile Number</label><input name="phone" value="${esc(c?c.phone:'')}" placeholder="Enter Mobile number"></div>
      </div>
      <div class="grid2">
        <div class="field"><label>Point of Contact (POC)</label><input name="poc" value="${esc(c?c.poc:'')}" placeholder="Contact Person Name"></div>
        <div class="field"><label>POC Mobile Number</label><input name="pocMobile" value="${esc(c?c.pocMobile:'')}" placeholder="Enter POC Mobile number"></div>
      </div>
      <div class="grid2">
        <div class="field"><label>Company Logo</label>
          <label class="drop">${c&&c.logo?`<img alt="" src="${esc(c.logo)}" style="max-height:80px">`:I.cloud}<strong>Upload company logo</strong><span>PNG, JPG or SVG</span><em class="ghost" style="pointer-events:none">Browse Files</em><input type="file" name="logo" accept="image/*"></label>
        </div>
        <div class="field" style="position:relative"><label>Company Color</label>
          <div class="color-row"><button type="button" class="swatch" id="swatch" style="background:${esc(color)}"></button><span class="hash">#</span><input name="color" id="colorHex" value="${esc(color.replace('#',''))}" placeholder="069691"></div>
          <div class="color-pop" id="colorPop" hidden>
            <input type="color" id="colorPick" value="${esc(color.length===7?color:'#069691')}" style="width:100%;height:90px;border:0;background:none;padding:0">
            <div class="palette" id="palette"></div>
          </div>
          <button type="button" class="ghost" id="swatchBtn" style="margin-top:8px;border-radius:999px"><span class="swatch" style="background:${esc(color)}"></span> Swatch</button>
        </div>
      </div>
      <div class="err" id="formErr"></div>
      <div class="actions"><button class="btn" type="submit">Save</button><a class="ghost" href="#${editing?'company/'+c.id:'companies'}">Cancel</a></div>
    </form>`;
}

function companyView(c){
  return `${crumb([['Companies','companies'],[c.name]])}
    <div class="head"><div><h1>${esc(c.name)}</h1><p class="sub">${esc(c.location||c.address||'')}</p></div>
      <div class="actions"><a class="btn" href="#company/${c.id}/branches">View Branches</a><a class="btn dark" href="#company/${c.id}/users">View Users</a></div></div>
    <article class="card" style="margin-top:18px">
      <div class="profile">
        <div class="sphere" style="${c.logo?`background-image:url(${esc(c.logo)});background-size:cover`:''}"></div>
        <div>
          <h2>${esc(c.name)}</h2>
          ${badge(c.status)}
          <p class="lead">${esc(c.description||LOREM)}</p>
          <div class="info-grid">
            <div class="info-item"><div class="ibox">${I.mail}</div><div><small>Email Address</small><b>${esc(c.email||'—')}</b></div></div>
            <div class="info-item"><div class="ibox">${I.phone}</div><div><small>Mobile Number</small><b>${esc(c.phone||'—')}</b></div></div>
            <div class="info-item"><div class="ibox">${I.building}</div><div><small>Reg. Number</small><b>${esc(c.reg||'—')}</b></div></div>
            <div class="info-item"></div>
            <div class="info-item"><div class="ibox">${I.user}</div><div><small>Point of Contact</small><b>${esc(c.poc||'—')}</b></div></div>
            <div class="info-item"><div class="ibox">${I.phone}</div><div><small>POC Mobile Number</small><b>${esc(c.pocMobile||'—')}</b></div></div>
          </div>
        </div>
      </div>
    </article>`;
}

function branchesView(c){
  const rows = db.branches.filter(b=>b.companyId===c.id && qok(b.name+' '+c.name));
  ui.per = 8;
  const pg = pager(rows.length, true);
  const users = db.users.filter(u=>u.companyId===c.id).length;
  return `${crumb([['Companies','companies'],[c.name,'company/'+c.id],['Branches']])}
    ${shellHead('Branches','Manage and view all companies connected to the ordering portal.', `<a class="btn pill" href="#company/${c.id}/branches/new">${I.plus} Create New Branch</a>`)}
    <div class="toolbar"><label class="search">${I.search}<input id="q" placeholder="Search Branches..." value="${esc(ui.q)}"></label></div>
    <div class="table-card"><table><thead><tr><th>BRANCH</th><th>COMPANY</th><th>USERS</th><th>STATUS</th><th style="text-align:right">ACTIONS</th></tr></thead><tbody>
      ${slice(rows).map(b=>`<tr>
        <td><a href="#company/${c.id}/branch/${b.id}"><b>${esc(b.name)}</b></a></td>
        <td>${esc(c.name)}</td>
        <td><span class="users">${I.user} ${b.users}</span></td>
        <td>${badge(b.status)}</td>
        <td class="actions-cell">
          <a class="iconbtn" href="#company/${c.id}/branch/${b.id}">${I.eye}</a>
          <a class="iconbtn" href="#company/${c.id}/branch/${b.id}/edit">${I.pen}</a>
        </td></tr>`).join('') || `<tr><td colspan="5" class="empty">No branches yet.</td></tr>`}
    </tbody></table></div>
    <div class="pagerow"><div>${ui.q?`Showing <b>${rows.length?pg.from:0}${rows.length&&pg.to!==pg.from?'–'+pg.to:''}</b> of <b>${rows.length}</b> branches`:`Showing <b>1</b> of <b>1</b> companies`}</div>${ui.q?pg.html:'<div class="pages"><button type="button" disabled aria-label="Previous">&lt;</button><button type="button" class="on dark">1</button><button type="button" disabled aria-label="Next">&gt;</button></div>'}</div>
    <article class="stat" style="margin-top:16px"><div><div class="k">Total Users</div><div class="v">${users}</div></div><div class="ic">${I.users}</div></article>
    <a class="btn dark" style="margin-top:14px" href="#company/${c.id}/users">View All Users</a>`;
}

function branchForm(c, b){
  const editing = !!b;
  b = b || {name:'', email:'', phone:'', address:'', poc:'', pocMobile:'', description:'', users:0, status:'Active', sales:0, orders:0};
  return `${crumb([['Companies','companies'],[c.name,'company/'+c.id],['Branches','company/'+c.id+'/branches'],[editing?b.name:'New branch']])}
    ${shellHead(editing?'Edit Branch':'Create New Branch', c.name)}
    <form class="card" id="branchForm" style="margin-top:16px;max-width:860px">
      <div class="grid2">
        <div class="field"><label>Branch name</label><input name="name" value="${esc(b.name)}" placeholder="Stockholm"></div>
        <div class="field"><label>Status</label><select name="status"><option ${b.status!=='Inactive'?'selected':''}>Active</option><option ${b.status==='Inactive'?'selected':''}>Inactive</option></select></div>
      </div>
      <div class="field"><label>Description</label><textarea name="description">${esc(b.description||'')}</textarea></div>
      <div class="grid2">
        <div class="field"><label>Email Address</label><input name="email" value="${esc(b.email||'')}"></div>
        <div class="field"><label>Mobile Number</label><input name="phone" value="${esc(b.phone||'')}"></div>
      </div>
      <div class="field"><label>Address</label><input name="address" value="${esc(b.address||'')}"></div>
      <div class="grid2">
        <div class="field"><label>Point of Contact</label><input name="poc" value="${esc(b.poc||'')}"></div>
        <div class="field"><label>POC Mobile Number</label><input name="pocMobile" value="${esc(b.pocMobile||'')}"></div>
      </div>
      <div class="grid2">
        <div class="field"><label>Users</label><input name="users" type="number" min="0" value="${Number(b.users)||0}"></div>
        <div class="field"><label>Active orders</label><input name="orders" type="number" min="0" value="${Number(b.orders)||0}"></div>
      </div>
      <div class="field"><label>Total sales (kr)</label><input name="sales" type="number" min="0" step="0.01" value="${Number(b.sales)||0}"></div>
      <div class="err" id="formErr"></div>
      <div class="actions"><button class="btn" type="submit">Save</button><a class="ghost" href="#company/${c.id}/branches">Cancel</a></div>
    </form>`;
}

function branchView(c,b){
  return `${crumb([['Companies','companies'],[c.name,'company/'+c.id],['Branches','company/'+c.id+'/branches'],[b.name]])}
    <div class="head"><div><h1>${esc(b.name)}</h1><p class="sub">${esc(c.name)}</p></div></div>
    <div class="metric-row">
      <article class="stat"><div><div class="k">Total Sales</div><div class="v">${Number(b.sales).toFixed(2).replace('.',',')} kr</div></div></article>
      <article class="stat"><div><div class="k">Active Orders</div><div class="v">${b.orders}</div></div></article>
      <article class="stat"><div><div class="k">Users</div><div class="v">${b.users}</div></div></article>
    </div>
    <article class="card" style="margin-top:16px">
      <div class="head"><h2>Branch Information</h2><a class="ghost" href="#company/${c.id}/branch/${b.id}/edit">${I.pen} Edit Info</a></div>
      <h2 style="font-size:26px;margin:14px 0 8px">${esc(b.name)}</h2>
      <p class="lead" style="color:#4b5563;font-size:14px;line-height:1.55;max-width:720px">${esc(b.description||'')}</p>
      <div class="info-grid" style="margin-top:16px">
        <div class="info-item"><div class="ibox">${I.mail}</div><div><small>Email Address</small><b>${esc(b.email||'—')}</b></div></div>
        <div class="info-item"><div class="ibox">${I.phone}</div><div><small>Mobile Number</small><b>${esc(b.phone||'—')}</b></div></div>
        <div class="info-item wide"><div class="ibox">${I.pin}</div><div><small>Address</small><b>${esc(b.address||'—')}</b></div></div>
        <div class="info-item"><div class="ibox">${I.user}</div><div><small>Point of Contact</small><b>${esc(b.poc||'—')}</b></div></div>
        <div class="info-item"><div class="ibox">${I.phone}</div><div><small>POC Mobile Number</small><b>${esc(b.pocMobile||'—')}</b></div></div>
      </div>
    </article>`;
}

function usersView(companyId){
  const c = companyId ? findCompany(companyId) : null;
  let rows = db.users.filter(u => !companyId || u.companyId===companyId);
  rows = rows.filter(u => qok(u.name+' '+u.email+' '+u.phone+' '+branchName(u.branchId)));
  ui.per = ui.per || 10;
  const pg = pager(rows.length);
  const base = c ? `company/${c.id}/users` : 'users';
  const head = c
    ? `${crumb([['Companies','companies'],[c.name,'company/'+c.id],['Users']])}
       <div class="head"><div><h1>Users</h1><p class="sub">Manage all users, guests, and permissions</p></div>
       <div class="actions">
         <button class="ghost" type="button" data-act="export-users" data-company="${c.id}">↓ Export User Details</button>
         <a class="ghost" href="#company/${c.id}/users/guest">${I.user} Create Guest User</a>
         <a class="btn" href="#company/${c.id}/users/new">${I.plus} Add New User</a>
       </div></div>`
    : shellHead('Users','Every account that can sign in to a company portal.', `<a class="btn" href="#users/new">${I.plus} Add New User</a>`);
  return `${head}
    <div class="toolbar">
      <label class="search">${I.search}<input id="q" placeholder="Search by name or email..." value="${esc(ui.q)}"></label>
      <button class="ghost" type="button" id="searchBtn">Search</button>
    </div>
    <div class="table-card"><table><thead><tr>
      <th style="width:36px"><input class="check" type="checkbox" data-act="check-all"></th>
      <th>NAME</th><th>EMAIL</th><th>PHONE</th><th>BRANCH</th><th>LAST LOGIN</th><th style="text-align:right">ACTIONS</th>
    </tr></thead><tbody>
      ${slice(rows).map(u=>`<tr>
        <td><input class="check row-check" type="checkbox" value="${esc(u.id)}"></td>
        <td><a href="#${c?`company/${c.id}/user/${u.id}`:`user/${u.id}`}"><b>${esc(u.name)}</b></a></td>
        <td>${esc(u.email)}</td><td>${esc(u.phone)}</td><td>${esc(branchName(u.branchId))}</td>
        <td>${esc(u.lastLogin)}<br><span class="muted">${esc(u.lastTime||'')}</span></td>
        <td class="actions-cell"><button class="iconbtn" type="button" data-act="del-user" data-id="${esc(u.id)}" aria-label="Remove">${I.trash}</button></td>
      </tr>`).join('') || `<tr><td colspan="7" class="empty">No users match this search.</td></tr>`}
    </tbody></table>
    <div class="pagerow" style="padding:12px 16px">
      <div>Showing <b>${rows.length?pg.from:0}–${pg.to}</b> of <b>${rows.length}</b> users</div>
      <label class="per">Rows per page: <input id="per" type="number" min="5" max="100" value="${ui.per}"></label>
      ${pg.html}
    </div></div>`;
}

function userForm(c, user, guest){
  const branches = db.branches.filter(b => !c || b.companyId===c.id);
  const companies = db.companies;
  const back = c ? `#company/${c.id}/users` : '#users';
  return `${c?crumb([['Companies','companies'],[c.name,'company/'+c.id],['Users','company/'+c.id+'/users'],[user?user.name:guest?'Guest user':'Add New User']]):''}
    <div class="head"><div><h1>${user?'Edit User':guest?'Create Guest User':'Add New User'}</h1><p class="sub">${guest?'A guest can order without a full staff account.':'Create a new customer or internal account'}</p></div>
      <div class="actions"><a class="ghost" href="${back}">Cancel</a><button class="btn" type="submit" form="userForm">✓ Save User</button></div></div>
    <form class="card" id="userForm" style="margin-top:16px">
      <h2 style="display:flex;align-items:center;gap:8px;color:var(--teal-deep)">${I.user} User Information</h2>
      <div class="grid2" style="margin-top:16px">
        <div class="field"><label>User Name <span class="req">*</span></label><input name="name" value="${esc(user?user.name:'')}" placeholder="Enter Name" required></div>
        <div class="field"><label>Email Address <span class="req">*</span></label><input name="email" type="email" value="${esc(user?user.email:'')}" placeholder="user@company.se" required></div>
        <div class="field"><label>Select Company <span class="req">*</span></label>
          <select name="companyId" id="userCompany">${companies.map(co=>`<option value="${co.id}" ${((user&&user.companyId)||(c&&c.id))===co.id?'selected':''}>${esc(co.name)}</option>`).join('')}</select></div>
        <div class="field"><label>Select Branch <span class="req">*</span></label>
          <select name="branchId" id="userBranch">${branches.map(b=>`<option value="${b.id}" ${(user&&user.branchId)===b.id?'selected':''}>${esc(b.name)}</option>`).join('')}</select></div>
        <div class="field"><label>Mobile Number <span class="req">*</span></label><input name="phone" value="${esc(user?user.phone:'')}" placeholder="Enter Mobile Number" required></div>
        <div class="field"><label>Role</label><input name="role" value="${esc(user?user.role:guest?'Guest':'Customer')}"></div>
      </div>
      <input type="hidden" name="guest" value="${guest||(user&&user.guest)?'1':'0'}">
      <div class="err" id="formErr"></div>
    </form>`;
}

function userView(u){
  const c = findCompany(u.companyId);
  const b = findBranch(u.branchId);
  const back = c ? `company/${c.id}/user/${u.id}/edit` : `user/${u.id}/edit`;
  return `${c?crumb([['Companies','companies'],[c.name,'company/'+c.id],['Users','company/'+c.id+'/users'],[u.name]]):crumb([['Users','users'],[u.name]])}
    <div class="head"><div><h1>${esc(u.name)}</h1><p class="sub">${esc(b?b.name:'')}</p></div><a class="btn" href="#${back}">${I.pen} Edit User</a></div>
    <article class="card" style="margin-top:16px">
      <h2 style="display:flex;gap:8px;align-items:center;color:var(--teal-deep)">${I.user} User Information</h2>
      <div class="info-grid" style="margin-top:18px">
        <div><small class="muted">FULL NAME</small><div class="info-item" style="margin-top:8px"><div class="ibox">${I.user}</div><b>${esc(u.name)}</b></div></div>
        <div><small class="muted">EMAIL ADDRESS</small><div class="info-item" style="margin-top:8px"><div class="ibox">${I.mail}</div><b>${esc(u.email)}</b></div></div>
        <div><small class="muted">COMPANY</small><div class="info-item" style="margin-top:8px"><div class="ibox">${I.building}</div><b>${esc(c?c.name:'—')}</b></div></div>
        <div><small class="muted">BRANCH</small><div class="info-item" style="margin-top:8px"><div class="ibox">${I.pin}</div><b>${esc(b ? (b.id==='stockholm' ? 'Stockholm Office (Central)' : b.name) : '—')}</b></div></div>
        <div><small class="muted">CONTACT NUMBER</small><div class="info-item" style="margin-top:8px"><div class="ibox">${I.phone}</div><b>${esc(u.phone)}</b></div></div>
        <div><small class="muted">ROLE</small><div class="info-item" style="margin-top:8px"><div class="ibox">${I.check}</div><b>${esc(u.role||'Customer')}</b></div></div>
      </div>
      <div class="metric-row">
        <div class="metric"><small>TOTAL ORDERS</small><b>${u.orders||0}</b></div>
        <div class="metric"><small>LAST ACTIVE</small><b>${esc(u.active||u.lastLogin||'—')}</b></div>
        <div class="metric"><small>CREATED DATE</small><b>${esc(u.created||'—')}</b></div>
      </div>
    </article>`;
}

function catIcon(kind){
  if(kind==='car') return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 14h16l-1.5-4.5H7L4 14z"/><circle cx="7.5" cy="17" r="1.4"/><circle cx="16.5" cy="17" r="1.4"/></svg>';
  if(kind==='image') return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.4"/><path d="m4 16 5-4 4 3 2-2 5 4"/></svg>';
  if(kind==='flag') return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 4v16M6 5h11l-2 3 2 3H6"/></svg>';
  if(kind==='print') return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="6" y="3" width="12" height="6"/><rect x="4" y="9" width="16" height="8" rx="2"/><path d="M8 17h8v4H8z"/></svg>';
  if(kind==='book') return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 5h6a3 3 0 0 1 3 3v11H8a3 3 0 0 0-3 3zM19 5h-6a3 3 0 0 0-3 3"/></svg>';
  if(kind==='dots') return '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/></svg>';
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3c2 3 2 5 0 8 3-1 6 0 7 3-3 1-5 4-4 8-3-2-7-2-10 0 1-4-1-7-4-8 3-1 5-4 4-7 2 1 4 1 7 4z"/></svg>';
}

function productsView(){
  let rows = db.products.slice();
  if(ui.tab==='Published'||ui.tab==='Draft'||ui.tab==='Private') rows = rows.filter(p=>p.status===ui.tab);
  if(ui.cat) rows = rows.filter(p => p.category===ui.cat || (p.categories||[]).includes(ui.cat));
  if(ui.type) rows = rows.filter(p => p.type===ui.type);
  if(ui.stock==='out') rows = rows.filter(p => !p.stock);
  if(ui.stock==='in') rows = rows.filter(p => p.stock>0);
  if(ui.brand) rows = rows.filter(p => p.brand===ui.brand);
  rows = rows.filter(p => qok(p.name+' '+p.article+' '+p.brand+' '+p.id));
  ui.per = 8;
  const pg = pager(rows.length);
  const counts = {all:128, Published:98, Draft:22, Private:8};
  const idle = !ui.q && !ui.cat && !ui.type && !ui.stock && !ui.brand && (ui.tab==='all' || !ui.tab) && ui.page===1;
  const brands = [...new Set(db.products.map(p=>p.brand))];
  const types = [...new Set(db.products.map(p=>p.type))];
  const cats = [...new Set(db.products.flatMap(p=>[p.category, ...(p.categories||[])]))];
  return `${shellHead('Product Management','Manage your product catalog.', `<button class="ghost" type="button" data-act="export-products">Export to CSV</button><button class="ghost" type="button" id="importBtn">Import</button><button class="ghost" type="button" data-act="export-products">Export</button><a class="btn" href="#products/new">${I.plus} Add New Product</a>`)}
    <input id="importFile" type="file" accept=".csv,text/csv" hidden>
    <div class="status-tabs">
      ${[['all','All'],['Published','Published'],['Draft','Draft'],['Private','Private']].map(([id,label])=>`<button type="button" data-tab="${id}" class="${ui.tab===id?'on':''}">${label} (${counts[id]||0})</button>`).join('')}
    </div>
    <div class="toolbar"><label class="search">${I.search}<input id="q" placeholder="Search products..." value="${esc(ui.q)}"></label></div>
    <div class="filters">
      <span class="muted">Filters</span>
      <select id="fCat"><option value="">Category</option>${cats.map(c=>`<option ${ui.cat===c?'selected':''}>${esc(c)}</option>`).join('')}</select>
      <select id="fType"><option value="">Product Type</option>${types.map(c=>`<option ${ui.type===c?'selected':''}>${esc(c)}</option>`).join('')}</select>
      <select id="fStock"><option value="">Stock Status</option><option value="in" ${ui.stock==='in'?'selected':''}>In stock</option><option value="out" ${ui.stock==='out'?'selected':''}>Out of stock</option></select>
      <select id="fBrand"><option value="">Brand</option>${brands.map(c=>`<option ${ui.brand===c?'selected':''}>${esc(c)}</option>`).join('')}</select>
      <button type="button" class="linkish" data-act="clear-filters">Clear filters</button>
    </div>
    <div class="actions" style="margin-bottom:10px">
      <button class="ghost" type="button" data-act="export-products">Export to CSV</button>
      <button class="ghost" type="button" data-act="discount">Apply Discount</button>
      <button class="ghost" type="button" data-act="trash-products">Add to Trash</button>
    </div>
    <div class="table-card"><table><thead><tr>
      <th><input class="check" type="checkbox" data-act="check-all"></th><th>IMAGE</th><th>PRODUCT NAME</th><th>ARTICLE NO.</th><th>STOCK</th><th>PRICE</th><th>CATEGORY</th><th>LABEL</th><th>BRAND</th><th>DATE</th>
    </tr></thead><tbody>
      ${slice(rows).map(p=>`<tr>
        <td><input class="check row-check" type="checkbox" value="${esc(p.id)}"></td>
        <td><div class="thumb" style="background:${esc(p.color||'#e5e7eb')}"></div></td>
        <td><div class="name-block"><b>${esc(p.name)}</b>
          <div class="mini-links">
            <a href="#product/${p.id}/edit">Quick Edit</a><span class="sep">|</span>
            <a href="#product/${p.id}">View</a><span class="sep">|</span>
            <button type="button" data-act="dup" data-id="${esc(p.id)}">Duplicate</button><span class="sep">|</span>
            <a href="#product/${p.id}/edit">Edit</a>
          </div>
          <span class="muted">ID: ${esc(p.id)}</span></div></td>
        <td>${esc(p.article)}</td>
        <td>${p.stock?esc(p.stock):'<span class="badge paused"><i></i>Out of stock</span>'}</td>
        <td><b>${Math.round(Number(p.price)||0)} kr</b></td>
        <td>${esc(p.category)}</td>
        <td>${p.label?`<span class="chip ${p.label==='Bestseller'?'orange':''}">${esc(p.label)}</span>`:'—'}</td>
        <td>${esc(p.brand)}</td>
        <td>${esc(p.date)}</td>
      </tr>`).join('') || `<tr><td colspan="10" class="empty">No products match.</td></tr>`}
    </tbody></table></div>
    <div class="pagerow"><div>Showing <b>${idle?'1–8':(rows.length?pg.from+'–'+pg.to:'0')}</b> of <b>${idle?128:rows.length}</b> products</div><div class="per">8 per page</div>${idle?designPages(4, pg.pages):pg.html}</div>`;
}

function productForm(p){
  const editing = !!p;
  p = p || {name:'', article:'', price:'', description:'', brand:'', labels:['New','Bestseller'], categories:['Decals'], status:'Published', stock:0, hero:''};
  const brands = [...new Set(['AutoCheck Pro','SafeDrive','BeamRight','GripMaster','ClearAir Labs','TrueLine','TorqFix','HoldFast','Opus Bilprovning', p.brand].filter(Boolean))];
  const labels = p.labels||[];
  const selected = new Set(p.categories||[]);
  return `<a class="back" href="#products">← Back to Products</a>
    <div class="head"><div><h1>${editing?'Edit Product':'Add New Product'}</h1><p class="sub">${editing?'Update product information and settings.':'Create and publish a new product in the ordering portal.'}</p></div>
      <div class="actions"><a class="ghost" href="#products">Discard</a><button class="btn" type="submit" form="productForm">Save Changes</button></div></div>
    <form id="productForm" class="editor" style="margin-top:16px">
      <div>
        <section class="card">
          <h2>Product Media</h2>
          <div class="${editing?'media-row':''}" style="margin-top:12px">
            ${editing && p.hero==='decal' ? `<div class="media-shot"><div class="roll"></div></div>` : `<label class="drop" style="min-height:160px">${I.cloud}<strong>Upload product image</strong><span>Drag and drop or click to browse</span><small>SUPPORTED FORMATS: JPG, PNG, WEBP (MAX 5MB)</small><input type="file" name="image" accept="image/*"></label>`}
            ${editing?`<label class="drop" style="min-height:160px"><strong style="font-size:28px;color:var(--teal)">+</strong><span>Add more images</span><input type="file" name="image" accept="image/*"></label>`:''}
          </div>
          <img id="prodPreviewImg" alt="" hidden style="margin-top:10px;max-height:120px;border-radius:8px">
        </section>
        <section class="card" style="margin-top:14px">
          <h2>Product Details</h2>
          <div class="field" style="margin-top:12px"><label>Product Name <span class="req">*</span></label><input name="name" id="pName" value="${esc(p.name)}" placeholder="e.g. Premium Diagnostic Scanner" required></div>
          <div class="field"><label>Description</label><textarea name="description" id="pDesc" placeholder="Describe the product features and specifications...">${esc(p.description||'')}</textarea></div>
          <div class="grid2">
            <div class="field"><label>Product ID / Number <span class="req">*</span></label><input name="article" id="pArt" value="${esc(p.article)}" placeholder="ART-00000" required></div>
            <div class="field"><label>Price <span class="req">*</span></label><div class="suffix"><input name="price" id="pPrice" type="number" min="0" step="0.01" value="${p.price===''?'':p.price}" placeholder="0.00" required><span>${editing?'SEK':'kr'}</span></div></div>
          </div>
          <div class="grid2">
            <div class="field"><label>Labels</label><div class="chips" id="labelChips">${labels.map(l=>`<span class="chip ${l==='Bestseller'||l==='Branded'?'orange':l==='Outdoor'?'gray':''}">${esc(l)} <button type="button" data-act="rm-label" data-label="${esc(l)}">×</button></span>`).join('')}</div><input id="addLabel" placeholder="Add labels..."></div>
            <div class="field"><label>Brand</label><select name="brand" id="pBrand"><option value="">Select a brand</option>${brands.map(b=>`<option ${p.brand===b?'selected':''}>${esc(b)}</option>`).join('')}</select></div>
          </div>
          <div class="field"><label>Status</label><select name="status">${['Published','Draft','Private'].map(s=>`<option ${p.status===s?'selected':''}>${s}</option>`).join('')}</select></div>
          <input type="hidden" name="labels" id="labelsField" value="${esc(labels.join('|'))}">
          <input type="hidden" name="categories" id="catsField" value="${esc([...(p.categories||[])].join('|'))}">
        </section>
        <section class="card" style="margin-top:14px">
          <div class="head"><h2>Categories</h2><span class="note">MULTIPLE SELECTION ALLOWED</span></div>
          <div class="cats">${CATS.map(([name,kind])=>`<button type="button" class="cat ${selected.has(name)?'on':''}" data-catpick="${esc(name)}">${catIcon(kind)}<span>${esc(name)}</span></button>`).join('')}</div>
        </section>
        <div class="editor-foot">
          <button class="btn" type="submit">${editing?'Save Changes':'Save Product'}</button>
          ${editing?'<a class="ghost" href="#product/'+p.id+'">Preview Product</a>':'<button class="ghost" type="submit" name="draft" value="1">Save as Draft</button>'}
          <a class="spacer" href="#products">Discard${editing?' Changes':''}</a>
        </div>
        <div class="err" id="formErr"></div>
      </div>
      <aside class="editor-side">
        <section class="card">
          <div class="head"><h2 style="font-size:12px;letter-spacing:.06em;color:#6b7280">${editing?'PRODUCT PREVIEW':'LIVE PREVIEW'}</h2>${editing?'<span class="badge">LIVE</span>':''}</div>
          <div class="preview-box" style="margin-top:10px">${p.hero==='decal'?'<div class="decal"></div>':I.box}</div>
          <div class="kvs">
            <div>PRODUCT NAME<b id="prevName">${esc(p.name||'—')}</b></div>
            <div style="display:flex;justify-content:space-between"><span>ID NUMBER<b id="prevId">${esc(p.article||'—')}</b></span><span>PRICE<b id="prevPrice">${p.price!==''&&p.price!=null?Number(p.price).toFixed(2)+' SEK':'—'}</b></span></div>
            <div>BRAND<b id="prevBrand">${esc(p.brand||'—')}</b></div>
            <div>LABELS<div class="chips" id="prevLabels">${labels.map(l=>`<span class="chip ${l==='Branded'?'orange':''}">${esc(l)}</span>`).join('')||'<span class="muted">No labels selected</span>'}</div></div>
            <div>CATEGORIES<div class="chips" id="prevCats">${[...(p.categories||[])].map(c=>`<span class="chip gray">${esc(c)}</span>`).join('')||'<span class="muted">No categories selected</span>'}</div></div>
          </div>
        </section>
        <div class="tip">${I.info} ${editing?'Note: Changes saved here will be reflected instantly across all order portals.':'Pro Tip: Using high-quality product images with clean white backgrounds helps your products stand out in the portal.'}</div>
      </aside>
    </form>`;
}

function productPreview(p){
  return `<a class="back" href="#products">← Back to Products</a>
    ${shellHead(p.name, p.brand+' · '+p.article, `<a class="btn" href="#product/${p.id}/edit">Edit</a>`)}
    <article class="card" style="margin-top:16px;max-width:720px">
      <div class="preview-box" style="margin-bottom:14px">${p.hero==='decal'?'<div class="decal"></div>':'<div class="thumb" style="width:120px;height:120px;background:'+esc(p.color||'#e5e7eb')+'"></div>'}</div>
      <p>${esc(p.description||'')}</p>
      <div class="info-grid" style="margin-top:16px">
        <div><small class="muted">PRICE</small><b>${Number(p.price).toFixed(2)} SEK</b></div>
        <div><small class="muted">STOCK</small><b>${p.stock||'Out of stock'}</b></div>
        <div><small class="muted">CATEGORY</small><b>${esc(p.category)}</b></div>
        <div><small class="muted">STATUS</small><div>${badge(p.status)}</div></div>
      </div>
    </article>`;
}

function ordersView(){
  let rows = db.orders.slice();
  if(['Treated','Paused','Finished'].includes(ui.tab)) rows = rows.filter(o=>(o.listStatus||o.status)===ui.tab);
  rows = rows.filter(o => qok(o.id+' '+o.title+' '+o.customer+' '+o.email+' '+o.origin));
  ui.per = 20;
  const pg = pager(rows.length);
  const counts = {all:128, Treated:54, Paused:12, Finished:62};
  const idle = !ui.q && (ui.tab==='all' || !ui.tab) && ui.page===1;
  return `${shellHead('Orders','Manage and track all customer orders', `<a class="btn" href="#orders/new">${I.plus} Add New Order</a>`)}
    <div class="status-tabs">
      ${[['all','All'],['Treated','Treated'],['Paused','Paused'],['Finished','Finished']].map(([id,label])=>`<button type="button" data-tab="${id}" class="${(ui.tab||'all')===id?'on':''}">${label} (${counts[id]})</button>`).join('')}
    </div>
    <div class="toolbar">
      <label class="search">${I.search}<input id="q" placeholder="Search orders, customers, order #…" value="${esc(ui.q)}"></label>
      <button class="ghost" type="button" id="filterBtn">Filter</button>
      <span class="muted">Mass Action</span>
      <select id="mass"><option value="export">Mark exported</option><option value="finished">Mark finished</option><option value="treated">Mark treated</option></select>
      <button class="ghost" type="button" data-act="mass-apply">Apply</button>
    </div>
    <div class="table-card"><table><thead><tr><th>ORDERS</th><th>DATE</th><th>STATUS</th><th>AMOUNT</th><th>EXPORT STATUS</th><th>ORIGIN</th></tr></thead><tbody>
      ${slice(rows).map(o=>`<tr>
        <td><div class="name-block"><a href="#order/${esc(o.id)}"><b>Order #${esc(o.id)}</b></a><small>${esc(o.title)}</small>
          <button class="linkish" type="button" data-act="quick" data-id="${esc(o.id)}">Quick View</button></div></td>
        <td>${esc(o.date)}</td><td>${badge(o.listStatus||o.status)}</td><td>SEK ${money(listAmount(o))}</td><td>${badge(o.export)}</td><td>${esc(o.origin)}</td>
      </tr>`).join('') || `<tr><td colspan="6" class="empty">No orders match.</td></tr>`}
    </tbody></table></div>
    <div class="pagerow"><div>Showing <b>${idle?'1–'+Math.min(8, rows.length):(rows.length?pg.from+'–'+pg.to:'0')}</b> of <b>${idle?128:rows.length}</b> orders</div><div>Items per page ${idle?20:ui.per}</div>${idle?designPages(7, 1):pg.html}</div>`;
}

function orderSummary(o, editing){
  const qty = (o.lines||[]).reduce((s,l)=>s+Number(l.qty||0),0);
  const goods = (o.lines||[]).reduce((s,l)=>s+Number(l.qty)*Number(l.price),0);
  const ship = Number(o.shipping)||0;
  const total = goods+ship;
  return `<aside class="sum" id="summary">
    <h3>ORDER SUMMARY</h3>
    <div class="row"><span>Number of Products</span><b>${(o.lines||[]).length}</b></div>
    <div class="row"><span>Total Quantity</span><b>${qty}</b></div>
    ${editing?`<div class="row"><span>Subtotal</span><b>${money(goods)} SEK</b></div><div class="row"><span>Shipping Price</span><b>${ship?money(ship)+' SEK':'Free'}</b></div>`:`<div class="row"><span>Total Product Price</span><b>${money(goods)} SEK</b></div><div class="row"><span>Shipping</span><b>${ship?money(ship)+' SEK':'Free'}</b></div>`}
    <div class="total"><span>${editing?'Total Price':'Total Order Price'}</span><div><b>${money(total)} SEK</b>${editing?'<small>Incl. VAT</small>':''}</div></div>
  </aside>
  ${editing?'<button class="ghost" type="button" data-act="invoice" style="width:100%;justify-content:center">Generate PDF Invoice</button>':''}
  <div class="tip">${I.info} ${editing?'Note: Pricing updates are reflected in real-time as you modify quantities.':'Note: Totals update automatically as products and quantities change.'}</div>`;
}

function orderForm(o){
  const editing = !!o.id && db.orders.some(x=>x.id===o.id);
  const lines = o.lines||[];
  return `<a class="back" href="#orders">← Back to Orders</a>
    <div class="head"><div><h1>${editing?'Edit Order':'Add New Order'}</h1><p class="sub">${editing?'Update the order details, products, customer information, and pricing.':'Create a new order and enter the required customer and product information.'}</p></div></div>
    <form id="orderForm" class="order-wrap" style="margin-top:16px">
      <div>
        <section class="card" style="display:flex;justify-content:space-between;align-items:center;gap:12px">
          <div><h2>Order Information</h2><p class="hint">This reference number is generated automatically and cannot be edited.</p></div>
          <span class="refbadge"># ${editing?esc(o.ref||o.id):'ORD-00124'} <em>AUTO</em></span>
        </section>
        <section class="card" style="margin-top:12px">
          <h2>Order Details</h2>
          <div class="grid2" style="margin-top:12px">
            <div class="field"><label>Date of Order</label><input type="date" name="iso" value="${esc(o.iso||'')}"> </div>
            <div class="field"><label>Order Status</label><select name="status">${['Treated','Paused','Finished'].map(s=>`<option ${o.status===s?'selected':''}>${s}</option>`).join('')}</select></div>
          </div>
        </section>
        <section class="card" style="margin-top:12px">
          <div class="head"><h2>Order Products</h2><span class="muted">Search by product name or ID</span></div>
          ${lines.map((l,i)=>`<div class="line">
            <div class="field" style="position:relative;margin:0"><label>Product</label><input data-line="${i}" value="${esc(l.name)}" placeholder="Search product"></div>
            <div class="field" style="margin:0"><label>Quantity</label><div class="qty"><button type="button" data-qty="${i}" data-d="-1">−</button><input value="${l.qty}" data-qtyin="${i}"><button type="button" data-qty="${i}" data-d="1">+</button></div></div>
            <div class="price-col">PRICE / PC<b>${money(l.price)} SEK / pc</b></div>
            <div class="price-col">TOTAL PRICE<b>${money(l.qty*l.price)} SEK</b><button class="iconbtn" type="button" data-act="rm-line" data-i="${i}" aria-label="Remove">${I.trash}</button></div>
          </div>`).join('')}
          <button class="linkish" type="button" data-act="add-line" style="margin-top:8px">+ Add Product</button>
        </section>
        <section class="card" style="margin-top:12px">
          <h2>Customer Information</h2>
          <div class="grid2" style="margin-top:12px">
            <div class="field"><label>Customer Name <span class="req">*</span></label><input name="customer" value="${esc(o.customer||'')}" placeholder="e.g. Karin Andersson"></div>
            <div class="field"><label>Email <span class="req">*</span></label><input name="email" value="${esc(o.email||'')}" placeholder="karin.andersson@email.com"></div>
          </div>
        </section>
        <section class="card" style="margin-top:12px"><h2>Shipping Address</h2><div class="field" style="margin-top:12px"><label>Address</label><textarea name="ship" placeholder="Street address, postal code, city, country...">${esc(o.ship||'')}</textarea></div></section>
        <section class="card" style="margin-top:12px">
          <div class="head"><h2>Billing Address</h2><label style="display:flex;gap:8px;align-items:center;font-size:13.5px"><input type="checkbox" name="same" ${o.same?'checked':''}> Same as shipping address</label></div>
          <div class="field"><label>Address</label><textarea name="bill" placeholder="Street address, postal code, city, country..." ${o.same?'readonly':''}>${esc(o.same?o.ship||'':o.bill||'')}</textarea></div>
        </section>
        <section class="card" style="margin-top:12px"><h2>Notes for the Order</h2><p class="hint">Optional — visible to the fulfillment team.</p><div class="field" style="margin-top:8px"><textarea name="notes" placeholder="Add any requests, instructions, or additional information about this order...">${esc(o.notes||'')}</textarea></div></section>
        <input type="hidden" name="shipping" value="${Number(o.shipping)||0}">
        <div class="err" id="formErr"></div>
        <div class="actions">
          <button class="btn" type="submit">${editing?'Save Changes':'Create Order'}</button>
          ${editing?'':'<button class="btn dark" type="submit" name="as" value="draft">Save Draft</button>'}
          <a class="ghost" href="#orders">${editing?'Discard Changes':'Discard'}</a>
        </div>
      </div>
      <div>${orderSummary(o, editing)}</div>
    </form>`;
}

function nextOrderNo(){
  const nums = db.orders.map(o=>parseInt(String(o.id).replace(/\D/g,''),10)).filter(n=>!isNaN(n));
  return String(Math.max(124, ...nums)+1).padStart(5,'0');
}

function categoriesView(){
  return `${shellHead('Categories','Groups used on the ordering portal. Open one to filter the product list.')}
    <div class="cats" style="margin-top:18px">${CATS.map(([name,kind])=>{
      const n = db.products.filter(p=>p.category===name || (p.categories||[]).includes(name)).length;
      return `<a class="cat" href="#products" data-setcat="${esc(name)}" style="text-decoration:none;min-height:120px">${catIcon(kind)}<span>${esc(name)}</span><small class="muted">${n} products</small></a>`;
    }).join('')}</div>`;
}

function suppliersView(){
  return `${shellHead('Suppliers','Print and material suppliers used for portal orders.', `<button class="btn" type="button" data-act="add-supplier">${I.plus} Add Supplier</button>`)}
    <div class="table-card" style="margin-top:16px"><table><thead><tr><th>SUPPLIER</th><th>CONTACT</th><th>CITY</th><th>STATUS</th><th></th></tr></thead><tbody>
      ${db.suppliers.map(s=>`<tr><td><b>${esc(s.name)}</b></td><td>${esc(s.contact)}</td><td>${esc(s.city)}</td><td>${badge(s.status==='Paused'?'Paused':'Active')}</td>
        <td class="actions-cell"><button class="iconbtn" type="button" data-act="del-supplier" data-id="${esc(s.id)}">${I.trash}</button></td></tr>`).join('')}
    </tbody></table></div>`;
}

function statisticsView(){
  const sum = db.orders.reduce((s,o)=>s+orderAmount(o),0);
  return `${shellHead('Statistics','Orders, products and accounts across the portal.')}
    <div class="stats">
      <article class="stat"><div><div class="k">Orders</div><div class="v">${db.orders.length}</div></div></article>
      <article class="stat"><div><div class="k">Order value</div><div class="v" style="font-size:22px">${money(sum)} SEK</div></div></article>
      <article class="stat"><div><div class="k">Products</div><div class="v">${db.products.length}</div></div></article>
    </div>
    <article class="card" style="margin-top:16px"><h2>Order status</h2>
      ${['Treated','Paused','Finished'].map(s=>{const n=db.orders.filter(o=>o.status===s).length; return `<p style="margin-top:10px">${badge(s)} ${n}</p>`;}).join('')}
      <p style="margin-top:14px"><a class="linkish" href="#orders">Open orders</a></p>
    </article>`;
}

function homeView(){
  return `${shellHead('Home','Tryckeriett admin for every company on the ordering portal.')}
    <div class="home-grid">
      <a class="home-card" href="#companies"><b>Companies</b><span>${String(db.companies.length).padStart(2,'0')} connected. Opus is live with ${branchShown(db.companies.find(c=>c.id==='opus')||{listedBranches:0})} branches.</span></a>
      <a class="home-card" href="#orders"><b>Orders</b><span>${db.orders.length} orders in the list. Track treated, paused and finished jobs.</span></a>
      <a class="home-card" href="#products"><b>Products</b><span>${db.products.length} products in the catalog, ready to add to an order.</span></a>
      <a class="home-card" href="#company/opus/users"><b>Users</b><span>${db.users.length} accounts across the portals.</span></a>
    </div>`;
}
function infoView(){
  return `${shellHead('Info','How this admin is organised.')}
    <article class="card" style="margin-top:16px;max-width:720px"><p>Companies own branches and users. Orders and products are shared across the ordering portal. Use the sidebar accordions to open All products, All orders, All Companies, All users, or Settings. Log out returns to the ordering portal.</p></article>`;
}
function settingsView(){
  return `${shellHead('Settings','All portal settings and related lists.')}
    <div class="home-grid">
      <a class="home-card" href="#info"><b>Info</b><span>How the admin is organised.</span></a>
      <a class="home-card" href="#status"><b>Product Status</b><span>Published, draft, and stock.</span></a>
      <a class="home-card" href="#statistics"><b>Statistics</b><span>Orders and catalog totals.</span></a>
      <a class="home-card" href="#suppliers"><b>Suppliers</b><span>Print and material suppliers.</span></a>
      <a class="home-card" href="index.html"><b>Ordering portal</b><span>Leave admin and return to the shop.</span></a>
    </div>`;
}
function statusView(){
  return `${shellHead('Product Status','What is published, drafted, or out of stock.')}
    <div class="table-card" style="margin-top:16px"><table><thead><tr><th>PRODUCT</th><th>STATUS</th><th>STOCK</th><th></th></tr></thead><tbody>
      ${db.products.map(p=>`<tr><td><b>${esc(p.name)}</b><br><span class="muted">${esc(p.article)}</span></td><td>${badge(p.status)}</td><td>${p.stock?p.stock:'<span class="badge paused"><i></i>Out of stock</span>'}</td><td><a href="#product/${p.id}/edit">Edit</a></td></tr>`).join('')}
    </tbody></table></div>`;
}

function quickModal(o){
  const goods = o.lines.reduce((s,l)=>s+l.qty*l.price,0);
  return `<div class="modal" id="modalLayer"><div class="dialog" role="dialog">
    <div class="head"><h2>Order Overview</h2><button class="ghost" type="button" data-act="close-modal">Close</button></div>
    <p class="sub">Order #${esc(o.id)}</p>
    <div class="info-grid">
      <div><small class="muted">CUSTOMER</small><b>${esc(o.customer)}</b></div>
      <div><small class="muted">ORDER DATE</small><b>${esc(o.date)}</b></div>
      <div><small class="muted">STATUS</small><div>${badge(o.status)}</div></div>
      <div><small class="muted">ORDER AMOUNT</small><b>SEK ${money(listAmount(o))}</b></div>
    </div>
    <h3 style="margin:16px 0 8px;font-size:14px">Summary</h3>
    ${o.lines.map(l=>`<div class="pagerow" style="margin:0;padding:6px 0;border-bottom:1px solid #f3f4f6"><span>${esc(l.name)} (${l.qty})</span><b>SEK ${money(l.qty*l.price)}</b></div>`).join('')}
    <div class="dlg-actions"><a class="btn" href="#order/${o.id}">View Full Order</a></div>
  </div></div>`;
}

function render(){
  const p = route();
  const key = location.hash;
  if(key !== entered){
    entered = key;
    ui = freshUi();
    if(pendingCat){ ui.cat = pendingCat; pendingCat = ''; }
    formBuf = null;
  }
  paintChrome();
  const view = document.getElementById('view');
  const c = (p[0]==='company') ? findCompany(p[1]) : null;
  let html = '';
  if(p[0]==='home') html = homeView();
  else if(p[0]==='settings') html = settingsView();
  else if(p[0]==='info') html = infoView();
  else if(p[0]==='status') html = statusView();
  else if(p[0]==='companies' && p[1]==='new') html = companyForm(null);
  else if(p[0]==='companies') html = companiesView();
  else if(p[0]==='company' && c && p[2]==='edit') html = companyForm(c);
  else if(p[0]==='company' && c && p[2]==='branches' && p[3]==='new') html = branchForm(c, null);
  else if(p[0]==='company' && c && p[2]==='branch' && p[4]==='edit') html = branchForm(c, findBranch(p[3]));
  else if(p[0]==='company' && c && p[2]==='branch') html = branchView(c, findBranch(p[3])||{name:'Missing', users:0, orders:0, sales:0});
  else if(p[0]==='company' && c && p[2]==='branches') html = branchesView(c);
  else if(p[0]==='company' && c && p[2]==='users' && (p[3]==='new'||p[3]==='guest')) html = userForm(c, null, p[3]==='guest');
  else if(p[0]==='company' && c && p[2]==='user' && p[4]==='edit' && findUser(p[3])) html = userForm(c, findUser(p[3]), false);
  else if(p[0]==='company' && c && p[2]==='user' && findUser(p[3])) html = userView(findUser(p[3]));
  else if(p[0]==='company' && c && p[2]==='users') html = usersView(c.id);
  else if(p[0]==='company' && c) html = companyView(c);
  else if(p[0]==='users' && p[1]==='new') html = userForm(null, null, false);
  else if(p[0]==='users') html = usersView(null);
  else if(p[0]==='user' && p[2]==='edit' && findUser(p[1])) html = userForm(findCompany(findUser(p[1]).companyId), findUser(p[1]), false);
  else if(p[0]==='user' && findUser(p[1])) html = userView(findUser(p[1]));
  else if(p[0]==='products' && p[1]==='new') html = productForm(null);
  else if(p[0]==='products') html = productsView();
  else if(p[0]==='product' && p[2]==='edit' && findProduct(p[1])) html = productForm(findProduct(p[1]));
  else if(p[0]==='product' && findProduct(p[1])) html = productPreview(findProduct(p[1]));
  else if(p[0]==='orders' && p[1]==='new') html = orderForm(orderForRoute(p));
  else if(p[0]==='orders') html = ordersView();
  else if(p[0]==='order') html = orderForm(orderForRoute(p));
  else if(p[0]==='categories') html = categoriesView();
  else if(p[0]==='suppliers') html = suppliersView();
  else if(p[0]==='statistics') html = statisticsView();
  else html = companiesView();
  view.innerHTML = html || companiesView();
  const titles = {companies:'Companies', products:'Product Management', orders:'Orders', users:'Users', home:'Home', settings:'Settings'};
  document.title = (titles[p[0]] || 'Admin') + ' — Admin';
  const pal = document.getElementById('palette');
  if(pal) pal.innerHTML = ['#ef4444','#f97316','#eab308','#22c55e','#14b8a6','#0ea5e9','#6366f1','#a855f7','#ec4899','#069691'].map(c=>`<button type="button" data-color="${c}" style="background:${c}"></button>`).join('');
}

function blankOrder(){
  return {id:'', title:'', date:'', iso:'2026-09-18', status:'Treated', export:'Not Exported', origin:'Admin', customer:'', email:'', ship:'', bill:'', same:false, notes:'', shipping:0, lines:[{name:'Car Sticker', qty:1, price:1249}]};
}

function val(form, name){const el=form.elements[name]; return el?String(el.value).trim():'';}

function onSubmit(e){
  const form = e.target;
  if(form.id==='companyForm'){
    e.preventDefault();
    const name = val(form,'name');
    if(!name){document.getElementById('formErr').textContent='Enter a company name.'; return;}
    const p = route();
    const editing = p[0]==='company' && p[2]==='edit';
    const file = form.elements.logo.files && form.elements.logo.files[0];
    const apply = (logo) => {
      const data = {
        name, email:val(form,'email'), description:val(form,'description'), address:val(form,'address'),
        location:val(form,'address'), reg:val(form,'reg'), phone:val(form,'phone'), poc:val(form,'poc'), pocMobile:val(form,'pocMobile'),
        color:'#'+val(form,'color').replace('#',''), status:'Active', logo: logo || ''
      };
      if(editing){
        const c = findCompany(p[1]);
        if(!logo && c.logo) data.logo = c.logo;
        Object.assign(c, data);
        save(); toast('Company updated'); go('company/'+c.id);
      }else{
        const id = uid('c');
        db.companies.push({id, ...data});
        save(); toast('Company created'); go('company/'+id);
      }
    };
    if(file){const r=new FileReader(); r.onload=()=>apply(r.result); r.readAsDataURL(file);} else apply('');
  }
  if(form.id==='branchForm'){
    e.preventDefault();
    const p = route();
    const c = findCompany(p[1]);
    const name = val(form,'name');
    if(!name){document.getElementById('formErr').textContent='Enter a branch name.'; return;}
    const data = {name, status:val(form,'status'), description:val(form,'description'), email:val(form,'email'), phone:val(form,'phone'), address:val(form,'address'), poc:val(form,'poc'), pocMobile:val(form,'pocMobile'), users:Number(val(form,'users'))||0, orders:Number(val(form,'orders'))||0, sales:Number(val(form,'sales'))||0, companyId:c.id};
    if(p[4]==='edit'){ Object.assign(findBranch(p[3]), data); save(); toast('Branch updated'); go('company/'+c.id+'/branch/'+p[3]); }
    else { const id=uid('b'); db.branches.push({id,...data}); if(c.listedBranches!=null) c.listedBranches += 1; save(); toast('Branch created'); go('company/'+c.id+'/branches'); }
  }
  if(form.id==='userForm'){
    e.preventDefault();
    const p = route();
    const name = val(form,'name'), email = val(form,'email'), phone = val(form,'phone');
    if(!name||!email||!phone){document.getElementById('formErr').textContent='Name, email and mobile are required.'; return;}
    const data = {name, email, phone, companyId:val(form,'companyId'), branchId:val(form,'branchId'), role:val(form,'role')||'Customer', guest:val(form,'guest')==='1', lastLogin:'Today', lastTime:'', orders:0, created:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}), active:'Just now'};
    let id;
    if(p[2]==='user' && p[4]==='edit' || (p[0]==='user' && p[2]==='edit')){
      id = p[0]==='user'?p[1]:p[3];
      Object.assign(findUser(id), data);
      toast('User updated');
    }else{
      id = uid('u');
      db.users.push({id, ...data});
      toast('User saved');
    }
    save();
    const co = data.companyId;
    go(co ? 'company/'+co+'/user/'+id : 'user/'+id);
  }
  if(form.id==='productForm'){
    e.preventDefault();
    const p = route();
    const name = val(form,'name');
    if(!name){document.getElementById('formErr').textContent='Enter a product name.'; return;}
    const labels = (document.getElementById('labelsField').value||'').split('|').filter(Boolean);
    const categories = (document.getElementById('catsField').value||'').split('|').filter(Boolean);
    const draftBtn = e.submitter && e.submitter.name==='draft';
    const data = {name, article:val(form,'article'), price:Number(val(form,'price'))||0, description:val(form,'description'), brand:val(form,'brand'), labels, label:labels[0]||'', categories, category:categories[0]||'Other', status: draftBtn?'Draft':val(form,'status')||'Published', type:'Print', date:new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}), color:'#e7f6f4'};
    if(p[0]==='product'){
      const prod = findProduct(p[1]);
      Object.assign(prod, data);
      save(); toast('Product updated'); go('products');
    }else{
      const id = uid('p');
      db.products.unshift({id, stock:0, ...data});
      save(); toast(draftBtn?'Draft saved':'Product saved'); go('products');
    }
  }
  if(form.id==='orderForm'){
    e.preventDefault();
    const p = route();
    const customer = val(form,'customer');
    if(!customer){document.getElementById('formErr').textContent='Enter the customer name.'; return;}
    const existing = p[0]==='order' ? findOrder(p[1]) : null;
    const data = readOrder(form, existing);
    if(e.submitter && e.submitter.value==='draft') data.status = 'Paused';
    if(existing){
      Object.assign(existing, data);
      delete existing.listStatus;
      delete existing.shownAmount;
      if(data.iso) existing.date = new Date(data.iso).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
      existing.amount = orderAmount(existing);
      save(); toast('Order updated'); go('orders');
    }
    else {
      data.id = nextOrderNo();
      data.title = data.lines[0] ? data.lines[0].name : 'New order';
      data.date = data.iso ? new Date(data.iso).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}) : '';
      data.amount = orderAmount(data);
      db.orders.unshift(data);
      save(); toast('Order created'); go('orders');
    }
  }
}

function readOrder(form, existing){
  const lines = [...form.querySelectorAll('[data-line]')].map((input,i)=>{
    const base = (existing&&existing.lines[i]) || {price:0};
    const prod = db.products.find(pr => pr.name.toLowerCase()===input.value.trim().toLowerCase());
    const price = prod ? prod.price : base.price || 0;
    const qty = Number(form.querySelector('[data-qtyin="'+i+'"]').value)||1;
    return {name:input.value.trim()||'Product', qty, price};
  });
  const same = form.elements.same.checked;
  const ship = val(form,'ship');
  return {
    iso:val(form,'iso'), status:val(form,'status'), customer:val(form,'customer'), email:val(form,'email'),
    ship, bill: same?ship:val(form,'bill'), same, notes:val(form,'notes'), shipping:Number(val(form,'shipping'))||0,
    lines, export: existing?existing.export:'Not Exported', origin: existing?existing.origin:'Admin',
    title: existing?existing.title:(lines[0]?lines[0].name:'New order'),
    date: existing?existing.date:''
  };
}

function checkedIds(){return [...document.querySelectorAll('.row-check:checked')].map(el=>el.value);}

document.addEventListener('click', e => {
  const acc = e.target.closest('[data-acc]');
  if(acc){
    const id = acc.dataset.acc;
    if(openMenus.has(id)){ openMenus.delete(id); accLock = id; }
    else { openMenus.add(id); accLock = ''; }
    paintChrome();
    accLock = '';
    return;
  }
  const tab = e.target.closest('[data-tab]');
  if(tab){ ui.tab = tab.dataset.tab; ui.page = 1; entered = location.hash; render(); return; }
  const pageBtn = e.target.closest('[data-page]');
  if(pageBtn && !pageBtn.disabled){ ui.page = Number(pageBtn.dataset.page); entered = location.hash; render(); return; }
  const color = e.target.closest('[data-color]');
  if(color){ setColor(color.dataset.color); return; }
  const cat = e.target.closest('[data-catpick]');
  if(cat){
    const field = document.getElementById('catsField');
    const set = new Set((field.value||'').split('|').filter(Boolean));
    set.has(cat.dataset.catpick) ? set.delete(cat.dataset.catpick) : set.add(cat.dataset.catpick);
    field.value = [...set].join('|');
    cat.classList.toggle('on');
    document.getElementById('prevCats').innerHTML = [...set].map(c=>`<span class="chip gray">${esc(c)}</span>`).join('') || '<span class="muted">No categories selected</span>';
    return;
  }
  const setcat = e.target.closest('[data-setcat]');
  if(setcat){ pendingCat = setcat.dataset.setcat; }
  const act = e.target.closest('[data-act]');
  if(!act) {
    if(e.target.id==='filterBtn'){ const q=document.getElementById('q'); if(q) q.focus(); return; }
    if(e.target.id==='swatch' || e.target.id==='swatchBtn' || e.target.closest('#swatchBtn')){
      const pop = document.getElementById('colorPop');
      if(pop) pop.hidden = !pop.hidden;
    }
    return;
  }
  const id = act.dataset.id;
  const action = act.dataset.act;
  if(action==='close-modal'){ const m=document.getElementById('modalLayer'); if(m) m.remove(); }
  if(action==='sample-page'){ toast('That page is part of the design sample. These rows are the full working list.'); return; }
  if(action==='quick'){ document.body.insertAdjacentHTML('beforeend', quickModal(findOrder(id))); }
  if(action==='del-user'){ db.users = db.users.filter(u=>u.id!==id); save(); toast('User removed'); entered=location.hash; render(); }
  if(action==='export-users'){
    const rows = db.users.filter(u => !act.dataset.company || u.companyId===act.dataset.company);
    download('users.csv', 'name,email,phone,branch\n'+rows.map(u=>[u.name,u.email,u.phone,branchName(u.branchId)].join(',')).join('\n'));
  }
  if(action==='export-products'){
    download('products.csv','name,article,price,category,brand,stock\n'+db.products.map(p=>[p.name,p.article,p.price,p.category,p.brand,p.stock].join(',')).join('\n'));
  }
  if(action==='check-all'){ document.querySelectorAll('.row-check').forEach(el => { el.checked = act.checked; }); }
  if(action==='trash-products'){
    const ids = new Set(checkedIds());
    if(!ids.size){ toast('Select products first'); return; }
    db.products = db.products.filter(p=>!ids.has(p.id)); save(); toast('Moved to trash'); entered=location.hash; render();
  }
  if(action==='discount'){
    const ids = checkedIds();
    if(!ids.length){ toast('Select products first'); return; }
    const pct = Number(prompt('Discount percent','10'));
    if(!pct) return;
    db.products.forEach(p => { if(ids.includes(p.id)) p.price = Math.max(0, Math.round(p.price*(100-pct))/100); });
    save(); toast('Discount applied'); entered=location.hash; render();
  }
  if(action==='dup'){
    const src = findProduct(id);
    const copy = {...src, id:uid('p'), name:src.name+' copy', categories:[...(src.categories||[])], labels:[...(src.labels||[])]};
    db.products.unshift(copy); save(); toast('Product duplicated'); go('product/'+copy.id+'/edit');
  }
  if(action==='clear-filters'){ ui.cat=ui.type=ui.stock=ui.brand=''; ui.page=1; entered=location.hash; render(); }
  if(action==='rm-label'){
    const field = document.getElementById('labelsField');
    const set = (field.value||'').split('|').filter(l => l && l!==act.dataset.label);
    field.value = set.join('|');
    act.parentElement.remove();
  }
  if(action==='add-line'){
    const form = document.getElementById('orderForm');
    const data = readOrder(form, currentOrder());
    data.lines.push({name:'', qty:1, price:0});
    stashOrder(data); entered=''; render();
  }
  if(action==='rm-line'){
    const form = document.getElementById('orderForm');
    const data = readOrder(form, currentOrder());
    data.lines.splice(Number(act.dataset.i),1);
    if(!data.lines.length) data.lines.push({name:'', qty:1, price:0});
    stashOrder(data); entered=''; render();
  }
  if(action==='invoice'){
    const data = readOrder(document.getElementById('orderForm'), currentOrder());
    const w = window.open('', '_blank');
    const rows = data.lines.map(l=>`<tr><td>${esc(l.name)}</td><td>${l.qty}</td><td>${money(l.price)}</td><td>${money(l.qty*l.price)}</td></tr>`).join('');
    w.document.write(`<title>Invoice ${esc(currentOrder()?.id||'')}</title><body style="font-family:Inter,sans-serif;padding:32px"><h1>Invoice</h1><p>${esc(data.customer)} · ${esc(data.email)}</p><p>${esc(data.ship)}</p><table width="100%" cellpadding="8">${rows}</table><h2>Total ${money(orderAmount(data))} SEK</h2><p>${esc(data.notes||'')}</p></body>`);
    w.document.close(); w.focus(); w.print();
  }
  if(action==='mass-apply'){
    const mode = document.getElementById('mass').value;
    db.orders.forEach(o => {
      if(['Treated','Paused','Finished'].includes(ui.tab) && (o.listStatus||o.status)!==ui.tab) return;
      if(ui.q && !qok(o.id+' '+o.title+' '+o.customer)) return;
      if(mode==='export') o.export='Exported';
      if(mode==='finished'){ o.status='Finished'; delete o.listStatus; }
      if(mode==='treated'){ o.status='Treated'; delete o.listStatus; }
    });
    save(); toast('Mass action applied'); entered=location.hash; render();
  }
  if(action==='add-supplier'){
    const name = prompt('Supplier name');
    if(!name) return;
    db.suppliers.push({id:uid('s'), name, contact:prompt('Contact email')||'', city:prompt('City')||'', status:'Active'});
    save(); entered=location.hash; render();
  }
  if(action==='del-supplier'){ db.suppliers=db.suppliers.filter(s=>s.id!==id); save(); entered=location.hash; render(); }
  if(e.target.id==='importBtn'){ const f=document.getElementById('importFile'); if(f) f.click(); }
  const qty = e.target.closest('[data-qty]');
  if(qty && qty.dataset.d){
    const form = document.getElementById('orderForm');
    const data = readOrder(form, currentOrder());
    const i = Number(qty.dataset.qty);
    data.lines[i].qty = Math.max(1, Number(data.lines[i].qty)+Number(qty.dataset.d));
    stashOrder(data); entered=''; render();
  }
});

let orderStash = null;
let pendingCat = '';
function currentOrder(){
  const p = route();
  if(orderStash && orderStash._key===location.hash) return orderStash;
  if(p[0]==='order') return findOrder(p[1]);
  if(p[0]==='orders' && p[1]==='new') return blankOrder();
  return null;
}
function orderForRoute(p){
  if(orderStash && orderStash._key===location.hash) return orderStash;
  if(p[1]==='new' || p[0]==='orders') return blankOrder();
  return findOrder(p[1]) || blankOrder();
}
function stashOrder(data){ data._key = location.hash; orderStash = data; }
function download(name, text){
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], {type:'text/csv'}));
  a.download = name; a.click();
}
function setColor(hex){
  document.getElementById('colorHex').value = hex.replace('#','');
  document.getElementById('colorPick').value = hex;
  document.querySelectorAll('.swatch').forEach(el => el.style.background = hex);
}

document.addEventListener('input', e => {
  if(e.target.id==='q'){ ui.q = e.target.value; ui.page = 1; entered = location.hash; const pos=e.target.selectionStart; render(); const q=document.getElementById('q'); if(q){q.focus(); q.setSelectionRange(pos,pos);} }
  if(e.target.id==='per'){ ui.per = Math.max(5, Number(e.target.value)||10); ui.page=1; entered=location.hash; render(); }
  if(e.target.id==='pName') document.getElementById('prevName').textContent = e.target.value || '—';
  if(e.target.id==='pArt') document.getElementById('prevId').textContent = e.target.value || '—';
  if(e.target.id==='pPrice') document.getElementById('prevPrice').textContent = e.target.value ? Number(e.target.value).toFixed(2)+' SEK' : '—';
  if(e.target.id==='pBrand') document.getElementById('prevBrand').textContent = e.target.value || '—';
  if(e.target.id==='colorHex') setColor('#'+e.target.value.replace('#',''));
  if(e.target.id==='colorPick') setColor(e.target.value);
  if(e.target.id==='fCat'){ ui.cat=e.target.value; ui.page=1; entered=location.hash; render(); }
  if(e.target.id==='fType'){ ui.type=e.target.value; ui.page=1; entered=location.hash; render(); }
  if(e.target.id==='fStock'){ ui.stock=e.target.value; ui.page=1; entered=location.hash; render(); }
  if(e.target.id==='fBrand'){ ui.brand=e.target.value; ui.page=1; entered=location.hash; render(); }
  if(e.target.name==='same'){
    const bill = document.querySelector('[name=bill]');
    const ship = document.querySelector('[name=ship]');
    if(e.target.checked){ bill.value = ship.value; bill.readOnly = true; } else bill.readOnly = false;
  }
});
document.addEventListener('change', e => {
  if(e.target.id==='importFile' && e.target.files[0]){
    const reader = new FileReader();
    reader.onload = () => {
      String(reader.result).split(/\r?\n/).slice(1).forEach(line => {
        const [name,article,price,category,brand,stock] = line.split(',');
        if(name) db.products.push({id:uid('p'), name, article:article||'', price:Number(price)||0, category:category||'Other', brand:brand||'', stock:Number(stock)||0, status:'Draft', type:'Print', labels:[], categories:[category||'Other'], description:'', date:'', color:'#e5e7eb'});
      });
      save(); toast('Import finished'); entered=location.hash; render();
    };
    reader.readAsText(e.target.files[0]);
  }
  if(e.target.id==='userCompany'){
    const sel = document.getElementById('userBranch');
    const branches = db.branches.filter(b => b.companyId===e.target.value);
    sel.innerHTML = branches.map(b=>`<option value="${b.id}">${esc(b.name)}</option>`).join('') || '<option value="">No branches</option>';
  }
  if(e.target.name==='logo' && e.target.files[0]){
    const reader = new FileReader();
    reader.onload = () => { e.target.parentElement.querySelector('strong').textContent = 'Logo ready'; };
    reader.readAsDataURL(e.target.files[0]);
  }
});
document.addEventListener('keydown', e => {
  if(e.key==='Enter' && e.target.id==='addLabel'){
    e.preventDefault();
    const v = e.target.value.trim();
    if(!v) return;
    const field = document.getElementById('labelsField');
    const set = (field.value?field.value.split('|'):[]).concat(v);
    field.value = set.join('|');
    document.getElementById('labelChips').insertAdjacentHTML('beforeend', `<span class="chip">${esc(v)} <button type="button" data-act="rm-label" data-label="${esc(v)}">×</button></span>`);
    document.getElementById('prevLabels').innerHTML = set.map(l=>`<span class="chip">${esc(l)}</span>`).join('');
    e.target.value = '';
  }
  if(e.key==='Escape'){ const m=document.getElementById('modalLayer'); if(m) m.remove(); }
});
document.addEventListener('submit', onSubmit);

document.getElementById('gearBtn').onclick = ev => { ev.stopPropagation(); const p=document.getElementById('gearPop'); const open=p.hidden; closePops(); p.hidden=!open; };
document.getElementById('bellBtn').onclick = ev => { ev.stopPropagation(); const p=document.getElementById('bellPop'); const open=p.hidden; closePops(); p.hidden=!open; };
function closePops(){document.getElementById('gearPop').hidden=true; document.getElementById('bellPop').hidden=true;}
document.addEventListener('click', e => { if(!e.target.closest('.popwrap')) closePops(); });
const side=document.getElementById('side'), scrim=document.getElementById('scrim');
document.getElementById('burger').onclick = () => { side.classList.toggle('open'); scrim.classList.toggle('show'); };
scrim.onclick = () => { side.classList.remove('open'); scrim.classList.remove('show'); };
window.addEventListener('hashchange', () => { orderStash=null; side.classList.remove('open'); scrim.classList.remove('show'); render(); });
if(!location.hash) location.hash = 'companies';
render();
