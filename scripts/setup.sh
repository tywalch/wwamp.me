#! /bin/bash

npm install
# if ! command -v pm2 &> /dev/null; then
#   npm install -g pm2
# fi
# if ! command -v typescript &> /dev/null; then
#   npm install -g typescript
# fi
npm run build
if pm2 list | grep "wwamp.me"; then
  pm2 reload "wwamp.me"
else
  pm2 start "services/api/dist/bin/www.js" --name "wwamp.me"
fi