export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center'

export type Toast = {
  id: string
  title?: string
  message: string
  type: ToastType
  icon?: string
  duration?: number
  persistent?: boolean
  createdAt: number
}

export type ToastOptions = {
  title?: string
  type?: ToastType
  icon?: string
  duration?: number
  persistent?: boolean
}

export type ToastConfig = {
  position?: ToastPosition
  defaultDuration?: number
  maxToasts?: number
}
