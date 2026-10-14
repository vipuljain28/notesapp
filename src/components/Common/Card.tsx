import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLElement> {
  header?: ReactNode
  footer?: ReactNode
}

export function Card({
  header,
  footer,
  children,
  className = '',
  ...props
}: CardProps): React.JSX.Element {
  return (
    <section className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`} {...props}>
      {header && <header className="border-b border-slate-100 px-5 py-4">{header}</header>}
      <div className="p-5">{children}</div>
      {footer && <footer className="border-t border-slate-100 px-5 py-4">{footer}</footer>}
    </section>
  )
}
