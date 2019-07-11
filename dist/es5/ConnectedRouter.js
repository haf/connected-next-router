"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var router_1 = __importDefault(require("next/router"));
var actions_1 = require("./actions");
var patchRouter_1 = require("./patchRouter");
var locationFromUrl_1 = __importDefault(require("./utils/locationFromUrl"));
var plain_1 = require("./structure/plain");
/*
 * ConnectedRouter listens to Next Router events. When history is changed, it dispatches an action
 * to update router state in redux store.
 */
var ConnectedRouter = /** @class */ (function (_super) {
    __extends(ConnectedRouter, _super);
    function ConnectedRouter(props) {
        var _this = _super.call(this, props) || this;
        _this.enableTimeTravel = function () {
            _this._isTimeTravelEnabled = true;
        };
        _this.disableTimeTravel = function () {
            _this._isTimeTravelEnabled = false;
        };
        _this.listenStoreChanges = function () {
            /**
             * Next.js asynchronously loads routes, and Redux actions can be
             * dispatched during this process before Router's history change.
             * To prevent time travel changes during it, time travel detection
             * is disabled when Router change starts, and later enabled on change
             * completion or error.
             */
            if (!_this._isTimeTravelEnabled) {
                return;
            }
            var _a = _this.props, Router = _a.Router, shallowTimeTravel = _a.shallowTimeTravel, reducerKey = _a.reducerKey, store = _a.store;
            // Extract store's location
            var storeLocation = plain_1.getIn(store.getState(), [reducerKey, 'location']);
            var pathnameInStore = storeLocation.pathname, searchInStore = storeLocation.search, hashInStore = storeLocation.hash;
            // Extract Router's location
            var historyLocation = locationFromUrl_1.default(Router.asPath);
            var pathnameInHistory = historyLocation.pathname, searchInHistory = historyLocation.search, hashInHistory = historyLocation.hash;
            // If we do time travelling, the location in store is changed but location in Router is not changed
            var locationMismatch = pathnameInHistory !== pathnameInStore || searchInHistory !== searchInStore || hashInStore !== hashInHistory;
            if (locationMismatch) {
                var url = "" + pathnameInStore + searchInStore + hashInStore;
                // Update Router's location to match store's location
                if (shallowTimeTravel) {
                    // @ts-ignore
                    Router._timeTravelChange(url);
                }
                else if (!_this.inTimeTravelling) {
                    _this.inTimeTravelling = true;
                    // @ts-ignore
                    Router._timeTravelChange(url);
                }
            }
        };
        _this.listenRouteChanges = function (url, action) {
            // Dispatch onLocationChanged except when we're in time travelling
            if (!_this.inTimeTravelling) {
                _this.props.onLocationChanged(locationFromUrl_1.default(url), action);
            }
        };
        _this.inTimeTravelling = false;
        _this.unsubscribe = null;
        _this._isTimeTravelEnabled = false;
        return _this;
    }
    ConnectedRouter.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, shallowTimeTravel = _a.shallowTimeTravel, Router = _a.Router, store = _a.store;
        Router.ready(function () {
            patchRouter_1.patchRouter(Router, { shallowTimeTravel: shallowTimeTravel });
            _this.unsubscribe = store.subscribe(_this.listenStoreChanges);
            if (Router.router != null) {
                // @ts-ignore
                Router.router.events.on('routeChangeStart', _this.disableTimeTravel);
                // @ts-ignore
                Router.router.events.on('routeChangeError', _this.enableTimeTravel);
                // @ts-ignore
                Router.router.events.on('routeChangeComplete', _this.enableTimeTravel);
                // @ts-ignore
                Router.router.events.on('routeChangeCompleteWithAction', _this.listenRouteChanges);
            }
        });
    };
    ConnectedRouter.prototype.componentWillUnmount = function () {
        var Router = this.props.Router;
        if (this.unsubscribe != null) {
            patchRouter_1.unpatchRouter(Router);
            this.unsubscribe();
            // @ts-ignore
            Router.router.events.off('routeChangeStart', this.disableTimeTravel);
            // @ts-ignore
            Router.router.events.off('routeChangeError', this.enableTimeTravel);
            // @ts-ignore
            Router.router.events.off('routeChangeComplete', this.enableTimeTravel);
            // @ts-ignore
            Router.router.events.off('routeChangeCompleteWithAction', this.listenRouteChanges);
        }
    };
    ConnectedRouter.prototype.render = function () {
        return this.props.children;
    };
    ConnectedRouter.defaultProps = {
        shallowTimeTravel: true,
        reducerKey: 'router',
        Router: router_1.default
    };
    return ConnectedRouter;
}(React.Component));
var ConnectedRouterWithContext = function (props) {
    var Context = props.context || react_redux_1.ReactReduxContext;
    if (Context == null) {
        throw 'connected-react-router@^1.0.0 requires react-redux v6. ' +
            'If you are using react-redux v5, install connected-react-router@^0.0.1.';
    }
    return React.createElement(Context.Consumer, null, function (_a) {
        var store = _a.store;
        return React.createElement(ConnectedRouter, __assign({ store: store }, props));
    });
};
exports.default = react_redux_1.connect(null, { onLocationChanged: actions_1.onLocationChanged })(ConnectedRouterWithContext);
//# sourceMappingURL=ConnectedRouter.js.map