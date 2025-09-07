import createError from 'http-errors';
import express, { type Express } from 'express';
import type { ErrorRequestHandler } from 'express';
import { createServer, type Server } from 'node:http';
import { register as registerSockets } from './sockets';
import { register as registerRoutes } from './routes';
import { register as registerMiddleware } from './middleware';



export function register(app: Express, server: Server) {
  const io = registerSockets(server);
  registerMiddleware(app);
  const router = registerRoutes(app);
  
  app.use((_, __, next) => {
    next(createError(404));
  });
  
  app.use((...args: Parameters<ErrorRequestHandler>) => {
    const [err, req, res] = args;
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  return { io, router };
}

export function init() {
  const app = express();
  const server = createServer(app);
  const { io, router } = register(app, server);
  return { app, server, io, router };
}
export default init;
