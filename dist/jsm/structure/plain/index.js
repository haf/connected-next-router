export { default as getIn } from './getIn';
export { default as setIn } from './setIn';
export function merge(state, payload) {
    return { ...state, ...payload };
}
export function toJS(x) { return x; }
export function fromJS(x) { return x; }
//# sourceMappingURL=index.js.map