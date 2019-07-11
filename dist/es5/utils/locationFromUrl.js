"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function locationFromUrl(url) {
    if (url instanceof URL)
        return url;
    else {
        try {
            return new URL(url);
        }
        catch (_a) {
            return typeof window !== 'undefined'
                ? new URL(window.location.href)
                : new URL("https://example.com");
        }
    }
}
exports.default = locationFromUrl;
//# sourceMappingURL=locationFromUrl.js.map