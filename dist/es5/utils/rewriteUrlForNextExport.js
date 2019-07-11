"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function rewriteUrlForNextExport(url) {
    var _a = url.split('#'), hash = _a[1];
    url = url.replace(/#.*/, '');
    var _b = url.split('?'), path = _b[0], qs = _b[1];
    path = path.replace(/\/$/, '');
    var newPath = path;
    // Append a trailing slash if this path does not have an extension
    if (!/\.[^/]+\/?$/.test(path)) {
        newPath = path + "/";
    }
    if (qs) {
        newPath = newPath + "?" + qs;
    }
    if (hash) {
        newPath = newPath + "#" + hash;
    }
    return newPath;
}
exports.default = rewriteUrlForNextExport;
//# sourceMappingURL=rewriteUrlForNextExport.js.map