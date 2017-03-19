import { Resource } from './resource-single';
import { UserData, UserResource } from './resource-user';


export interface PostData {
  id: number
  title: string;
  dateCreated: Date;
  authorId: number
  content: string;
  user?: UserData;
}


export class PostResource extends Resource {
  author: UserResource;
  title: string;
  dateCreated: Date;
  authorId: number
  content: string;
  user: UserData;

  convertUserData(baseUrl: string) {
    this.author = new UserResource({
      username: this.user.username,
      avatarUrl: this.user.avatarUrl,
    }).addSelfLink(`${baseUrl}users/${this.user.id}`);
    
    delete this.user;
    delete this.authorId;
  }
}
