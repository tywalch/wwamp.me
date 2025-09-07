#! /bin/bash

npm install
npm install -g pm2 typescript
npm run build
pm2 start dist/api/bin/www.js