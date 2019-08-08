# Redis Storage Cache for Dashboard

Install this module to use Redis as a cache to avoid disk/database operations.

To test this module use [Dashboard](https://github.com/userdashboard/dashboard)'s test suite configured with this storage cache.

## When to use NodeJS caching

You host your web app on a single server and use the hard disk as storage, especially spinning disks to avoid repetetive file reads.

  STORAGE_CACHE=node

## When to use Redis caching

You have lots of traffic balanced across multiple Dashboard server instances, especially using S3 storage to avoid repetitive file requests.

  STORAGE_CACHE=@userdashboard/storage-cache-redis \
  CACHE_REDIS_URL=redis://localhost:6379

# Dashboard

Dashboard is a NodeJS project that provides a reusable account management system for web applications. 

Dashboard proxies your application server to create a single website where pages like signing in or changing your password are provided by Dashboard.  Your application server can be anything you want, and use Dashboard's API to access data as required.

Using modules you can expand Dashboard to include organizations, subscriptions powered by Stripe, or a Stripe Connect platform.

- [Developer documentation home](https://userdashboard.github.io/developers/)
- [Administrator documentation home](https://userdashboard.github.io/administrators/)
- [User documentation home](https://userdashboard.github.io/users/)

#### Development

Development takes place on [Github](https://github.com/userdashboard/storage-cache-redis) with releases on [NPM](https://www.npmjs.com/package/@userdashboard/storage-cache-redis).

#### License

This software is distributed under the MIT license.