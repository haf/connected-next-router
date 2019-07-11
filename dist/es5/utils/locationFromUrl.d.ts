export declare type LocationFromUrlObject = {
    pathname?: string;
    search?: string;
    hash?: string;
};
export default function locationFromUrl(url: URL | string): URL;
