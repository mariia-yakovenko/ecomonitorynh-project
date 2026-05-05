import type {
  MonitoringStation,
  Measurement,
  AirQualityCategory,
} from "@/types";

function getCategory(aqi: number): AirQualityCategory {
  if (aqi <= 50) return "добре";
  if (aqi <= 100) return "задовільно";
  if (aqi <= 150) return "небезпечно для чутливих груп";
  if (aqi <= 200) return "небезпечно";
  return "дуже небезпечно";
}

export const stations: MonitoringStation[] = [
  {
    id: "kyiv-obolon",
    name: "Оболонь",
    city: "Київ",
    address: "просп. Оболонський, 1",
    coordinates: { lat: 50.5077, lng: 30.4977 },
    type: "міська",
    isActive: true,
    installedAt: "2019-03-15",
    currentData: {
      pm25: 12,
      pm10: 22,
      no2: 28,
      so2: 6,
      co: 0.4,
      o3: 45,
      aqi: 48,
      category: "добре",
    },
  },
  {
    id: "kyiv-center",
    name: "Центр",
    city: "Київ",
    address: "вул. Хрещатик, 22",
    coordinates: { lat: 50.4501, lng: 30.5234 },
    type: "міська",
    isActive: true,
    installedAt: "2018-11-01",
    currentData: {
      pm25: 28,
      pm10: 47,
      no2: 62,
      so2: 14,
      co: 1.1,
      o3: 38,
      aqi: 85,
      category: "задовільно",
    },
  },
  {
    id: "kharkiv-central",
    name: "Центральна",
    city: "Харків",
    address: "пл. Свободи, 5",
    coordinates: { lat: 49.9935, lng: 36.2304 },
    type: "міська",
    isActive: true,
    installedAt: "2020-06-20",
    currentData: {
      pm25: 35,
      pm10: 58,
      no2: 74,
      so2: 22,
      co: 1.8,
      o3: 32,
      aqi: 112,
      category: "небезпечно для чутливих груп",
    },
  },
  {
    id: "lviv-lychakiv",
    name: "Личаківська",
    city: "Львів",
    address: "вул. Личаківська, 45",
    coordinates: { lat: 49.8397, lng: 24.0297 },
    type: "приміська",
    isActive: true,
    installedAt: "2021-02-10",
    currentData: {
      pm25: 9,
      pm10: 16,
      no2: 18,
      so2: 4,
      co: 0.3,
      o3: 52,
      aqi: 35,
      category: "добре",
    },
  },
  {
    id: "odesa-prymors",
    name: "Приморська",
    city: "Одеса",
    address: "вул. Приморська, 10",
    coordinates: { lat: 46.4825, lng: 30.7233 },
    type: "міська",
    isActive: true,
    installedAt: "2019-08-05",
    currentData: {
      pm25: 18,
      pm10: 31,
      no2: 38,
      so2: 9,
      co: 0.7,
      o3: 48,
      aqi: 64,
      category: "задовільно",
    },
  },
  {
    id: "dnipro-industrial",
    name: "Промислова",
    city: "Дніпро",
    address: "вул. Робоча, 112",
    coordinates: { lat: 48.4647, lng: 35.0462 },
    type: "промислова",
    isActive: true,
    installedAt: "2017-04-18",
    currentData: {
      pm25: 55,
      pm10: 94,
      no2: 98,
      so2: 48,
      co: 3.2,
      o3: 22,
      aqi: 168,
      category: "дуже небезпечно",
    },
  },
  {
    id: "zaporizhzhia-ind",
    name: "Індустріальна",
    city: "Запоріжжя",
    address: "просп. Металургів, 15",
    coordinates: { lat: 47.8388, lng: 35.1396 },
    type: "промислова",
    isActive: false,
    installedAt: "2016-09-22",
    currentData: {
      pm25: 48,
      pm10: 82,
      no2: 86,
      so2: 38,
      co: 2.7,
      o3: 25,
      aqi: 147,
      category: "небезпечно для чутливих груп",
    },
  },
];

function generateMeasurements(
  stationId: string,
  baseAqi: number,
  hours = 48,
): Measurement[] {
  const measurements: Measurement[] = [];
  const now = new Date();

  for (let i = hours; i >= 0; i--) {
    const ts = new Date(now.getTime() - i * 3600 * 1000);
    const noise = () => (Math.random() - 0.5) * 0.2;
    const factor = 1 + noise();
    const station = stations.find((s) => s.id === stationId)!;
    const base = station.currentData;
    const aqi = Math.max(10, Math.round(baseAqi * factor));

    measurements.push({
      stationId,
      timestamp: ts.toISOString(),
      data: {
        pm25: Math.max(1, +(base.pm25 * factor).toFixed(1)),
        pm10: Math.max(1, +(base.pm10 * factor).toFixed(1)),
        no2: Math.max(1, +(base.no2 * factor).toFixed(1)),
        so2: Math.max(0, +(base.so2 * factor).toFixed(1)),
        co: Math.max(0, +(base.co * factor).toFixed(2)),
        o3: Math.max(1, +(base.o3 * factor).toFixed(1)),
        aqi,
        category: getCategory(aqi),
      },
    });
  }

  return measurements;
}

export const measurementsDb: Record<string, Measurement[]> = Object.fromEntries(
  stations.map((s) => [s.id, generateMeasurements(s.id, s.currentData.aqi)]),
);

export function getStationById(id: string): MonitoringStation | undefined {
  return stations.find((s) => s.id === id);
}

export function getAverageAqi(): number {
  const active = stations.filter((s) => s.isActive);
  return Math.round(
    active.reduce((sum, s) => sum + s.currentData.aqi, 0) / active.length,
  );
}

export function getOverallCategory(): AirQualityCategory {
  return getCategory(getAverageAqi());
}
