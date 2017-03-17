import { AbstractResource } from '../resource';
import { Express, Request } from 'express';


export interface ResourceTransformer<T extends AbstractResource> {
  transform: (resource: T, request: Request, app: Express) => T;
}
