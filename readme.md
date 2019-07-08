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
