"use client";

import { MapContainer, TileLayer, CircleMarker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import type { MonitoringStation, AirQualityCategory } from "@/types";
import { trackMapZoom } from "@/lib/analytics";

const AQI_COLORS: Record<AirQualityCategory, string> = {
  добре: "#4a6b1a",
  задовільно: "#a07a00",
  "небезпечно для чутливих груп": "#b55e00",
  небезпечно: "#b83030",
  "дуже небезпечно": "#6b1f6b",
};

function ZoomTracker() {
  useMapEvents({
    zoomend(e) {
      trackMapZoom(e.target.getZoom() as number);
    },
  });
  return null;
}

interface Props {
  stations: MonitoringStation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function StationMap({ stations, selectedId, onSelect }: Props) {
  return (
    <MapContainer
      center={[49.0, 31.5]}
      zoom={6}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ZoomTracker />

      {stations.map((s) => {
        const color = AQI_COLORS[s.currentData.category];
        const isSelected = s.id === selectedId;

        return (
          <CircleMarker
            key={s.id}
            center={[s.coordinates.lat, s.coordinates.lng]}
            radius={isSelected ? 14 : 10}
            pathOptions={{
              fillColor: color,
              fillOpacity: s.isActive ? 0.88 : 0.4,
              color: isSelected ? "#0f0e47" : "#ffffff",
              weight: isSelected ? 3 : 1.5,
            }}
            eventHandlers={{ click: () => onSelect(s.id) }}
          >
            <Popup>
              <div
                style={{
                  minWidth: 155,
                  fontFamily: "system-ui, sans-serif",
                  lineHeight: 1.5,
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  {s.name}
                </div>
                <div
                  style={{
                    color: "#7c7f60",
                    fontSize: "0.8rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  {s.city} · {s.type}
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color }}>
                  AQI {s.currentData.aqi}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#7c7f60",
                    marginBottom: "0.4rem",
                  }}
                >
                  {s.currentData.category}
                </div>
                {!s.isActive && (
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "#b83030",
                      marginBottom: "0.3rem",
                    }}
                  >
                    станція неактивна
                  </div>
                )}
                <Link
                  href={`/station/${s.id}`}
                  style={{
                    fontSize: "0.78rem",
                    color: "#636b2f",
                    textDecoration: "underline",
                  }}
                >
                  детальніше
                </Link>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
