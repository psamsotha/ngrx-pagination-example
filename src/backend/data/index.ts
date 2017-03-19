import * as loki from 'lokijs';

import { Generator } from './generator';
import { Express } from 'express'


export { Page, PageRequest, Sort } from './paging';
export { Repository, AbstractRepository } from './repository-abstract';
export { UserRepository } from './repository-user';
export { PostRepository } from './repository-post';


export function configureData(app: Express) {

  const db = new loki('example.db');
  const generator = new Generator();

  const users = db.addCollection('users');
  const posts = db.addCollection('posts');

  generator.generateUsers(users);
  generator.generatePosts(posts);

  app.set('db', db);

}
