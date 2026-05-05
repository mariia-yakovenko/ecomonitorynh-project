import type { Metadata } from "next";
import { stations, getAverageAqi, getOverallCategory } from "@/lib/data";
import StationCard from "@/components/StationCard";
import { AqiBadge } from "@/components/AqiBadge";

export const metadata: Metadata = { title: "головна" };

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const activeCount = stations.filter((s) => s.isActive).length;
  const avgAqi = getAverageAqi();
  const overallCategory = getOverallCategory();
  const cities = [...new Set(stations.map((s) => s.city))].length;

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h1>
                моніторинг
                <br />
                <span style={{ color: "var(--color-primary)" }}>
                  якості повітря
                </span>{" "}
                України
              </h1>
              <div className="disclaimer-banner mt-4" style={{ maxWidth: 520 }}>
                актуальні дані з {activeCount} моніторингових станцій у {cities}{" "}
                містах. слідкуйте за рівнем забруднення в реальному часі.
              </div>
              <div className="d-flex align-items-center gap-3 mt-3">
                <AqiBadge category={overallCategory} />
                <span
                  style={{ color: "var(--color-muted)", fontSize: "0.85rem" }}
                >
                  загальний стан повітря зараз
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="stats-strip">
        <div className="container">
          <div className="row g-0 justify-content-center">
            {[
              { value: activeCount, label: "активних станцій" },
              { value: cities, label: "міст під наглядом" },
              { value: avgAqi, label: "середній AQI" },
              {
                value: stations.filter((s) => s.currentData.aqi <= 50).length,
                label: "станцій — добре повітря",
              },
            ].map((s) => (
              <div key={s.label} className="col-6 col-md-3">
                <div className="stat-item">
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* stations grid */}
      <section style={{ padding: "3rem 0" }}>
        <div className="container">
          <h2 className="section-title">моніторингові станції</h2>
          <p className="section-sub">
            оберіть станцію для детальних показників
          </p>
          <div className="row g-4">
            {stations.map((station) => (
              <div key={station.id} className="col-12 col-sm-6 col-lg-4">
                <StationCard station={station} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AQI legend */}
      <section
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          padding: "2.5rem 0",
        }}
      >
        <div className="container">
          <h2 className="section-title mb-3">шкала AQI</h2>
          <div className="d-flex flex-wrap gap-4">
            {[
              { range: "0–50", label: "повітря хароше", cls: "badge-good" },
              {
                range: "51–100",
                label: "ну так нормально",
                cls: "badge-moderate",
              },
              {
                range: "101–150",
                label: "з чутливої групи? ну таке собі",
                cls: "badge-sensitive",
              },
              {
                range: "151–200",
                label: "пахне смаженим",
                cls: "badge-unhealthy",
              },
              {
                range: "201+",
                label: "капєц все горить",
                cls: "badge-very-unhealthy",
              },
            ].map((item) => (
              <div
                key={item.range}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                <span
                  className={`aqi-badge ${item.cls}`}
                  style={{ whiteSpace: "nowrap" }}
                >
                  {item.label}
                </span>
                <span
                  style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}
                >
                  AQI {item.range}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
