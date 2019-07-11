"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
// TO CONSIDER: browser env? https://developer.mozilla.org/en-US/docs/Web/API/URL because 'url' is a node module
function locationFromUrl(_url) {
    if (typeof _url === 'object') {
        var hash = _url.hash, search = _url.search, pathname = _url.pathname;
        return { pathname: pathname, search: search, hash: hash };
    }
    else {
        var _a = url_1.parse(_url), hash = _a.hash, search = _a.search, pathname = _a.pathname;
        return { pathname: pathname, search: search, hash: hash };
    }
}
exports.default = locationFromUrl;
//# sourceMappingURL=locationFromUrl.js.map