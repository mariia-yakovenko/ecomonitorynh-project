'use client';
import React from 'react';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  context?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        level: 'error',
        message: error.message,
        stack: error.stack,
        component_stack: info.componentStack,
        context: this.props.context ?? 'unknown',
        source: 'error_boundary',
      }),
    }).catch(() => {});
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback) return this.props.fallback;

    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
          ⚠
        </div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Сталася помилка</h2>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {this.state.error?.message ?? 'Невідома помилка компонента'}
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              background: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1.2rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            Спробувати знову
          </button>
          <Link
            href="/"
            style={{
              color: 'var(--color-primary)',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            На головну
          </Link>
        </div>
      </div>
    );
  }
}
