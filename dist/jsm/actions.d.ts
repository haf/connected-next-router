import { RouterMethod, LOCATION_CHANGE } from './constants';
export declare type LocationChangedAction = {
    type: typeof LOCATION_CHANGE;
    payload: {
        location: URL;
        action: string;
    };
};
export declare function locationChanged(location: URL, action: string): LocationChangedAction;
export declare const onLocationChanged: typeof locationChanged;
/**
 * These actions correspond to the history API.
 * The associated routerMiddleware will capture these events before they get to
 * your reducer and reissue them as the matching function on your history.
 */
export declare const push: (...args: any[]) => {
    type: string;
    payload: {
        method: RouterMethod;
        args: any[];
    };
};
export declare const replace: (...args: any[]) => {
    type: string;
    payload: {
        method: RouterMethod;
        args: any[];
    };
};
export declare const go: (...args: any[]) => {
    type: string;
    payload: {
        method: RouterMethod;
        args: any[];
    };
};
export declare const prefetch: (...args: any[]) => {
    type: string;
    payload: {
        method: RouterMethod;
        args: any[];
    };
};
export declare const goBack: () => {
    type: string;
    payload: {
        method: RouterMethod;
        args: any[];
    };
};
export declare const goForward: () => {
    type: string;
    payload: {
        method: RouterMethod;
        args: any[];
    };
};
export declare const routerActions: {
    push: (...args: any[]) => {
        type: string;
        payload: {
            method: RouterMethod;
            args: any[];
        };
    };
    replace: (...args: any[]) => {
        type: string;
        payload: {
            method: RouterMethod;
            args: any[];
        };
    };
    go: (...args: any[]) => {
        type: string;
        payload: {
            method: RouterMethod;
            args: any[];
        };
    };
    goBack: () => {
        type: string;
        payload: {
            method: RouterMethod;
            args: any[];
        };
    };
    goForward: () => {
        type: string;
        payload: {
            method: RouterMethod;
            args: any[];
        };
    };
    prefetch: (...args: any[]) => {
        type: string;
        payload: {
            method: RouterMethod;
            args: any[];
        };
    };
};
