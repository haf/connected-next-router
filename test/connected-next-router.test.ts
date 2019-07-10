import Router from 'next/router'
import ConnectedRouter from "../src"

/**
 * Dummy test
 */
describe("Dummy test", () => {
  it("DummyClass is instantiable", () => {
    expect(new ConnectedRouter({})).toBeInstanceOf(ConnectedRouter)
  })
})
