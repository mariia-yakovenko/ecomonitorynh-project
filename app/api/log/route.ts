import { NextRequest } from 'next/server';
import { logger, type LogLevel } from '@/lib/logger';

const VALID_LEVELS = new Set<LogLevel>(['error', 'warn', 'info', 'debug']);

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const { level, message, ...context } = body;

  const safeLevel: LogLevel =
    typeof level === 'string' && VALID_LEVELS.has(level as LogLevel)
      ? (level as LogLevel)
      : 'error';

  const safeMessage =
    typeof message === 'string' && message.trim().length > 0 ? message.trim() : 'client_error';

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  logger[safeLevel](safeMessage, { source: 'client', ip, ...context });

  return Response.json({ success: true });
}
