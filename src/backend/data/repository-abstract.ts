import { PageRequest, Page, Sort } from './paging';
import { DEFAULT_PAGE_SIZE } from '../constants';


export interface Repository<T> {
  findAll(): T[]
  findAllPaged(request: PageRequest): Page<T>;
  findOne(id: number): T;
  save(t: T): T;
}


export interface Entity {
  id: number;
}


export abstract class AbstractRepository<T extends Entity> implements Repository<Entity> {

  protected db: any;
  protected collName: string;


  constructor(db: any, collName: string) {
    this.db = db;
    this.collName = collName;
  }


  findOne(id: number): T {
    const result = this.db.getCollection(this.collName).get(id);
    if (!result) {
      return null;
    }
    return this.cleanMetadata(result);
  }

  findAllPaged(request: PageRequest): Page<T> {
    const coll = this.db.getCollection(this.collName);
    const items = coll.find();
    const count = items.length;

    const page = ((request.page < 0)
      || (request.size > count)
      || (request.page * request.size) > count)
      ? 0
      : request.page;

    const size = (page === 0 && request.page !== 0)
      ? DEFAULT_PAGE_SIZE
      : request.size;

    const offset = page * size;

    const filtered = request.sort
      ? items
        .sort(this.getSortFn(request.sort))
        .slice(offset, offset + size)
      : items
        .slice(offset, offset + size);

    const cleaned = this.cleanMetadata(filtered)
    return new Page<T>(cleaned, request, count);
  }

  findAll(): T[] {
    return this.cleanMetadata(this.db.getCollection(this.collName).find());
  }

  save(t: T): T {
    const coll = this.db.getCollection(this.collName);

    if (typeof t.id === 'undefined') {
      return this.cleanMetadata(coll.insert(t));
    }

    let item = coll.get(t.id);
    if (!item) {
      const saved = coll.insert(t);
      return this.cleanMetadata(saved);
    } else {
      item = Object.assign(item, t);
      coll.update(item);
      return this.cleanMetadata(item);
    }
  }

  protected getSortFn(sort: Sort): (a, b) => any {
    if (sort.order === Sort.ASC) {
      return (a, b) => {
        for (let prop of sort.props) {
          if (a[prop] > b[prop]) {
            return 1;
          } else if (a[prop] < b[prop]) {
            return -1;
          }
          return 0;
        }
      }
    } else {
      return (a, b) => {
        for (let prop of sort.props) {
          if (a[prop] < b[prop]) {
            return 1;
          } else if (a[prop] > b[prop]) {
            return -1;
          }
          return 0;
        }
      }
    }
  }

  private cleanMetadata(lokiData) {
    if (Object.prototype.toString.call(lokiData) === '[object Array]') {
      return lokiData.map(obj => {
        return this.cleanObject(obj)
      })
    }
    return this.cleanObject(lokiData)
  }

  private cleanObject(obj) {
    const result = Object.assign({}, obj, {id: obj['$loki']})
    delete result['meta']
    delete result['$loki']
    return result
  }
}
