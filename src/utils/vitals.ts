interface VitalMetric {
  name: string
  value: number
  unit: 'ms' | 'score'
}

type VitalReporter = (metric: VitalMetric) => void

export function observeWebVitals(report: VitalReporter): () => void {
  const observers: PerformanceObserver[] = []
  const observe = (
    type: string,
    callback: (entries: PerformanceEntryList) => void,
  ): void => {
    if (!PerformanceObserver.supportedEntryTypes.includes(type)) return
    const observer = new PerformanceObserver((list) => callback(list.getEntries()))
    observer.observe({ type, buffered: true })
    observers.push(observer)
  }

  observe('largest-contentful-paint', (entries) => {
    const entry = entries.at(-1)
    if (entry) report({ name: 'LCP', value: entry.startTime, unit: 'ms' })
  })
  observe('layout-shift', (entries) => {
    const value = entries
      .filter((entry) => !('hadRecentInput' in entry && entry.hadRecentInput))
      .reduce(
        (total, entry) =>
          total + (entry as PerformanceEntry & { value: number }).value,
        0,
      )
    report({ name: 'CLS', value, unit: 'score' })
  })
  observe('event', (entries) => {
    const value = Math.max(
      ...entries.map((entry) => (entry as PerformanceEntry & { duration: number }).duration),
    )
    if (Number.isFinite(value)) report({ name: 'INP', value, unit: 'ms' })
  })

  return () => observers.forEach((observer) => observer.disconnect())
}
