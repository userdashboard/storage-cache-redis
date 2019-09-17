/* eslint-env mocha */
const cache = require('./index.js')

afterEach((callback) => {
  if (cache.client) {
    return cache.client.flushdb(callback)
  }
  return callback()
})

after((callback) => {
  if (cache.client) {
    return cache.client.quit(callback)
  }
  return callback()
})
