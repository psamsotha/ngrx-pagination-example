

/**
 * Represents a hypermedia link.
 * 
 * @param {*} rel the relation name
 * @param {*} href the URL
 */
export class Link {
  static readonly REL_SELF = 'self';
  static readonly REL_NEXT = 'next';
  static readonly REL_PREV = 'prev';
  static readonly REL_LAST = 'last';
  static readonly REL_FIRST = 'first'

  constructor(rel: string, href: string) {
    this[rel] = { href }
  }
}

