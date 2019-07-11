import NextRouter, { Router } from 'next/router'
import * as rms from './constants'
import { AnyAction } from 'redux';

export type RouterMiddlewareOpts = {
  Router?: Router;
  methods?: Record<string, Function>
}

/**
 * This middleware captures CALL_ROUTER_METHOD actions to redirect to the
 * Router singleton. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */
export default function createRouterMiddleware(opts: RouterMiddlewareOpts = {}) {
  const Router = opts.Router || NextRouter
  const methods = opts.methods || {}
  const resolvedMethods = Object.values(rms).reduce(
    (acc, method) => {
      // @ts-ignore
      acc[method] = methods[method] ? methods[method] : method
      return acc
    },
    {}
  )

  return () => (next: (a: AnyAction) => any) => (action: AnyAction) => {
    const { type, payload } = action
    if (type !== rms.CALL_ROUTER_METHOD) {
      return next(action)
    }

    const { args } = payload
    // @ts-ignore
    const method = resolvedMethods[payload.method]
    // @ts-ignore
    Router[method](...args)
  }
}
