/* Code from github.com/erikras/redux-form by Erik Rasmussen */
function setInWithPath(state, value, path, pathIndex) {
    if (pathIndex >= path.length) {
        return value;
    }
    const first = path[pathIndex];
    // @ts-ignore either typeof first === 'number' // || typeof first === 'string' || typeof first === 'symbol'
    const next = setInWithPath(state && state[first], value, path, pathIndex + 1);
    if (!state) {
        // @ts-ignore
        const initialized = isNaN(first) ? {} : [];
        // @ts-ignore
        initialized[first] = next;
        return initialized;
    }
    if (Array.isArray(state)) {
        // @ts-ignore
        const copy = [].concat(state);
        copy[first] = next;
        return copy;
    }
    return {
        ...state,
        [first]: next
    };
}
export default function setIn(state, field, value) {
    return setInWithPath(state, value, field, 0);
}
//# sourceMappingURL=setIn.js.map