
let cleanMetadata = require('../util').cleanMetadata
let addUserToPost = require('../util').addUserToPost
import { Express, Request, Response, NextFunction } from 'express';
import { ResourceHandlerFactory } from './resource-handler-factory';
import { getPostHandler, getPostsHandler } from './posts';
import { getUserHandler, getUsersHandler } from './users';



export function configureRoutes(app: Express) {
  if (!app.get('db')) {
    throw new Error('db property is not set on app. Make sure' +
      ' there is one set and that it is set before configuring the routes');
  }

  app.param('id', (req: Request, res: Response, next: NextFunction, id: any) => {
    req['id'] = id;
    return next();
  });

  app.get('/api/users', getUsersHandler(app));
  app.get('/api/users/:id', getUserHandler(app));
  
  app.get('/api/posts', getPostsHandler(app));
  
  app.get('/api/posts/:id', getPostHandler(app));
}


