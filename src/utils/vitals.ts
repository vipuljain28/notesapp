interface VitalMetric {
  name: string
  value: number
  unit: 'ms' | 'score'
}

type VitalReporter = (metric: VitalMetric) => void

export function observeWebVitals(report: VitalReporter): void {
  onLCP(({ value }) => report({ name: 'LCP', value, unit: 'ms' }))
  onCLS(({ value }) => report({ name: 'CLS', value, unit: 'score' }))
  onINP(({ value }) => report({ name: 'INP', value, unit: 'ms' }))
}
import { onCLS, onINP, onLCP } from 'web-vitals'
