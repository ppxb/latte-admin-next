declare global{
  declare namespace NTheme{
    type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'error'
    type ColorTypeCase = 'Primary' | 'Info' | 'Success' | 'Warning' | 'Error'
    type ColorScene = '' | 'suppl' | 'hover' | 'pressed'
    type ColorSceneCase = '' | 'Suppl' | 'Hover' | 'Pressed'
    type ButtonColorScene = '' | 'hover' | 'pressed' | 'focus' | 'disabled'
    type ButtonColorSceneCase = '' | 'Hover' | 'Pressed' | 'Focus' | 'Disabled'
    type Config = {
      [key in NTheme.ColorType]: string
    }
  }

  interface Window {
    $loadingBar?: import('naive-ui').LoadingBarProviderInst
    $dialog?: import('naive-ui').DialogProviderInst
    $message?: import('naive-ui').MessageProviderInst
    $notification?: import('naive-ui').NotificationProviderInst
  }

  interface Option<K = string> { value: K, label: string }

  type Recordable<T = any> = Record<string, T>

  type RecordNullable<T = any> = {
    [K in keyof T]?: T[K] | null
  }
}

export {}
