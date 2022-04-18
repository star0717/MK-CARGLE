cd /back-end/
npm run start:prod &
cd /front-end/
node server.js &
cd /
nginx -g 'daemon off;'
