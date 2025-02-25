export { LOCATION_CHANGE, CALL_ROUTER_METHOD } from './constants'
export { push, replace, go, goBack, prefetch, goForward, routerActions } from './actions'
import ConnectedRouter from './ConnectedRouter'
export { default as ConnectedRouter } from './ConnectedRouter'
export { default as routerReducer, initialRouterState } from './reducer'
export { default as createRouterMiddleware } from './middleware'
export { GO, REPLACE, PUSH, PREFETCH, routerMethods } from './constants'
export default ConnectedRouter
