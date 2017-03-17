import { PagedResource, Link } from '../resource';
import { cleanMetadata, addSelfLink, isArray } from '../util';
import { Express, Request, Response } from 'express';
import { DataSelector } from './data-selector';
import { ResourceTransformer } from './resource-transformer';


export function pagedResourceHandler(app: Express, collectionName: string,
                                     selector: DataSelector<any>,
                                     transformer?: ResourceTransformer<any>) {

  let baseUrl = app.get('baseUrl');

  return function (req: Request, res: Response) {
    let coll = selector.selectData(req);
    let paged = getPagedData(req, coll);
    let cleaned = cleanMetadata(paged);
    let resource = new PagedResource(cleaned, collectionName);
    let page = generatePage(req, coll);

    resource.setPage(page);
    addLinks(resource, baseUrl, req.originalUrl, page);
    
    if (transformer) {
      transformer.transform(resource, req, app);
    }

    return res.json(resource);
  }
}

function getPagedData(req, coll) {
  let parsedQuery = parseQuery(req);
  let page = parsedQuery[0];
  let size = parsedQuery[1];

  if (size > coll.length) {
    return coll;
  }
  let start = page * size;
  if (start > coll.length) {
    return coll.slice(0, size);
  }
  return coll.slice(start, start + size);
}


function generatePage(req, coll) {
  let parsedQuery = parseQuery(req);
  let page = parsedQuery[0];
  let size = parsedQuery[1];

  let totalElements = coll.length;
  let totalPages = Math.ceil(totalElements / size);

  return {
    number: page,
    size: size,
    totalPages: totalPages,
    totalElements: totalElements
  };
}


function parseQuery(req) {
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


function addLinks(resource, baseUrl, originalUrl, page) {
  let url = baseUrl + stripQuery(originalUrl);

  addLink(resource, Link.REL_FIRST, url, 0, page.size);
  addLink(resource, Link.REL_LAST, url, page.totalPages, page.size);

  if (page.number - 1 >= 0) {
    addLink(resource, Link.REL_PREV, url, page.number - 1, page.size);
  }

  if (page.number + 1 <= page.totalPages) {
    addLink(resource, Link.REL_NEXT, url, page.number + 1, page.size);
  }
}


function addLink(resource, type, url, page, size) {
  let link = addQuery(url, page, size);
  resource.addLink(type, link);
}


function addQuery(url, page, size) {
  return url + '?page=' + page + '&size=' + size;
}


function stripQuery(url) {
  if (url.indexOf('?') !== -1) {
    return url.substr(0, url.indexOf('?'));
  }
  return url;
}
