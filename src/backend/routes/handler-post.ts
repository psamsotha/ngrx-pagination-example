import { Express, Request } from 'express';
import { AbstractHandler } from './handler-abstract';
import { Repository, PostRepository, Sort } from '../data';
import { PostData, PostResource, AbstractResource, PagedResource, ResourceTransformer } from '../resource';


export class PostResourceTransformer implements ResourceTransformer {

  constructor(private readonly baseUrl: string) {}

  transform(resource: AbstractResource, request: Request, app: Express): AbstractResource {
    if (resource instanceof PagedResource) {
      resource._embedded['posts'].forEach(post => {
        post.convertUserData(this.baseUrl);
      });
    } else if (resource instanceof PostResource) {
      resource.convertUserData(this.baseUrl);
    }

    return resource;
  }
}


export class PostHandler extends AbstractHandler<PostData, PostResource> {

  private repo: PostRepository;


  constructor(app: Express) {
    super(app, 'posts', PostResource, new PostResourceTransformer(app.get('baseUrl')));

    this.repo = new PostRepository(app.get('db'))
  }

  getRepository(): Repository<PostData> {
    return this.repo;
  }

  getSort(req: Request): Sort {
    return new Sort(['dateCreated']);
  }
}
