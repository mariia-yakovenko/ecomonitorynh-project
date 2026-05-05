'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        level: 'error',
        message: error.message,
        digest: error.digest ?? null,
        source: 'next_error_page',
      }),
    }).catch(() => {});
  }, [error]);

  return (
    <section style={{ padding: '6rem 0', textAlign: 'center' }}>
      <div className="container">
        <div
          style={{
            fontSize: '4rem',
            fontWeight: 800,
            color: 'var(--color-primary)',
            lineHeight: 1,
          }}
        >
          500
        </div>
        <h1 style={{ fontSize: '1.5rem', margin: '1rem 0 0.5rem' }}>
          Внутрішня помилка сервера
        </h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
          Щось пішло не так під час обробки вашого запиту.
        </p>
        {error.digest && (
          <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
            Код помилки: {error.digest}
          </p>
        )}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '2rem',
          }}
        >
          <button
            onClick={reset}
            style={{
              background: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              padding: '0.6rem 1.5rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Спробувати знову
          </button>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              border: '1px solid var(--color-border)',
              color: 'var(--color-primary)',
              padding: '0.6rem 1.5rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            На головну
          </Link>
        </div>
      </div>
    </section>
  );
}
