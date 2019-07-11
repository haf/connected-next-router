"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
function locationChanged(location, action) {
    return {
        type: constants_1.LOCATION_CHANGE,
        payload: {
            location: location,
            action: action
        }
    };
}
exports.locationChanged = locationChanged;
exports.onLocationChanged = locationChanged;
var callRouterActionCreator = function (method) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return ({
            type: constants_1.CALL_ROUTER_METHOD,
            payload: {
                method: method,
                args: args
            }
        });
    };
};
/**
 * These actions correspond to the history API.
 * The associated routerMiddleware will capture these events before they get to
 * your reducer and reissue them as the matching function on your history.
 */
exports.push = callRouterActionCreator(constants_1.PUSH);
exports.replace = callRouterActionCreator(constants_1.REPLACE);
exports.go = callRouterActionCreator(constants_1.GO);
exports.prefetch = callRouterActionCreator(constants_1.PREFETCH);
exports.goBack = function () { return exports.go(-1); };
exports.goForward = function () { return exports.go(1); };
exports.routerActions = { push: exports.push, replace: exports.replace, go: exports.go, goBack: exports.goBack, goForward: exports.goForward, prefetch: exports.prefetch };
//# sourceMappingURL=actions.js.map