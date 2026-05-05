import { getStationById } from '@/lib/data';
import { logger } from '@/lib/logger';
import type { ApiResponse } from '@/types';
import type { MonitoringStation } from '@/types';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const start = Date.now();
  const { id } = await params;

  try {
    if (!id || typeof id !== 'string') {
      logger.warn('station_by_id: invalid id param', { id });
      return Response.json(
        { success: false, error: 'Невірний ідентифікатор', code: 400 },
        { status: 400 },
      );
    }

    const station = getStationById(id);
    if (!station) {
      logger.warn('station_by_id: not found', { id, duration_ms: Date.now() - start });
      return Response.json(
        { success: false, error: `Станцію з id "${id}" не знайдено`, code: 404 },
        { status: 404 },
      );
    }

    logger.info('station_by_id', { id, city: station.city, duration_ms: Date.now() - start });

    const body: ApiResponse<MonitoringStation> = { success: true, data: station };
    return Response.json(body);
  } catch (err) {
    logger.error('station_by_id: unexpected error', {
      id,
      error: err instanceof Error ? err.message : String(err),
      duration_ms: Date.now() - start,
    });
    return Response.json(
      { success: false, error: 'Внутрішня помилка сервера', code: 500 },
      { status: 500 },
    );
  }
}
