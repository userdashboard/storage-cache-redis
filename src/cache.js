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
  return client.get(key, (error, result) => {
    if (error) {
      return callback(error)
    }
    if (!result) {
      return callback()
    }
    if (result.length && result.startsWith('{')) {
      return callback(null, JSON.parse(result))
    }
    try {
      const float = parseFloat(result, 10)
      if (float.toString() === result) {
        return callback(null, float)
      }
    } catch (error) {
    }
    try {
      const int = parseInt(result, 10)
      if (int.toString() === result) {
        return callback(null, int)
      }
    } catch (error) {
    }
    return callback(null, result)
  })
}

function set (key, value, callback) {
  let stringified
  if (value < 0 || value >= 0) {
    stringified = value
  } else if (value.length) {
    stringified = value
  } else if (Object.keys(value).length) {
    stringified = JSON.stringify(value)
  }
  return client.set(key, stringified, (error) => {
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
