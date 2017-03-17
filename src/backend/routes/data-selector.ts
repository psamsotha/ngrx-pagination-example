
import { Request } from 'express';


export interface DataSelector<T> {
  selectData: (req: Request) => T;
}

