import { LocationChangedAction } from './actions'
import locationFromUrl from './utils/locationFromUrl'
import { LOCATION_CHANGE } from './constants';
import { AnyAction } from 'redux';

export const initialRouterState = {
  location: locationFromUrl('/'),
  action: 'POP' // TODO: what's this?
}

/**
 * This reducer will update the state with the most recent location Router
 * has transitioned to. This may not be in sync with the Router, particularly
 * if you have use getInitialProps, so reading from and relying on
 * this state is discouraged.
 */
export default function routerReducer(state = initialRouterState, action: LocationChangedAction<AnyAction>) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
