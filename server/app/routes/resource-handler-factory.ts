import { Express, RequestHandler, Request, Response } from 'express';
import { DataSelector } from './data-selector'
import { ResourceTransformer } from './resource-transformer';
import { pagedResourceHandler } from './paged-resource-handler';
import { singleResourceHandler } from './single-resource-handler';


export class ResourceHandlerFactory {

  static createPagedResourceHandler(app: Express, collectionName: string, selector: DataSelector<any>,
                                    transformer?: ResourceTransformer<any>): RequestHandler {
  
    return pagedResourceHandler(app, collectionName, selector, transformer);
  }

  static createSingleResourceHandler(app: Express, collectionName: string, selector: DataSelector<any>,
                                     transformer?: ResourceTransformer<any>): RequestHandler {
                
    return singleResourceHandler(app, collectionName, selector, transformer);
  }
}
