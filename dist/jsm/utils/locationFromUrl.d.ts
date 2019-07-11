/// <reference types="node" />
import { UrlObject } from 'url';
export declare type LocationFromUrlObject = {
    pathname?: string;
    search?: string;
    hash?: string;
};
export default function locationFromUrl(_url: UrlObject | string): UrlObject;
