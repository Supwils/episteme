import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

type Metric = { name: string; value: number; rating: string; id: string };

function reportMetric(metric: Metric) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`);
  }

  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    // navigator.sendBeacon('/api/vitals', JSON.stringify(metric));
  }
}

export function initVitals() {
  onCLS(reportMetric);
  onINP(reportMetric);
  onLCP(reportMetric);
  onFCP(reportMetric);
  onTTFB(reportMetric);
}
