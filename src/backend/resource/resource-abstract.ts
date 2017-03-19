import { Link } from './link';


export abstract class AbstractResource {
  _links: any;

  addLink(rel: string, href: string) {
    if (!this._links) {
      this._links = {}
    }
    this._links = Object.assign({}, this._links, new Link(rel, href));
    return this;
  }

  addSelfLink(href: string) {
    this.addLink(Link.REL_SELF, href);
    return this;
  }
}
