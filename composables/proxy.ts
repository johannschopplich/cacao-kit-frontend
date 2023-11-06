import { joinURL } from 'ufo'

/**
 * Replace the Kirby origin during development to enable Cloudflare
 * tunnel to display images from the local Kirby instance.
 */
export function useKirbyProxyUrl() {
  const resolve = (url: string) => joinURL('/__kirby', new URL(url).pathname)

  return {
    resolve,
  }
}
