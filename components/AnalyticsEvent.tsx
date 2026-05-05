'use client';
import { useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

interface Props {
  event: string;
  params: Record<string, unknown>;
}

export function AnalyticsEvent({ event, params }: Props) {
  useEffect(() => {
    sendGAEvent('event', event, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
