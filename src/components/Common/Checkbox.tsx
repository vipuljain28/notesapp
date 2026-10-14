import type { InputHTMLAttributes } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export function Checkbox({ label, id, ...props }: CheckboxProps): React.JSX.Element {
  const inputId = id ?? `checkbox-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return (
    <label htmlFor={inputId} className="inline-flex items-center gap-2 text-sm text-slate-700">
      <input id={inputId} type="checkbox" className="size-4 accent-indigo-600" {...props} />
      {label}
    </label>
  )
}
