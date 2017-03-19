
export class ErrorMessage {
  constructor(public status: number,
              public message: string,
              public timestamp = new Date()) {}
}
