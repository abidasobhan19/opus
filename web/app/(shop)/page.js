'use client';

import { Suspense } from 'react';
import { Portal } from '../../components/shop/Portal';

export default function HomePage() {
  return (
    <Suspense fallback={<p className="status">Loading portal…</p>}>
      <Portal />
    </Suspense>
  );
}
