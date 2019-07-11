export type LocationFromUrlObject = {
  pathname?: string,
  search?: string,
  hash?: string
}

export default function locationFromUrl(url: URL | string): URL {
  if (url instanceof URL) return url
  else {
    try {
      return new URL(url)
    } catch {
      return typeof window !== 'undefined'
        ? new URL(window.location.href)
        : new URL("https://example.com")
    }
  }
}
