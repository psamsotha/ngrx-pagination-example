import { Express, Request, Response, RequestHandler } from 'express'
import { isArray, cleanMetadata, addSelfLink } from '../util';
import { DataSelector } from './data-selector';
import { ResourceTransformer } from './resource-transformer';
import { Resource } from '../resource';


export function singleResourceHandler(app: Express, collectionName: string,
                                      selector: DataSelector<any>,
                                      transformer: ResourceTransformer<any>): RequestHandler {

  let baseUrl = app.get('baseUrl')

  return function (req, res) {
    let id = req['id'];
    if (typeof id === 'undefined') {
      res.sendStatus(500)
    }

    let item = selector.selectData(req);

    let resource = new Resource(item)
    addSelfLink(resource, req, baseUrl, true)

    if (transformer) {
      transformer.transform(resource, req, app);
    }

    return res.json(cleanMetadata(resource))
  }
}