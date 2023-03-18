import { kirbyGlobal } from '#build/kql'

/**
 * Returns the currently active page
 */
export function usePage<T extends Record<string, any> = Record<string, any>>() {
  return useState<T>('kql.page', () => ({} as T))
}

export function useKirbyGlobalData() {
  return kirbyGlobal
}
