

export class Sort {
  static readonly ASC = 'asc';
  static readonly DESC = 'desc';

  constructor(private _props: string[] = [],
              private _order = Sort.ASC) {}

  
  get props(): string[] {
    return this._props;
  }

  get order(): string {
    return this._order;
  }
}


export class PageRequest {
  constructor(private _page: number,
              private _size: number,
              private _sort?: Sort) {
  }

  get page(): number {
    return this._page < 0 ? 0 : this._page;
  }

  get size(): number {
    return this._size;
  }

  get sort(): Sort {
    return this._sort;
  }
}


export class Page<T> {

  constructor(private _content: T[],
              private _pageRequest: PageRequest,
              private _total: number) {
  }

  get content(): T[] {
    return this._content;
  }
  
  get size(): number {
    return this._content.length;
  }

  get totalElements(): number {
    return this._total;
  }

  get totalPages(): number {
    return Math.ceil(this._total / this._pageRequest.size);
  }

  get number(): number {
    return this._pageRequest.page;
  }

  get hasNext(): boolean {
    return (this.number + 1) <= this.totalPages;
  }

  get hasPrev(): boolean {
    return (this.number - 1) >= 0;
  }

  get first(): PageRequest {
    return new PageRequest(0, this._pageRequest.size);
  }

  get last(): PageRequest {
    const size = this.totalElements - (this._pageRequest.size * (this.totalPages - 1));
    return new PageRequest(this.totalPages - 1, size);
  }

  get next(): PageRequest {
    return this.hasNext
      ? new PageRequest(this.number + 1, this._pageRequest.size)
      : null;
  }

  get prev(): PageRequest {
    return this.hasPrev
      ? new PageRequest(this.number - 1, this._pageRequest.size)
      : null;
  }
}
