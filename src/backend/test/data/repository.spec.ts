import * as loki from 'lokijs';

import { PostData } from '../../resource';
import { Generator } from '../../data/generator';
import { AbstractRepository, PageRequest, Page, Sort } from '../../data';
import { DEFAULT_PAGE_SIZE } from '../../constants';
 

class PostsRepository extends AbstractRepository<PostData> {
  constructor(db: any) {
    super(db, 'posts');
  }
}


describe('data', () => {
  describe('AbstractRepository', () => {
    let posts;
    let repo: AbstractRepository<PostData>;

    beforeEach(() => {
      const db = new loki('example.db');
      posts = db.addCollection('posts');
      // new Generator().generatePosts(posts);

      repo = new PostsRepository(db);
    });

    describe('findOne()', () => {
      it('should find the items', () => {
        posts.insert({ content: 'one' });
        posts.insert({ content: 'two' });

        expect(repo.findOne(1).content).toEqual('one');
        expect(repo.findOne(2).content).toEqual('two');
        expect(repo.findOne(3)).toBeFalsy();
      });
    });

    describe('findAll()', () => {
      it('should find all', () => {
        posts.insert({ content: 'one' });
        posts.insert({ content: 'two' });

        const items = repo.findAll();

        expect(items.length).toEqual(2);
        expect(items[0].content).toEqual('one');
        expect(items[1].content).toEqual('two');
      });
    });

    describe('save()', () => {
      it('should save new item', () => {
        repo.save({ content: 'data' } as PostData);

        const item = posts.get(1);

        expect(item).toBeTruthy();
        expect(item.content).toBe('data');
      });

      it('should save new item if item with id is not found', () => {
        posts.insert({ content: 'one' });
        repo.save({ id: 5000, content: 'data' } as PostData);

        const item = posts.get(2);

        expect(item).toBeTruthy();
        expect(item.content).toBe('data');
      });

      it('should update item', () => {
        posts.insert({ content: 'one' });
        repo.save({ id: 1, content: 'updated' } as PostData);

        const item = posts.get(1);

        expect(item.content).toBe('updated');
      });
    });

    describe('findAllPaged()', () => {
      beforeEach(() => {
        posts.insert([
          { content: 'one' },
          { content: 'two' },
          { content: 'three' },
          { content: 'four' },
          { content: 'five' },
          { content: 'six' },
          { content: 'seven' }
        ]);
      });

      it('should get page', () => {
        const pageRequest = new PageRequest(1, 2);
        const page = repo.findAllPaged(pageRequest);
        const items = page.content;

        expect(items.length).toEqual(2);
        expect(items[0].content).toEqual('three');
        expect(items[1].content).toEqual('four');
      });

      it('should get page sorted ascending', () => {
        // five, four, one, seven, six, three, two
        const pageRequest = new PageRequest(1, 2, new Sort(['content']));
        const page = repo.findAllPaged(pageRequest);
        const items = page.content;

        expect(items.length).toEqual(2);
        expect(items[0].content).toEqual('one');
        expect(items[1].content).toEqual('seven');
      });

      it('should get page sorted descending', () => {
        // five, four, one, seven, six, three, two
        const pageRequest = new PageRequest(1, 2, new Sort(['content'], Sort.DESC));
        const page = repo.findAllPaged(pageRequest);
        const items = page.content;

        expect(items.length).toEqual(2);
        expect(items[0].content).toEqual('six');
        expect(items[1].content).toEqual('seven');
      });

      it('should get first page when request page < 0', () => {
        const pageRequest = new PageRequest(-1, 2);
        const page = repo.findAllPaged(pageRequest);
        const items = page.content;

        expect(items.length).toEqual(2);
        expect(items[0].content).toEqual('one');
      });

      it('should get first page when request size > total entries', () => {
        const pageRequest = new PageRequest(2, 20);
        const page = repo.findAllPaged(pageRequest);
        const items = page.content;

        expect(items.length).toEqual(DEFAULT_PAGE_SIZE);
        expect(items[0].content).toEqual('one');
      });

      it('should get first page when request (size * page) > total entries', () => {
        const pageRequest = new PageRequest(20, 2);
        const page = repo.findAllPaged(pageRequest);
        const items = page.content;

        expect(items.length).toEqual(DEFAULT_PAGE_SIZE);
        expect(items[0].content).toEqual('one');
        expect(items[1].content).toEqual('two');
      });
    });
  });
});
