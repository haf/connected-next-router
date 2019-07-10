export { default as getIn } from './getIn'
export { default as setIn } from './setIn'
export function merge(state: {}, payload: {}): any {
  return { ...state, ...payload }
}
export function toJS(x: any) { return x }
export function fromJS(x: any) { return x }
