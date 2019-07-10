import { parse, UrlObject } from 'url'

export type LocationFromUrlObject = {
  pathname?: string,
  search?: string,
  hash?: string
}

// TO CONSIDER: browser env? https://developer.mozilla.org/en-US/docs/Web/API/URL because 'url' is a node module

export default function locationFromUrl(_url: UrlObject | string): UrlObject {
  if (typeof _url === 'object') {
    const { hash, search, pathname } = _url
    return { pathname, search, hash }
  } else {
    const { hash, search, pathname } = parse(_url)
    return { pathname, search, hash }
  }
}
