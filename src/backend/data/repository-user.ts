import { AbstractRepository } from './repository-abstract';
import { UserData } from '../resource';
import { PageRequest, Page } from '../data';


export class UserRepository extends AbstractRepository<UserData> {
  constructor(db: any) {
    super(db, 'users');
  }

  findOne(id: number): UserData {
    const user = super.findOne(id);
    return this.deletePassword(user);
  }

  findAll(): UserData[] {
    const users = super.findAll();
    users.forEach(user => {
      this.deletePassword(user);
    });
    return users;
  }

  findAllPaged(request: PageRequest): Page<UserData> {
    const page = super.findAllPaged(request);
    page.content.forEach(user => {
      this.deletePassword(user);
    });
    return page;
  }

  create(data: UserData): UserData {
    const user = super.create(data);
    return this.deletePassword(user);
  }

  update(data: UserData): UserData {
    const user = super.update(data);
    return this.deletePassword(user);
  }

  private deletePassword(user) {
    if (user) {
      delete user.password;
    }
    return user;
  }
}
