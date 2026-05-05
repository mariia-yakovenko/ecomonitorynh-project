import type { AirQualityCategory } from "@/types";

const categoryMap: Record<AirQualityCategory, { cls: string; label: string }> =
  {
    добре: { cls: "badge-good", label: "повітря хароше" },
    задовільно: { cls: "badge-moderate", label: "ну так нормально" },
    "небезпечно для чутливих груп": {
      cls: "badge-sensitive",
      label: "з чутливої групи? ну таке собі",
    },
    небезпечно: { cls: "badge-unhealthy", label: "пахне смаженим" },
    "дуже небезпечно": {
      cls: "badge-very-unhealthy",
      label: "капєц все горить",
    },
  };

const aqiColorMap: Record<AirQualityCategory, string> = {
  добре: "aqi-good",
  задовільно: "aqi-moderate",
  "небезпечно для чутливих груп": "aqi-sensitive",
  небезпечно: "aqi-unhealthy",
  "дуже небезпечно": "aqi-very-unhealthy",
};

export function AqiBadge({ category }: { category: AirQualityCategory }) {
  const { cls, label } = categoryMap[category];
  return <span className={`aqi-badge ${cls}`}>{label}</span>;
}

export function aqiColorClass(category: AirQualityCategory): string {
  return aqiColorMap[category];
}
