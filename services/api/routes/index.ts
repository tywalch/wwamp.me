import express, { type Express, type Router } from 'express';


function register(app: Express): Router {
  const router = express.Router();
  app.use('/', router);
  
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  router.get('/sprites', function(req, res, next) {
    res.json({
      data: {}
    });

    router.get('/wwamps', function() {
      res.json({
        data: {
          wwamps: [],
        },
      });
    })
  });
  
  return router;
}

export { register };
