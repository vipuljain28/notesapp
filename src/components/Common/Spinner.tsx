interface SpinnerProps {
  size?: 'small' | 'medium' | 'large'
  message?: string
}

const sizes = { small: 'size-4', medium: 'size-6', large: 'size-10' }

export function Spinner({ size = 'medium', message }: SpinnerProps): React.JSX.Element {
  return (
    <div className="inline-flex items-center gap-3" role="status" aria-live="polite">
      <span className={`${sizes[size]} animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600`} />
      {message && <span className="text-sm text-slate-600">{message}</span>}
      {!message && <span className="sr-only">Loading</span>}
    </div>
  )
}
