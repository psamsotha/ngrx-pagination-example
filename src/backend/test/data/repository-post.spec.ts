import * as loki from 'lokijs';

import { PostData } from '../../resource';
import { PostRepository, PageRequest, Page, Sort } from '../../data';


describe('data', () => {
  describe('PostRepository', () => {
    let repo: PostRepository;
    let posts;
    let users;

    beforeEach(() => {
      const db = new loki('example.db');
      posts = db.addCollection('posts');
      users = db.addCollection('users');

      repo = new PostRepository(db);
    });

    describe('findAll()', () => {
      it('should add user to post', () => {
        users.insert({ username: 'user' });
        posts.insert({ content: 'data', authorId: 1 });

        const post = repo.findAll()[0];
        
        expect(post.user).toBeDefined();
        expect(post.user.username).toEqual('user');
      });
    });

    describe('findAllPaged()', () => {
      it('should add user to post', () => {
        users.insert({ username: 'user' });
        posts.insert({ content: 'data', authorId: 1 });

        const request = new PageRequest(0, 1);
        const post = repo.findAllPaged(request).content[0];
        
        expect(post.user).toBeDefined();
        expect(post.user.username).toEqual('user');
      });
    });
  });
});
