import { Express, Request, RequestHandler } from 'express';
import { UserData, UserResource, PagedResource } from '../resource';
import { DataSelector } from './data-selector';
import { ResourceTransformer } from './resource-transformer';
import { ResourceHandlerFactory } from './resource-handler-factory';


export function getUsersHandler(app: Express): RequestHandler {
  let db = app.get('db');
  return ResourceHandlerFactory.createPagedResourceHandler(
    app, 'users', new UsersDataSelector(db));
}

export function getUserHandler(app: Express): RequestHandler {
  let db = app.get('db');
  return ResourceHandlerFactory.createSingleResourceHandler(
    app, 'users', new UserDataSelector(db));
}

export class UsersDataSelector implements DataSelector<UserData[]> {
  db: any;

  constructor(db: any) {
    this.db = db;
  }

  selectData(req: Request): UserData[] {
    return this.db.getCollection('users').find();
  }
}

export class UserDataSelector implements DataSelector<UserData> {
  db: any;

  constructor(db: any) {
    this.db = db;
  }

  selectData(req: Request): UserData {
    let id = req['id'];
    return this.db.getCollection('users').by('id', id);
  }
}



