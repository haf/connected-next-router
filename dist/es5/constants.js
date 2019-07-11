"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUSH = 'push';
exports.REPLACE = 'replace';
exports.PREFETCH = 'prefetch';
exports.GO = '_go';
exports.routerMethods = { PUSH: exports.PUSH, REPLACE: exports.REPLACE, PREFETCH: exports.PREFETCH, GO: exports.GO };
/**
 * This action type will be dispatched after Router's history
 * receives a location change.
 */
exports.LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
/**
 * This action type will be dispatched by the history actions below.
 * If you're writing a middleware to watch for navigation events, be sure to
 * look for actions of this type.
 */
exports.CALL_ROUTER_METHOD = '@@router/CALL_ROUTER_METHOD';
//# sourceMappingURL=constants.js.map