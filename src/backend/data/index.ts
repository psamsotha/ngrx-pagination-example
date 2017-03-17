import * as loki from 'lokijs';

import { Generator } from './generator';
import { Express } from 'express'


export function configureDatabase(app: Express) {
  const db = new loki('example.db');
  const generator = new Generator();

  const users = db.addCollection('users', { unique: ['id'] });
  const posts = db.addCollection('posts', { unique: ['id'] });

  generator.generateUsers(users);
  generator.generatePosts(posts);

  app.set('db', db);
}

