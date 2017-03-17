import { Resource } from './resource';
import { UserData, UserResource } from './user-resource';


export interface PostData {
  id: number
  title: string;
  dateCreated: Date;
  authorId: number
  content: string;
}


export class PostResource extends Resource {
  author: UserResource;
  title: string;
  dateCreated: Date;
  authorId: number
  content: string;

  constructor(data: PostData) {
    super(data);
  }

  addUserInfo(userData: UserData, baseUrl: string) {
    delete this.authorId;

    this.author = new UserResource({
      username: userData.username,
      avatartUrl: userData.avatarUrl,
    } as UserData).addSelfLink(`${baseUrl}/users/${userData.id}`);
  }
}