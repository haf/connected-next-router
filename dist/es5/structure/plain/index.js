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
Object.defineProperty(exports, "__esModule", { value: true });
var getIn_1 = require("./getIn");
exports.getIn = getIn_1.default;
var setIn_1 = require("./setIn");
exports.setIn = setIn_1.default;
function merge(state, payload) {
    return __assign({}, state, payload);
}
exports.merge = merge;
function toJS(x) { return x; }
exports.toJS = toJS;
function fromJS(x) { return x; }
exports.fromJS = fromJS;
//# sourceMappingURL=index.js.map