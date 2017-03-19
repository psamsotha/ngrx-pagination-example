import * as express from 'express'

import { AbstractHandler } from '../../routes';
import { Express, Request, Response } from 'express';
import { Repository, Page, PageRequest, Sort } from '../../data';
import { PostData, PostResource, PagedResource, ResourceTransformer } from '../../resource';


describe('routes', () => {
  describe('AbstractHandler', () => {
    const baseUrl = 'http://localhost/';
    let repo: MockPostRepository;
    let handler: TestAbstractHandler;
    let transformer: MockResourceTransformer;
    let req;
    let res;

    beforeEach(() => {
      const app = express();
      app.set('baseUrl', baseUrl);

      repo = new MockPostRepository();
      transformer = new MockResourceTransformer();
      handler = new TestAbstractHandler(app, repo, transformer);

      req = {};
      res = {};
      res.set = jasmine.createSpy('set').andReturn(res);
      res.json = jasmine.createSpy('json').andReturn(res);
      res.status = jasmine.createSpy('status').andReturn(res);
      res.sendStatus = jasmine.createSpy('sendStatus').andReturn(res);
    });


    describe('getById()', () => {
      it('should send 404 when resource not found', () => {
        spyOn(repo, 'findOne').andReturn(null);

        const result = handler.getById(req, res);

        expect(result.sendStatus).toHaveBeenCalledWith(404);
      });

      it('should send correct resource', () => {
        const data = { id: 1, content: 'data' };
        spyOn(repo, 'findOne').andReturn(data);

        const result = handler.getById(req, res);

        expect(result.json).toHaveBeenCalledWith(new PostResource(data)
          .addSelfLink(`${baseUrl}test/1`));
      });
    });


    describe('create()', () => {
      it('should send created resource', () => {
        const data = { id: 1, content: 'data' };
        spyOn(repo, 'save').andReturn(data);

        const result = handler.create(req, res);

        expect(result.status).toHaveBeenCalledWith(201);
        expect(result.set).toHaveBeenCalledWith('Location', `${baseUrl}test/1`);
        expect(result.json).toHaveBeenCalledWith(new PostResource(data)
          .addSelfLink(`${baseUrl}test/1`))
      });
    });


    describe('update()', () => {
      it('should send 404 when resource not found', () => {
        spyOn(repo, 'findOne').andReturn(null);

        const result = handler.update(req, res);

        expect(result.sendStatus).toHaveBeenCalledWith(404);
      });

      it('should save the body', () => {
        const data = { id: 1, content: 'data' };
        req.body = data;

        spyOn(repo, 'findOne').andReturn(data);
        spyOn(repo, 'save');

        const result = handler.update(req, res);

        expect(repo.save).toHaveBeenCalledWith(data);
      });

      it('should send 204 status', () => {
        const data = { id: 1, content: 'data' };
        spyOn(repo, 'findOne').andReturn(data);

        const result = handler.update(req, res);

        expect(result.sendStatus).toHaveBeenCalledWith(204);
      });
    });


    describe('getAll()', () => {
      it('should send the resources', () => {
        const data = [
          { id: 1, content: 'data' },
          { id: 2, content: 'data' }
        ];
        const pageRequest = new PageRequest(0, 2);
        const page = new Page(data, pageRequest, 10);
        spyOn(repo, 'findAllPaged').andReturn(page);

        let result;

        req.query = 'page=0&size=2';
        res.json = (resource) => result = resource;
 
        result = handler.getAll(req, res);

        expect(result._links.self.href).toEqual(`${baseUrl}test?page=0&size=2`);
        expect(result._links.first.href).toEqual(`${baseUrl}test?page=0&size=2`);
        expect(result._links.last.href).toEqual(`${baseUrl}test?page=4&size=2`);
        expect(result._links.next.href).toEqual(`${baseUrl}test?page=1&size=2`);
        expect(result._links.prev).toBeUndefined();
      });
    });
  });
});


class MockPostRepository implements Repository<any> {
  findAll(): any[] { return null; }
  findAllPaged(request: PageRequest): Page<any> { return null; }
  findOne(id: number): any { return null; }
  save(data: any): any { return null; }
}

class TestAbstractHandler extends AbstractHandler<PostData, PostResource> {
  constructor(app: Express, private repo: Repository<PostData>, transformer) {
    super(app, 'test', PostResource, transformer);
  }

  getRepository(): Repository<PostData> {
    return this.repo;
  }

  getSort(): Sort {
    return null;
  }
}

class MockResourceTransformer implements ResourceTransformer {
  transform(resource, req, app) {
    return resource;
  }
}
