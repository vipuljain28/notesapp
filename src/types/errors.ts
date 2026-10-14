export type ApiErrorKind =
  | 'NETWORK'
  | 'TIMEOUT'
  | 'SERVER_ERROR'
  | 'VALIDATION_ERROR'
  | 'UNKNOWN'

export class ApiError extends Error {
  public readonly kind: ApiErrorKind
  public readonly status: number | undefined
  public readonly retryable: boolean

  constructor(
    message: string,
    kind: ApiErrorKind,
    status?: number,
    retryable = false,
    options?: ErrorOptions,
  ) {
    super(message, options)
    this.name = 'ApiError'
    this.kind = kind
    this.status = status
    this.retryable = retryable
  }
}
