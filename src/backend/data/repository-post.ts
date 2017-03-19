import { AbstractRepository } from './repository-abstract';
import { PageRequest, Page } from './paging';
import { PostData } from '../resource';


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

  save(post: PostData) {
    if (typeof post.authorId === 'undefined') {
      throw new Error('A post cannot be created without an authorId');
    }
    const user = this.users.get(post.authorId);
    if (!user) {
      throw new Error(`User with id ${post.authorId} no found.`);
    }
    return super.save(post);
  }

  private addUsersToPosts(posts): void {
    let user;
    posts.forEach(post => {
      user = this.users.get(post.authorId);
      post.user = Object.assign({}, user, { id: user['$loki'] });
    });
  }
}
