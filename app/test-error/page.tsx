'use client';
import { useState } from 'react';

export default function TestErrorPage() {
  const [crash, setCrash] = useState(false);

  if (crash) {
    throw new Error('Тестова помилка для демонстрації error.tsx');
  }

  return (
    <section style={{ padding: '4rem 0', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ marginBottom: '1rem' }}>Тестова сторінка помилки</h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
          Натисніть кнопку щоб побачити кастомну сторінку 500
        </p>
        <button
          onClick={() => setCrash(true)}
          style={{
            background: '#b83030',
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
          Симулювати помилку 500
        </button>
      </div>
    </section>
  );
}
