export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

function isEnabled(level: LogLevel): boolean {
  const configured = (process.env.LOG_LEVEL ?? 'info') as LogLevel;
  return LEVEL_PRIORITY[level] <= (LEVEL_PRIORITY[configured] ?? 2);
}

function serialize(level: LogLevel, message: string, context?: Record<string, unknown>): string {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    service: 'ecomonitor',
    env: process.env.NODE_ENV ?? 'development',
    ...context,
  });
}

export const logger = {
  error(message: string, context?: Record<string, unknown>): void {
    if (isEnabled('error')) console.error(serialize('error', message, context));
  },
  warn(message: string, context?: Record<string, unknown>): void {
    if (isEnabled('warn')) console.warn(serialize('warn', message, context));
  },
  info(message: string, context?: Record<string, unknown>): void {
    if (isEnabled('info')) console.log(serialize('info', message, context));
  },
  debug(message: string, context?: Record<string, unknown>): void {
    if (isEnabled('debug')) console.log(serialize('debug', message, context));
  },
};
