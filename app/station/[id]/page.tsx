import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { stations, getStationById, measurementsDb } from "@/lib/data";
import { AqiBadge, aqiColorClass } from "@/components/AqiBadge";
import { AnalyticsEvent } from "@/components/AnalyticsEvent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const station = getStationById(id);
  if (!station) return { title: "станцію не знайдено" };
  return { title: `${station.name} — ${station.city}` };
}

export async function generateStaticParams() {
  return stations.map((s) => ({ id: s.id }));
}

export default async function StationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const station = getStationById(id);
  if (!station) notFound();

  const {
    name,
    city,
    address,
    isActive,
    installedAt,
    coordinates,
    currentData,
  } = station;
  const recentMeasurements = (measurementsDb[id] ?? []).slice(-12).reverse();

  const metrics = [
    { label: "PM2.5", value: currentData.pm25, unit: "мкг/м³" },
    { label: "PM10", value: currentData.pm10, unit: "мкг/м³" },
    { label: "NO₂", value: currentData.no2, unit: "мкг/м³" },
    { label: "SO₂", value: currentData.so2, unit: "мкг/м³" },
    { label: "CO", value: currentData.co, unit: "мг/м³" },
    { label: "O₃", value: currentData.o3, unit: "мкг/м³" },
  ];

  const infoRows = [
    { label: "місто", value: city },
    { label: "адреса", value: address },
    {
      label: "координати",
      value: `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`,
    },
    {
      label: "встановлена",
      value: new Date(installedAt).toLocaleDateString("uk-UA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  ];

  return (
    <>
      <AnalyticsEvent
        event="station_view"
        params={{ station_id: id, station_name: name, city }}
      />
      <section className="page-hero">
        <div className="container">
          <div
            className="d-flex align-items-center gap-2 mb-2"
            style={{ fontSize: "0.8rem" }}
          >
            <Link href="/" style={{ color: "var(--color-primary)" }}>
              головна
            </Link>
            <span style={{ color: "var(--color-muted)" }}>/</span>
            <span style={{ color: "var(--color-muted)" }}>
              {city.toLowerCase()} — {name.toLowerCase()}
            </span>
          </div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <span
              className={`status-dot ${isActive ? "active" : "inactive"}`}
            />
            <span style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>
              {isActive ? "активна" : "неактивна"}
            </span>
          </div>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-muted)",
              marginBottom: "0.25rem",
            }}
          >
            {city}
          </p>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
            }}
          >
            {name}
          </h1>
          <p
            style={{
              color: "var(--color-muted)",
              marginTop: "0.4rem",
              fontSize: "0.9rem",
            }}
          >
            {address}
          </p>
          <div className="mt-3">
            <AqiBadge category={currentData.category} />
          </div>
        </div>
      </section>

      <div style={{ padding: "2.5rem 0" }}>
        <div className="container">
          <div className="row g-4">
            {/* AQI summary */}
            <div className="col-12 col-md-4">
              <div className="metric-box" style={{ padding: "2rem" }}>
                <div className="m-label mb-2">індекс якості повітря</div>
                <div
                  className={`m-value ${aqiColorClass(currentData.category)}`}
                  style={{ fontSize: "4rem" }}
                >
                  {currentData.aqi}
                </div>
                <div className="m-label">AQI</div>
                <div className="mt-3">
                  <AqiBadge category={currentData.category} />
                </div>
              </div>
            </div>

            {/* Station info */}
            <div className="col-12 col-md-8">
              <div className="info-box">
                <h3
                  style={{
                    fontSize: "0.7rem",
                    marginBottom: "1.25rem",
                    color: "var(--color-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    fontWeight: 600,
                  }}
                >
                  інформація про станцію
                </h3>
                <div className="row g-3">
                  {infoRows.map(({ label, value }) => (
                    <div key={label} className="col-12 col-sm-6">
                      <span className="info-box-label">{label}</span>
                      <span className="info-box-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pollutant metrics */}
            <div className="col-12">
              <h2 className="section-title mb-1">поточні показники</h2>
              <p className="section-sub">
                концентрації забруднювачів на момент останнього вимірювання
              </p>
              <div className="row g-3">
                {metrics.map((m) => (
                  <div key={m.label} className="col-6 col-md-4 col-lg-2">
                    <div className="metric-box">
                      <div className="m-label">{m.label}</div>
                      <div className="m-value">{m.value}</div>
                      <div className="m-unit">{m.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent measurements */}
            <div className="col-12">
              <h2 className="section-title mb-3">останні вимірювання</h2>
              <div style={{ overflowX: "auto" }}>
                <table className="table meas-table">
                  <thead>
                    <tr>
                      <th>час</th>
                      <th>AQI</th>
                      <th>PM2.5</th>
                      <th>PM10</th>
                      <th>NO₂</th>
                      <th>SO₂</th>
                      <th>CO</th>
                      <th>O₃</th>
                      <th>стан</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentMeasurements.map((m) => (
                      <tr key={m.timestamp}>
                        <td>
                          {new Date(m.timestamp).toLocaleString("uk-UA", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td>
                          <strong className={aqiColorClass(m.data.category)}>
                            {m.data.aqi}
                          </strong>
                        </td>
                        <td>{m.data.pm25}</td>
                        <td>{m.data.pm10}</td>
                        <td>{m.data.no2}</td>
                        <td>{m.data.so2}</td>
                        <td>{m.data.co}</td>
                        <td>{m.data.o3}</td>
                        <td>
                          <AqiBadge category={m.data.category} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
