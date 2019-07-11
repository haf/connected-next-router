import { PUSH, REPLACE, GO, PREFETCH, RouterMethod, LOCATION_CHANGE, CALL_ROUTER_METHOD } from './constants';

export type LocationChangedAction = {
  type: typeof LOCATION_CHANGE,
  payload: {
    location: URL,
    action: string
  }
}

export function locationChanged(location: URL, action: string): LocationChangedAction {
  return {
    type: LOCATION_CHANGE,
    payload: {
      location,
      action
    }
  }
}

export const onLocationChanged = locationChanged

const callRouterActionCreator = (method: RouterMethod) => {
  return (...args: any[]) => ({
    type: CALL_ROUTER_METHOD,
    payload: {
      method,
      args
    }
  })
}

/**
 * These actions correspond to the history API.
 * The associated routerMiddleware will capture these events before they get to
 * your reducer and reissue them as the matching function on your history.
 */
export const push = callRouterActionCreator(PUSH)
export const replace = callRouterActionCreator(REPLACE)
export const go = callRouterActionCreator(GO)
export const prefetch = callRouterActionCreator(PREFETCH)
export const goBack = () => go(-1)
export const goForward = () => go(1)

export const routerActions = { push, replace, go, goBack, goForward, prefetch }
