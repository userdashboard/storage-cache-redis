const Redis = require('redis')
const util = require('util')
const twentyFourHours = 24 * 60 * 60

if (!process.env.CACHE_REDIS_URL) {
  throw new Error('Invalid CACHE_REDIS_URL')
}

let client = Redis.createClient(process.env.CACHE_REDIS_URL)
client.on('error', (error) => {
  if (process.env.DEBUG_ERRORS) {
    console.log('redis.cache', error)
  }
  process.exit(1)
})

client.on('end', () => {
  client = null
})

module.exports = {
  client,
  get: util.promisify(get),
  set: util.promisify(set),
  remove: util.promisify(remove)
}

function get (key, callback) {
  return client.get(key, callback)
}

function set (key, value, callback) {
  return client.set(key, value, (error) => {
    if (error) {
      return callback(error)
    }
    return client.expire(key, twentyFourHours, (error) => {
      if (error) {
        return callback(error)
      }
      return callback()
    })
  })
}

function remove (key, callback) {
  return client.del(key, callback)
}
