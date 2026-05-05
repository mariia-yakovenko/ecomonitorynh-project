"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
} from "recharts";
import type { MonitoringStation, Measurement } from "@/types";
import {
  trackChartView,
  trackChartFilterToggle,
  trackDataExport,
} from "@/lib/analytics";

interface Props {
  station: MonitoringStation;
  measurements: Measurement[];
}

export default function StationCharts({ station, measurements }: Props) {
  const [hiddenLines, setHiddenLines] = useState<Record<string, boolean>>({});

  useEffect(() => {
    trackChartView(station.id);
  }, [station.id]);

  const lineData = measurements.slice(-24).map((m) => ({
    time: new Date(m.timestamp).toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    AQI: m.data.aqi,
    "PM2.5": m.data.pm25,
    PM10: m.data.pm10,
    NO2: m.data.no2,
    SO2: m.data.so2,
    CO: m.data.co,
    O3: m.data.o3,
  }));

  const barData = [
    { name: "PM2.5", value: station.currentData.pm25, fill: "#636b2f" },
    { name: "PM10", value: station.currentData.pm10, fill: "#a07a00" },
    { name: "NO2", value: station.currentData.no2, fill: "#b55e00" },
    { name: "SO2", value: station.currentData.so2, fill: "#b83030" },
    { name: "O3", value: station.currentData.o3, fill: "#6b1f6b" },
  ];

  const handleLegendClick = (data: {
    dataKey?: string | number | ((obj: unknown) => unknown);
  }) => {
    if (typeof data.dataKey !== "string") return;
    const key = data.dataKey;
    const nextHidden = !hiddenLines[key];
    setHiddenLines((prev) => ({ ...prev, [key]: nextHidden }));
    trackChartFilterToggle(station.id, key, nextHidden);
  };

  function exportCsv() {
    const headers = ["Час", "AQI", "PM2.5", "PM10", "NO2", "SO2", "CO", "O3"];
    const rows = measurements.map((m) => [
      new Date(m.timestamp).toLocaleString("uk-UA"),
      m.data.aqi,
      m.data.pm25,
      m.data.pm10,
      m.data.no2,
      m.data.so2,
      m.data.co,
      m.data.o3,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${station.id}-measurements.csv`;
    a.click();
    URL.revokeObjectURL(url);
    trackDataExport(station.id);
  }

  const chartLabel = (text: string) => (
    <p
      style={{
        fontSize: "0.7rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color: "var(--color-muted)",
        marginBottom: "0.5rem",
      }}
    >
      {text}
    </p>
  );

  return (
    <>
      <div className="row g-4">
        <div className="col-12 col-md-4">
          {chartLabel("динаміка AQI")}
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={lineData}
              margin={{ top: 8, right: 16, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
              />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 9 }}
                interval="preserveStartEnd"
                angle={-35}
                textAnchor="end"
              />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip />
              <Legend
                onClick={handleLegendClick}
                wrapperStyle={{ fontSize: "0.72rem" }}
              />
              <Line
                type="monotone"
                dataKey="AQI"
                stroke="#636b2f"
                dot={false}
                strokeWidth={2}
                hide={hiddenLines["AQI"]}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="PM2.5"
                stroke="#b83030"
                dot={false}
                strokeWidth={1.5}
                hide={hiddenLines["PM2.5"]}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="PM10"
                stroke="#a07a00"
                dot={false}
                strokeWidth={1.5}
                hide={hiddenLines["PM10"]}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="NO2"
                stroke="#b55e00"
                dot={false}
                strokeWidth={1.5}
                hide={hiddenLines["NO2"]}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="SO2"
                stroke="#b83030"
                dot={false}
                strokeWidth={1.5}
                hide={hiddenLines["SO2"]}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="CO"
                stroke="#636b2f"
                dot={false}
                strokeWidth={1.5}
                hide={hiddenLines["CO"]}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="O3"
                stroke="#6b1f6b"
                dot={false}
                strokeWidth={1.5}
                hide={hiddenLines["O3"]}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="col-12 col-md-4">
          {chartLabel("забруднювачі")}
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={barData}
              margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
              />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip formatter={(value) => [`${value} мкг/м³`]} />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="col-12 col-md-4">
          {chartLabel("структура")}
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={barData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={85}
                label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                labelLine={false}
                isAnimationActive={false}
              />
              <Tooltip formatter={(value) => [`${value} мкг/м³`]} />
              <Legend wrapperStyle={{ fontSize: "0.72rem" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-3 d-flex justify-content-end">
        <button
          onClick={exportCsv}
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)",
            padding: "0.35rem 0.9rem",
            fontSize: "0.78rem",
            cursor: "pointer",
            background: "transparent",
            color: "var(--color-muted)",
            fontFamily: "inherit",
            fontWeight: 600,
          }}
        >
          ↓ Завантажити CSV
        </button>
      </div>
    </>
  );
}
