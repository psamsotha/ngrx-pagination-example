
import { Express, Request, Response, NextFunction } from 'express';
import { PostHandler } from './handler-post';
import { UserHandler } from './handler-user';
import { ErrorMessage } from '../core';


export { PostHandler, UserHandler };
export { AbstractHandler } from './handler-abstract';


export function configureRoutes(app: Express) {

  if (!app.get('db')) {
    throw new Error('"db" property is not set on app. Make sure' +
      ' there is one set and that it is set before configuring the routes');
  }
  if (!app.get('baseUrl')) {
    throw new Error('"baseUrl" property must be set');
  }


  app.param('id', (req: Request, res: Response, next: NextFunction, id: any) => {
    const parsed = parseInt(id);
    if (isNaN(parsed)) {
      res.status(404)
        .json(new ErrorMessage(404, 'id parameter must be a number'));
      return next();
    }
    req['id'] = parsed;
    return next();
  });


  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method.toLowerCase() === 'post'
      || req.method.toLowerCase() === 'put') {
      if (!req.header('content-type')) {
        return res.status(400)
          .json(new ErrorMessage(400, 'expected Content-Type header'));
      }

      if (req.header('content-type').indexOf('application/json') == -1) {
        return res.status(400)
          .json(new ErrorMessage(400, 'only application/json data allowed'))
      }
    }
    return next();
  });


  const userHandler = new UserHandler(app);
  app.get('/api/users', userHandler.getAll.bind(userHandler));
  app.put('/api/users/:id', userHandler.update.bind(userHandler))
  app.get('/api/users/:id', userHandler.getById.bind(userHandler));
  app.post('/api/users', userHandler.create.bind(userHandler));


  const postHandler = new PostHandler(app);
  app.get('/api/posts', postHandler.getAll.bind(postHandler));
  app.put('/api/posts/:id', postHandler.update.bind(postHandler));
  app.get('/api/posts/:id', postHandler.getById.bind(postHandler));
  app.post('/api/posts', postHandler.create.bind(postHandler));

}
