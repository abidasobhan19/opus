import { Head } from '../ui';

export function Info() {
  return (
    <>
      <Head title="Info" sub="How this admin is organised." />
      <article className="card" style={{ marginTop: 16, maxWidth: 720 }}><p>Companies own branches and users. Orders and products are shared across the ordering portal. Use the sidebar to open products, orders, companies, users, or settings. Log out returns to the ordering portal. The shop and this admin share one Express API.</p></article>
    </>
  );
}
