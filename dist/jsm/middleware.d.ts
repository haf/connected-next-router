import { PublicRouterInstance } from 'next/router';
import { AnyAction } from 'redux';
export declare type RouterMiddlewareOpts = {
    Router?: PublicRouterInstance;
    methods?: Record<string, Function>;
};
/**
 * This middleware captures CALL_ROUTER_METHOD actions to redirect to the
 * Router singleton. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */
export default function createRouterMiddleware(opts?: RouterMiddlewareOpts): () => (next: (a: AnyAction) => any) => (action: AnyAction) => any;
