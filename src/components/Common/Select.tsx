import type { SelectHTMLAttributes } from 'react'

export interface SelectOption {
  label: string
  value: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  error?: string
}

export function Select({
  label,
  options,
  error,
  id,
  ...props
}: SelectProps): React.JSX.Element {
  const selectId = id ?? `select-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <div className="grid gap-1.5">
      <label htmlFor={selectId} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        id={selectId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${selectId}-error` : undefined}
        className={`w-full rounded-lg border bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 ${error ? 'border-red-500' : 'border-slate-300'}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p id={`${selectId}-error`} role="alert" className="text-sm text-red-700">{error}</p>}
    </div>
  )
}
