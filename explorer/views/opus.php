<?php
declare(strict_types=1);

/** @var array $g */
$g = opus_guide();
$payTitle = is_array($g['pay']) ? (string) ($g['pay']['title'] ?? 'Faktura') : 'Faktura';
$payDesc = is_array($g['pay']) ? (string) ($g['pay']['description'] ?? '') : '';
$shipTitle = is_array($g['ship']) ? (string) ($g['ship']['title'] ?? 'Fastpris') : 'Fastpris';
$shipCost = is_array($g['ship']) ? (string) ($g['ship']['cost'] ?? '149') : '149';

$jump = [
    'flow' => 'How a visit works',
    'people' => 'Who logs in',
    'products' => 'What they order',
    'checkout' => 'Checkout rules',
    'orders' => 'Real orders',
    'code' => 'Custom code',
    'stack' => 'Files + database',
];

$html = '<nav class="jump">';
foreach ($jump as $id => $label) {
    $html .= '<a href="#' . h($id) . '">' . h($label) . '</a>';
}
$html .= '</nav>';

$html .= '<section class="stats">';
$html .= '<div class="stat"><b>' . n((int) $g['stats']['users']) . '</b><span>login accounts</span></div>';
$html .= '<div class="stat"><b>' . n((int) $g['stats']['products']) . '</b><span>published products</span></div>';
$html .= '<div class="stat"><b>' . n((int) $g['stats']['orders']) . '</b><span>orders</span></div>';
$html .= '<div class="stat"><b>' . money((float) $g['revenue']) . '</b><span>invoiced (SEK)</span></div>';
$html .= '<div class="stat"><b>' . n((int) $g['stationChoices']) . '</b><span>Opus stations in the list</span></div>';
$html .= '</section>';

$html .= '<div class="explain"><strong>This is the working shop.</strong> The WordPress files live in <span class="mono">C:\\Users\\Clothsy\\Downloads\\opus</span>. The data lives in this database under <span class="mono">opus_*</span>. Live URL: <a href="https://opus.tryckeriett.se" target="_blank" rel="noreferrer">opus.tryckeriett.se</a>. It is a private print portal for <strong>Opus Bilprovning</strong> — not the public Tryckeriett website.</div>';

$html .= '<div class="grid">';
$html .= '<article class="card"><h3>In one sentence</h3><p>Opus station staff log in, order posters, decals and flyers to a station address, get a central invoice, and Tryckeriett prints the job.</p>';
$html .= '<p class="meta">Orders from ' . h(substr($g['firstOrder'], 0, 10)) . ' to ' . h(substr($g['lastOrder'], 0, 10)) . '.</p></article>';
$html .= '<article class="card"><h3>Stack</h3><dl class="kv">';
$html .= '<dt>WordPress</dt><dd>7.0.4 · prefix <span class="mono">opus_</span></dd>';
$html .= '<dt>WooCommerce</dt><dd>9.8.7 · currency SEK</dd>';
$html .= '<dt>Theme</dt><dd>Hello Elementor — empty shell</dd>';
$html .= '<dt>Design</dt><dd>Elementor + Elementor Pro</dd>';
$html .= '<dt>Rules</dt><dd>Code Snippets plugin (not theme PHP)</dd>';
$html .= '<dt>Host</dt><dd>One.com · subdomain <span class="mono">opus</span></dd>';
$html .= '</dl></article></div>';

$html .= '<section id="flow" class="card wide" style="margin-top:16px"><h2>How a visit works</h2>';
$html .= '<ol class="path">';
$html .= '<li><b>Open opus.tryckeriett.se</b><span>The front page is “Logga in” (page id 21). A snippet blocks every other URL if you are not logged in. Even <span class="mono">wp-login.php</span> is sent here.</span></li>';
$html .= '<li><b>Log in</b><span>94 customers (Opus staff) + 3 Tryckeriett admins. Guest checkout is off. After a good login, WordPress sends you to <span class="mono">/portal</span>.</span></li>';
$html .= '<li><b>Beställningsportal</b><span>The shop home. Elementor draws the cards. Products come from <span class="mono">opus_posts</span> where <span class="mono">post_type = product</span>.</span></li>';
$html .= '<li><b>Add print items</b><span>Posters, decals, flyers, flags, office stuff. Prices are usually hidden on the product page (ACF “Visa pris”). A few items (visitkort) have extra name/title/phone fields.</span></li>';
$html .= '<li><b>Checkout</b><span>Shipping form is always open. You can pick a saved extra station address. Payment is <strong>' . h($payTitle) . '</strong> (' . h($payDesc) . '). Shipping is <strong>' . h($shipTitle) . ' ' . h($shipCost) . ' kr</strong>. A free item in the cart auto-adds “Plockavgift” 50 kr.</span></li>';
$html .= '<li><b>Order is stamped + printed</b><span>The user’s station and cost centre are copied onto the order. PDF invoice is made. Tryckeriett prints and ships to the station.</span></li>';
$html .= '</ol></section>';

$html .= '<div class="grid" style="margin-top:16px">';
$html .= '<article class="card" id="people"><h2>Who logs in</h2>';
$html .= '<div class="nums">';
foreach ($g['roles'] as $role => $c) {
    $html .= '<div><b>' . n((int) $c) . '</b><span>' . h($role) . '</span></div>';
}
$html .= '<div><b>' . n((int) $g['stationsFilled']) . '</b><span>have a station</span></div>';
$html .= '<div><b>' . n((int) $g['extraAddr']) . '</b><span>saved extra addresses</span></div>';
$html .= '</div>';
$html .= '<p>Users were imported with <strong>Import Users from CSV</strong>. Each person can have an Opus station (99 choices: Göteborg-Lundby, Stockholm Vinsta, Kiruna…) and a cost centre. Extra station addresses live in user meta <span class="mono">extra_shipping_addresses</span>.</p>';
$html .= '<table class="data"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Station</th></tr></thead><tbody>';
foreach ($g['users'] as $u) {
    $html .= '<tr><td>' . h($u['display_name']) . '</td><td>' . h($u['user_email']) . '</td><td>' . h(wp_primary_role($u['caps'])) . '</td><td>' . h((string) ($u['station'] ?? '—')) . '</td></tr>';
}
$html .= '</tbody></table>';
$html .= '<p><a href="?p=table&table=opus_users">All ' . n((int) $g['stats']['users']) . ' users →</a></p></article>';

$html .= '<article class="card"><h2>Important pages</h2><table class="data"><thead><tr><th>Page</th><th>Slug</th><th>Job</th></tr></thead><tbody>';
$pageHelp = [
    'logga-in' => 'Only public page. Login form.',
    'portal' => 'Shop home after login.',
    'butik' => 'WooCommerce product list.',
    'varukorg' => 'Cart.',
    'kassa' => 'Checkout.',
    'mina-sidor' => 'Orders + extra addresses.',
    'bestallningssammanfattning' => 'Order summary.',
    'support' => 'Help page.',
];
foreach ($g['pages'] as $p) {
    $help = $pageHelp[$p['post_name']] ?? 'Normal WordPress page.';
    $html .= '<tr><td>' . h($p['post_title']) . '</td><td class="mono">' . h($p['post_name']) . '</td><td>' . h($help) . '</td></tr>';
}
$html .= '</tbody></table></article></div>';

$html .= '<section id="products" class="card wide" style="margin-top:16px"><h2>What they order</h2>';
$html .= '<p>' . n((int) $g['stats']['products']) . ' published products. ' . n((int) $g['hiddenPrice']) . ' have “Visa pris” turned off, so staff usually do not see a price. ' . n((int) $g['wapf']) . ' products have extra form fields (visitkort-style).</p>';
if ($g['plock']) {
    $html .= '<p>Hidden fee product: <a href="?p=product&site=opus&id=901"><strong>' . h($g['plock']['post_title']) . '</strong> · ' . h((string) $g['plock']['price']) . ' kr · id 901</a>. Auto-added when the cart contains a free item.</p>';
}
$html .= '<div class="plugins" style="margin:12px 0">';
foreach ($g['categories'] as $cat) {
    $html .= '<span>' . h(html_entity_decode((string) $cat['name'], ENT_QUOTES, 'UTF-8')) . ' · ' . n((int) $cat['count']) . '</span>';
}
$html .= '</div>';
$html .= '<table class="data"><thead><tr><th>ID</th><th>Product</th><th>Price</th><th>Show price?</th><th></th></tr></thead><tbody>';
foreach ($g['products'] as $pr) {
    $html .= '<tr><td class="mono">' . (int) $pr['ID'] . '</td><td>' . h($pr['post_title']) . '</td><td>' . h((string) ($pr['price'] ?? '—')) . '</td>';
    $html .= '<td>' . (($pr['visa_pris'] ?? '0') === '1' ? 'yes' : 'hidden') . '</td>';
    $html .= '<td><a href="?p=product&site=opus&id=' . (int) $pr['ID'] . '">Open</a></td></tr>';
}
$html .= '</tbody></table>';
$html .= '<p><a href="?p=table&table=opus_posts&type=product">Browse every product row →</a></p></section>';

$html .= '<section id="checkout" class="card wide" style="margin-top:16px"><h2>Checkout rules</h2><div class="flow">';
$html .= '<div class="step"><b>Must be logged in</b><span>Guest checkout = no. Signup on checkout = no.</span></div>';
$html .= '<div class="step"><b>' . h($payTitle) . '</b><span>' . h($payDesc) . '. Almost every order uses this — no card payments.</span></div>';
$html .= '<div class="step"><b>' . h($shipTitle) . ' ' . h($shipCost) . ' kr</b><span>One shipping zone (“Globalt”). One flat rate.</span></div>';
$html .= '<div class="step"><b>Stamp the order</b><span>Copies <span class="mono">opus_station</span> and <span class="mono">kostnadsställe</span> from the user onto the order so the invoice hits the right station.</span></div>';
$html .= '</div></section>';

$html .= '<section id="orders" class="card wide" style="margin-top:16px"><h2>Real orders</h2>';
$html .= '<div class="nums" style="margin-bottom:14px">';
foreach ($g['orderSplit'] as $os) {
    $html .= '<div><b>' . n((int) $os['c']) . '</b><span>' . h(pretty_status((string) $os['status'])) . ' · ' . money((float) $os['t']) . '</span></div>';
}
$html .= '</div>';
$html .= '<p>Who the invoices are billed to:</p><table class="data"><thead><tr><th>Email</th><th>Orders</th><th>Spend</th></tr></thead><tbody>';
foreach ($g['billers'] as $b) {
    $html .= '<tr><td>' . h($b['billing_email']) . '</td><td>' . n((int) $b['orders']) . '</td><td>' . money((float) $b['spend']) . '</td></tr>';
}
$html .= '</tbody></table>';
$html .= '<h3 style="margin-top:22px">Latest 12 orders</h3><table class="data"><thead><tr><th>Order</th><th>Status</th><th>Total</th><th>When</th><th>Lines</th><th></th></tr></thead><tbody>';
foreach ($g['orders'] as $o) {
    $oid = (int) $o['id'];
    $lines = [];
    foreach ($g['itemsByOrder'][$oid] ?? [] as $it) {
        if ($it['order_item_type'] === 'line_item' || $it['order_item_type'] === 'shipping' || $it['order_item_type'] === 'fee') {
            $lines[] = $it['order_item_name'];
        }
    }
    $extra = [];
    if (!empty($g['metaByOrder'][$oid]['_opus_station'])) {
        $extra[] = 'station ' . $g['metaByOrder'][$oid]['_opus_station'];
    }
    if (!empty($g['metaByOrder'][$oid]['_kostnadsstalle'])) {
        $extra[] = 'cc ' . $g['metaByOrder'][$oid]['_kostnadsstalle'];
    }
    $html .= '<tr><td class="mono">#' . $oid . '</td><td>' . h(pretty_status((string) $o['status'])) . '</td>';
    $html .= '<td>' . money((float) $o['total_amount']) . '</td><td>' . h((string) $o['date_created_gmt']) . '</td>';
    $html .= '<td>' . h(implode(' · ', $lines));
    if ($extra) {
        $html .= '<div class="meta">' . h(implode(' · ', $extra)) . '</div>';
    }
    if ($o['customer_note']) {
        $html .= '<div class="meta">' . h(truncate((string) $o['customer_note'], 90)) . '</div>';
    }
    $html .= '</td><td><a href="?p=order&site=opus&id=' . $oid . '">Open</a></td></tr>';
}
$html .= '</tbody></table></section>';

$html .= '<section id="code" class="card wide" style="margin-top:16px"><h2>Custom code (Code Snippets)</h2>';
$html .= '<p>The theme has almost no custom PHP. These snippets <em>are</em> how Opus behaves. Green = running now.</p>';
$html .= '<table class="data"><thead><tr><th>ID</th><th>Name</th><th>On?</th><th>What it does</th></tr></thead><tbody>';
$snipHelp = [
    5 => 'Hides the Downloads tab on My Account — nothing here is a digital file.',
    7 => 'Always opens the shipping-address form at checkout.',
    12 => 'Force-login. Guests → /logga-in. Logged-in homepage → /portal.',
    13 => 'Copies the user’s Opus station onto the new order.',
    14 => 'Copies the user’s cost centre onto the new order.',
    18 => 'Lets Order Export run custom PHP.',
    21 => 'If the cart has a free product, add Plockavgift (id 901, 50 kr).',
    22 => 'Save / delete extra delivery addresses on My Account.',
    23 => 'Let the customer pick an extra address in checkout.',
    24 => 'Renames the “edit address” link text.',
    34 => 'Debug log when an address is saved.',
    35 => 'Relabels first/last name to “Opus station” / “Kostnadsställe”.',
    6 => 'Tried to wipe billing fields (off).',
    15 => 'Tried to hide prices (off — ACF field is used instead).',
    17 => 'Older plockavgift version (off).',
    38 => 'Tried a “Restorder” status (off).',
    39 => 'Tried a rest-order button (off).',
    40 => 'Tried registering restorder again (off).',
];
foreach ($g['snippets'] as $sn) {
    $on = ((int) $sn['active']) === 1;
    $html .= '<tr><td class="mono">' . (int) $sn['id'] . '</td><td>' . h($sn['name']) . '</td>';
    $html .= '<td><span class="pill ' . ($on ? 'ok' : 'mute') . '">' . ($on ? 'on' : 'off') . '</span></td>';
    $html .= '<td>' . h($snipHelp[(int) $sn['id']] ?? ($sn['description'] ?: 'Custom PHP snippet.')) . '</td></tr>';
}
$html .= '</tbody></table></section>';

$html .= '<section id="stack" class="card wide" style="margin-top:16px"><h2>Files + database — how they fit</h2>';
$html .= '<div class="flow">';
$html .= '<div class="step"><b>WP files</b><span><span class="mono">Downloads\\opus</span> — WordPress core, plugins, Hello Elementor theme. The machine.</span></div>';
$html .= '<div class="step"><b>This database</b><span><span class="mono">opus_users</span>, <span class="mono">opus_posts</span>, <span class="mono">opus_wc_orders</span>, Elementor layouts, snippets. The memory.</span></div>';
$html .= '<div class="step"><b>Change a product</b><span>That is a database row, not a file.</span></div>';
$html .= '<div class="step"><b>Change force-login</b><span>That is snippet 12 in <span class="mono">opus_snippets</span>, executed by the Code Snippets plugin in the folder.</span></div>';
$html .= '</div>';
$html .= '<h3 style="margin-top:18px">Active plugins</h3><div class="plugins">';
foreach ($g['stats']['plugins'] as $pl) {
    $html .= '<span>' . h($pl) . '</span>';
}
$html .= '</div>';
$html .= '<p style="margin-top:16px">';
$html .= '<a class="btn" href="?p=site&site=opus">Open the raw Opus model</a> ';
$html .= '<a class="btn ghost" href="?p=table&table=opus_wc_orders">Browse orders table</a> ';
$html .= '<a class="btn ghost" href="?p=table&table=opus_snippets">Browse snippets table</a>';
$html .= '</p></section>';

return $html;
