"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __importDefault(require("next/router"));
var rms = __importStar(require("./constants"));
/**
 * This middleware captures CALL_ROUTER_METHOD actions to redirect to the
 * Router singleton. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */
function createRouterMiddleware(opts) {
    if (opts === void 0) { opts = {}; }
    var Router = opts.Router || router_1.default;
    var methods = opts.methods || {};
    var resolvedMethods = Object.values(rms).reduce(function (acc, method) {
        // @ts-ignore
        acc[method] = methods[method] ? methods[method] : method;
        return acc;
    }, {});
    return function () { return function (next) { return function (action) {
        var type = action.type, payload = action.payload;
        if (type !== rms.CALL_ROUTER_METHOD) {
            return next(action);
        }
        var args = payload.args;
        // @ts-ignore
        var method = resolvedMethods[payload.method];
        // @ts-ignore
        Router[method].apply(Router, args);
    }; }; };
}
exports.default = createRouterMiddleware;
//# sourceMappingURL=middleware.js.map