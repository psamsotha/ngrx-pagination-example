import { AbstractRepository } from './repository-abstract';
import { PageRequest, Page } from './paging';
import { PostData } from '../resource';
import { ErrorTypes, typedError } from '../core';


export class PostRepository extends AbstractRepository<PostData> {

  private users: any;

  constructor(db: any) {
    super(db, 'posts');

    this.users = db.getCollection('users');
  }

  findAllPaged(request: PageRequest): Page<PostData> {
    const page = super.findAllPaged(request);
    this.addUsersToPosts(page.content);
    return page;
  }

  findAll(): PostData[] {
    const posts = super.findAll();
    this.addUsersToPosts(posts);
    return posts;
  }

  findOne(id: number): PostData {
    const post = super.findOne(id);
    if (post) {
      this.addUsersToPosts([post]);
    }
    return post;
  }

  create(post: PostData): PostData {
    if (typeof post.authorId === 'undefined') {
      throw typedError('A post cannot be created without an authorId',
        ErrorTypes.CLIENT_DATA_ERROR);
    }
    const user = this.users.get(post.authorId);
    if (!user) {
      throw typedError(`User with id ${post.authorId} no found.`,
        ErrorTypes.CLIENT_DATA_ERROR);
    }
    const created = super.create(post);
    this.addUsersToPosts([created]);
    return created;
  }

  update(post: PostData): PostData {
    const updated = super.update(post);
    this.addUsersToPosts([updated])
    return updated;
  }

  private addUsersToPosts(posts): void {
    let user;
    posts.forEach(post => {
      user = this.users.get(post.authorId);
      post.user = Object.assign({}, user, { id: user['$loki'] });
    });
  }
}
