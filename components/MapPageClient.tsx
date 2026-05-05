"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { MonitoringStation, Measurement } from "@/types";
import { AqiBadge } from "./AqiBadge";
import { ErrorBoundary } from "./ErrorBoundary";
import { trackMapMarkerClick } from "@/lib/analytics";

// Leaflet не підтримує SSR — завантажуємо тільки на клієнті.
// loading: показує скелет до того, як JS-бандл карти завантажиться.
const StationMap = dynamic(() => import("./StationMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: "var(--color-primary-light)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-muted)",
        fontSize: "0.85rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}
    >
      завантаження карти…
    </div>
  ),
});

// Recharts завантажується лише тоді, коли користувач обрав станцію.
// Це виключає ~180 KiB графічного коду з першого бандлу сторінки.
const StationCharts = dynamic(() => import("./StationCharts"), {
  loading: () => (
    <div
      style={{
        height: 300,
        background: "var(--color-primary-light)",
        border: "1.5px dashed var(--color-mid)",
        borderRadius: "var(--radius-md)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-muted)",
        fontSize: "0.85rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}
    >
      завантаження графіків…
    </div>
  ),
});

interface Props {
  stations: MonitoringStation[];
  measurements: Record<string, Measurement[]>;
}

export default function MapPageClient({ stations, measurements }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = stations.find((s) => s.id === selectedId) ?? null;
  const selectedMeasurements = selectedId
    ? (measurements[selectedId] ?? [])
    : [];

  // 3 лаба
  function handleSelect(id: string) {
    setSelectedId(id);
    trackMapMarkerClick(id);
  }

  return (
    <div style={{ padding: "2rem 0" }}>
      <div className="container">
        <h2 className="section-title mb-1">інтерактивна мапа</h2>
        <p className="section-sub">
          оберіть станцію на карті для перегляду графіків
        </p>

        <div
          style={{
            height: 480,
            overflow: "hidden",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <ErrorBoundary context="station-map">
            <StationMap
              stations={stations}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          </ErrorBoundary>
        </div>

        {selected && (
          <div className="mt-4">
            <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  color: "var(--color-primary)",
                }}
              >
                {selected.city}
              </span>
              <strong>{selected.name}</strong>
              <AqiBadge category={selected.currentData.category} />
              <span style={{ fontWeight: 800, color: "var(--color-primary)" }}>
                AQI {selected.currentData.aqi}
              </span>
              <button
                onClick={() => setSelectedId(null)}
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "99px",
                  padding: "0.18rem 0.65rem",
                  fontSize: "0.7rem",
                  cursor: "pointer",
                  background: "transparent",
                  color: "var(--color-muted)",
                  fontFamily: "inherit",
                  fontWeight: 600,
                }}
              >
                × скасувати
              </button>
            </div>

            <ErrorBoundary context="station-charts">
              <StationCharts
                station={selected}
                measurements={selectedMeasurements}
              />
            </ErrorBoundary>
          </div>
        )}
      </div>
    </div>
  );
}
