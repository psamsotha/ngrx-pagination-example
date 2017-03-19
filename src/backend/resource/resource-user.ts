import { Resource } from './resource-single';


export interface UserData {
  id: number;
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
}