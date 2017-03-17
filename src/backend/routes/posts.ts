import { Express, Request, RequestHandler } from 'express';
import { DataSelector } from './data-selector';
import { ResourceTransformer } from './resource-transformer';
import { PostData, PostResource, PagedResource, UserData, UserResource } from '../resource';
import { ResourceHandlerFactory } from './resource-handler-factory';


export function getPostsHandler(app): RequestHandler {
  let db = app.get('db');
  return ResourceHandlerFactory.createPagedResourceHandler(
    app, 'posts', new PostsDataSelector(db), new PostsResourceTransformer());
}

export function getPostHandler(app): RequestHandler {
  let db = app.get('db');
  return ResourceHandlerFactory.createSingleResourceHandler(
    app, 'posts', new PostDataSelector(db), new PostResourceTransformer());
}


export class PostsDataSelector implements DataSelector<PostData[]> {
  db: any;
  dynamicView: any;

  constructor(db) {
    this.db = db;
  }

  selectData(req: Request): PostData[] {
    let posts = this.db.getCollection('posts');
    let dynamicView = posts.addDynamicView('sorted');
    
    dynamicView.applySimpleSort('dateCreated', true);
    return dynamicView.data();
  }
}

export class PostDataSelector implements DataSelector<PostData> {
  db: any;

  constructor(db) {
    this.db = db;;
  }

  selectData(req: Request): PostData {
    let id = req['id'];
    return this.db.getCollection('posts').by('id', id);
  }
}

export class PostsResourceTransformer implements ResourceTransformer<PagedResource> {

  transform(resource: PagedResource, req: Request, app: Express): PagedResource {
    let postTransformer = new PostResourceTransformer();

    resource._embedded.posts.forEach((post: PostResource) => {
      postTransformer.transform(post, req, app);
    });

    return resource;
  }
}

export class PostResourceTransformer implements ResourceTransformer<PostResource> {

  transform(resource: PostResource, request: Request, app: Express): PostResource {
    let baseUrl = app.get('baseUrl');
    let users = app.get('db').getCollection('users');
    let user = users.by('id', resource.authorId);

    addUserToPost(resource, user, baseUrl);

    return resource;
  }
}

function addUserToPost(post: PostResource, u: UserData, baseUrl: string) {
  let user = new UserResource(<UserData>{
    username: u.username,
    avatarUrl: u.avatarUrl
  })
  .addSelfLink(baseUrl + '/users/' + u.id);
  
  delete post.authorId;
  post.author = user;

  return post;
}
