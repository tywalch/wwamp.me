import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import path, { dirname } from 'path';

import type { Express } from 'express';

export function register(app: Express): void {
    const root = dirname(__dirname);
    
    app.set('views', path.join(root, 'views'));
    app.set('view engine', 'hbs');
    
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://cdn.socket.io", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          connectSrc: ["'self'", "ws:", "wss:"],
        },
      },
    }));
    
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(root, 'public')));
}