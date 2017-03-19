import { AbstractResource } from './resource-abstract';


export class Resource extends AbstractResource {
  constructor(data: any) {
    super();

    for (let prop in data) {
      if (data.hasOwnProperty(prop)) {
        this[prop] = data[prop]
      }
    }
  }
}
