interface VitalMetric {
  name: string
  value: number
  unit: 'ms' | 'score'
}

type VitalReporter = (metric: VitalMetric) => void

export function observeWebVitals(report: VitalReporter): () => void {
  const unsubscribeLcp = onLCP(({ value }) => report({ name: 'LCP', value, unit: 'ms' }))
  const unsubscribeCls = onCLS(({ value }) => report({ name: 'CLS', value, unit: 'score' }))
  const unsubscribeInp = onINP(({ value }) => report({ name: 'INP', value, unit: 'ms' }))

  return () => {
    unsubscribeLcp()
    unsubscribeCls()
    unsubscribeInp()
  }
}
import { onCLS, onINP, onLCP } from 'web-vitals'
