import localforage from 'localforage'

type StorageType = 'local' | 'session'

export function createStorage<T extends object>(type: StorageType, prefix: string) {
  const stg = type === 'session' ? window.sessionStorage : window.localStorage

  const storage = {
    set<K extends keyof T>(key: K, value: T[K]){
      stg.setItem(`${prefix}${String(key)}`, JSON.stringify(value))
    },

    get<K extends keyof T>(key: K): T[K] | null{
      try {
        const json = stg.getItem(`${prefix}${String(key)}`)
        return json ? JSON.parse(json) as T[K] : null
      }
      catch {
        this.remove(key)
        return null
      }
    },

    remove(key: keyof T){
      stg.removeItem(`${prefix}${String(key)}`)
    },

    clear(){
      stg.clear()
    },
  }
  return storage
}

type LocalForage<T extends object> = Omit<typeof localforage, 'getItem' | 'setItem' | 'removeItem'> & {
  getItem: <K extends keyof T>(key: K, callback?: (err: any, value: T[K] | null) => void) => Promise<T[K] | null>

  setItem: <K extends keyof T>(key: K, value: T[K], callback?: (err: any, value: T[K]) => void) => Promise<T[K]>

  removeItem: (key: keyof T, callback?: (err: any) => void) => Promise<void>
}

type LocalforageDriver = 'local' | 'indexedDB' | 'webSQL'

export function createLocalforage<T extends object>(driver: LocalforageDriver) {
  const driverMap: Record<LocalforageDriver, string> = {
    local: localforage.LOCALSTORAGE,
    indexedDB: localforage.INDEXEDDB,
    webSQL: localforage.WEBSQL,
  }

  localforage.config({
    driver: driverMap[driver],
  })

  return localforage as LocalForage<T>
}

const storagePrefix = 'LA_'

export const localStg = createStorage<Storage.Local>('local', storagePrefix)

export const sessionStg = createStorage<Storage.Session>('session', storagePrefix)

export const localforageInst = createLocalforage<Storage.Local>('local')
