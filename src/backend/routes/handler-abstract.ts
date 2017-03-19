import { Type } from '../core';
import { Repository, PageRequest, Page, Sort } from '../data';
import { Express, Request, Response, RequestHandler } from 'express';
import { AbstractResource, PagedResource, Resource, Link, ResourceTransformer } from '../resource';


export interface Handler {
  getAll: RequestHandler;
  getById: RequestHandler;
  create: RequestHandler;
  update: RequestHandler;
}


export abstract class AbstractHandler<U, T extends Resource> implements Handler {

  constructor(protected readonly app: Express,
              protected readonly collName: string,
              protected readonly resourceType: Type<T>,
              protected readonly transformer?: ResourceTransformer) {
  }

  getAll(req: Request, res: Response) {
    const pageRequest = this.getPageRequest(req);
    const page = this.getRepository().findAllPaged(pageRequest);
    const resources = page.content.map(item => {
      return new this.resourceType(item);
    });
    const resource = this.transform(
      new PagedResource(resources, this.collName),
      req);
 
    this.addLinks(<PagedResource>resource, req, page);
    this.addPage(<PagedResource>resource, page);

    return res.json(resource);
  }

  getById(req: Request, res: Response) {
    const id = req['id'];
    const data = this.getRepository().findOne(id);
    if (!data) {
      return res.sendStatus(404);
    }
    const resource = this.transform(
      <T>new this.resourceType(data),
      req);
    resource.addSelfLink(this.getLocation(resource, req));

    return res.json(resource);
  }

  create(req: Request, res: Response) {
    const body = req.body;
    const created = this.getRepository().save(body);
    const resource = this.transform(
      <T>new this.resourceType(created),
      req);
    resource.addSelfLink(this.getLocation(resource, req));

    return res.status(201)
      .set('Location', this.getLocation(created, req))
      .json(resource);
  }

  update(req: Request, res: Response) {
    const id = req['id'];
    const inStore = this.getRepository().findOne(id);
    if (!inStore) {
      return res.sendStatus(404);
    }
    const body = req.body;
    const updated = this.getRepository().save(body);

    return res.sendStatus(204);
  }

  abstract getRepository(): Repository<U>;

  private transform(resource: any, req: Request): T | PagedResource {
    return this.transformer
      ? this.transformer.transform(resource, req, this.app)
      : resource;
  }

  private getBaseUrl(): string {
    return this.app.get('baseUrl');
  }

  private getLocation(data: any, req: Request): string {
    return `${this.getBaseUrl()}${this.collName}/${data.id}`
  }

  private getPageRequest(req: Request): PageRequest {
    const [page, size] = this.parseQuery(req);
    const sort = this.getSort(req);

    return new PageRequest(page, size, sort);
  }

  abstract getSort(req: Request): Sort;

  private parseQuery(req: Request): [number, number] {
    let page = req.query.page;
    let size = req.query.size;
    try {
      page = typeof page !== 'undefined' ? parseInt(page) : 0;
      size = typeof size !== 'undefined' ? parseInt(size) : 5;
    } catch (e) {
      page = 0;
      size = 5;
    }
    if (size <= 0) size = 5;
    if (page < 0) page = 0;
    return [page, size];
  }

  private addLinks(resource: PagedResource, req: Request, page: Page<U>) {
    const url = this.getBaseUrl() + this.collName;

    resource.addSelfLink(this.getHref(url, page.number, page.size));
    resource.addFirstLink(this.getHref(url, 0, page.size));
    resource.addLastLink(this.getHref(url, page.totalPages - 1, page.size));

    if (page.number - 1 >= 0) {
      resource.addPrevLink(this.getHref(url, page.number - 1, page.size));
    }

    if (page.number + 1 <= page.totalPages) {
      resource.addNextLink(this.getHref(url, page.number + 1, page.size));
    }
  }

  private getHref(url: string, page: number, size: number) {
    return `${url}?page=${page}&size=${size}`;
  }

  private addPage(resource: PagedResource, page: Page<U>) {
    resource.setPage({
      number: page.number,
      size: page.size,
      totalElements: page.totalElements,
      totalPages: page.totalPages
    });
  }

}