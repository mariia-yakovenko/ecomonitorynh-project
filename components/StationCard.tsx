import Link from "next/link";
import type { MonitoringStation } from "@/types";
import { AqiBadge, aqiColorClass } from "./AqiBadge";

export default function StationCard({
  station,
}: {
  station: MonitoringStation;
}) {
  const { id, name, city, type, isActive, currentData } = station;

  const pollutants = [
    { lbl: "PM2.5", val: currentData.pm25, unit: "мкг/м³" },
    { lbl: "PM10", val: currentData.pm10, unit: "мкг/м³" },
    { lbl: "NO₂", val: currentData.no2, unit: "мкг/м³" },
    { lbl: "O₃", val: currentData.o3, unit: "мкг/м³" },
  ];

  return (
    <Link href={`/station/${id}`} style={{ display: "block", height: "100%" }}>
      <div className="station-card" style={{ opacity: isActive ? 1 : 0.55 }}>
        <div className="card-top">
          <div className="d-flex align-items-center gap-2 mb-1">
            <span
              className={`status-dot ${isActive ? "active" : "inactive"}`}
            />
            <span className="station-city-label">{city}</span>
          </div>
          <div className="station-name">{name}</div>

          <div className="d-flex align-items-baseline gap-2 mb-2">
            <span
              className={`station-aqi-value ${aqiColorClass(currentData.category)}`}
            >
              {currentData.aqi}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--color-muted)",
                fontWeight: 500,
              }}
            >
              AQI
            </span>
          </div>

          <AqiBadge category={currentData.category} />
          <span className="type-badge">{type}</span>
        </div>

        <div className="card-bottom">
          {pollutants.map((p) => (
            <div key={p.lbl} className="poll-item">
              <span className="p-lbl">{p.lbl}</span>
              <span className="p-val">
                {p.val} <span className="p-unit">{p.unit}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
