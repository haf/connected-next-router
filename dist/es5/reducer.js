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
var locationFromUrl_1 = __importDefault(require("./utils/locationFromUrl"));
var constants_1 = require("./constants");
exports.initialRouterState = {
    location: locationFromUrl_1.default('/'),
    action: 'POP' // TODO: what's this?
};
/**
 * This reducer will update the state with the most recent location Router
 * has transitioned to. This may not be in sync with the Router, particularly
 * if you have use getInitialProps, so reading from and relying on
 * this state is discouraged.
 */
function routerReducer(state, action) {
    if (state === void 0) { state = exports.initialRouterState; }
    switch (action.type) {
        case constants_1.LOCATION_CHANGE:
            return __assign({}, state, action.payload);
        default:
            return state;
    }
}
exports.default = routerReducer;
//# sourceMappingURL=reducer.js.map