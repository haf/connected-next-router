export const PUSH = 'push'
export const REPLACE = 'replace'
export const PREFETCH = 'prefetch'
export const GO = '_go'
export const routerMethods = { PUSH, REPLACE, PREFETCH, GO }

/**
 * This action type will be dispatched after Router's history
 * receives a location change.
 */
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

/**
 * This action type will be dispatched by the history actions below.
 * If you're writing a middleware to watch for navigation events, be sure to
 * look for actions of this type.
 */
export const CALL_ROUTER_METHOD = '@@router/CALL_ROUTER_METHOD'

export type RouterMethod =
  | 'push'
  | 'replace'
  | 'prefetch'
  | '_go'
