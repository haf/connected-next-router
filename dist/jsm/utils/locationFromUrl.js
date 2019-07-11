export default function locationFromUrl(url) {
    if (url instanceof URL)
        return url;
    else {
        try {
            return new URL(url);
        }
        catch {
            return typeof window !== 'undefined'
                ? new URL(window.location.href)
                : new URL("https://example.com");
        }
    }
}
//# sourceMappingURL=locationFromUrl.js.map