'use client';
import { useReportWebVitals } from 'next/web-vitals';
import { sendGAEvent } from '@next/third-parties/google';

export function WebVitals() {
  useReportWebVitals((metric) => {
    sendGAEvent('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_delta: Math.round(metric.name === 'CLS' ? metric.delta * 1000 : metric.delta),
      metric_rating: metric.rating,
    });
  });
  return null;
}
