import { Express } from 'express';
import { AbstractHandler } from './handler-abstract';
import { Repository, UserRepository, Sort } from '../data';
import { UserData, UserResource } from '../resource';


export class UserHandler extends AbstractHandler<UserData, UserResource> {

  private repo: UserRepository;

  constructor(app: Express) {
    super(app, 'users', UserResource);

    this.repo = new UserRepository(app.get('db'));
  }

  getRepository(): Repository<UserData> {
    return this.repo;
  }

  getSort(): Sort {
    return null;
  }
}
