const cache = require('./index.js')

after(async () => {
  if (cache.client) {
    try {
      await cache.client.quit()
    } catch (error) {
    }
  }
})