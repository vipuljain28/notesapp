import type { ReactNode } from 'react'

interface FormFieldProps {
  id: string
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}

export function FormField({ id, label, required = false, error, children }: FormFieldProps): React.JSX.Element {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}{required && <span aria-hidden="true" className="ml-1 text-red-700">*</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="text-sm text-red-700">{error}</p>}
    </div>
  )
}
