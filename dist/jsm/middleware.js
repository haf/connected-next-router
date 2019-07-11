import NextRouter from 'next/router';
import * as rms from './constants';
/**
 * This middleware captures CALL_ROUTER_METHOD actions to redirect to the
 * Router singleton. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */
export default function createRouterMiddleware(opts = {}) {
    const Router = opts.Router || NextRouter;
    const methods = opts.methods || {};
    const resolvedMethods = Object.values(rms).reduce((acc, method) => {
        // @ts-ignore
        acc[method] = methods[method] ? methods[method] : method;
        return acc;
    }, {});
    return () => (next) => (action) => {
        const { type, payload } = action;
        if (type !== rms.CALL_ROUTER_METHOD) {
            return next(action);
        }
        const { args } = payload;
        // @ts-ignore
        const method = resolvedMethods[payload.method];
        // @ts-ignore
        Router[method](...args);
    };
}
//# sourceMappingURL=middleware.js.map