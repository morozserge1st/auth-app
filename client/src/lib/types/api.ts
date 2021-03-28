export type ResponseError = {
  statusCode: number;
  error: string;
  message: string;
}

export type LoginRes = {
  message: string,
  token: string,
}
