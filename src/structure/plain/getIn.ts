/* Code from github.com/erikras/redux-form by Erik Rasmussen */

export default function getIn(state: Record<string, any> | null, path: string[]): any {
  if (!state) {
    return state
  }

  const length = path.length
  if (!length) {
    return undefined
  }

  let result = state
  for (let i = 0; i < length && !!result; ++i) {
    result = result[path[i]]
  }

  return result
}
