import { LocationChangedAction } from './actions';
export declare const initialRouterState: {
    location: URL;
    action: string;
};
/**
 * This reducer will update the state with the most recent location Router
 * has transitioned to. This may not be in sync with the Router, particularly
 * if you have use getInitialProps, so reading from and relying on
 * this state is discouraged.
 */
export default function routerReducer(state: {
    location: URL;
    action: string;
} | undefined, action: LocationChangedAction): {
    location: URL;
    action: string;
};
