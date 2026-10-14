import type { HTMLAttributes, ReactNode } from 'react'

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: ReactNode
}

const badgeStyles: Record<BadgeVariant, string> = {
  primary: 'bg-indigo-100 text-indigo-800',
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-900',
  error: 'bg-red-100 text-red-800',
}

export function Badge({ variant = 'primary', children, className = '', ...props }: BadgeProps): React.JSX.Element {
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeStyles[variant]} ${className}`} {...props}>{children}</span>
}
