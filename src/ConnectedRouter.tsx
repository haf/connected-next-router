import * as React from 'react'
import { connect, ReactReduxContext, ReactReduxContextValue } from 'react-redux'
import NextRouter, { SingletonRouter } from 'next/router'
import { onLocationChanged } from './actions'
import { patchRouter, unpatchRouter } from './patchRouter'
import locationFromUrl from './utils/locationFromUrl'
import { AnyAction, Store } from 'redux';
import { getIn } from './structure/plain';

export type ConnectedRouterProps = {
  children?: React.ReactNode;
  shallowTimeTravel: boolean;
  reducerKey: string;
  Router: SingletonRouter;
  onLocationChanged: (url: URL, action: AnyAction) => void;
  store: Store
}

/*
 * ConnectedRouter listens to Next Router events. When history is changed, it dispatches an action
 * to update router state in redux store.
 */
class ConnectedRouter extends React.Component<ConnectedRouterProps> {
  static defaultProps = {
    shallowTimeTravel: true,
    reducerKey: 'router',
    Router: NextRouter
  }

  private inTimeTravelling: boolean
  private _isTimeTravelEnabled: boolean
  private unsubscribe: null | (() => void)

  constructor(props: ConnectedRouterProps) {
    super(props)
    this.inTimeTravelling = false
    this.unsubscribe = null
    this._isTimeTravelEnabled = false
  }

  componentDidMount() {
    const { shallowTimeTravel, Router, store } = this.props
    Router.ready(() => {
      patchRouter(Router, { shallowTimeTravel })
      this.unsubscribe = store.subscribe(this.listenStoreChanges)
      if (Router.router != null) {
        // @ts-ignore
        Router.router.events.on('routeChangeStart', this.disableTimeTravel)
        // @ts-ignore
        Router.router.events.on('routeChangeError', this.enableTimeTravel)
        // @ts-ignore
        Router.router.events.on('routeChangeComplete', this.enableTimeTravel)
        // @ts-ignore
        Router.router.events.on('routeChangeCompleteWithAction', this.listenRouteChanges)
      }
    })
  }

  componentWillUnmount() {
    const { Router } = this.props
    if (this.unsubscribe != null) {
      unpatchRouter(Router)
      this.unsubscribe()
      // @ts-ignore
      Router.router.events.off('routeChangeStart', this.disableTimeTravel)
      // @ts-ignore
      Router.router.events.off('routeChangeError', this.enableTimeTravel)
      // @ts-ignore
      Router.router.events.off('routeChangeComplete', this.enableTimeTravel)
      // @ts-ignore
      Router.router.events.off('routeChangeCompleteWithAction', this.listenRouteChanges)
    }
  }

  enableTimeTravel = () => {
    this._isTimeTravelEnabled = true
  }

  disableTimeTravel = () => {
    this._isTimeTravelEnabled = false
  }

  listenStoreChanges = () => {
    /**
     * Next.js asynchronously loads routes, and Redux actions can be
     * dispatched during this process before Router's history change.
     * To prevent time travel changes during it, time travel detection
     * is disabled when Router change starts, and later enabled on change
     * completion or error.
     */
    if (!this._isTimeTravelEnabled) {
      return
    }

    const { Router, shallowTimeTravel, reducerKey, store } = this.props
    // Extract store's location
    const storeLocation = getIn(store.getState(), [reducerKey, 'location'])
    const { pathname: pathnameInStore, search: searchInStore, hash: hashInStore } = storeLocation

    // Extract Router's location
    const historyLocation = locationFromUrl(Router.asPath)
    const { pathname: pathnameInHistory, search: searchInHistory, hash: hashInHistory } = historyLocation

    // If we do time travelling, the location in store is changed but location in Router is not changed
    const locationMismatch =
      pathnameInHistory !== pathnameInStore || searchInHistory !== searchInStore || hashInStore !== hashInHistory
    if (locationMismatch) {
      const url = `${pathnameInStore}${searchInStore}${hashInStore}`
      // Update Router's location to match store's location
      if (shallowTimeTravel) {
        // @ts-ignore
        Router._timeTravelChange(url)
      } else if (!this.inTimeTravelling) {
        this.inTimeTravelling = true
        // @ts-ignore
        Router._timeTravelChange(url)
      }
    }
  }

  listenRouteChanges = (url: string | URL, action: AnyAction) => {
    // Dispatch onLocationChanged except when we're in time travelling
    if (!this.inTimeTravelling) {
      this.props.onLocationChanged(locationFromUrl(url), action)
    }
  }

  render() {
    return this.props.children
  }
}

export type ConnectedRouterWithContextProps = ConnectedRouterProps & {
  context: React.Context<ReactReduxContextValue>;
}

const ConnectedRouterWithContext = (props: ConnectedRouterWithContextProps) => {
  const Context = props.context || ReactReduxContext

  if (Context == null) {
    throw 'connected-react-router@^1.0.0 requires react-redux v6. ' +
    'If you are using react-redux v5, install connected-react-router@^0.0.1.'
  }

  return <Context.Consumer>
    {({ store }) => <ConnectedRouter store={store} {...props} />}
  </Context.Consumer>
}

export default connect(null, { onLocationChanged })(ConnectedRouterWithContext)
