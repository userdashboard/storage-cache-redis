if [ ! -d instance ]; then
    git clone https://github.com/userdashboard/dashboard.git instance
    cd instance
    npm install redis mocha puppeteer@2.1.1 --no-save
else 
    cd instance
fi
rm -rf node_modules/@userdashboard/storage-cache-redis
mkdir -p node_modules/@userdashboard/storage-cache-redis
cp ../index.js node_modules/@userdashboard/storage-cache-redis
cp -R ../src node_modules/@userdashboard/storage-cache-redis

NODE_ENV=testing \
FAST_START=true \
DASHBOARD_SERVER="http://localhost:9000" \
DOMAIN="localhost" \
CACHE="@userdashboard/storage-cache-redis" \
CACHE_REDIS_URL="redis://localhost:6379/15" \
GENERATE_SITEMAP_TXT=false \
GENERATE_API_TXT=false \
npm test