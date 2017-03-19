import { AbstractRepository } from './repository-abstract';
import { UserData } from '../resource';


export class UserRepository extends AbstractRepository<UserData> {
  constructor(db: any) {
    super(db, 'users');
  }
}
