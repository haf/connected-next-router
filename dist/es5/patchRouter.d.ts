import { Router } from 'next/router';
export declare type PatchRouterProps = {
    shallowTimeTravel: boolean;
};
/**
 * The default PatchRouterProps
 */
export declare const defaultOpts: {
    shallowTimeTravel: boolean;
};
export declare function patchRouter(Router: {
    router: Router;
} & any, opts?: PatchRouterProps): void;
export declare const unpatchRouter: (Router: any) => void;
