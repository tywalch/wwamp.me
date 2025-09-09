#! /bin/bash

npm install
npm run build
if pm2 list | grep "wwamp.me"; then
  pm2 reload "wwamp.me"
else
  pm2 start "services/api/dist/bin/www.js" --name "wwamp.me"
fi