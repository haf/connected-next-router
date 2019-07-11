"use strict";
/* Code from github.com/erikras/redux-form by Erik Rasmussen */
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
Object.defineProperty(exports, "__esModule", { value: true });
function setInWithPath(state, value, path, pathIndex) {
    var _a;
    if (pathIndex >= path.length) {
        return value;
    }
    var first = path[pathIndex];
    // @ts-ignore either typeof first === 'number' // || typeof first === 'string' || typeof first === 'symbol'
    var next = setInWithPath(state && state[first], value, path, pathIndex + 1);
    if (!state) {
        // @ts-ignore
        var initialized = isNaN(first) ? {} : [];
        // @ts-ignore
        initialized[first] = next;
        return initialized;
    }
    if (Array.isArray(state)) {
        // @ts-ignore
        var copy = [].concat(state);
        copy[first] = next;
        return copy;
    }
    return __assign({}, state, (_a = {}, _a[first] = next, _a));
}
function setIn(state, field, value) {
    return setInWithPath(state, value, field, 0);
}
exports.default = setIn;
//# sourceMappingURL=setIn.js.map