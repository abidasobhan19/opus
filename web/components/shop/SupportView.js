'use client';

import { useEffect } from 'react';

export function SupportView() {
  useEffect(() => { document.title = 'Support — OPUS'; }, []);
  return (
    <>
      <section className="hero flat">
        <div className="hero-inner">
          <h1>Support</h1>
          <p>Help with orders, print files, and station deliveries.</p>
        </div>
      </section>
      <div className="support card">
        <h2>Tryckeriett</h2>
        <p>This portal is for Opus stations ordering printed materials. Invoices are sent to the station, and jobs are printed and shipped to the delivery address on the order.</p>
        <p>Email <a href="mailto:support@tryckeriett.se">support@tryckeriett.se</a> or call the print desk if a file or delivery address needs to change after the order is placed.</p>
        <p>Admins manage companies, branches, users, products, and orders from the admin panel.</p>
      </div>
    </>
  );
}
