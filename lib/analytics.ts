import { sendGAEvent } from '@next/third-parties/google';

export function trackStationView(stationId: string, stationName: string, city: string) {
  sendGAEvent('event', 'station_view', {
    station_id: stationId,
    station_name: stationName,
    city,
  });
}

export function trackMapMarkerClick(stationId: string) {
  sendGAEvent('event', 'map_marker_click', { station_id: stationId });
}

export function trackMapZoom(zoomLevel: number) {
  sendGAEvent('event', 'map_zoom', { zoom_level: zoomLevel });
}

export function trackChartView(stationId: string) {
  sendGAEvent('event', 'chart_view', { station_id: stationId });
}

export function trackChartFilterToggle(stationId: string, dataKey: string, hidden: boolean) {
  sendGAEvent('event', 'chart_filter_toggle', {
    station_id: stationId,
    data_key: dataKey,
    hidden,
  });
}

export function trackDataExport(stationId: string) {
  sendGAEvent('event', 'data_export', {
    station_id: stationId,
    format: 'csv',
  });
}
