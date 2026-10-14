import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  children?: ReactNode
}

export function EmptyState({ title, children }: EmptyStateProps): React.JSX.Element {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
      <h3 className="font-semibold text-slate-900">{title}</h3>
      {children && <div className="mt-2 text-sm text-slate-600">{children}</div>}
    </div>
  )
}
