export type StationType = "міська" | "приміська" | "промислова" | "сільська";

export type AirQualityCategory =
  | "добре"
  | "задовільно"
  | "небезпечно для чутливих груп"
  | "небезпечно"
  | "дуже небезпечно";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface AirQualityData {
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
  aqi: number;
  category: AirQualityCategory;
}

export interface MonitoringStation {
  id: string;
  name: string;
  city: string;
  address: string;
  coordinates: Coordinates;
  type: StationType;
  isActive: boolean;
  installedAt: string;
  currentData: AirQualityData;
}

export interface Measurement {
  stationId: string;
  timestamp: string;
  data: AirQualityData;
}

export interface TimeSeries {
  stationId: string;
  from: string;
  to: string;
  measurements: Measurement[];
}

// api types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: ResponseMeta;
}

export interface ResponseMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  success: false;
  error: string;
  code: number;
}

export interface StationsQueryParams {
  city?: string;
  type?: StationType;
  page?: number;
  limit?: number;
  sort?: "aqi" | "name" | "city";
  order?: "asc" | "desc";
}

export interface MeasurementsQueryParams {
  stationId: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}
