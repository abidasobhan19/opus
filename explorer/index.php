<?php
declare(strict_types=1);

require __DIR__ . '/config.php';
require __DIR__ . '/lib.php';

$page = preg_replace('/[^a-z]/', '', (string) ($_GET['p'] ?? 'home')) ?: 'home';
$qstr = trim((string) ($_GET['q'] ?? ''));
$prefix = (string) ($_GET['site'] ?? '');
$table = (string) ($_GET['table'] ?? '');
$id = (int) ($_GET['id'] ?? 0);
$pg = max(1, (int) ($_GET['page'] ?? 1));
$per = 40;

function render(string $title, string $lede, string $body, string $active = 'home'): void
{
    $nav = [
        'home' => ['Home', '?p=home'],
        'opus' => ['Opus walkthrough', '?p=opus'],
        'how' => ['How it works', '?p=how'],
        'models' => ['The 7 models', '?p=models'],
        'tables' => ['All tables', '?p=tables'],
        'search' => ['Search', '?p=search'],
    ];
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8">';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
    echo '<title>' . h($title) . ' · tryckeriett_se</title>';
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">';
    echo '<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;560;700&family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">';
    echo '<link rel="stylesheet" href="assets/app.css">';
    echo '</head><body><div class="app"><aside class="side">';
    echo '<div class="brand"><small>Database explorer</small><strong>Tryckeriett</strong><span>One MySQL database. Seven WordPress sites. Shown in plain language.</span></div>';
    echo '<nav class="nav">';
    foreach ($nav as $key => [$label, $href]) {
        $cls = $active === $key ? ' class="active"' : '';
        echo '<a' . $cls . ' href="' . h($href) . '">' . h($label) . '</a>';
    }
    foreach (SITES as $p => $s) {
        $cls = ($active === 'site' && (($_GET['site'] ?? '') === $p)) ? ' class="active"' : '';
        echo '<a' . $cls . ' href="?p=site&site=' . h($p) . '">' . h($s['label']) . '</a>';
    }
    echo '</nav>';
    echo '<div class="side-note">Local only · database <span class="mono">tryckeriett_se</span><br>Passwords are hidden in this viewer.</div>';
    echo '</aside><main class="main">';
    echo '<div class="top"><div><h1>' . h($title) . '</h1><p class="lede">' . $lede . '</p></div>';
    echo '<form class="search" method="get"><input type="hidden" name="p" value="search"><input name="q" value="' . h((string) ($_GET['q'] ?? '')) . '" placeholder="Search products, users, tables…"><button type="submit">Search</button></form>';
    echo '</div>';
    echo $body;
    echo '</main></div></body></html>';
}

if ($page === 'home') {
    $totals = [
        'sites' => count(SITES),
        'tables' => count(all_tables()),
        'users' => 0,
        'products' => 0,
        'orders' => 0,
    ];
    $cards = '';
    foreach (SITES as $p => $s) {
        $st = site_stats($p);
        $totals['users'] += $st['users'];
        $totals['products'] += $st['products'];
        $totals['orders'] += $st['orders'];
        $cards .= '<article class="card site">';
        $cards .= '<div class="site-head"><div><a class="title" href="?p=site&site=' . h($p) . '">' . h($s['label']) . '</a>';
        $cards .= '<div class="meta"><span class="mono">' . h($p) . '_*</span> · ' . h($s['url']) . '</div></div>';
        $cards .= '<span class="pill ' . status_class($s['status']) . '">' . h($s['status_text']) . '</span></div>';
        $cards .= '<p>' . h($s['blurb']) . '</p>';
        $cards .= '<div class="nums">';
        $cards .= '<div><b>' . n($st['users']) . '</b><span>users</span></div>';
        $cards .= '<div><b>' . n($st['products']) . '</b><span>products</span></div>';
        $cards .= '<div><b>' . n($st['orders']) . '</b><span>orders</span></div>';
        $cards .= '<div><b>' . n($st['own']) . '</b><span>tables</span></div>';
        $cards .= '</div></article>';
    }

    $body = '<section class="stats">';
    $body .= '<div class="stat"><b>7</b><span>website models in this DB</span></div>';
    $body .= '<div class="stat"><b>' . n($totals['tables']) . '</b><span>MySQL tables</span></div>';
    $body .= '<div class="stat"><b>' . n($totals['users']) . '</b><span>login accounts</span></div>';
    $body .= '<div class="stat"><b>' . n($totals['products']) . '</b><span>published products</span></div>';
    $body .= '<div class="stat"><b>' . n($totals['orders']) . '</b><span>shop orders</span></div>';
    $body .= '</section>';
    $body .= '<div class="explain"><strong>Simple version:</strong> Tryckeriett is a Swedish print shop. This dump is not one website — it is <em>seven separate WordPress installs</em> sharing one database. Each install uses a table prefix (<span class="mono">opus_</span>, <span class="mono">www_</span>…). Only <strong>Opus Portal</strong> is a busy working shop. The public site is the brochure. The rest are catalogs, leftovers, or tests.</div>';
    $body .= '<article class="card wide hero-cta"><div><h2>Start with Opus</h2><p>The only model that is really working — login, products, invoice orders, stations, and the custom code that makes it a private print portal.</p></div><a class="btn" href="?p=opus">Open the Opus walkthrough</a></article>';
    $body .= '<div class="grid">' . $cards . '</div>';
    render('What’s in this database', 'All data from <strong>tryckeriett_se</strong>, grouped by the 7 WordPress sites that live inside it.', $body, 'home');
    exit;
}

if ($page === 'opus') {
    $body = require __DIR__ . '/views/opus.php';
    render(
        'Opus Portal — how it works',
        'A private WooCommerce print shop for Opus Bilprovning. Walk through login → products → invoice, using the real rows in this database.',
        (string) $body,
        'opus'
    );
    exit;
}

if ($page === 'models') {
    $body = '<div class="explain">“Model” here means a <strong>full WordPress website</strong> stored as a set of tables. They are not AI models. They share one MySQL database so one hosting account can run many sites.</div>';
    $body .= '<div class="grid">';
    $i = 1;
    foreach (SITES as $p => $s) {
        $st = site_stats($p);
        $body .= '<article class="card"><h2>' . $i . '. ' . h($s['label']) . '</h2>';
        $body .= '<p><span class="pill ' . status_class($s['status']) . '">' . h($s['status_text']) . '</span> ';
        $body .= '<span class="pill">' . h($s['kind']) . '</span></p>';
        $body .= '<p>' . h($s['blurb']) . '</p>';
        $body .= '<dl class="kv">';
        $body .= '<dt>Prefix</dt><dd class="mono">' . h($p) . '_</dd>';
        $body .= '<dt>URL</dt><dd>' . h($s['url']) . '</dd>';
        $body .= '<dt>Theme</dt><dd>' . h($s['theme']) . '</dd>';
        $body .= '<dt>Who uses it</dt><dd>' . h($s['who']) . '</dd>';
        $body .= '<dt>Working?</dt><dd>' . ($s['status'] === 'live' ? 'Yes — this one is in use.' : 'Mostly leftover / test data.') . '</dd>';
        $body .= '<dt>Plugins</dt><dd>' . n(count($st['plugins'])) . ' active</dd>';
        $body .= '</dl>';
        $body .= '<p><a class="btn" href="?p=site&site=' . h($p) . '">Open this model</a></p>';
        $body .= '</article>';
        $i++;
    }
    $body .= '</div>';
    render('How many models?', 'There are <strong>7 models</strong>. Two are useful today (Opus + public site). One is a quiet catalog. Four are old or empty.', $body, 'models');
    exit;
}

if ($page === 'how') {
    $body = '<div class="grid">';
    $body .= '<article class="card wide"><h2>The whole company in one picture</h2>';
    $body .= '<div class="flow">';
    $body .= '<div class="step"><b>1. Public site</b><span>A visitor lands on www.tryckeriett.se, reads about print methods, and contacts the shop.</span></div>';
    $body .= '<div class="step"><b>2. Client portal</b><span>A company like Opus gets its own shop (opus.tryckeriett.se). Staff log in and order the print items they need.</span></div>';
    $body .= '<div class="step"><b>3. WooCommerce</b><span>Each product is a row in posts. Each order is a row in wc_orders. Extra details live in *meta tables.</span></div>';
    $body .= '<div class="step"><b>4. Print & invoice</b><span>Opus pays by Faktura (invoice). Tryckeriett prints posters, decals, flyers and ships them.</span></div>';
    $body .= '</div></article>';

    $body .= '<article class="card"><h3>How WordPress stores “everything”</h3>';
    $body .= '<p>WordPress is not one table per thing. Almost every object is a <strong>post</strong>:</p><ul>';
    $body .= '<li><span class="mono">post_type = page</span> → a web page</li>';
    $body .= '<li><span class="mono">post_type = product</span> → something you can buy</li>';
    $body .= '<li><span class="mono">post_type = attachment</span> → an image / PDF</li>';
    $body .= '<li><span class="mono">post_type = shop_order</span> → an old-style order</li>';
    $body .= '</ul><p>Then <span class="mono">postmeta</span> hangs extra fields on that post (price, SKU, layout). Users work the same way: <span class="mono">users</span> + <span class="mono">usermeta</span>.</p></article>';

    $body .= '<article class="card"><h3>Why 7 copies?</h3>';
    $body .= '<p>This is <em>not</em> WordPress Multisite. Someone installed WordPress several times on the same One.com database, each with a different table prefix.</p>';
    $body .= '<p>That is why you see <span class="mono">opus_posts</span>, <span class="mono">www_posts</span>, <span class="mono">b2b_posts</span>… They look similar, but they are separate websites.</p>';
    $body .= '<p>Only the <strong>opus_</strong> tables have real daily business: 97 users, 164 products, 494 orders, about 445&nbsp;000 kr billed by invoice since June 2025.</p></article>';

    $body .= '<article class="card wide"><h3>Opus order path (the one that actually works)</h3>';
    $body .= '<p>User in <span class="mono">opus_users</span> → browses <span class="mono">opus_posts</span> (products) → checkout → row in <span class="mono">opus_wc_orders</span> → lines in <span class="mono">opus_woocommerce_order_items</span> → address in <span class="mono">opus_wc_order_addresses</span> → PDF invoice plugin numbers the invoice.</p>';
    $body .= '<p>Payment method on almost every order: <strong>Faktura (COD / invoice)</strong>. Currency: SEK.</p></article>';
    $body .= '</div>';
    render('How the data works', 'Think of this database as a print shop with one public front door and several private client doors. Most real money and people sit behind the Opus door.', $body, 'how');
    exit;
}

if ($page === 'tables') {
    $filter = (string) ($_GET['site'] ?? '');
    $rows = '';
    foreach (all_tables() as $name => $info) {
        $p = table_prefix($name);
        if ($filter !== '' && $p !== $filter) {
            continue;
        }
        $suf = table_suffix($name);
        $rows .= '<tr>';
        $rows .= '<td><a href="?p=table&table=' . urlencode($name) . '"><span class="mono">' . h($name) . '</span></a></td>';
        $rows .= '<td>' . ($p ? '<a href="?p=site&site=' . h($p) . '">' . h(SITES[$p]['label'] ?? $p) . '</a>' : '—') . '</td>';
        $rows .= '<td>' . h(explain_table($suf)) . '</td>';
        $rows .= '<td>' . n((int) $info['table_rows']) . '</td>';
        $rows .= '</tr>';
    }
    $body = '<div class="toolbar"><div class="pills"><a class="pill" href="?p=tables">All</a>';
    foreach (SITES as $p => $s) {
        $body .= '<a class="pill" href="?p=tables&site=' . h($p) . '">' . h($s['label']) . '</a>';
    }
    $body .= '</div></div>';
    $body .= '<div class="card wide"><table class="data"><thead><tr><th>Table</th><th>Model</th><th>What it is</th><th>Approx rows</th></tr></thead><tbody>' . $rows . '</tbody></table></div>';
    render('All 344 tables', 'Every table in <span class="mono">tryckeriett_se</span>, grouped by website prefix. Click a name to browse the real rows.', $body, 'tables');
    exit;
}

if ($page === 'site' && site_ok($prefix)) {
    $s = SITES[$prefix];
    $st = site_stats($prefix);
    $body = '<section class="stats">';
    $body .= '<div class="stat"><b>' . n($st['users']) . '</b><span>users</span></div>';
    $body .= '<div class="stat"><b>' . n($st['products']) . '</b><span>products</span></div>';
    $body .= '<div class="stat"><b>' . n($st['variations']) . '</b><span>variations</span></div>';
    $body .= '<div class="stat"><b>' . n($st['orders']) . '</b><span>orders</span></div>';
    $body .= '<div class="stat"><b>' . n($st['pages']) . '</b><span>published pages</span></div>';
    $body .= '</section>';
    $body .= '<div class="explain">' . h($s['blurb']) . ' Theme: <strong>' . h($s['theme']) . '</strong>. Prefix: <span class="mono">' . h($prefix) . '_</span>. Live URL: ' . h($s['url']) . '.';
    if ($prefix === 'opus') {
        $body .= ' <a href="?p=opus"><strong>Read the full Opus walkthrough →</strong></a>';
    }
    $body .= '</div>';

    $body .= '<div class="grid">';
    $body .= '<article class="card"><h3>Active plugins (' . count($st['plugins']) . ')</h3><div class="plugins">';
    foreach ($st['plugins'] as $pl) {
        $body .= '<span>' . h($pl) . '</span>';
    }
    if (!$st['plugins']) {
        $body .= '<span>none listed</span>';
    }
    $body .= '</div></article>';

    $body .= '<article class="card"><h3>Content types</h3><table class="data"><thead><tr><th>Type</th><th>Status</th><th>Count</th></tr></thead><tbody>';
    foreach ($st['postTypes'] as $pt) {
        $body .= '<tr><td class="mono">' . h($pt['post_type']) . '</td><td>' . h($pt['post_status']) . '</td><td>' . n((int) $pt['c']) . '</td></tr>';
    }
    $body .= '</tbody></table></article>';

    if (table_ok($prefix . '_posts')) {
        $products = q("SELECT ID, post_title, post_status, post_date FROM `{$prefix}_posts` WHERE post_type='product' ORDER BY post_title LIMIT 30");
        $body .= '<article class="card wide"><h3>Products</h3>';
        if ($products) {
            $body .= '<table class="data"><thead><tr><th>ID</th><th>Name</th><th>Status</th><th></th></tr></thead><tbody>';
            foreach ($products as $pr) {
                $body .= '<tr><td class="mono">' . (int) $pr['ID'] . '</td><td>' . h($pr['post_title']) . '</td><td>' . h($pr['post_status']) . '</td>';
                $body .= '<td><a href="?p=product&site=' . h($prefix) . '&id=' . (int) $pr['ID'] . '">Open</a></td></tr>';
            }
            $body .= '</tbody></table>';
            if ($st['products'] > 30) {
                $body .= '<p><a href="?p=table&table=' . h($prefix) . '_posts&type=product">See all products →</a></p>';
            }
        } else {
            $body .= '<p>No products in this model.</p>';
        }
        $body .= '</article>';
    }

    if (table_ok($prefix . '_wc_orders')) {
        $orders = q("SELECT id, status, billing_email, total_amount, date_created_gmt, payment_method_title FROM `{$prefix}_wc_orders` ORDER BY id DESC LIMIT 20");
        $rev = (float) scalar("SELECT COALESCE(SUM(total_amount),0) FROM `{$prefix}_wc_orders`");
        $body .= '<article class="card wide"><h3>Recent orders · ' . money($rev) . ' total</h3>';
        $body .= '<table class="data"><thead><tr><th>ID</th><th>Status</th><th>Email</th><th>Total</th><th>When</th><th></th></tr></thead><tbody>';
        foreach ($orders as $o) {
            $body .= '<tr><td class="mono">#' . (int) $o['id'] . '</td><td>' . h(pretty_status((string) $o['status'])) . '</td>';
            $body .= '<td>' . h((string) $o['billing_email']) . '</td><td>' . money((float) $o['total_amount']) . '</td>';
            $body .= '<td>' . h((string) $o['date_created_gmt']) . '</td>';
            $body .= '<td><a href="?p=order&site=' . h($prefix) . '&id=' . (int) $o['id'] . '">Open</a></td></tr>';
        }
        $body .= '</tbody></table></article>';
    } elseif (table_ok($prefix . '_posts')) {
        $old = q("SELECT ID, post_status, post_date, post_title FROM `{$prefix}_posts` WHERE post_type='shop_order' ORDER BY ID DESC LIMIT 20");
        if ($old) {
            $body .= '<article class="card wide"><h3>Orders (legacy posts)</h3><table class="data"><thead><tr><th>ID</th><th>Status</th><th>Date</th></tr></thead><tbody>';
            foreach ($old as $o) {
                $body .= '<tr><td>#' . (int) $o['ID'] . '</td><td>' . h(pretty_status((string) $o['post_status'])) . '</td><td>' . h((string) $o['post_date']) . '</td></tr>';
            }
            $body .= '</tbody></table></article>';
        }
    }

    if (table_ok($prefix . '_users')) {
        $users = q("SELECT ID, user_login, user_email, display_name, user_registered FROM `{$prefix}_users` ORDER BY ID LIMIT 25");
        $body .= '<article class="card wide"><h3>Users</h3><table class="data"><thead><tr><th>ID</th><th>Login</th><th>Name</th><th>Email</th><th>Registered</th></tr></thead><tbody>';
        foreach ($users as $u) {
            $body .= '<tr><td>' . (int) $u['ID'] . '</td><td class="mono">' . h($u['user_login']) . '</td><td>' . h($u['display_name']) . '</td><td>' . h($u['user_email']) . '</td><td>' . h($u['user_registered']) . '</td></tr>';
        }
        $body .= '</tbody></table>';
        if ($st['users'] > 25) {
            $body .= '<p><a href="?p=table&table=' . h($prefix) . '_users">See all ' . n($st['users']) . ' users →</a></p>';
        }
        $body .= '</article>';
    }

    $body .= '<article class="card wide"><h3>Tables that belong to this model</h3><div class="plugins">';
    foreach (all_tables() as $name => $info) {
        if (str_starts_with($name, $prefix . '_')) {
            $body .= '<a href="?p=table&table=' . urlencode($name) . '"><span>' . h($name) . '</span></a>';
        }
    }
    $body .= '</div></article></div>';

    render($s['label'], h($s['kind']) . ' · <span class="pill ' . status_class($s['status']) . '">' . h($s['status_text']) . '</span>', $body, 'site');
    exit;
}

if ($page === 'product' && site_ok($prefix) && $id > 0 && table_ok($prefix . '_posts')) {
    $post = one("SELECT * FROM `{$prefix}_posts` WHERE ID = ? AND post_type IN ('product','product_variation')", [$id]);
    if (!$post) {
        http_response_code(404);
        render('Not found', 'That product is not in this model.', '<p><a href="?p=site&site=' . h($prefix) . '">Back</a></p>', 'site');
        exit;
    }
    $meta = [];
    if (table_ok($prefix . '_postmeta')) {
        foreach (q("SELECT meta_key, meta_value FROM `{$prefix}_postmeta` WHERE post_id = ?", [$id]) as $m) {
            $meta[$m['meta_key']] = $m['meta_value'];
        }
    }
    $want = ['_sku' => 'SKU', '_price' => 'Price', '_regular_price' => 'Regular price', '_stock_status' => 'Stock', '_stock' => 'Qty', '_virtual' => 'Virtual', '_downloadable' => 'Downloadable'];
    $body = '<div class="grid"><article class="card"><h3>Product</h3><dl class="kv">';
    $body .= '<dt>ID</dt><dd>' . (int) $post['ID'] . '</dd>';
    $body .= '<dt>Name</dt><dd>' . h($post['post_title']) . '</dd>';
    $body .= '<dt>Status</dt><dd>' . h($post['post_status']) . '</dd>';
    $body .= '<dt>Slug</dt><dd class="mono">' . h($post['post_name']) . '</dd>';
    $body .= '<dt>Created</dt><dd>' . h($post['post_date']) . '</dd>';
    foreach ($want as $k => $label) {
        if (isset($meta[$k])) {
            $body .= '<dt>' . h($label) . '</dt><dd>' . h((string) $meta[$k]) . '</dd>';
        }
    }
    $body .= '</dl></article>';
    $body .= '<article class="card"><h3>Description</h3><p>' . nl2br(h(trim(strip_tags((string) $post['post_content'])) ?: 'No long description.')) . '</p>';
    $body .= '<p>' . h((string) $post['post_excerpt']) . '</p></article></div>';
    render($post['post_title'], 'Product in ' . h(SITES[$prefix]['label']), $body, 'site');
    exit;
}

if ($page === 'order' && site_ok($prefix) && $id > 0 && table_ok($prefix . '_wc_orders')) {
    $order = one("SELECT * FROM `{$prefix}_wc_orders` WHERE id = ?", [$id]);
    if (!$order) {
        http_response_code(404);
        render('Not found', 'That order is not in this model.', '<p><a href="?p=site&site=' . h($prefix) . '">Back</a></p>', 'site');
        exit;
    }
    $addr = table_ok($prefix . '_wc_order_addresses')
        ? q("SELECT * FROM `{$prefix}_wc_order_addresses` WHERE order_id = ?", [$id])
        : [];
    $items = [];
    if (table_ok($prefix . '_woocommerce_order_items')) {
        $items = q("SELECT order_item_id, order_item_name, order_item_type FROM `{$prefix}_woocommerce_order_items` WHERE order_id = ?", [$id]);
    }
    $body = '<div class="grid"><article class="card"><h3>Order #' . (int) $order['id'] . '</h3><dl class="kv">';
    $body .= '<dt>Status</dt><dd>' . h(pretty_status((string) $order['status'])) . '</dd>';
    $body .= '<dt>Total</dt><dd>' . money((float) $order['total_amount']) . ' ' . h((string) $order['currency']) . '</dd>';
    $body .= '<dt>Tax</dt><dd>' . h((string) $order['tax_amount']) . '</dd>';
    $body .= '<dt>Pay method</dt><dd>' . h((string) ($order['payment_method_title'] ?: $order['payment_method'])) . '</dd>';
    $body .= '<dt>Email</dt><dd>' . h((string) $order['billing_email']) . '</dd>';
    $body .= '<dt>Created</dt><dd>' . h((string) $order['date_created_gmt']) . '</dd>';
    $body .= '<dt>Note</dt><dd>' . h((string) $order['customer_note']) . '</dd>';
    $body .= '</dl></article><article class="card"><h3>Addresses</h3>';
    if ($addr) {
        foreach ($addr as $a) {
            $body .= '<p><strong>' . h((string) ($a['address_type'] ?? 'address')) . '</strong><br>';
            $body .= h(trim(($a['first_name'] ?? '') . ' ' . ($a['last_name'] ?? ''))) . '<br>';
            $body .= h((string) ($a['company'] ?? '')) . '<br>';
            $body .= h((string) ($a['address_1'] ?? '')) . ' ' . h((string) ($a['address_2'] ?? '')) . '<br>';
            $body .= h((string) ($a['postcode'] ?? '')) . ' ' . h((string) ($a['city'] ?? '')) . '<br>';
            $body .= h((string) ($a['email'] ?? '')) . ' ' . h((string) ($a['phone'] ?? ''));
            $body .= '</p>';
        }
    } else {
        $body .= '<p>No address rows.</p>';
    }
    $body .= '</article>';
    $body .= '<article class="card wide"><h3>Line items</h3><table class="data"><thead><tr><th>Type</th><th>Name</th></tr></thead><tbody>';
    foreach ($items as $it) {
        $body .= '<tr><td class="mono">' . h($it['order_item_type']) . '</td><td>' . h($it['order_item_name']) . '</td></tr>';
    }
    if (!$items) {
        $body .= '<tr><td colspan="2">No line items stored.</td></tr>';
    }
    $body .= '</tbody></table></article></div>';
    render('Order #' . $id, 'From ' . h(SITES[$prefix]['label']), $body, 'site');
    exit;
}

if ($page === 'table' && table_ok($table)) {
    $cols = table_columns($table);
    $visible = [];
    foreach ($cols as $c) {
        if (!is_sensitive_column($c['column_name'])) {
            $visible[] = $c['column_name'];
        }
    }
    $typeFilter = (string) ($_GET['type'] ?? '');
    $where = '';
    $params = [];
    if ($typeFilter !== '' && in_array('post_type', $visible, true)) {
        $where = 'WHERE post_type = ?';
        $params[] = $typeFilter;
    }
    if ($qstr !== '' && $visible) {
        $likes = [];
        foreach (array_slice($visible, 0, 8) as $col) {
            $likes[] = "`$col` LIKE ?";
            $params[] = '%' . $qstr . '%';
        }
        $where .= ($where === '' ? 'WHERE ' : ' AND ') . '(' . implode(' OR ', $likes) . ')';
    }
    $total = (int) scalar("SELECT COUNT(*) FROM `$table` $where", $params);
    $pages = max(1, (int) ceil($total / $per));
    $pg = min($pg, $pages);
    $off = ($pg - 1) * $per;
    $select = implode(',', array_map(fn ($c) => "`$c`", $visible));
    $rows = q("SELECT $select FROM `$table` $where LIMIT $per OFFSET $off", $params);

    $p = table_prefix($table);
    $body = '<div class="explain">' . h(explain_table(table_suffix($table))) . ' · ' . n($total) . ' rows';
    if ($p) {
        $body .= ' · belongs to <a href="?p=site&site=' . h($p) . '">' . h(SITES[$p]['label']) . '</a>';
    }
    $body .= '</div>';
    $body .= '<form class="toolbar" method="get"><input type="hidden" name="p" value="table">';
    $body .= '<input type="hidden" name="table" value="' . h($table) . '">';
    if ($typeFilter !== '') {
        $body .= '<input type="hidden" name="type" value="' . h($typeFilter) . '">';
    }
    $body .= '<input name="q" value="' . h($qstr) . '" placeholder="Filter these rows">';
    $body .= '<button class="btn">Filter</button></form>';
    $body .= '<div class="card wide" style="overflow:auto"><table class="data"><thead><tr>';
    foreach ($visible as $c) {
        $body .= '<th>' . h($c) . '</th>';
    }
    $body .= '</tr></thead><tbody>';
    foreach ($rows as $row) {
        $body .= '<tr>';
        foreach ($visible as $c) {
            $val = $row[$c];
            if ($val === null) {
                $body .= '<td class="meta">NULL</td>';
                continue;
            }
            $text = is_string($val) ? $val : (string) $val;
            if (strlen($text) > 240) {
                $text = truncate($text, 240);
            }
            $body .= '<td>' . h($text) . '</td>';
        }
        $body .= '</tr>';
    }
    if (!$rows) {
        $body .= '<tr><td colspan="' . count($visible) . '">No rows match.</td></tr>';
    }
    $body .= '</tbody></table></div>';
    $body .= '<div class="pager"><span>Page ' . $pg . ' / ' . $pages . '</span>';
    if ($pg > 1) {
        $body .= '<a class="btn ghost" href="?p=table&table=' . urlencode($table) . '&page=' . ($pg - 1) . '&q=' . urlencode($qstr) . '&type=' . urlencode($typeFilter) . '">Prev</a>';
    }
    if ($pg < $pages) {
        $body .= '<a class="btn ghost" href="?p=table&table=' . urlencode($table) . '&page=' . ($pg + 1) . '&q=' . urlencode($qstr) . '&type=' . urlencode($typeFilter) . '">Next</a>';
    }
    $body .= '</div>';
    render($table, 'Raw rows from MySQL. Long values are shortened. Password columns are hidden.', $body, 'tables');
    exit;
}

if ($page === 'search') {
    $hits = '';
    if ($qstr !== '') {
        $like = '%' . $qstr . '%';
        foreach (SITES as $p => $s) {
            if (table_ok($p . '_posts')) {
                $found = q("SELECT ID, post_title, post_type, post_status FROM `{$p}_posts` WHERE post_title LIKE ? AND post_type IN ('product','page','post') ORDER BY post_type LIMIT 12", [$like]);
                foreach ($found as $f) {
                    $link = $f['post_type'] === 'product'
                        ? '?p=product&site=' . urlencode($p) . '&id=' . (int) $f['ID']
                        : '?p=table&table=' . urlencode($p . '_posts') . '&q=' . urlencode($qstr);
                    $hits .= '<tr><td>' . h($s['label']) . '</td><td>' . h($f['post_type']) . '</td><td><a href="' . h($link) . '">' . h($f['post_title']) . '</a></td><td>' . h($f['post_status']) . '</td></tr>';
                }
            }
            if (table_ok($p . '_users')) {
                $found = q("SELECT ID, user_login, user_email, display_name FROM `{$p}_users` WHERE user_login LIKE ? OR user_email LIKE ? OR display_name LIKE ? LIMIT 8", [$like, $like, $like]);
                foreach ($found as $f) {
                    $hits .= '<tr><td>' . h($s['label']) . '</td><td>user</td><td>' . h($f['display_name']) . ' · ' . h($f['user_email']) . '</td><td class="mono">' . h($f['user_login']) . '</td></tr>';
                }
            }
        }
        foreach (all_tables() as $name => $_) {
            if (stripos($name, $qstr) !== false) {
                $hits .= '<tr><td>table</td><td>schema</td><td><a href="?p=table&table=' . urlencode($name) . '"><span class="mono">' . h($name) . '</span></a></td><td></td></tr>';
            }
        }
    }
    $body = '<div class="card wide">';
    if ($qstr === '') {
        $body .= '<p>Type a product name, person, email, or table name.</p>';
    } elseif ($hits === '') {
        $body .= '<p>Nothing matched <strong>' . h($qstr) . '</strong>.</p>';
    } else {
        $body .= '<table class="data"><thead><tr><th>Where</th><th>Kind</th><th>Match</th><th></th></tr></thead><tbody>' . $hits . '</tbody></table>';
    }
    $body .= '</div>';
    render('Search', 'Looks through products, pages, users and table names in all 7 models.', $body, 'search');
    exit;
}

http_response_code(404);
render('Not found', 'That page does not exist in the explorer.', '<p><a href="?p=home">Back home</a></p>', 'home');
