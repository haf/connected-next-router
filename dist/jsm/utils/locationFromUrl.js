import { parse } from 'url';
// TO CONSIDER: browser env? https://developer.mozilla.org/en-US/docs/Web/API/URL because 'url' is a node module
export default function locationFromUrl(_url) {
    if (typeof _url === 'object') {
        const { hash, search, pathname } = _url;
        return { pathname, search, hash };
    }
    else {
        const { hash, search, pathname } = parse(_url);
        return { pathname, search, hash };
    }
}
//# sourceMappingURL=locationFromUrl.js.map