<?php
declare(strict_types=1);

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4',
        ]
    );
    return $pdo;
}

function q(string $sql, array $params = []): array
{
    $st = db()->prepare($sql);
    $st->execute($params);
    return $st->fetchAll();
}

function one(string $sql, array $params = []): ?array
{
    $st = db()->prepare($sql);
    $st->execute($params);
    $row = $st->fetch();
    return $row === false ? null : $row;
}

function scalar(string $sql, array $params = []): mixed
{
    $st = db()->prepare($sql);
    $st->execute($params);
    $v = $st->fetchColumn();
    return $v === false ? null : $v;
}

function h(?string $s): string
{
    return htmlspecialchars((string) $s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function money(?float $n): string
{
    return number_format((float) $n, 0, ',', ' ') . ' kr';
}

function n(?int $n): string
{
    return number_format((int) $n, 0, ',', ' ');
}

function site_ok(string $prefix): bool
{
    return isset(SITES[$prefix]);
}

function all_tables(): array
{
    static $tables = null;
    if ($tables !== null) {
        return $tables;
    }
    $rows = q(
        'SELECT table_name, table_rows, data_length, index_length
         FROM information_schema.tables
         WHERE table_schema = ?
         ORDER BY table_name',
        [DB_NAME]
    );
    $tables = [];
    foreach ($rows as $r) {
        $tables[$r['table_name']] = $r;
    }
    return $tables;
}

function table_ok(string $name): bool
{
    return isset(all_tables()[$name]);
}

function table_columns(string $table): array
{
    return q(
        'SELECT column_name, data_type, column_key, column_comment, is_nullable
         FROM information_schema.columns
         WHERE table_schema = ? AND table_name = ?
         ORDER BY ordinal_position',
        [DB_NAME, $table]
    );
}

function table_prefix(string $table): string
{
    foreach (array_keys(SITES) as $p) {
        if (str_starts_with($table, $p . '_')) {
            return $p;
        }
    }
    return '';
}

function table_suffix(string $table): string
{
    $p = table_prefix($table);
    return $p === '' ? $table : substr($table, strlen($p) + 1);
}

function explain_table(string $suffix): string
{
    return match (true) {
        $suffix === 'posts' => 'Pages, products, orders-as-posts, images, revisions. The main content table.',
        $suffix === 'postmeta' => 'Extra fields for each post (price, SKU, Elementor layout, custom fields).',
        $suffix === 'users' => 'People who can log in: admins, staff, customers.',
        $suffix === 'usermeta' => 'Extra fields for each user (role, billing address, last login).',
        $suffix === 'comments' => 'Comments and WooCommerce order notes.',
        $suffix === 'commentmeta' => 'Extra fields for comments / order notes.',
        $suffix === 'options' => 'Site settings: name, URL, theme, plugins, WooCommerce config.',
        $suffix === 'terms' => 'Names of categories, tags, product brands.',
        $suffix === 'term_taxonomy' => 'What kind of term each one is (product_cat, category, tag…).',
        $suffix === 'term_relationships' => 'Links posts/products to categories and tags.',
        $suffix === 'termmeta' => 'Extra fields for categories (thumbnail, display type).',
        $suffix === 'links' => 'Old WordPress blogroll. Usually empty.',
        str_starts_with($suffix, 'wc_orders') => 'WooCommerce HPOS orders (the modern order list).',
        $suffix === 'wc_order_addresses' => 'Billing and shipping addresses for orders.',
        $suffix === 'wc_order_operational_data' => 'Internal order flags (paid, recorded sales).',
        $suffix === 'wc_order_product_lookup' => 'Which products were sold, qty and revenue. Used for reports.',
        $suffix === 'wc_order_stats' => 'One summary row per order for the WooCommerce dashboard.',
        $suffix === 'wc_customer_lookup' => 'Customer index used by WooCommerce analytics.',
        $suffix === 'woocommerce_order_items' => 'Line items on an order (product name, shipping, fee).',
        $suffix === 'woocommerce_order_itemmeta' => 'Details for each line (qty, cost, tax, product id).',
        $suffix === 'wc_product_meta_lookup' => 'Fast product index (price, stock, SKU) for the shop.',
        str_contains($suffix, 'actionscheduler') => 'Background jobs (emails, cleanup, WooCommerce cron).',
        str_starts_with($suffix, 'e_') => 'Elementor forms, notes and submissions.',
        str_starts_with($suffix, 'relevanssi') => 'Search index so the shop search is faster / smarter.',
        str_starts_with($suffix, 'revslider') => 'Slider Revolution slides and styles.',
        str_starts_with($suffix, 'masterslider') => 'Master Slider slides.',
        str_starts_with($suffix, 'groups_') => 'User groups and permissions (B2B / portal).',
        $suffix === 'snippets' => 'Code Snippets plugin — small custom PHP pieces.',
        default => 'Supporting table for a plugin or WooCommerce feature.',
    };
}

function site_stats(string $prefix): array
{
    $tables = all_tables();
    $own = 0;
    foreach ($tables as $name => $_) {
        if (str_starts_with($name, $prefix . '_')) {
            $own++;
        }
    }

    $users = table_ok($prefix . '_users')
        ? (int) scalar("SELECT COUNT(*) FROM `{$prefix}_users`")
        : 0;

    $pages = table_ok($prefix . '_posts')
        ? (int) scalar("SELECT COUNT(*) FROM `{$prefix}_posts` WHERE post_type='page' AND post_status='publish'")
        : 0;

    $products = table_ok($prefix . '_posts')
        ? (int) scalar("SELECT COUNT(*) FROM `{$prefix}_posts` WHERE post_type='product' AND post_status='publish'")
        : 0;

    $variations = table_ok($prefix . '_posts')
        ? (int) scalar("SELECT COUNT(*) FROM `{$prefix}_posts` WHERE post_type='product_variation' AND post_status='publish'")
        : 0;

    $orders = 0;
    $revenue = 0.0;
    if (table_ok($prefix . '_wc_orders')) {
        $row = one("SELECT COUNT(*) c, COALESCE(SUM(total_amount),0) t FROM `{$prefix}_wc_orders`");
        $orders = (int) $row['c'];
        $revenue = (float) $row['t'];
    } elseif (table_ok($prefix . '_posts')) {
        $orders = (int) scalar("SELECT COUNT(*) FROM `{$prefix}_posts` WHERE post_type='shop_order'");
    }

    $plugins = [];
    if (table_ok($prefix . '_options')) {
        $raw = scalar("SELECT option_value FROM `{$prefix}_options` WHERE option_name='active_plugins'");
        if (is_string($raw) && $raw !== '') {
            $arr = @unserialize($raw, ['allowed_classes' => false]);
            if (is_array($arr)) {
                foreach ($arr as $path) {
                    $plugins[] = explode('/', (string) $path)[0];
                }
            }
        }
    }

    $postTypes = [];
    if (table_ok($prefix . '_posts')) {
        $postTypes = q(
            "SELECT post_type, post_status, COUNT(*) c
             FROM `{$prefix}_posts`
             GROUP BY post_type, post_status
             ORDER BY c DESC"
        );
    }

    return compact('own', 'users', 'pages', 'products', 'variations', 'orders', 'revenue', 'plugins', 'postTypes');
}

function parse_plugins(mixed $serialized): array
{
    if (!is_string($serialized) || $serialized === '') {
        return [];
    }
    $arr = @unserialize($serialized, ['allowed_classes' => false]);
    if (!is_array($arr)) {
        return [];
    }
    $out = [];
    foreach ($arr as $path) {
        $out[] = explode('/', (string) $path)[0];
    }
    return $out;
}

function status_class(string $status): string
{
    return match ($status) {
        'live' => 'ok',
        'quiet' => 'warn',
        'legacy' => 'mute',
        'idle' => 'mute',
        'test' => 'test',
        default => 'mute',
    };
}

function pretty_status(string $wc): string
{
    return match ($wc) {
        'wc-completed' => 'Completed',
        'wc-processing' => 'Processing',
        'wc-on-hold' => 'On hold',
        'wc-pending' => 'Pending',
        'wc-cancelled' => 'Cancelled',
        'wc-refunded' => 'Refunded',
        'wc-failed' => 'Failed',
        default => preg_replace('/^wc-/', '', $wc) ?? $wc,
    };
}

function truncate(string $s, int $len = 140): string
{
    $s = trim(preg_replace('/\s+/', ' ', $s) ?? $s);
    if (mb_strlen($s) <= $len) {
        return $s;
    }
    return mb_substr($s, 0, $len - 1) . '…';
}

function is_sensitive_column(string $col): bool
{
    $c = strtolower($col);
    foreach (HIDDEN_COLUMNS as $h) {
        if ($c === $h) {
            return true;
        }
    }
    return str_contains($c, 'password') || str_contains($c, 'passwd') || str_contains($c, 'secret');
}

function php_unserialize(mixed $raw): mixed
{
    if (!is_string($raw) || $raw === '') {
        return null;
    }
    $v = @unserialize($raw, ['allowed_classes' => false]);
    return $v === false ? null : $v;
}

function wp_primary_role(?string $caps): string
{
    $a = php_unserialize($caps);
    if (!is_array($a)) {
        return 'unknown';
    }
    foreach ($a as $role => $on) {
        if ($on) {
            return (string) $role;
        }
    }
    return 'none';
}

function opus_guide(): array
{
    $stats = site_stats('opus');

    $orderSplit = q("SELECT status, COUNT(*) c, ROUND(SUM(total_amount),0) t FROM opus_wc_orders GROUP BY status ORDER BY c DESC");
    $revenue = (float) scalar("SELECT COALESCE(SUM(total_amount),0) FROM opus_wc_orders");
    $firstOrder = (string) scalar("SELECT MIN(date_created_gmt) FROM opus_wc_orders");
    $lastOrder = (string) scalar("SELECT MAX(date_created_gmt) FROM opus_wc_orders");

    $roles = [];
    foreach (q("SELECT meta_value FROM opus_usermeta WHERE meta_key='opus_capabilities'") as $r) {
        $role = wp_primary_role($r['meta_value']);
        $roles[$role] = ($roles[$role] ?? 0) + 1;
    }

    $stationsFilled = (int) scalar("SELECT COUNT(*) FROM opus_usermeta WHERE meta_key='opus_station' AND meta_value<>''");
    $costFilled = (int) scalar("SELECT COUNT(*) FROM opus_usermeta WHERE meta_key='kostnadsstalle' AND meta_value<>''");
    $extraAddr = (int) scalar("SELECT COUNT(*) FROM opus_usermeta WHERE meta_key='extra_shipping_addresses' AND meta_value<>'' AND meta_value<>'a:0:{}'");

    $stationChoices = 0;
    $stationField = scalar("SELECT post_content FROM opus_posts WHERE ID=871");
    $parsed = php_unserialize($stationField);
    if (is_array($parsed) && isset($parsed['choices']) && is_array($parsed['choices'])) {
        $stationChoices = count($parsed['choices']);
    }

    $categories = q(
        "SELECT t.name, tt.count
         FROM opus_terms t
         JOIN opus_term_taxonomy tt ON tt.term_id = t.term_id
         WHERE tt.taxonomy='product_cat' AND t.slug<>'uncategorized'
         ORDER BY tt.count DESC"
    );

    $products = q(
        "SELECT p.ID, p.post_title, p.post_status,
                (SELECT meta_value FROM opus_postmeta m WHERE m.post_id=p.ID AND m.meta_key='_price' LIMIT 1) price,
                (SELECT meta_value FROM opus_postmeta m WHERE m.post_id=p.ID AND m.meta_key='visa_pris' LIMIT 1) visa_pris
         FROM opus_posts p
         WHERE p.post_type='product' AND p.post_status='publish'
         ORDER BY p.post_title
         LIMIT 40"
    );

    $hiddenPrice = (int) scalar("SELECT COUNT(*) FROM opus_postmeta WHERE meta_key='visa_pris' AND meta_value='0'");
    $wapf = (int) scalar("SELECT COUNT(*) FROM opus_postmeta WHERE meta_key='_wapf_fieldgroup' AND meta_value<>'' AND meta_value<>'a:0:{}'");

    $plock = one("SELECT p.ID, p.post_title,
        (SELECT meta_value FROM opus_postmeta m WHERE m.post_id=p.ID AND m.meta_key='_price' LIMIT 1) price
        FROM opus_posts p WHERE p.ID=901");

    $orders = q(
        "SELECT id, status, billing_email, total_amount, date_created_gmt, payment_method_title, customer_note
         FROM opus_wc_orders
         ORDER BY id DESC
         LIMIT 12"
    );
    $orderIds = array_map(fn ($o) => (int) $o['id'], $orders);
    $itemsByOrder = [];
    $metaByOrder = [];
    if ($orderIds) {
        $in = implode(',', $orderIds);
        foreach (q("SELECT order_id, order_item_name, order_item_type FROM opus_woocommerce_order_items WHERE order_id IN ($in) ORDER BY order_item_id") as $it) {
            $itemsByOrder[(int) $it['order_id']][] = $it;
        }
        foreach (q("SELECT order_id, meta_key, meta_value FROM opus_wc_orders_meta WHERE order_id IN ($in) AND meta_key IN ('_opus_station','_kostnadsstalle')") as $m) {
            $metaByOrder[(int) $m['order_id']][$m['meta_key']] = $m['meta_value'];
        }
    }

    $billers = q(
        "SELECT billing_email, COUNT(*) orders, ROUND(SUM(total_amount),0) spend
         FROM opus_wc_orders
         GROUP BY billing_email
         ORDER BY orders DESC"
    );

    $users = q(
        "SELECT u.ID, u.user_login, u.user_email, u.display_name, u.user_registered,
                (SELECT meta_value FROM opus_usermeta m WHERE m.user_id=u.ID AND m.meta_key='opus_capabilities' LIMIT 1) caps,
                (SELECT meta_value FROM opus_usermeta m WHERE m.user_id=u.ID AND m.meta_key='opus_station' LIMIT 1) station,
                (SELECT meta_value FROM opus_usermeta m WHERE m.user_id=u.ID AND m.meta_key='kostnadsstalle' LIMIT 1) cost_center,
                (SELECT meta_value FROM opus_usermeta m WHERE m.user_id=u.ID AND m.meta_key='when_last_login' LIMIT 1) last_login
         FROM opus_users u
         ORDER BY u.ID
         LIMIT 25"
    );

    $snippets = q("SELECT id, name, active, scope, description FROM opus_snippets ORDER BY active DESC, id");

    $pages = q("SELECT ID, post_title, post_name FROM opus_posts WHERE post_type='page' AND post_status='publish' ORDER BY post_title");

    $pay = php_unserialize((string) scalar("SELECT option_value FROM opus_options WHERE option_name='woocommerce_cod_settings'"));
    $ship = php_unserialize((string) scalar("SELECT option_value FROM opus_options WHERE option_name='woocommerce_flat_rate_3_settings'"));

    return compact(
        'stats', 'orderSplit', 'revenue', 'firstOrder', 'lastOrder', 'roles',
        'stationsFilled', 'costFilled', 'extraAddr', 'stationChoices',
        'categories', 'products', 'hiddenPrice', 'wapf', 'plock',
        'orders', 'itemsByOrder', 'metaByOrder', 'billers', 'users',
        'snippets', 'pages', 'pay', 'ship'
    );
}
