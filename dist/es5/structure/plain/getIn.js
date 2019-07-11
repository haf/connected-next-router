"use strict";
/* Code from github.com/erikras/redux-form by Erik Rasmussen */
Object.defineProperty(exports, "__esModule", { value: true });
function getIn(state, path) {
    if (!state) {
        return state;
    }
    var length = path.length;
    if (!length) {
        return undefined;
    }
    var result = state;
    for (var i = 0; i < length && !!result; ++i) {
        result = result[path[i]];
    }
    return result;
}
exports.default = getIn;
//# sourceMappingURL=getIn.js.map