import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const start = Date.now();
  const { method, nextUrl, headers } = request;
  const url = nextUrl.pathname + (nextUrl.search || '');
  const userAgent = headers.get('user-agent') ?? 'unknown';
  const ip =
    headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    headers.get('x-real-ip') ??
    'unknown';

  const response = NextResponse.next();

  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'info',
      message: 'http_request',
      service: 'ecomonitor',
      method,
      url,
      status: response.status,
      duration_ms: Date.now() - start,
      user_agent: userAgent,
      ip,
    }),
  );

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};
