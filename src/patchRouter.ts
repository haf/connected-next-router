/* global __NEXT_DATA__ */
import rewriteUrlForNextExport from './utils/rewriteUrlForNextExport'
import { parse, format } from 'url'
import { Router } from 'next/router';
import { AnyAction } from 'redux';

export type PatchRouterProps = {
  shallowTimeTravel: boolean
}

/**
 * The default PatchRouterProps
 */
export const defaultOpts = {
  shallowTimeTravel: false
}

function toRoute(path: string | undefined) {
  if (path == null) throw new Error("'path' parameter is null or undefined")
  return path.replace(/\/$/, '') || '/'
}

function timeTravelChange(url: string, as = url) {
  // @ts-ignore
  if (this.onlyAHashChange(url)) {
  // @ts-ignore
    this.changeState('replaceState', url, as)
  // @ts-ignore
    this.scrollToHash(as)
    return true
  }

  const { pathname, query, hash } = parse(url, true)
  const route = toRoute(pathname)
  // @ts-ignore
  const routeInfo = this.components[route]
  // @ts-ignore
  this.changeState('replaceState', url, as)
  // @ts-ignore
  this.set(route, pathname, query, as, { ...routeInfo, hash: hash ? hash : '' })
  return true
}

export function patchRouter(Router: { router: Router } & any, opts: PatchRouterProps = defaultOpts) {
  if (!Router.router || Router._patchedByConnectedRouter) return

  const { shallowTimeTravel } = opts
  Router._patchedByConnectedRouter = true
  Router.router._unpatchedChange = Router.router.change
  Router.router.change = function(method: string, _url: string, _as: string, options: Record<string, any>, action: AnyAction) {
    let as = typeof _as === 'object' ? format(_as) : _as
    return Router.router._unpatchedChange(method, _url, _as, options)
      // @ts-ignore
      .then(changeResult => {
        if (changeResult) {
          // @ts-ignore
          if (__NEXT_DATA__ != null && __NEXT_DATA__.nextExport) {
            as = rewriteUrlForNextExport(as)
          }
          Router.router.events.emit('routeChangeCompleteWithAction', as, action)
        }

        return changeResult
      })
  }

  Router._go = function(delta: number) {
    window.history.go(delta)
  }

  Router.router._unpatchedReplace = Router.router.replace
  Router.router.replace = function(url: string, as: string = url, options: Record<string, any> = {}) {
    return Router.router.change('replaceState', url, as, options, 'REPLACE')
  }

  Router.router._unpatchedPush = Router.router.push
  Router.router.push = function(url: string, as: string = url, options: Record<string, any> = {}) {
    return Router.router.change('pushState', url, as, options, 'PUSH')
  }

  // Keep Router.router._beforePopState for backward compatibility (< Next.js 8)
  Router.router._unpatchedBpsCallback = Router.router._bps || Router.router._beforePopState
  Router.beforePopState(({ url, as, options }: { url: string, as: string, options: Record<string,any>}) => {
    Router.router.change('replaceState', url, as, options, 'POP')
    if (Router.router._unpatchedBpsCallback) {
      // @ts-ignore
      Router.router._unpatchedBpsCallback(...arguments)
    }
    return false
  })

  Router._unpatchedBeforePopState = Router.beforePopState
  Router.beforePopState = function(cb: Function) {
    Router.router._unpatchedBpsCallback = cb
  }

  if (shallowTimeTravel) {
    Router._timeTravelChange = timeTravelChange.bind(Router.router)
  } else {
    Router._timeTravelChange = (url: string) => Router.router.replace(url)
  }
}

export const unpatchRouter = (Router: { router: Router } & any) => {
  if (Router._patchedByConnectedRouter) {
    Router.router.change = Router.router._unpatchedChange
    Router.router.replace = Router.router._unpatchedReplace
    Router.router.push = Router.router._unpatchedPush
    Router.beforePopState = Router._unpatchedBeforePopState
    if (Router.router._unpatchedBpsCallback) {
      Router.beforePopState(Router.router._unpatchedBpsCallback)
    }
    Router.router._unpatchedBpsCallback = undefined
    Router._timeTravelChange = undefined
    Router._go = undefined
    Router._patchedByConnectedRouter = false
  }
}
