#! /bin/bash

npm install
npm install -g pm2 typescript
npm run build
# pm2 start services/api/dist/bin/www.js --name "wwamp.me"