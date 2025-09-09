import express, { type Express, type Router } from 'express';
import { randomUUID as uuid } from 'node:crypto';

function register(app: Express): Router {
  const router = express.Router();
  app.use('/', router);
  
  router.get('/', function(req, res) {
    if (!req.cookies?.user_id) {
      const userId = uuid();
      res.cookie('user_id', userId, { httpOnly: true, sameSite: 'lax' });
    }
    res.render('index', { title: 'WWAMP' });
  });
  
  return router;
}

export { register };
