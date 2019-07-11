export declare const PUSH = "push";
export declare const REPLACE = "replace";
export declare const PREFETCH = "prefetch";
export declare const GO = "_go";
export declare const routerMethods: {
    PUSH: string;
    REPLACE: string;
    PREFETCH: string;
    GO: string;
};
/**
 * This action type will be dispatched after Router's history
 * receives a location change.
 */
export declare const LOCATION_CHANGE = "@@router/LOCATION_CHANGE";
/**
 * This action type will be dispatched by the history actions below.
 * If you're writing a middleware to watch for navigation events, be sure to
 * look for actions of this type.
 */
export declare const CALL_ROUTER_METHOD = "@@router/CALL_ROUTER_METHOD";
export declare type RouterMethod = 'push' | 'replace' | 'prefetch' | '_go';
