
import { Express, Request } from 'express';
import { AbstractResource, PagedResource } from '../resource';


export interface ResourceTransformer {
  transform: (resource: AbstractResource, request: Request, app: Express) => AbstractResource;
}
