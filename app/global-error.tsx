'use client';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'error',
        message: 'global_error',
        service: 'ecomonitor',
        error: error.message,
        digest: error.digest ?? null,
        source: 'global_error_boundary',
      }),
    );
  }, [error]);

  return (
    <html lang="uk">
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '6rem 1rem',
          background: '#fafaf7',
          color: '#1a1a1a',
        }}
      >
        <div style={{ fontSize: '3rem', fontWeight: 800, color: '#636b2f' }}>500</div>
        <h1 style={{ fontSize: '1.5rem', margin: '1rem 0 0.5rem' }}>Критична помилка додатку</h1>
        <p style={{ color: '#888', marginBottom: '2rem' }}>
          Виникла критична помилка. Спробуйте оновити сторінку.
        </p>
        {error.digest && (
          <p style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
            Код помилки: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          style={{
            background: '#636b2f',
            color: '#fff',
            border: 'none',
            padding: '0.6rem 1.5rem',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
        >
          Оновити сторінку
        </button>
      </body>
    </html>
  );
}
