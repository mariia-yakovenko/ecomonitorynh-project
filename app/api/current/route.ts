import { NextRequest } from 'next/server';
import { stations, getStationById } from '@/lib/data';
import { logger } from '@/lib/logger';
import type { ApiResponse, AirQualityData } from '@/types';

export async function GET(request: NextRequest) {
  const start = Date.now();
  const { searchParams } = request.nextUrl;
  const stationId = searchParams.get('stationId');

  try {
    if (stationId) {
      const station = getStationById(stationId);
      if (!station) {
        logger.warn('current: station not found', { stationId, duration_ms: Date.now() - start });
        return Response.json(
          { success: false, error: `Станцію "${stationId}" не знайдено`, code: 404 },
          { status: 404 },
        );
      }
      logger.info('current: single station', { stationId, duration_ms: Date.now() - start });
      const body: ApiResponse<AirQualityData> = { success: true, data: station.currentData };
      return Response.json(body);
    }

    const all = stations.map((s) => ({
      stationId: s.id,
      city: s.city,
      name: s.name,
      ...s.currentData,
    }));

    logger.info('current: all stations', { count: all.length, duration_ms: Date.now() - start });
    const body: ApiResponse<typeof all> = { success: true, data: all };
    return Response.json(body);
  } catch (err) {
    logger.error('current: unexpected error', {
      stationId,
      error: err instanceof Error ? err.message : String(err),
      duration_ms: Date.now() - start,
    });
    return Response.json(
      { success: false, error: 'Внутрішня помилка сервера', code: 500 },
      { status: 500 },
    );
  }
}
