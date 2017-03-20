
export enum ErrorTypes {
  CLIENT_DATA_ERROR
}

export function typedError(message: string, type: ErrorTypes): Error {
  const error = new Error(message);
  error['type'] = type;
  return error;
}



