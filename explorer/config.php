<?php
declare(strict_types=1);

const DB_HOST = '127.0.0.1';
const DB_NAME = 'tryckeriett_se';
const DB_USER = 'root';
const DB_PASS = '';

const HIDDEN_COLUMNS = [
    'user_pass',
    'user_activation_key',
    'session_value',
    'user_key',
];

const SITES = [
    'opus' => [
        'label' => 'Opus Portal',
        'url' => 'https://opus.tryckeriett.se',
        'status' => 'live',
        'status_text' => 'Working now',
        'kind' => 'Private client shop',
        'theme' => 'Hello Elementor',
        'blurb' => 'The real shop. Opus Bilprovning staff log in, order printed posters, decals and flyers, and pay by invoice.',
        'who' => 'Opus vehicle-inspection staff + Tryckeriett admins',
    ],
    'www' => [
        'label' => 'Public website',
        'url' => 'https://www.tryckeriett.se',
        'status' => 'live',
        'status_text' => 'Public site',
        'kind' => 'Marketing website',
        'theme' => 'Essentials (pixfort)',
        'blurb' => 'The company homepage people see first: about, contact, print methods, references. Almost no shop sales live here.',
        'who' => 'Anyone on the internet',
    ],
    'webshop' => [
        'label' => 'Webshop catalog',
        'url' => 'https://webshop.tryckeriett.se',
        'status' => 'quiet',
        'status_text' => 'Catalog / quotes',
        'kind' => 'Product catalog',
        'theme' => 'Divi (child: tryck)',
        'blurb' => 'A bigger product catalog (clothes, flags, vehicle wrap). Built for quotes more than completed checkouts.',
        'who' => 'Public / quote requests',
    ],
    'portal' => [
        'label' => 'Old customer portal',
        'url' => 'http://portal.tryckeriett.se',
        'status' => 'legacy',
        'status_text' => 'Old / leftover',
        'kind' => 'Legacy client portal',
        'theme' => 'Porto',
        'blurb' => 'Older portal used by Estate.se people. A few products (business cards, name tags) and one old order.',
        'who' => 'Estate.se users (legacy)',
    ],
    'b2b' => [
        'label' => 'B2B shop',
        'url' => 'https://b2b.tryckeriett.se',
        'status' => 'idle',
        'status_text' => 'Set up, unused',
        'kind' => 'B2B shop (empty)',
        'theme' => 'Essentials',
        'blurb' => 'A locked B2B shop (force-login + groups). Tables exist, but there are no products and no orders.',
        'who' => 'One admin only',
    ],
    'beta' => [
        'label' => 'Beta test',
        'url' => 'https://beta.tryckeriett.se',
        'status' => 'test',
        'status_text' => 'Test only',
        'kind' => 'Empty test site',
        'theme' => 'Bricks',
        'blurb' => 'A nearly empty WordPress + WooCommerce test. Safe to ignore for real business data.',
        'who' => 'Developer / Arvid',
    ],
    'testar' => [
        'label' => 'Testar',
        'url' => 'http://testar.tryckeriett.se',
        'status' => 'test',
        'status_text' => 'Old test',
        'kind' => 'Old demo site',
        'theme' => 'Gardener',
        'blurb' => 'An old Swedish demo site (services / spotlight). No WooCommerce, no customers.',
        'who' => 'One test admin',
    ],
];
