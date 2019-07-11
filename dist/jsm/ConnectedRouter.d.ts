/// <reference types="node" />
import * as React from 'react';
import { ReactReduxContextValue } from 'react-redux';
import { SingletonRouter } from 'next/router';
import { UrlObject } from 'url';
import { AnyAction, Store } from 'redux';
export declare type ConnectedRouterProps = {
    children?: React.ReactNode;
    shallowTimeTravel: boolean;
    reducerKey: string;
    Router: SingletonRouter;
    onLocationChanged: (url: UrlObject, action: AnyAction) => void;
    store: Store;
};
export declare type ConnectedRouterWithContextProps = ConnectedRouterProps & {
    context: React.Context<ReactReduxContextValue>;
};
declare const _default: import("react-redux").ConnectedComponentClass<(props: ConnectedRouterWithContextProps) => JSX.Element, Pick<ConnectedRouterWithContextProps, "children" | "shallowTimeTravel" | "reducerKey" | "Router" | "store" | "context">>;
export default _default;
