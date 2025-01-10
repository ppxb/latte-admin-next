interface ApiRes<T> {
  code: number
  data: T
  msg: string
  success: boolean
  timestamp: string
}

interface PageRes<T> {
  list: T
  total: number
}

interface PageQuery {
  page: number
  size: number
}

type GenderType = 0 | 1 | 2
