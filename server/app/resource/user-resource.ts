import { Resource } from './resource';


export interface UserData {
  id?: number;
  name?: string;
  username?: string;
  location?: string;
  password?: string;
  email?: string;
  avatarUrl?: string;
  dateCreated?: Date;
}


export class UserResource extends Resource {
  id: number;
  name: string;
  username: string;
  location: string;
  password: string;
  email: string;
  avatarUrl: string;
  dateCreated: Date;

  constructor(data: UserData) {
    super(data);
  }
}