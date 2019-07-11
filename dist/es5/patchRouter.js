"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* global __NEXT_DATA__ */
var rewriteUrlForNextExport_1 = __importDefault(require("./utils/rewriteUrlForNextExport"));
var url_1 = require("url");
/**
 * The default PatchRouterProps
 */
exports.defaultOpts = {
    shallowTimeTravel: false
};
function toRoute(path) {
    if (typeof path === 'undefined')
        throw new Error("'path' parameter is null or undefined");
    return path.replace(/\/$/, '') || '/';
}
function timeTravelChange(url, as) {
    if (as === void 0) { as = url; }
    // @ts-ignore
    if (this.onlyAHashChange(url)) {
        // @ts-ignore
        this.changeState('replaceState', url, as);
        // @ts-ignore
        this.scrollToHash(as);
        return true;
    }
    var _a = url_1.parse(url, true), pathname = _a.pathname, query = _a.query, hash = _a.hash;
    var route = toRoute(pathname);
    // @ts-ignore
    var routeInfo = this.components[route];
    // @ts-ignore
    this.changeState('replaceState', url, as);
    // @ts-ignore
    this.set(route, pathname, query, as, __assign({}, routeInfo, { hash: hash ? hash : '' }));
    return true;
}
function patchRouter(Router, opts) {
    if (opts === void 0) { opts = exports.defaultOpts; }
    if (!Router.router || Router._patchedByConnectedRouter)
        return;
    var shallowTimeTravel = opts.shallowTimeTravel;
    Router._patchedByConnectedRouter = true;
    Router.router._unpatchedChange = Router.router.change;
    Router.router.change = function (method, _url, _as, options, action) {
        var as = typeof _as === 'object' ? url_1.format(_as) : _as;
        return Router.router._unpatchedChange(method, _url, _as, options)
            // @ts-ignore
            .then(function (changeResult) {
            if (changeResult) {
                // @ts-ignore
                if (__NEXT_DATA__ != null && __NEXT_DATA__.nextExport) {
                    as = rewriteUrlForNextExport_1.default(as);
                }
                Router.router.events.emit('routeChangeCompleteWithAction', as, action);
            }
            return changeResult;
        });
    };
    Router._go = function (delta) {
        window.history.go(delta);
    };
    Router.router._unpatchedReplace = Router.router.replace;
    Router.router.replace = function (url, as, options) {
        if (as === void 0) { as = url; }
        if (options === void 0) { options = {}; }
        return Router.router.change('replaceState', url, as, options, 'REPLACE');
    };
    Router.router._unpatchedPush = Router.router.push;
    Router.router.push = function (url, as, options) {
        if (as === void 0) { as = url; }
        if (options === void 0) { options = {}; }
        return Router.router.change('pushState', url, as, options, 'PUSH');
    };
    // Keep Router.router._beforePopState for backward compatibility (< Next.js 8)
    Router.router._unpatchedBpsCallback = Router.router._bps || Router.router._beforePopState;
    Router.beforePopState(function (_a) {
        var _b;
        var url = _a.url, as = _a.as, options = _a.options;
        Router.router.change('replaceState', url, as, options, 'POP');
        if (Router.router._unpatchedBpsCallback) {
            // @ts-ignore
            (_b = Router.router)._unpatchedBpsCallback.apply(_b, arguments);
        }
        return false;
    });
    Router._unpatchedBeforePopState = Router.beforePopState;
    Router.beforePopState = function (cb) {
        Router.router._unpatchedBpsCallback = cb;
    };
    if (shallowTimeTravel) {
        Router._timeTravelChange = timeTravelChange.bind(Router.router);
    }
    else {
        Router._timeTravelChange = function (url) { return Router.router.replace(url); };
    }
}
exports.patchRouter = patchRouter;
exports.unpatchRouter = function (Router) {
    if (Router._patchedByConnectedRouter) {
        Router.router.change = Router.router._unpatchedChange;
        Router.router.replace = Router.router._unpatchedReplace;
        Router.router.push = Router.router._unpatchedPush;
        Router.beforePopState = Router._unpatchedBeforePopState;
        if (Router.router._unpatchedBpsCallback) {
            Router.beforePopState(Router.router._unpatchedBpsCallback);
        }
        Router.router._unpatchedBpsCallback = undefined;
        Router._timeTravelChange = undefined;
        Router._go = undefined;
        Router._patchedByConnectedRouter = false;
    }
};
//# sourceMappingURL=patchRouter.js.map