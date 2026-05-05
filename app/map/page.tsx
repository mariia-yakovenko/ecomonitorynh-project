import type { Metadata } from 'next';
import { stations, measurementsDb } from '@/lib/data';
import MapPageClient from '@/components/MapPageClient';

export const metadata: Metadata = { title: 'мапа станцій' };

export default function MapPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>мапа станцій</h1>
          <p
            style={{
              color: 'var(--color-muted)',
              fontSize: '0.9rem',
              marginTop: '0.5rem',
            }}
          >
            інтерактивна мапа моніторингових станцій України
          </p>
        </div>
      </section>

      <MapPageClient stations={stations} measurements={measurementsDb} />
    </>
  );
}
