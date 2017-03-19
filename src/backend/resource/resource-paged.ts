import { AbstractResource } from './resource-abstract';
import { Link } from './link';


export interface Page {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export class PagedResource extends AbstractResource {
  _embedded: any = {}
  page: Page;

  constructor(data: any[], collectionName) {
    super();

    this._embedded[collectionName] = data;
  }
  
  setPage(page: Page) {
    this.page = page;
    return this;
  }

  addNextLink(href: string) {
    this.addLink(Link.REL_NEXT, href);
    return this;
  }

  addPrevLink(href: string) {
    this.addLink(Link.REL_PREV, href);
    return this;
  }

  addFirstLink(href: string) {
    this.addLink(Link.REL_FIRST, href);
    return this;
  }

  addLastLink(href: string) {
    this.addLink(Link.REL_LAST, href);
    return this;
  }

  fromData(data: any): PagedResource {
    return null
  }
}
