'use client';

import { useRouter } from 'next/navigation';
import css from './page.module.css';
import { useEffect } from 'react';

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className={css.main}>
      <p className={css.title}>404 | Page Not Found</p>
      <p className={css.description}>You will be redirected to the homepage in a while</p>
    </main>
  );
}
