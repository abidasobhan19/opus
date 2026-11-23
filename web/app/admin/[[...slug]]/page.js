'use client';

import { Suspense } from 'react';
import AdminApp from '../../../components/admin/AdminApp';

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="adm"><div className="view">Loading admin…</div></div>}>
      <AdminApp />
    </Suspense>
  );
}
