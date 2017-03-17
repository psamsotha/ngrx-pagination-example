import { cleanMetadata } from './clean-metadata';
import { Resource } from '../resource';


export function addUserToPost(post: any, u: any, baseUrl: string) {
  let user = new Resource(cleanMetadata(u))
    .addSelfLink(baseUrl + '/users/' + u.id);

  delete user['location'];
  delete user['password'];
  delete user['email'];
  delete user['id'];
  delete user['name'];
  delete user['dateCreated'];

  post.user = user;
  return post;
}

